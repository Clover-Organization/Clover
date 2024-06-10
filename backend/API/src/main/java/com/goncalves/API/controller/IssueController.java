package com.goncalves.API.controller;

import com.goncalves.API.DTO.BadRequestExceptionRecord;
import com.goncalves.API.DTO.DadosAtualizarIssue;
import com.goncalves.API.DTO.DadosCreateNewIssue;
import com.goncalves.API.entities.issues.Issue;
import com.goncalves.API.entities.issues.IssueRepository;
import com.goncalves.API.entities.request.Project;
import com.goncalves.API.entities.request.ProjectRepository;
import com.goncalves.API.entities.user.UserRepository;
import com.goncalves.API.entities.user.Users;
import com.goncalves.API.infra.exception.BadRequestException;
import com.goncalves.API.infra.exception.NotFoundException;
import com.goncalves.API.service.IssueService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Controller class for managing issues related to projects.
 */
@Slf4j
@Tag(name = "/issue")
@RestController
@RequestMapping("/issue")
public class IssueController {

    @Autowired
    private IssueRepository issueRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private IssueService issueService;

    @GetMapping("/{id}")
    public ResponseEntity getByProject(@PathVariable String id) {
        try {
            Issue issue = issueRepository.findById(id).orElseThrow(
                    () -> new NotFoundException("Issue not found", id)
            );
            return ResponseEntity.ok(issue);
        } catch (InternalError e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new InternalError("Internal server error"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/all/{id}")
    @Operation(summary = "Get all issues by project.", method = "GET")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Issues retrieved successfully."),
            @ApiResponse(responseCode = "404", description = "Project not found."),
            @ApiResponse(responseCode = "500", description = "Internal server error."),
            @ApiResponse(responseCode = "400", description = "Invalid data.")
    })
    public ResponseEntity getAllIssuesByProject(
            @PathVariable String id,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "creationDate") String sort,
            @RequestParam(required = false) Boolean open) {
        try {
            Project project = projectRepository.findById(id).orElseThrow(
                    () -> new NotFoundException("Project not found", id)
            );

            Pageable pageable = PageRequest.of(page, size, Sort.by(sort));

            // Obtenha os IDs dos issues no projeto
            List<String> issueIds = project.getIssues().stream()
                    .map(Issue::getId)
                    .collect(Collectors.toList());

            Page<Issue> issuesPage;

            if (open != null) {
                // Recupere os issues usando os IDs com paginação, ordenação e filtro de open
                issuesPage = issueRepository.findByIdInAndOpen(issueIds, open, pageable);
            } else {
                // Recupere os issues usando os IDs com paginação e ordenação sem filtro
                issuesPage = issueRepository.findByIdIn(issueIds, pageable);
            }

            // Adicione os usuários aos issues recuperados
            issuesPage.forEach(issue -> {
                project.getIssues().stream()
                        .filter(i -> i.getId().equals(issue.getId()))
                        .findFirst()
                        .ifPresent(i -> issue.setUsers(i.getUsers()));
            });

            return ResponseEntity.ok(issuesPage);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new BadRequestExceptionRecord(
                    "Error getting issues",
                    "Error getting issues. Check if the project ID is correct."
            ));
        }
    }

    /**
     * Creates a new issue for a project.
     *
     * @param dados The data for creating a new issue.
     * @param id    The ID of the project.
     * @return ResponseEntity containing the created issue or an error message.
     */
    @PostMapping("/create/project/{id}")
    @Transactional
    @Operation(summary = "Create a new Issue and update project", method = "POST")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Issue created successfully."),
            @ApiResponse(responseCode = "404", description = "Project not found."),
            @ApiResponse(responseCode = "500", description = "Internal server error."),
            @ApiResponse(responseCode = "400", description = "Invalid data.")
    })
    public ResponseEntity createIssue(@RequestBody DadosCreateNewIssue dados,
                                      @PathVariable String id) {
        try {
            // Obtendo o usuário autenticado
            var user = (Users) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

            // Buscando o projeto pelo ID
            var project = projectRepository.findById(id)
                    .orElseThrow(() -> new NotFoundException("Not found id.", id));

            // Validando os dados da nova issue
            var isValid = issueService.validarIssue(dados);
            if (!isValid) {
                return ResponseEntity.badRequest().body(new BadRequestExceptionRecord(
                        "Invalid data",
                        "Error creating issue. Check if the title and description are filled in correctly."
                ));
            }

            // Criando uma nova issue
            var issue = new Issue(
                    dados.title(),
                    dados.description(),
                    true,
                    LocalDateTime.now(),
                    null,
                    user
            );

            var savedIssue = issueRepository.save(issue);

            project.getIssues().add(savedIssue);
            projectRepository.save(project);

            return ResponseEntity.status(HttpStatus.CREATED).body(issue);
        } catch (NotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (BadRequestException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            // Capturando qualquer outra exceção não prevista
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal server error");
        }
    }


    /**
     * Closes an issue.
     *
     * @param id The ID of the issue to be closed.
     * @return ResponseEntity containing the closed issue or an error message.
     */
    @PutMapping("/close/{id}")
    public ResponseEntity closeIssue(@PathVariable String id) {
        try {
            var issue = issueRepository.findById(id).orElseThrow(
                    () -> new NotFoundException("Issue not found", id)
            );
            issue.setOpen(false);
            issue.setCloseDate(LocalDateTime.now());
            issueRepository.save(issue);
            return ResponseEntity.ok(issue);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity updateIssue(@PathVariable String id, @Valid @RequestBody DadosAtualizarIssue issue) {
        try {
            var user = (Users) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

            Issue issueToUpdate = issueRepository.findById(id).orElseThrow(
                    () -> new NotFoundException("Issue not found", id)
            );
            if (!issueToUpdate.getUsers().equals(user)) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(new BadRequestExceptionRecord("User not allowed to update this issue", "user"));
            }

            validateIssue(issue);
            issueToUpdate.setTitle(issue.title());
            issueToUpdate.setDescription(issue.description());
            issueRepository.save(issueToUpdate);

            return ResponseEntity.ok(issueToUpdate);
        } catch (NotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        } catch (BadRequestException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    private void validateIssue(DadosAtualizarIssue issue) {
        if (issue.title() == null || issue.title().isEmpty()) {
            throw new BadRequestException("Title is required", "title");
        }
        if (issue.description() == null || issue.description().isEmpty()) {
            throw new BadRequestException("Description is required", "description");
        }
    }

}
