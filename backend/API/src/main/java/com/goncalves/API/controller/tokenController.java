package com.goncalves.API.controller;

import com.goncalves.API.DTO.DadosRole;
import com.goncalves.API.entities.user.UserRepository;
import com.goncalves.API.entities.user.Users;
import com.goncalves.API.infra.security.ErrorResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@Tag(name = "/token")
@RestController
@RequestMapping(value = "/token", produces = {"application/json"})
public class tokenController {

    /**
     * Verifica o login do usuário atualmente autenticado.
     *
     * @return ResponseEntity contendo as informações da role do usuário.
     */
    @GetMapping
    @Operation(summary = "Checks if the user is logged in using the jwt token", method = "GET")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Search completed successfully."),
            @ApiResponse(responseCode = "500", description = "Internal server error.")
    })
    public ResponseEntity CheckingLogin() {
        try {
            // Obtém o usuário autenticado do contexto de segurança
            var user = (Users) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            return ResponseEntity.ok().body(new DadosRole(user.getRole().toString()));
        } catch (Exception e) {
            // Se ocorrer uma exceção, retorna uma resposta de erro interno do servidor
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ErrorResponse("Internal server error."));
        }
    }
}
