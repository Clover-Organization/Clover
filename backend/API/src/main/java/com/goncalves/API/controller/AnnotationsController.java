package com.goncalves.API.controller;

import com.goncalves.API.DTO.DadosAtualizarAnnotation;
import com.goncalves.API.DTO.DadosNewAnnotation;
import com.goncalves.API.entities.annotations.Annotations;
import com.goncalves.API.entities.annotations.AnnotationsRepository;
import com.goncalves.API.entities.request.ProjectRepository;
import com.goncalves.API.infra.security.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.nio.file.Path;
import java.time.LocalDateTime;

@RestController
@RequestMapping("/projects/annotations")
public class AnnotationsController {
    @Autowired
    private AnnotationsRepository repository;
    @Autowired
    private ProjectRepository projectRepository;

    @GetMapping("/get/content/{idAnnotation}")
    public ResponseEntity getContentByAnnotation(@PathVariable String idAnnotation) {
        var optionalAnnotations = repository.findById(idAnnotation);

        return ResponseEntity.ok(optionalAnnotations);
    }

    @PostMapping("/{idProject}/upload")
    @Transactional
    public ResponseEntity saveAnnotation(@PathVariable String idProject,
                                         @RequestBody @Validated DadosNewAnnotation dados) {
        var projectOptional = projectRepository.findById(idProject);

        if (projectOptional.isPresent()) {
            var project = projectOptional.get();

            Annotations newAnnotations = new Annotations(
                    dados.title(),
                    dados.annotationContent(),
                    LocalDateTime.now(),
                    LocalDateTime.now()
            );
            project.getAnnotations().add(newAnnotations);

            projectRepository.save(project);

            return ResponseEntity.status(HttpStatus.CREATED).body(repository.save(newAnnotations));
        } else {
            // Tratar o caso em que o projeto não é encontrado
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Project not found.");
        }
    }

    @PutMapping("/{idProject}/annotation/{idAnnotation}/update")
    public ResponseEntity updateAnnotation(@PathVariable String idProject,
                                           @PathVariable String idAnnotation,
                                           @RequestBody @Validated DadosAtualizarAnnotation dados) {
        try {
            // Buscar o projeto pelo ID
            var optionalProject = projectRepository.findById(idProject)
                    .orElseThrow(() -> new NotFoundException("Project not found", idProject));


            // Remover a anotação da lista do projeto
            boolean removed = optionalProject.getAnnotations().removeIf(a -> a.getIdAnnotation().equals(idAnnotation));
            if (!removed) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Note not found in project");
            }


            // Buscar a anotação pelo ID
            var optionalAnnotations = repository.findById(idAnnotation)
                    .orElseThrow(() -> new NotFoundException("Note not found", idAnnotation));

            // Atualizar a anotação com os novos dados
            optionalAnnotations.atualizarAnnotation(dados);

            // Certificar-se de que a anotação não está duplicada antes de adicioná-la
            if (!optionalProject.getAnnotations().contains(optionalAnnotations)) {
                optionalProject.getAnnotations().add(optionalAnnotations);
            }

            repository.save(optionalAnnotations);

            // Salvar as alterações no projeto
            projectRepository.save(optionalProject);

            return ResponseEntity.ok().build();
        } catch (NotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error processing the request");
        }
    }

    @DeleteMapping("/{idProject}/delete/{idAnnotation}")
    @Transactional
    public ResponseEntity deleteAnnotation(@PathVariable String idProject,
                                           @PathVariable String idAnnotation) {
        try {
            if (idAnnotation.isBlank() || idProject.isBlank()) {
                return ResponseEntity.badRequest().body("ID cannot be blank.");
            }

            // Verifica se o projeto existe
            var projectOptional = projectRepository.findById(idProject);

            if (!projectOptional.isPresent()) {
                return ResponseEntity.notFound().build();
            }

            var project = projectOptional.get();
            // Verifica se a anotação existe
            var annotationOptional = repository.findById(idAnnotation);

            if (!annotationOptional.isPresent()) {
                return ResponseEntity.notFound().build();
            }

            var annotation = annotationOptional.get();

            var isRemoved = project.getAnnotations().remove(annotation);
            if(isRemoved){
                // Exclui a anotação do banco de dados
                repository.deleteById(idAnnotation);
                projectRepository.save(project);
                return ResponseEntity.noContent().build();
            }else{
                return ResponseEntity.badRequest().build();
            }

        } catch (Exception e) {
            // Trata exceções internas com uma mensagem de erro genérica
            return ResponseEntity.internalServerError().body("An error occurred while deleting the note.");
        }
    }

}
