package com.goncalves.API.controller;

import com.goncalves.API.DTO.DadosTokenEmailValidation;
import com.goncalves.API.entities.user.UserRepository;
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

