package com.goncalves.API.controller;

import com.goncalves.API.DTO.AutenticarDados;
import com.goncalves.API.entities.user.UserRepository;
import com.goncalves.API.entities.user.Users;
import com.goncalves.API.infra.security.*;
import io.micrometer.common.util.StringUtils;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;
import java.time.LocalDateTime;

@Slf4j
@Tag(name = "/auth")
@RestController
@RequestMapping(value = "/auth", consumes = {"application/json"})
public class AuthenticationController {
    @Autowired
    private UserRepository repository;

    @Autowired
    private TokenService tokenService;

    @Autowired
    private AuthenticationManager manager;

    @Autowired
    private ErrorHandling errorHandling;

    /**
     * Registra um novo usuário com criptografia de senha.
     *
     * @param profileImage         Imagem de perfil do usuário
     * @param dados                Dados de autenticação do usuário a serem validados
     * @param uriComponentsBuilder Builder para criar a URI do novo usuário
     * @return ResponseEntity com o novo usuário e status 201 se registrado com sucesso, ou status 400 se houver um erro de requisição
     */
    @PostMapping(value = "/register", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @Operation(summary = "Register a new user with password encryption", method = "POST")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "User save successfully."),
            @ApiResponse(responseCode = "400", description = "Password field must have at least 9 characters.")
    })
    public ResponseEntity register(@RequestPart("profileImage") MultipartFile profileImage,
                                   @RequestPart("userData") @Valid AutenticarDados dados,
                                   UriComponentsBuilder uriComponentsBuilder) {
        try {
            // Validar os dados de registro do usuário
            validateRegistrationData(dados);

            if (dados.password().length() < 9) {
                // Se a senha tiver menos de 9 caracteres, retornar uma resposta de BadRequest
                return ResponseEntity.badRequest()
                        .body("Password field must have at least 9 characters.");
            }

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

    /**
     * Realiza o login do usuário com autenticação de credenciais.
     *
     * @param dados Dados de autenticação do usuário a serem validados
     * @return ResponseEntity com um token JWT se o login for bem-sucedido, ou uma mensagem de erro se as credenciais forem inválidas ou o usuário não existir
     */
    @PostMapping("/login")
    @Operation(summary = "User login to the system that returns a jwt token", method = "POST")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Login successfully."),
            @ApiResponse(responseCode = "401", description = "Invalid credentials.")
    })
    public ResponseEntity login(@RequestBody @Valid AutenticarDados dados) {
        try {

            var user = repository.findByEmail(dados.username());

            UserDetails username;

            if (user != null) {
                username = repository.findByUsername(user.getUsername());
            } else {
                username = repository.findByUsername(dados.username());
            }

            var authenticationToken = new UsernamePasswordAuthenticationToken(username, dados.password());

            var authentication = manager.authenticate(authenticationToken);

            //Tratamento de erro caso as credenciais estejam erradas
            var tokenJWT = tokenService.generateToken((Users) authentication.getPrincipal());

            // Retorna o token JWT
            return ResponseEntity.ok(new DadosTokenJWT(tokenJWT));
        } catch (AuthenticationException e) {
            // Se as credenciais forem inválidas, retorna um status de não autorizado com uma mensagem de erro
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ErrorValidation("Invalid credentials."));
        }
    }

    /**
     * Registra um novo usuário com criptografia de senha usando o Google.
     *
     * @param profileImage         Imagem de perfil do usuário a ser registrada
     * @param dados                Dados de autenticação do usuário a serem validados
     * @param uriComponentsBuilder Construtor de URI para construir a URI do novo usuário registrado
     * @return ResponseEntity com o novo usuário registrado, juntamente com o código de status HTTP 201 (Created), ou uma mensagem de erro se houver problemas durante o registro
     */
    @PostMapping("/register/google")
    @Operation(summary = "Register a new user with password encryption using google", method = "POST")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Login successfully."),
            @ApiResponse(responseCode = "401", description = "User does not exist or Invalid credentials.")
    })
    public ResponseEntity registerByGoogle(@RequestPart("profileImage") MultipartFile profileImage,
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

    /**
     * Valida os dados de registro do usuário.
     *
     * @param dados Dados de autenticação do usuário a serem validados
     * @throws RegistrationException Exceção lançada se houver problemas durante a validação dos dados
     */
    private void validateRegistrationData(AutenticarDados dados) throws RegistrationException {
        if (repository.findByUsername(dados.username()) != null) {
            throw new RegistrationException("username", "There is already a user with this name!");
        }

        if (repository.findByEmail(dados.email()) != null) {
            throw new RegistrationException("email", "There is already a user with this email!");
        }

        validateField(dados.firstName(), "firstName", "firstName field must have at least 3 characters!");
        validateField(dados.lastName(), "lastName", "lastName field must have at least 3 characters!");
        validateField(dados.username(), "username", "User field must have at least 3 characters!");
        validateField(dados.email(), "email", "Empty email field!");
        validateField(dados.birth(), "birth", "Birth field cannot be null");
    }

    /**
     * Valida um campo específico com base em requisitos mínimos de comprimento.
     *
     * @param value        O valor do campo a ser validado
     * @param fieldName    O nome do campo a ser validado
     * @param errorMessage A mensagem de erro a ser lançada se a validação falhar
     * @throws RegistrationException Exceção lançada se a validação do campo falhar
     */
    private void validateField(String value, String fieldName, String errorMessage) throws RegistrationException {
        if (StringUtils.isBlank(value) || value.length() < 3) {
            throw new RegistrationException(fieldName, errorMessage);
        }
    }


}
