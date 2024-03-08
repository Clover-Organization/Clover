package com.goncalves.API.controller;

import com.goncalves.API.DTO.DadosAtualizarSenha;
import com.goncalves.API.DTO.DadosTokenEmailValidation;
import com.goncalves.API.infra.security.*;
import com.goncalves.API.entities.user.UserRepository;
import com.goncalves.API.service.EmailService;
import com.goncalves.API.service.EmailTokenService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Slf4j
@Tag(name = "/update-password")
@RestController
@RequestMapping("/update-password")
public class EmailUpdateController {

    @Autowired
    private UserRepository repository;

    @Autowired
    private EmailService emailService;

    @Autowired
    private EmailTokenService tokenService;

    @PutMapping("/generate-token")
    @Operation(summary = "Generates a token and sends it to the user's email", method = "PUT")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Token generated successfully."),
            @ApiResponse(responseCode = "500", description = "Internal server error.")
    })
    public ResponseEntity gerarTokenRedefinicaoSenha(@RequestBody Map<String, String> requestBody) {
        try {
            // Lógica para gerar um token exclusivo e associá-lo ao usuário no banco de dados
            String destinatario = requestBody.get("email");
            String token = tokenService.gerarToken(destinatario);

            emailService.enviarEmailRedefinirSenha(destinatario, token);

            return ResponseEntity
                    .ok(new SuccessfullyEmail("Token generated successfully. Check your email.", destinatario));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new InternalError("Error generating the token.",e ));
        }
    }

    /**
     * Endpoint para gerar um token de redefinição de senha e enviá-lo por e-mail.
     *
     * @param dados Os dados necessários para encontrar o usuário e gerar o token.
     * @return ResponseEntity Uma resposta HTTP indicando o sucesso ou falha da operação.
     */
    @PutMapping("/generate-token/forgot-password")
    @Operation(summary = "Generates a token and sends it to the user's email to recover password.", method = "PUT")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Token generated successfully."),
            @ApiResponse(responseCode = "404", description = "User not found with this email."),
            @ApiResponse(responseCode = "500", description = "Internal server error.")
    })
    public ResponseEntity gerarTokenRedefinicaoSenhaEsquecida(@RequestBody DadosAtualizarSenha dados) {
        try {
            // Encontrar o usuário pelo nome de usuário
            var user = repository.findByEmail(dados.emailEdit());

            // Verificar se o usuário existe
            if (user == null) {
                // Se o usuário não for encontrado, retornar uma resposta de erro
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(new SuccessfullyEmail("User not found with this email!", dados.emailEdit()));
            }

            // Gerar um token exclusivo para o usuário
            String destinatario = user.getEmail();
            String token = tokenService.gerarToken(destinatario);

            // Enviar o token por e-mail
            emailService.enviarEmailRedefinirSenha(destinatario, token);

            // Retornar uma resposta de sucesso
            return ResponseEntity.ok(new SuccessfullyEmail("Token sent check your email", dados.emailEdit()));
        } catch (Exception e) {
            // Se ocorrer um erro inesperado, retornar uma resposta de erro interno do servidor
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new InternalError("Error generating the token.",e ));
        }
    }

    /**
     * Endpoint para confirmar a redefinição de senha com um token válido.
     *
     * @param dados Objeto contendo o token e a nova senha.
     * @return ResponseEntity Uma resposta HTTP indicando o sucesso ou falha da operação.
     */

    @PostMapping("/confirm-reset")
    @Operation(summary = "Confirm the token and add the new password.", method = "POST")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Password reset successfully."),
            @ApiResponse(responseCode = "404", description = "User not found."),
            @ApiResponse(responseCode = "400", description = "Invalid or expired token."),
            @ApiResponse(responseCode = "500", description = "Internal server error.")
    })
    public ResponseEntity confirmarRedefinicaoSenha(@RequestBody @Validated DadosTokenEmailValidation dados) {
        try {
            // Lógica para validar o token e redefinir a senha
            if (tokenService.validarToken(dados.token())) {
                String email = tokenService.getEmailPorToken(dados.token());
                // Lógica para alterar a senha no banco de dados
                var user = repository.findByEmail(email);

                if (user != null) {
                    user.validateField(dados.newPassword(), "password", "Password field must have at least 8 characters!");
                    String encryptedPassword = new BCryptPasswordEncoder().encode(dados.newPassword());
                    user.setPassword(encryptedPassword);
                    repository.save(user);
                    return ResponseEntity
                            .ok(new Successfully("Password reset successfully.", user.getUsername()));
                } else {
                    return ResponseEntity.status(HttpStatus.NOT_FOUND)
                            .body(new ErrorNotFoundUser("User not found.", user.getUsername()));
                }
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(new ErrorInvalidToken("Invalid or expired token.", dados.token()));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus
                    .INTERNAL_SERVER_ERROR).body(new InternalError("Error resetting password.", e));
        }
    }

}

