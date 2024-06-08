package com.goncalves.API.controller;

import com.goncalves.API.DTO.BadRequestExceptionRecord;
import com.goncalves.API.DTO.DadosCreateNewIssue;
import com.goncalves.API.entities.issues.Issue;
import com.goncalves.API.entities.issues.IssueRepository;
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
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

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


    @GetMapping("/all/{id}")
    public ResponseEntity<Page<Issue>> getAllIssuesByProject(
            @PathVariable String id,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        try {
            var project = projectRepository.findById(id).orElseThrow(
                    () -> new NotFoundException("Project not found", id)
            );

            Pageable pageable = PageRequest.of(page, size);
            Page<Issue> issuesPage = projectRepository.findAllByProject(project, pageable);

            return ResponseEntity.ok(issuesPage);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
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
            ;

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
    @PostMapping("/close/{id}")
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

}
