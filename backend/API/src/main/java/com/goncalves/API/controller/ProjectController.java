package com.goncalves.API.controller;

import com.goncalves.API.DTO.*;
import com.goncalves.API.entities.annotations.Annotations;
import com.goncalves.API.entities.annotations.AnnotationsRepository;
import com.goncalves.API.entities.commits.Commits;
import com.goncalves.API.entities.commits.CommitsRepository;
import com.goncalves.API.entities.files.Files;
import com.goncalves.API.entities.files.FilesRepository;
import com.goncalves.API.entities.filesVersions.VersionsRepository;
import com.goncalves.API.entities.folder.Folder;
import com.goncalves.API.entities.folder.FolderRepository;
import com.goncalves.API.entities.request.Project;
import com.goncalves.API.entities.request.ProjectRepository;
import com.goncalves.API.entities.user.UserRepository;
import com.goncalves.API.entities.user.Users;
import com.goncalves.API.infra.security.ErrorNotFoundId;
import com.goncalves.API.infra.security.ErrorResponse;
import com.goncalves.API.infra.security.NotFoundException;
import com.goncalves.API.infra.security.UnauthorizedException;
import jakarta.validation.ValidationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/projects")
public class  ProjectController {
    @Autowired
    private ProjectRepository repository;
    @Autowired
    private UserRepository repositoryUser;
    @Autowired
    private FilesRepository filesRepository;
    @Autowired
    private CommitsRepository commitsRepository;
    @Autowired
    private FolderRepository folderRepository;
    @Autowired
    private VersionsRepository versionsRepository;
    @Autowired
    private AnnotationsRepository annotationsRepository;

    @GetMapping
    public ResponseEntity<Page<DadosListagemProject>> getRequest(@PageableDefault(size = 10, sort = {"creationRequest"}) Pageable paginacao) {
        var page = repository.findAll(paginacao).map(DadosListagemProject::new);
        return ResponseEntity.ok(page);
    }

    @GetMapping("/{idProject}")
    public ResponseEntity selectProject(@PathVariable String idProject) {
        try {
            if (idProject == null) {
                throw new NotFoundException("Not found id.", idProject);
            }

            var optionalRequest = repository.findById(idProject).map(DadosListagemProject::new);

            return optionalRequest
                    .map(request -> ResponseEntity.ok(request))
                    .orElse(ResponseEntity.notFound().build());
        } catch (NotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ErrorNotFoundId(e.getMessage(), e.getId()));
        } catch (Exception e) {
            // Lidar com outras exceções não previstas
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ErrorResponse("Internal server error."));
        }
    }

    @GetMapping("user")
    public ResponseEntity getProjectByUser(@RequestParam(defaultValue = "0") int page,
                                           @RequestParam(defaultValue = "10") int size) {
        try {
            Users user = (Users) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

            if (user == null) {
                throw new UnauthorizedException("Unauthenticated user.");
            }

            List<Project> userRequests = repository.findByUser(user);

            int start = page * size;
            int end = Math.min((page + 1) * size, userRequests.size());

            if (start >= userRequests.size()) {
                // Se o índice de início estiver além do tamanho da lista, não há mais dados
                return ResponseEntity.ok(Collections.emptyList()); // ou outra resposta apropriada
            }

            List<DadosListagemProject> mappedRequests = userRequests.subList(start, end).stream()
                    .map(DadosListagemProject::new)
                    .collect(Collectors.toList());

            return ResponseEntity.ok(mappedRequests);
        } catch (UnauthorizedException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ErrorResponse(e.getMessage()));
        } catch (Exception e) {
            // Lidar com outras exceções não previstas
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ErrorResponse("Internal server error."));
        }
    }

    @GetMapping("/{idProject}/file")
    public ResponseEntity findFilesByProjects(@PathVariable String idProject) {
        var optionalProject = repository.findById(idProject);
        var project = optionalProject.get();
        return ResponseEntity.ok(project.getFiles());
    }

    @GetMapping("/{idProject}/folder")
    public ResponseEntity<List<FolderDTO>> findFoldersByProjects(@PathVariable String idProject) {
        var optionalProject = repository.findById(idProject);

        if (optionalProject.isPresent()) {
            var project = optionalProject.get();
            List<FolderDTO> folderDTOs = project.getFolders().stream()
                    .map(FolderDTO::new)
                    .collect(Collectors.toList());
            return ResponseEntity.ok(folderDTOs);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/upload")
    @Transactional
    public ResponseEntity newProject(@RequestBody @Validated DadosNewProject dados) {
        try {
            Users user = (Users) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

            if (user == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }

            Project newRequest = new Project(
                    dados.projectName(),
                    dados.creationDate(),
                    dados.projectProgress(),
                    dados.projectDescription(),
                    user,
                    new ArrayList<>(),
                    new ArrayList<>()
            );

            Project savedRequest = repository.save(newRequest);

            return ResponseEntity.status(HttpStatus.CREATED).body(savedRequest);
        } catch (ValidationException e) {
            // Lidar com exceções de validação (por exemplo, campos inválidos)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ErrorResponse(e.getMessage()));
        } catch (Exception e) {
            // Lidar com outras exceções não previstas
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ErrorResponse("Internal server error"));
        }
    }

    @DeleteMapping("/{idProject}")
    @Transactional
    public ResponseEntity deletarProjects(@PathVariable String idProject) {
        try {
            // Obter a entidade diretamente usando findById
            var optionalProject = repository.findById(idProject);

            if (optionalProject.isPresent()) {
                Project project = optionalProject.get();

                // Excluir arquivos relacionados ao projeto
                deleteFilesInProject(project.getFiles());

                // Excluir pastas e subpastas relacionadas ao projeto
                deleteFoldersAndSubfolders(project.getFolders());

                // Excluir commits relacionados ao projeto
                deleteCommitsInProject(project.getCommits());

                deleteAnnotationsInProject(project.getAnnotations());

                // Finalmente, excluir o próprio projeto
                repository.deleteById(idProject);

                return ResponseEntity.noContent().build();
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new NotFoundException("not found id", idProject));
            }
        } catch (Exception ex) {
            String mensagemErro = "Error deleting project: " + ex.getMessage();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(mensagemErro);
        }
    }

    private void deleteAnnotationsInProject(List<Annotations> annotations){
        for (Annotations annotation : annotations) {
            annotationsRepository.deleteById(annotation.getIdAnnotation());
        }
    }

    // Método para excluir arquivos em uma lista
    private void deleteFilesInProject(List<Files> files) {
        for (Files file : files) {
            filesRepository.deleteById(file.getIdFile());
        }
    }

    // Método para excluir pastas e subpastas recursivamente, incluindo arquivos
    private void deleteFoldersAndSubfolders(List<Folder> folders) {
        for (Folder folder : folders) {
            // Exclui subpastas recursivamente
            deleteFoldersAndSubfolders(folder.getSubFolders());

            // Exclui todos os arquivos dentro desta pasta
            deleteFilesInFolder(folder.getFiles());

            // Exclui a pasta
            folderRepository.deleteById(folder.getIdFolder());
        }
    }


    // Método para excluir commits em uma lista
    private void deleteCommitsInProject(List<Commits> commits) {
        for (Commits commit : commits) {
            commitsRepository.deleteById(commit.getIdCommit());
            var commitVersion = commit.getVersion();
            versionsRepository.deleteById(commitVersion.getIdVersion());
        }
    }

    private void deleteFilesInFolder(List<Files> files) {
        for (Files file : files) {
            filesRepository.deleteById(file.getIdFile());
        }
    }

    @PutMapping("/{idProject}")
    @Transactional
    public ResponseEntity updateStatus(@PathVariable String idProject,
                                       @RequestBody @Validated DadosAtualizarProject dados) {
        try {
            var request = repository.findById(idProject)
                    .orElseThrow(() -> new NotFoundException("Not found id.", idProject));

            // Atualizar os dados do usuário
            request.atualizarProject(dados);

            // Chamar repository.save() explicitamente para sincronizar as alterações com o banco de dados
            repository.save(request);

            return ResponseEntity.ok(new DadosNewProject(request));
        } catch (NotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ErrorNotFoundId(e.getMessage(), e.getId()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ErrorResponse("Internal server error"));
        }
    }

//    pega todos os commits do projeto
    @GetMapping("/{idProject}/commits/all")
    public ResponseEntity getAllCommitsByProject(@PathVariable String idProject) {
        try {
            // Procura o projeto pelo ID
            var projectOptional = repository.findById(idProject);
            // Verifica se o projeto existe
            if (projectOptional.isPresent()) {
                var project = projectOptional.get();

                // Retorna a lista de commits do projeto
                return ResponseEntity.ok(project.getCommits());
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (IllegalArgumentException e) {
            // IllegalArgumentException ocorre se o ID do projeto não for válido
            return ResponseEntity.badRequest().body("Invalid project ID.");
        } catch (Exception e) {
            // Outras exceções inesperadas
            return ResponseEntity.internalServerError().body("Error getting project commits: " + e.getMessage());
        }
    }

}
