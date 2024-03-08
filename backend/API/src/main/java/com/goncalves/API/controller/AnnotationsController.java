package com.goncalves.API.controller;

import com.goncalves.API.DTO.DadosAtualizarAnnotation;
import com.goncalves.API.DTO.DadosNewAnnotation;
import com.goncalves.API.entities.annotations.Annotations;
import com.goncalves.API.entities.annotations.AnnotationsRepository;
import com.goncalves.API.entities.request.ProjectRepository;
import com.goncalves.API.infra.security.NotFoundException;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@Slf4j
@Tag(name = "/projects/annotations")
@RestController
@RequestMapping(value = "/projects/annotations", consumes = {"application/json"})
public class AnnotationsController {
    @Autowired
    private AnnotationsRepository repository;
    @Autowired
    private ProjectRepository projectRepository;

    /**
     * Obtém o conteúdo da anotação com base no id da anotação.
     *
     * @param idAnnotation O ID da anotação a ser recuperada
     * @return ResponseEntity contendo o conteúdo da anotação se encontrada, ou uma resposta de erro interno caso contrário
     */
    @GetMapping("/get/content/{idAnnotation}")
    @Operation(summary = "Get the annotation based on idAnnotation", method = "GET")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Search completed successfully."),
            @ApiResponse(responseCode = "500", description = "Internal server error.")
    })
    public ResponseEntity getContentByAnnotation(@PathVariable String idAnnotation) {
        try {
            // Busca a anotação pelo ID
            var optionalAnnotations = repository.findById(idAnnotation);
            return ResponseEntity.ok(optionalAnnotations);
        } catch (Exception e) {
            // Em caso de erro, retorna uma resposta de erro interno com detalhes
            return ResponseEntity.internalServerError()
                    .body(new InternalError("Internal Server Error.", e));
        }
    }

    /**
     * Cria uma nova anotação com base no ID do projeto.
     *
     * @param idProject O ID do projeto ao qual a anotação será associada
     * @param dados     Os dados da nova anotação a serem salvos
     * @return ResponseEntity contendo a anotação salva se o projeto for encontrado, ou uma resposta indicando que o projeto não foi encontrado
     */
    @PostMapping("/{idProject}/upload")
    @Transactional
    @Operation(summary = "Create a new annotation based on idProject", method = "POST")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Note saved successfully."),
            @ApiResponse(responseCode = "404", description = "Project not found.")
    })
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

            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(repository.save(newAnnotations));
        } else {
            // Tratar o caso em que o projeto não é encontrado
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new NotFoundException("Project not found.", "NULL"));
        }
    }

    /**
     * Atualiza a anotação com base nos IDs do projeto e da anotação.
     *
     * @param idProject    O ID do projeto ao qual a anotação está associada
     * @param idAnnotation O ID da anotação a ser atualizada
     * @param dados        Os novos dados para atualização da anotação
     * @return ResponseEntity indicando o resultado da atualização da anotação
     */
    @PutMapping("/{idProject}/annotation/{idAnnotation}/update")
    @Operation(summary = "Updates the annotation based on idProject and idAnnotation", method = "PUT")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Note saved successfully."),
            @ApiResponse(responseCode = "404", description = "Project not found."),
            @ApiResponse(responseCode = "500", description = "Internal server error.")
    })
    public ResponseEntity updateAnnotation(@PathVariable String idProject,
                                           @PathVariable String idAnnotation,
                                           @RequestBody @Validated DadosAtualizarAnnotation dados) {
        try {
            // Buscar o projeto pelo ID
            var optionalProject = projectRepository.findById(idProject)
                    .orElseThrow(() -> new NotFoundException("Project not found", idProject));


            // Remover a anotação da lista do projeto
            boolean removed = optionalProject.getAnnotations()
                    .removeIf(a -> a.getIdAnnotation().equals(idAnnotation));
            if (!removed) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("Note not found in project");
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
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error processing the request");
        }
    }

    /**
     * Exclui a anotação com base nos IDs do projeto e da anotação.
     *
     * @param idProject    O ID do projeto ao qual a anotação está associada
     * @param idAnnotation O ID da anotação a ser excluída
     * @return ResponseEntity indicando o resultado da exclusão da anotação
     */
    @DeleteMapping("/{idProject}/delete/{idAnnotation}")
    @Transactional
    @Operation(summary = "Delete the annotation based on idProject and idAnnotation", method = "DELETE")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Note deleted successfully."),
            @ApiResponse(responseCode = "404", description = "Project not found."),
            @ApiResponse(responseCode = "400", description = "ID cannot be blank"),
            @ApiResponse(responseCode = "500", description = "Internal server error.")
    })
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
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new NotFoundException("Project not found", "NULL"));
            }

            var annotation = annotationOptional.get();

            var isRemoved = project.getAnnotations().remove(annotation);
            if (isRemoved) {
                // Exclui a anotação do banco de dados
                repository.deleteById(idAnnotation);
                projectRepository.save(project);
                return ResponseEntity.noContent().build();
            } else {
                return ResponseEntity.badRequest().build();
            }

        } catch (Exception e) {
            // Trata exceções internas com uma mensagem de erro genérica
            return ResponseEntity.internalServerError()
                    .body(new InternalError("An error occurred while deleting the note.", e));
        }
    }

}
