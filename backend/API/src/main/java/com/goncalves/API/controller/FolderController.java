package com.goncalves.API.controller;

import com.goncalves.API.entities.files.Files;
import com.goncalves.API.entities.files.FilesRepository;
import com.goncalves.API.entities.folder.Folder;
import com.goncalves.API.entities.folder.FolderRepository;
import com.goncalves.API.entities.request.ProjectRepository;
import com.goncalves.API.infra.security.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/projects/folders")
public class FolderController {

    @Autowired
    private FolderRepository repository;

    @Autowired
    private FilesRepository filesRepository;

    @Autowired
    private ProjectRepository projectsRepository;


    @GetMapping("/{idFolder}")
    public ResponseEntity getFilesByFolders(@PathVariable String idFolder) {
        try {
            var optionalFolder = repository.findById(idFolder);

            if (optionalFolder.isPresent()) {
                var folder = optionalFolder.get();
                return ResponseEntity.ok(folder);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            // Tratar exceções genéricas e logar informações relevantes
            e.printStackTrace(); // Este é apenas um exemplo, você deve usar um logger na prática

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/{idProject}")
    @Transactional
    public ResponseEntity postFolder(@PathVariable String idProject,
                                     @RequestParam(name = "idFolder", required = false) String idFolder,
                                     @RequestParam("files") List<MultipartFile> files,
                                     @RequestParam("name") String folderName) {
        System.out.println("entrou!");
        try {
            if (idProject.isBlank()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new NotFoundException("ID não encontrado", idProject));
            }

            var projectOptional = projectsRepository.findById(idProject);

            if (projectOptional.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new NotFoundException("Projeto não encontrado", idProject));
            }

            var project = projectOptional.get();

            Folder savedFolder;

            if (idFolder != null && !idFolder.isBlank()) {
                // Verificar se a pasta ou subpasta existe no projeto
                Optional<Folder> parentFolderOptional = findFolderRecursive(project.getFolders(), idFolder);

                if (parentFolderOptional.isEmpty()) {
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new NotFoundException("Pasta não encontrada", idProject));
                }

                var id = parentFolderOptional.get();

                Folder subFolder = new Folder(folderName, LocalDateTime.now());

                var parentFolder = repository.save(subFolder);

                for (MultipartFile file : files) {
                    byte[] fileContent = file.getBytes();

                    Files uploadedFile = new Files(
                            file.getOriginalFilename(),
                            file.getContentType(),
                            fileContent,
                            LocalDateTime.now()
                    );

                    // Salva o arquivo na coleção Files
                    filesRepository.save(uploadedFile);

                    // Adiciona uma nova instância do arquivo à lista de arquivos da pasta pai
                    parentFolder.getFiles().add(uploadedFile);

                }

                // Adiciona o subfolder à lista de subfolders do folder pai
                id.getSubFolders().add(parentFolder);

                // Atualiza o folder pai no repositório
                repository.save(id);

                savedFolder = parentFolder;
            } else {
                // Se o idFolder não for fornecido, cria um folder no projeto
                Folder folder = new Folder(folderName, LocalDateTime.now());

                savedFolder = repository.save(folder);

                List<Files> savedFiles = new ArrayList<>();

                for (MultipartFile file : files) {
                    byte[] fileContent = file.getBytes();

                    Files uploadedFile = new Files(
                            file.getOriginalFilename(),
                            file.getContentType(),
                            fileContent,
                            LocalDateTime.now()
                    );


                    // Salva o arquivo na coleção Files
                    filesRepository.save(uploadedFile);

                    // Adiciona uma nova instância do arquivo à lista de arquivos do folder
                    savedFolder.getFiles().add(uploadedFile);
                    savedFiles.add(uploadedFile);

                }

                // Adiciona a lista de arquivos à lista de arquivos do folder
                savedFolder.setFiles(savedFiles);

                // Adiciona o folder à lista de folders do projeto
                project.getFolders().add(savedFolder);

                // Atualiza o projeto no repositório
                projectsRepository.save(project);
            }

            // Agora, salva o folder no repositório após configurar todos os relacionamentos
            repository.save(savedFolder);

            return ResponseEntity.status(HttpStatus.CREATED).body(savedFolder);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Falha ao ler o conteúdo dos arquivos. " + e.getMessage());
        }
    }

    @PostMapping("/{idProject}/{parentFolderId}/newFile")
    @Transactional
    public ResponseEntity createFilesIntoSubfolders(
            @RequestParam("files") List<MultipartFile> files,
            @PathVariable String idProject,
            @PathVariable String parentFolderId) {

        try {

            if (idProject.isBlank()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new NotFoundException("ID do projeto não encontrado", idProject));
            }

            var projectOptional = projectsRepository.findById(idProject);

            if (projectOptional.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new NotFoundException("Projeto não encontrado", idProject));
            }

            var project = projectOptional.get();

            // Verificar se a pasta ou subpasta existe no projeto
            Optional<Folder> parentFolderOptional = findFolderRecursive(project.getFolders(), parentFolderId);

            if (parentFolderOptional.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new NotFoundException("Pasta não encontrada", parentFolderId));
            }

            Folder parentFolder = parentFolderOptional.get();


            for (MultipartFile file : files) {
                byte[] fileContent = file.getBytes();

                Files uploadedFile = new Files(
                        file.getOriginalFilename(),
                        file.getContentType(),
                        fileContent,
                        LocalDateTime.now()
                );

                // Salva o arquivo na coleção Files
                filesRepository.save(uploadedFile);

                // Adiciona uma nova instância do arquivo à lista de arquivos da pasta pai
                parentFolder.getFiles().add(uploadedFile);

            }

            // Atualiza a pasta pai no repositório
            repository.save(parentFolder);

            return ResponseEntity.status(HttpStatus.CREATED).body("Arquivos salvos com sucesso!");

        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Falha ao ler o conteúdo dos arquivos. " + e.getMessage());
        }
    }

    private Optional<Folder> findFolderRecursive(List<Folder> folders, String targetFolderId) {
        for (Folder folder : folders) {
            if (folder.getIdFolder().equals(targetFolderId)) {
                return Optional.of(folder);
            }
            Optional<Folder> subfolderOptional = findFolderRecursive(folder.getSubFolders(), targetFolderId);
            if (subfolderOptional.isPresent()) {
                return subfolderOptional;
            }
        }
        return Optional.empty();
    }
}
