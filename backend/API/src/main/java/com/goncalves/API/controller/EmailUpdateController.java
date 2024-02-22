package com.goncalves.API.controller;

import com.goncalves.API.DTO.DadosAtualizarSenha;
import com.goncalves.API.DTO.DadosTokenEmailValidation;
import com.goncalves.API.entities.user.UserRepository;
import com.goncalves.API.infra.security.NotFoundException;
import com.goncalves.API.service.EmailService;
import com.goncalves.API.service.EmailTokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

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
    public ResponseEntity<String> gerarTokenRedefinicaoSenha(@RequestBody Map<String, String> requestBody) {
        try {
            // Lógica para gerar um token exclusivo e associá-lo ao usuário no banco de dados
            String destinatario = requestBody.get("email");
            String token = tokenService.gerarToken(destinatario);

            emailService.enviarEmailRedefinirSenha(destinatario, token);

            return ResponseEntity.ok("Token gerado com sucesso. Verifique seu e-mail.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao gerar o token.");
        }
    }

    /**
     * Endpoint para gerar um token de redefinição de senha e enviá-lo por e-mail.
     *
     * @param dados Os dados necessários para encontrar o usuário e gerar o token.
     * @return ResponseEntity Uma resposta HTTP indicando o sucesso ou falha da operação.
     */
    @PutMapping("/generate-token/forgot-password")
    public ResponseEntity gerarTokenRedefinicaoSenhaEsquecida(@RequestBody DadosAtualizarSenha dados) {
        try {
            // Encontrar o usuário pelo nome de usuário
            var user = repository.findByUsernameForgot(dados.usernameEdit());

            // Verificar se o usuário existe
            if (user == null) {
                // Se o usuário não for encontrado, retornar uma resposta de erro
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(new NotFoundException("Usuário não encontrado!", dados.usernameEdit()));
            }

            // Gerar um token exclusivo para o usuário
            String destinatario = user.getEmail();
            String token = tokenService.gerarToken(destinatario);

            // Enviar o token por e-mail
            emailService.enviarEmailRedefinirSenha(destinatario, token);

            // Retornar uma resposta de sucesso
            return ResponseEntity.ok("Token gerado com sucesso. Verifique seu e-mail.");
        } catch (Exception e) {
            // Se ocorrer um erro inesperado, retornar uma resposta de erro interno do servidor
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao gerar o token.");
        }
    }

    /**
     * Endpoint para confirmar a redefinição de senha com um token válido.
     *
     * @param dados Objeto contendo o token e a nova senha.
     * @return ResponseEntity Uma resposta HTTP indicando o sucesso ou falha da operação.
     */

    @PostMapping("/confirm-reset")
    public ResponseEntity<String> confirmarRedefinicaoSenha(@RequestBody @Validated DadosTokenEmailValidation dados) {
        try {
            // Lógica para validar o token e redefinir a senha
            if (tokenService.validarToken(dados.token())) {
                String email = tokenService.getEmailPorToken(dados.token());
                // Lógica para alterar a senha no banco de dados
                var user = repository.findByEmail(email);

                if (user != null) {
                    user.validateField(dados.newPassword(), "password", "Campo senha deve ter no mínimo 8 caracteres!");
                    String encryptedPassword = new BCryptPasswordEncoder().encode(dados.newPassword());
                    user.setPassword(encryptedPassword);
                    repository.save(user);
                    return ResponseEntity.ok("Senha redefinida com sucesso.");
                } else {
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuário não encontrado.");
                }
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Token inválido ou expirado.");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao redefinir a senha.");
        }
    }

}

