package com.goncalves.API.controller;

import com.goncalves.API.DTO.BadRequestExceptionRecord;
import com.goncalves.API.DTO.DadosCreateNewIssue;
import com.goncalves.API.entities.issues.Issue;
import com.goncalves.API.entities.issues.IssueRepository;
import com.goncalves.API.entities.request.ProjectRepository;
import com.goncalves.API.entities.user.UserRepository;
import com.goncalves.API.entities.user.Users;
import com.goncalves.API.service.IssueService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

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

    @PostMapping("/create/project/{id}")
    @Transactional
    public ResponseEntity createIssue(@RequestBody DadosCreateNewIssue dados,
                                      @PathVariable String id) {
        try {
            System.out.println("Entrou! " + id);
            var user = (Users) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            var projectOptional = projectRepository.findById(id);

            if (projectOptional.isEmpty()) {
                return ResponseEntity.badRequest()
                        .body(new BadRequestExceptionRecord(
                                "Project not found",
                                "Error creating issue. Check if the ID is correct."
                        ));
            }
            var project = projectOptional.get();
            var isValid = issueService.validarIssue(dados);
            if (!isValid) {
                return ResponseEntity.badRequest()
                        .body(new BadRequestExceptionRecord(
                                "Invalid data",
                                "Error creating issue. Check if the title and description are filled in correctly."
                        ));
            }
            project.getIssues().add(new Issue(
                    dados.title(),
                    dados.description(),
                    true,
                    LocalDateTime.now(),
                    null,
                    user
            ));
            projectRepository.save(project);
            Issue issue = new Issue(
                    dados.title(),
                    dados.description(),
                    true,
                    LocalDateTime.now(),
                    null,
                    user
            );

            return ResponseEntity.ok(issue);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/close/{id}")
    public ResponseEntity closeIssue(@PathVariable String id) {
        try {
            var issue = issueRepository.findById(id);
            if (issue.isEmpty()) {
                return ResponseEntity.badRequest()
                        .body(new BadRequestExceptionRecord(
                                "Issue not found",
                                "Error closing issue. Check if the ID is correct."
                        ));
            }
            var issueToClose = issue.get();
            issueToClose.setOpen(false);
            issueToClose.setCloseDate(LocalDateTime.now());
            issueRepository.save(issueToClose);
            return ResponseEntity.ok(issueToClose);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

}
