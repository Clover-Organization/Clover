package com.goncalves.API.controller;

import com.goncalves.API.entities.commits.Commits;
import com.goncalves.API.entities.commits.CommitsRepository;
import com.goncalves.API.entities.files.Files;
import com.goncalves.API.entities.files.FilesRepository;
import com.goncalves.API.entities.filesVersions.Versions;
import com.goncalves.API.entities.filesVersions.VersionsRepository;
import com.goncalves.API.entities.folder.Folder;
import com.goncalves.API.entities.folder.FolderRepository;
import com.goncalves.API.entities.request.Project;
import com.goncalves.API.entities.request.ProjectRepository;
import com.goncalves.API.infra.security.ErrorNotFoundId;
import com.goncalves.API.infra.security.NotFoundException;
import com.goncalves.API.infra.security.Successfully;
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

@RestController
@RequestMapping("projects/files")
public class FilesController {
    @Autowired
    private FilesRepository repository;
    @Autowired
    private ProjectRepository projectsRepository;
    @Autowired
    private CommitsRepository commitsRepository;
    @Autowired
    private FolderRepository folderRepository;
    @Autowired
    private VersionsRepository versionsRepository;

    @GetMapping("/{idProjects}/{idFile}/content")
    public ResponseEntity getContentById(
            @PathVariable String idProjects,
            @PathVariable String idFile) {
        try {
            // Verifica se o projeto existe
            var projectOptional = projectsRepository.findById(idProjects);

            if (projectOptional.isEmpty()) {
                return ResponseEntity.notFound().build();
            }

            var project = projectOptional.get();

            // Procura diretamente no projeto
            Files file = findFileInProject(project, idFile);

            if (file != null) {
                // Se encontrado diretamente no projeto, retorna o conteúdo do arquivo
                return ResponseEntity.ok()
                        .header("Content-Type", file.getFileType())
                        .body(file.getFileContent());
            }

            // Procura dentro das pastas do projeto e subpastas recursivamente
            Files fileInFolders = findFileInFolders(project.getFolders(), idFile);

            if (fileInFolders != null) {
                // Se encontrado dentro de uma pasta ou subpasta, retorna o conteúdo do arquivo
                return ResponseEntity.ok()
                        .header("Content-Type", fileInFolders.getFileType())
                        .body(fileInFolders.getFileContent());
            }

            // Se não encontrado em nenhum lugar, retorna Not Found
            return ResponseEntity.notFound().build();

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new InternalError("Internal server error.", e));
        }
    }

    private Files findFileInProject(Project project, String targetFileId) {
        return project.getFiles().stream()
                .filter(f -> f.getIdFile().equals(targetFileId))
                .findFirst()
                .orElse(null);
    }

    private Files findFileInFolders(List<Folder> folders, String targetFileId) {
        for (Folder folder : folders) {
            // Procura no folder atual
            Files fileInFolder = findFileInFolder(folder, targetFileId);
            if (fileInFolder != null) {
                return fileInFolder;
            }

            // Procura nas subpastas recursivamente
            Files fileInSubfolders = findFileInFolders(folder.getSubFolders(), targetFileId);
            if (fileInSubfolders != null) {
                return fileInSubfolders;
            }
        }
        return null;
    }

    private Files findFileInFolder(Folder folder, String targetFileId) {
        return folder.getFiles().stream()
                .filter(f -> f.getIdFile().equals(targetFileId))
                .findFirst()
                .orElse(null);
    }


    @GetMapping("/{idFile}/commits")
    public ResponseEntity getAllCommitByFile(@PathVariable String idFile) {
        try {
            var filesOptional = repository.findById(idFile);

            if (filesOptional.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ErrorNotFoundId("File not found", idFile));
            }

            var file = filesOptional.get();

            return ResponseEntity.ok(file.getCommits());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new InternalError("Erro ao obter commits do arquivo. Detalhes: " + e.getMessage()));
        }
    }

    @PostMapping("/{idProject}/uploadFile")
    @Transactional
    public ResponseEntity newFiles(
            @RequestParam("files") List<MultipartFile> files,
            @PathVariable String idProject) {
        try {
            if (idProject.isBlank()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new NotFoundException("Not found id.", idProject));
            }

            var projectOptional = projectsRepository.findById(idProject);

            if (projectOptional.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new NotFoundException("Project not found.", idProject));
            }

            var project = projectOptional.get();

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
                repository.save(uploadedFile);


                // Adiciona uma nova instância do arquivo à lista de arquivos do projeto
                savedFiles.add(uploadedFile);

            }

            // Adiciona a lista de arquivos à lista de arquivos do projeto
            project.getFiles().addAll(savedFiles);

            // Atualiza o projeto no repositório
            projectsRepository.save(project);

            return ResponseEntity.status(HttpStatus.CREATED).body(new Successfully("Files saved successfully!", idProject));

        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new InternalError("Falha ao ler o conteúdo dos arquivos. " + e.getMessage()));
        }
    }

    @GetMapping("/{idFile}/file")
    public ResponseEntity findFileById(@PathVariable String idFile) {
        try {
            var filesOptional = repository.findById(idFile);

            if (filesOptional.isPresent()) {
                var files = filesOptional.get();
                return ResponseEntity.ok(files);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            // Log the exception for debugging purposes
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


    @DeleteMapping("/{idProject}/delete/{idFile}")
    public ResponseEntity deleteFile(@PathVariable String idProject,
                                     @RequestParam(name = "idFolder", required = false) String idFolder,
                                     @PathVariable String idFile) {
        try {
            // Verificar se o ID do arquivo é válido
            if (idFile.isBlank()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(new NotFoundException("ID do arquivo não encontrado", idFile));
            }

            // Verificar se o arquivo existe
            var fileOptional = repository.findById(idFile);
            if (fileOptional.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(new NotFoundException("Arquivo não encontrado", idFile));
            }

            var file = fileOptional.get();

            // Verificar se o projeto existe
            var projectOptional = projectsRepository.findById(idProject);
            if (projectOptional.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(new NotFoundException("Projeto não encontrado", idProject));
            }
            var project = projectOptional.get();

            if (idFolder != null) {
                // Se um ID de pasta foi fornecido, tentar remover o arquivo dessa pasta
                var optionalFolder = folderRepository.findById(idFolder);

                if (optionalFolder.isPresent()) {
                    // Se a pasta existe
                    var folder = optionalFolder.get();

                    // Tentar remover o arquivo da lista de arquivos da pasta
                    var isRemoved = folder.getFiles().remove(file);

                    if (isRemoved) {
                        // Se o arquivo foi removido com sucesso da lista da pasta, salvar a pasta
                        folderRepository.save(folder);

                        // Salvar o projeto após a remoção do arquivo da lista da pasta
                        projectsRepository.save(project);

                        var commitsList = file.getCommits();

                        // Iterar sobre a lista de commits
                        for (Commits commit : commitsList) {
                            // Obter a versão associada a cada commit
                            Versions version = commit.getVersion();

                            // Remover a versão
                            versionsRepository.deleteById(version.getIdVersion());
                        }
                        //Exclui todos os commits relacionados com o file
                        commitsRepository.deleteAll(commitsList);

                        // Excluir o arquivo
                        repository.deleteById(idFile);

                        // Resposta indicando sucesso (204 No Content)
                        return ResponseEntity.noContent().build();
                    } else {
                        // Se o arquivo não foi encontrado na lista da pasta
                        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                .body("Falha ao remover o arquivo da lista da pasta.");
                    }
                } else {
                    // Se a pasta não foi encontrada
                    return ResponseEntity.status(HttpStatus.NOT_FOUND)
                            .body(new NotFoundException("Pasta não encontrada", idFolder));
                }
            }

            // Remover o arquivo da lista de arquivos do projeto
            var isRemoved = project.getFiles().removeIf(f -> f.getIdFile().equals(file.getIdFile()));
            if (isRemoved) {
                // Salvar o projeto após a remoção do arquivo
                projectsRepository.save(project);

                // Excluir o arquivo
                repository.deleteById(idFile);

                return ResponseEntity.noContent().build();
            } else {
                // Se o arquivo não foi encontrado na lista do projeto
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body("Falha ao remover o arquivo da lista do projeto.");
            }
        } catch (Exception e) {
            // Lidar com exceções inesperadas
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erro interno ao processar a solicitação.");
        }
    }

}

