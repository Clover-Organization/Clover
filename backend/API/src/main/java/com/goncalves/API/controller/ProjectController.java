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
import com.goncalves.API.infra.security.*;
import com.goncalves.API.service.EmailService;
import com.goncalves.API.service.EmailTokenService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.ValidationException;
import lombok.extern.slf4j.Slf4j;
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

@Slf4j
@Tag(name = "/projects")
@RestController
@RequestMapping("/projects")
public class ProjectController {
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
    @Autowired
    private EmailService emailService;
    @Autowired
    private EmailTokenService emailTokenService;

    /**
     * Retorna uma lista paginada de projetos baseados na data de criação da solicitação.
     *
     * @param paginacao O objeto Pageable para controle da paginação.
     * @return ResponseEntity contendo a lista paginada de projetos.
     */
    @GetMapping
    @Operation(summary = "Project pagination to get all projects based on creationAccount data.", method = "GET")
    @ApiResponse(responseCode = "200", description = "Search completed successfully.")
    public ResponseEntity<Page<DadosListagemProject>> getRequest(@PageableDefault(size = 10, sort = {"creationRequest"}) Pageable paginacao) {
        // Busca os projetos no repositório, com paginação, e mapeia para o tipo DadosListagemProject
        var page = repository.findAll(paginacao).map(DadosListagemProject::new);

        // Retorna uma resposta OK com a lista paginada de projetos
        return ResponseEntity.ok(page);
    }

    /**
     * Retorna um projeto com base no ID fornecido.
     *
     * @param idProject O ID do projeto a ser buscado.
     * @return ResponseEntity contendo o projeto encontrado ou um status de not found se não encontrado.
     */
    @GetMapping("/{idProject}")
    @Operation(summary = "Get all information for a specific project based on project id.", method = "GET")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Search completed successfully."),
            @ApiResponse(responseCode = "404", description = "Not found id or project."),
            @ApiResponse(responseCode = "500", description = "Internal server error.")
    })
    public ResponseEntity selectProject(@PathVariable String idProject) {
        try {
            Users user = (Users) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

            var projectOptional = repository.findById(idProject);
            var project = projectOptional.get();

            // Verifica se o usuário específico está na lista de usuários compartilhados
            boolean usuarioEncontrado = project.getShareUsers().stream()
                    .anyMatch(u -> u.equals(user));

            //Verifica se esse usuario tem relação com o projeto
            if (!project.getUser().getIdUsers().equals(user.getIdUsers()) && !usuarioEncontrado) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(new UnauthorizedExceptionError("Error", "This user does not have access to this project."));
            }

            if (idProject == null) {
                // Se o ID do projeto for nulo, lança uma exceção de not found
                throw new NotFoundException("ID is null.", idProject);
            }

            // Busca o projeto no repositório pelo ID
            var optionalRequest = repository.findById(idProject)
                    .map(DadosListagemProject::new);

            // Se o projeto for encontrado, mapeia para o tipo DadosListagemProject
            return optionalRequest
                    .map(request -> ResponseEntity.ok(request))
                    // Se o projeto não for encontrado, retorna um status de not found
                    .orElse(ResponseEntity.notFound().build());
        } catch (NotFoundException e) {
            // Retorna uma resposta de not found com a mensagem de erro personalizada
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ErrorNotFoundId(e.getMessage(), e.getId()));
        } catch (Exception e) {
            // Em caso de erro não previsto, retorna uma resposta de erro interno do servidor
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse("Internal server error."));
        }
    }

    /**
     * Retorna todos os projetos relacionados a um usuário com lógica de paginação.
     *
     * @param page O número da página a ser retornada.
     * @param size O tamanho da página.
     * @return ResponseEntity contendo os projetos relacionados ao usuário.
     */
    @GetMapping("user")
    @Operation(summary = "Gets all projects related to a given user with pagination logic.", method = "GET")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Search completed successfully."),
            @ApiResponse(responseCode = "401", description = "User not authenticated."),
            @ApiResponse(responseCode = "500", description = "Internal server error.")
    })
    public ResponseEntity getProjectByUser(@RequestParam(defaultValue = "0") int page,
                                           @RequestParam(defaultValue = "10") int size) {
        try {
            // Obtém o usuário autenticado
            Users user = (Users) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

            // Verifica se o usuário está autenticado
            if (user == null) {
                throw new UnauthorizedException("Unauthenticated user.");
            }

            // Busca os projetos relacionados ao usuário no repositório
            List<Project> userRequests = repository.findByUser(user);

            List<Project> shareUser = repository.findByShareUsers(user);

            // Calcula o intervalo dos projetos a serem retornados com base na paginação
            int start = page * size;
            int end = Math.min((page + 1) * size, userRequests.size());

            // Se o índice de início estiver além do tamanho da lista, não há mais dados
            if (start >= userRequests.size()) {
                // Se o índice de início estiver além do tamanho da lista, não há mais dados
                return ResponseEntity.ok(Collections.emptyList()); // ou outra resposta apropriada
            }

            // Mapeia os projetos para o tipo DadosListagemProject
            List<DadosListagemProject> mappedRequests = userRequests.subList(start, end).stream()
                    .map(DadosListagemProject::new)
                    .collect(Collectors.toList());

            // Retorna os projetos mapeados como uma resposta OK
            return ResponseEntity.ok(mappedRequests);
        } catch (UnauthorizedException e) {
            // Retorna uma resposta de não autorizado com a mensagem de erro personalizada
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ErrorResponse(e.getMessage()));
        } catch (Exception e) {
            // Em caso de erro não previsto, retorna uma resposta de erro interno do servidor
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ErrorResponse("Internal server error."));
        }
    }

    /**
     * Retorna os arquivos relacionados a um projeto com o ID fornecido.
     *
     * @param idProject O ID do projeto para buscar arquivos.
     * @return ResponseEntity contendo os arquivos relacionados ao projeto.
     */
    @GetMapping("/{idProject}/file")
    @Operation(summary = "Finds all files within a project.", method = "GET")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Search completed successfully."),
            @ApiResponse(responseCode = "500", description = "Internal server error."),
    })
    public ResponseEntity findFilesByProjects(@PathVariable String idProject) {
        try {
            // Busca o projeto no repositório pelo ID
            var optionalProject = repository.findById(idProject);
            // Obtém o projeto da opção
            var project = optionalProject.get();
            // Retorna uma resposta OK contendo os arquivos relacionados ao projeto
            return ResponseEntity.ok(project.getFiles());
        } catch (Exception e) {
            // Em caso de erro não previsto, retorna uma resposta de erro interno do servidor
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ErrorResponse("Internal server error."));
        }
    }

    /**
     * Retorna as pastas relacionadas a um projeto com base no ID fornecido.
     *
     * @param idProject O ID do projeto para buscar pastas.
     * @return ResponseEntity contendo as pastas relacionadas ao projeto.
     */
    @GetMapping("/{idProject}/folder")
    @Operation(summary = "Finds all folders within a project.", method = "GET")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Search completed successfully."),
            @ApiResponse(responseCode = "404", description = "Project not found."),
    })
    public ResponseEntity<List<FolderDTO>> findFoldersByProjects(@PathVariable String idProject) {
        // Busca o projeto no repositório pelo ID
        var optionalProject = repository.findById(idProject);

        // Verifica se o projeto foi encontrado
        if (optionalProject.isPresent()) {
            // Obtém o projeto da opção
            var project = optionalProject.get();

            // Mapeia as pastas do projeto para o DTO correspondente
            List<FolderDTO> folderDTOs = project.getFolders().stream()
                    .map(FolderDTO::new)
                    .collect(Collectors.toList());
            // Retorna uma resposta OK contendo as pastas relacionadas ao projeto
            return ResponseEntity.ok(folderDTOs);
        } else {
            // Retorna uma resposta com status NOT FOUND caso o projeto não seja encontrado
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * Cria um novo projeto com base nos dados fornecidos.
     *
     * @param dados Os dados do novo projeto.
     * @return ResponseEntity contendo o novo projeto criado.
     */
    @PostMapping("/upload")
    @Transactional
    @Operation(summary = "Create a new project.", method = "POST")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Project created successfully"),
            @ApiResponse(responseCode = "401", description = "User not authenticated."),
            @ApiResponse(responseCode = "400", description = "Validation Exception."),
            @ApiResponse(responseCode = "500", description = "Internal server error."),
    })
    public ResponseEntity newProject(@RequestBody @Validated DadosNewProject dados) {
        try {
            // Obtém o usuário autenticado
            var user = (Users) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

            // Verifica se o usuário está autenticado
            if (user == null) {
                // Retorna uma resposta com status UNAUTHORIZED caso o usuário não esteja autenticado
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }

            // Cria um novo projeto com base nos dados fornecidos
            Project newRequest = new Project(
                    dados.projectName(),
                    dados.creationDate(),
                    dados.projectProgress(),
                    dados.projectDescription(),
                    user,
                    new ArrayList<>(),
                    new ArrayList<>()
            );

            // Salva o novo projeto no repositório
            Project savedRequest = repository.save(newRequest);

            // Retorna uma resposta com status CREATED contendo o novo projeto criado
            return ResponseEntity.status(HttpStatus.CREATED).body(savedRequest);
        } catch (ValidationException e) {
            // Retorna uma resposta com status BAD REQUEST caso ocorra uma exceção de validação
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ErrorResponse(e.getMessage()));
        } catch (Exception e) {
            // Retorna uma resposta com status INTERNAL SERVER ERROR caso ocorra uma exceção não prevista
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ErrorResponse("Internal server error"));
        }
    }

    /**
     * Exclui o projeto com o ID fornecido, juntamente com todos os seus arquivos, pastas e commits associados.
     *
     * @param idProject O ID do projeto a ser excluído.
     * @return ResponseEntity representando o resultado da exclusão.
     */
    @DeleteMapping("/{idProject}")
    @Transactional
    @Operation(summary = "Deletes the project from the ID", method = "DELETE")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Project deleted successfully"),
            @ApiResponse(responseCode = "404", description = "Not found ID"),
            @ApiResponse(responseCode = "500", description = "Internal server error."),
    })
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

    //Método para excluir anotações
    private void deleteAnnotationsInProject(List<Annotations> annotations) {
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

    /**
     * Atualiza as informações do projeto com o ID fornecido.
     *
     * @param idProject O ID do projeto a ser atualizado.
     * @param dados     Os novos dados do projeto.
     * @return ResponseEntity representando o resultado da atualização.
     */
    @PutMapping("/{idProject}")
    @Transactional
    @Operation(summary = "Update project information from the ID.", method = "PUT")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Project deleted successfully."),
            @ApiResponse(responseCode = "404", description = "Not found ID."),
            @ApiResponse(responseCode = "500", description = "Internal server error."),
    })
    public ResponseEntity updateProject(@PathVariable String idProject,
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

    /**
     * Obtém todos os commits de um projeto com o ID fornecido.
     *
     * @param idProject O ID do projeto.
     * @return ResponseEntity contendo a lista de commits ou uma mensagem de erro.
     */
    @GetMapping("/{idProject}/commits/all")
    @Operation(summary = "Get all project commits from ID", method = "GET")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Project deleted successfully."),
            @ApiResponse(responseCode = "404", description = "Not found ID."),
            @ApiResponse(responseCode = "400", description = "Project ID invalid."),
            @ApiResponse(responseCode = "500", description = "Internal server error."),
    })
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
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new NotFoundException("Project ID not found", idProject));
            }
        } catch (IllegalArgumentException e) {
            // IllegalArgumentException ocorre se o ID do projeto não for válido
            return ResponseEntity.badRequest().body("Invalid project ID.");
        } catch (Exception e) {
            // Outras exceções inesperadas
            return ResponseEntity.internalServerError().body("Error getting project commits: " + e.getMessage());
        }
    }

    @GetMapping("/ShareUsers")
    @Operation(summary = "Get all shared projects", method = "GET")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Search was a success."),
            @ApiResponse(responseCode = "401", description = "Unauthorized user."),
            @ApiResponse(responseCode = "500", description = "Internal server error."),
    })
    public ResponseEntity getProjectByShareUsers(@RequestParam(defaultValue = "0") int page,
                                                 @RequestParam(defaultValue = "10") int size) {
        try {
            // Obtém o usuário autenticado
            Users user = (Users) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

            // Verifica se o usuário está autenticado
            if (user == null) {
                throw new UnauthorizedException("Unauthenticated user.");
            }

            List<Project> userRequests = repository.findByShareUsers(user);

            // Calcula o intervalo dos projetos a serem retornados com base na paginação
            int start = page * size;
            int end = Math.min((page + 1) * size, userRequests.size());

            // Se o índice de início estiver além do tamanho da lista, não há mais dados
            if (start >= userRequests.size()) {
                // Se o índice de início estiver além do tamanho da lista, não há mais dados
                return ResponseEntity.ok(Collections.emptyList()); // ou outra resposta apropriada
            }

            // Mapeia os projetos para o tipo DadosListagemProject
            List<DadosListagemProject> mappedRequests = userRequests.subList(start, end).stream()
                    .map(DadosListagemProject::new)
                    .collect(Collectors.toList());

            // Retorna os projetos mapeados como uma resposta OK
            return ResponseEntity.ok(mappedRequests);
        } catch (UnauthorizedException e) {
            // Retorna uma resposta de não autorizado com a mensagem de erro personalizada
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ErrorResponse(e.getMessage()));
        } catch (InternalError e) {
            // Em caso de erro não previsto, retorna uma resposta de erro interno do servidor
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse("Internal server error."));
        }
    }

    @PostMapping("/share")
    @Operation(summary = "Share the project", method = "POST")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully shared."),
            @ApiResponse(responseCode = "404", description = "User not found."),
            @ApiResponse(responseCode = "500", description = "Internal server error."),
    })
    public ResponseEntity shareProject(@RequestBody DadosUsernameOrEmail dados) {
        try {
            Users user;

            var isEmail = dados.usernameOrEmail().contains("@");

            if (isEmail) {
                user = repositoryUser.findByEmail(dados.usernameOrEmail());
            } else {
                user = repositoryUser.findByUsernameForgot(dados.usernameOrEmail());
            }
            if (user == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(new NotFoundException("User not found", dados.usernameOrEmail()));
            }

            var project = repository.findById(dados.idProject())
                    .orElseThrow(() -> new NotFoundException("Not found id.", dados.idProject()));

            var token = emailTokenService.gerarToken(user.getEmail());

            String destinatario = (user.getEmail());
            emailService.shareProjectEmail(destinatario, token, project.getIdProject());

            return ResponseEntity.ok().body(new SuccessfullyEmail("Email successfully sent", dados.usernameOrEmail()));
        } catch (InternalError e) {
            return ResponseEntity.internalServerError()
                    .body(new InternalError("Internal server error", e));
        }
    }

    @PostMapping("/confirm-token/share/{token}/{idProject}")
    @Operation(summary = "Confirms that the token is valid.", method = "POST")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Authorized Token."),
            @ApiResponse(responseCode = "404", description = "Not found ID."),
            @ApiResponse(responseCode = "500", description = "Internal server error."),
    })
    public ResponseEntity confirmTokenShare(@PathVariable String token,
                                            @PathVariable String idProject) {
        try {
            // Obtém o usuário autenticado
            Users user = (Users) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

            if (emailTokenService.validarToken(token)) {
                var project = repository.findById(idProject)
                        .orElseThrow(() -> new NotFoundException("Not found id.", idProject));

                var isSavedProject = project.getShareUsers().add(user);
                if (isSavedProject) {
                    repository.save(project);
                } else {
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                            .body(new BadRequestExceptionRecord("Project", "Unable to save the project!"));
                }

                return ResponseEntity.ok()
                        .body(new Successfully("successfully", "Token successfully verified!"));
            } else {

                return ResponseEntity.badRequest()
                        .body(new BadRequestExceptionRecord(token, "Invalid or expired token."));
            }
        } catch (InternalError e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError()
                    .body(new InternalError("Internal server error.", e));
        }
    }

}
