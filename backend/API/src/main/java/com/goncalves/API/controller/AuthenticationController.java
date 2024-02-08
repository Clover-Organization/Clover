package com.goncalves.API.controller;

import com.goncalves.API.DTO.AutenticarDados;
import com.goncalves.API.entities.user.UserRepository;
import com.goncalves.API.entities.user.Users;
import com.goncalves.API.infra.security.*;
import io.micrometer.common.util.StringUtils;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;
import java.time.LocalDateTime;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {
    @Autowired
    private UserRepository repository;

    @Autowired
    private TokenService tokenService;

    @Autowired
    private AuthenticationManager manager;

    @Autowired
    private ErrorHandling errorHandling;

    @PostMapping("/register")
    public ResponseEntity register(@RequestPart("profileImage") MultipartFile profileImage,
                                   @RequestPart("userData") @Valid AutenticarDados dados,
                                   UriComponentsBuilder uriComponentsBuilder) {
        try {
            validateRegistrationData(dados);

            // Criar um novo usuário com a senha criptografada
            String encryptedPassword = new BCryptPasswordEncoder().encode(dados.password());

            // Converta o MultipartFile para byte[]
            byte[] profileImageBytes = profileImage.getBytes();

            Users newUser = new Users(dados.username(), dados.firstName(), dados.lastName(), dados.email(),
                    encryptedPassword, dados.birth(), LocalDateTime.now(), dados.role(), profileImageBytes);
            repository.save(newUser);

            // Construir a URI para o novo usuário
            var uri = uriComponentsBuilder.path("/users/{id_User}").buildAndExpand(newUser.getIdUsers()).toUri();

            // Retornar uma resposta 201 Created com a URI e o corpo do novo usuário
            return ResponseEntity.created(uri).body(newUser);
        } catch (RegistrationException e) {
            return ResponseEntity.badRequest().body(new StandardError(e.getField(), e.getMessage()));
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    private void validateRegistrationData(AutenticarDados dados) throws RegistrationException {
        if (repository.findByUsername(dados.username()) != null) {
            throw new RegistrationException("username", "Já existe um usuário com este nome!");
        }

        validateField(dados.firstName(), "firstName", "Campo firstName deve ter no mínimo 3 caracteres!");
        validateField(dados.lastName(), "lastName", "Campo lastName deve ter no mínimo 3 caracteres!");
        validateField(dados.username(), "username", "Campo usuário deve ter no mínimo 3 caracteres!");
        validateField(dados.email(), "email", "Campo email vazio!");
        validateField(dados.password(), "password", "Campo senha deve ter no mínimo 8 caracteres!");
        validateField(dados.birth(), "birth", "Campo birth não pode ser nulo");
    }

    private void validateField(String value, String fieldName, String errorMessage) throws RegistrationException {
        if (StringUtils.isBlank(value) || value.length() < 3) {
            throw new RegistrationException(fieldName, errorMessage);
        }
    }

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody @Valid AutenticarDados dados) {
        try {
            var authenticationToken = new UsernamePasswordAuthenticationToken(dados.username(), dados.password());

            var authentication = manager.authenticate(authenticationToken);
            //Tratamento de erro caso as credenciais estejam erradas

            var tokenJWT = tokenService.generateToken((Users) authentication.getPrincipal());

            return ResponseEntity.ok(new DadosTokenJWT(tokenJWT));
        }catch (AuthenticationException e){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ErrorValidation("Credenciais inválidas"));
        }
    }
}
