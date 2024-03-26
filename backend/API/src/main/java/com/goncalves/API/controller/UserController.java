package com.goncalves.API.controller;

import com.goncalves.API.DTO.AutenticarDados;
import com.goncalves.API.DTO.DadosAtualizarUser;
import com.goncalves.API.DTO.DadosListagemUser;
import com.goncalves.API.entities.user.UserRepository;
import com.goncalves.API.entities.user.Users;
import com.goncalves.API.infra.security.*;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;


@RestController
@Slf4j
@RequestMapping("/")
@Tag(name = "/")
public class UserController {

    @Autowired
    private UserRepository repository;


    /**
     * Obtém uma página paginada de usuários com base na data de criação da conta.
     *
     * @param paginacao O objeto Pageable com informações de paginação, como tamanho e ordem de classificação.
     * @return ResponseEntity contendo a página de usuários paginada.
     */
    @GetMapping
    @Operation(summary = "User pagination to get all users based on creationAccount data", method = "GET")
    @ApiResponse(responseCode = "200", description = "Search completed successfully.")
    public ResponseEntity<Page<DadosListagemUser>> getUsers(@PageableDefault(size = Integer.MAX_VALUE, sort = {"creationAccount"}) Pageable paginacao) {
        var user = (Users) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        // Obtém a página de usuários paginada a partir do repositório e mapeia para DTOs correspondentes
        var page = repository.findAllByUsernameIsNot(user.getUsername(),paginacao).map(DadosListagemUser::new);
        // Retorna a página de usuários paginada dentro de um ResponseEntity
        return ResponseEntity.ok(page);
    }

    /**
     * Retorna o usuário correspondente ao token de autenticação atual.
     *
     * @return ResponseEntity contendo o usuário correspondente ao token.
     */
    @GetMapping("/user/token")
    @Operation(summary = "Catch users based on the jwt token", method = "GET")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Search completed successfully."),
            @ApiResponse(responseCode = "404", description = "User not found."),
            @ApiResponse(responseCode = "500", description = "Internal server error.")
    })
    public ResponseEntity getUserFromToken() {
        try {
            var user = (Users) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            if (user == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new NotFoundException("User not found.", "NULL"));
            } else {
                return ResponseEntity.ok().body(repository.findById(user.getIdUsers()));
            }
        } catch (Exception e) {
            // Logar a exceção ou tratar conforme necessário
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Atualiza as informações de um usuário com base no ID.
     *
     * @param idUser O ID do usuário a ser atualizado.
     * @param dados  Os novos dados do usuário.
     * @return ResponseEntity contendo o usuário atualizado.
     */
    @PutMapping("/{idUser}")
    @Transactional
    @Operation(summary = "Change user information based on id", method = "PUT")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "User updated successfully"),
            @ApiResponse(responseCode = "404", description = "User not found."),
            @ApiResponse(responseCode = "500", description = "Internal server error.")
    })
    public ResponseEntity updateUser(@PathVariable String idUser, @RequestBody @Validated DadosAtualizarUser dados) {
        try {
            // Encontra o usuário pelo ID ou lança uma exceção se não encontrado
            var user = repository.findById(idUser)
                    .orElseThrow(() -> new NotFoundException("User not found.", idUser));

            // Atualiza os dados do usuário
            user.atualizarUser(dados);

            // Salva as alterações no repositório
            repository.save(user);

            return ResponseEntity.ok(user);
        } catch (NotFoundException e) {
            // Retorna uma resposta com status NOT FOUND se o usuário não for encontrado
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ErrorNotFoundId(e.getMessage(), e.getId()));
        } catch (Exception e) {
            // Retorna uma resposta com status INTERNAL SERVER ERROR para outras exceções
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse("Internal server error."));
        }
    }

    /**
     * Obtém um usuário pelo ID.
     *
     * @param idUser O ID do usuário a ser obtido.
     * @return ResponseEntity contendo o usuário correspondente ao ID fornecido.
     */
    @GetMapping("/{idUser}")
    @Operation(summary = "Get the user based on the id", method = "GET")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "User found successfully."),
            @ApiResponse(responseCode = "404", description = "User not found."),
            @ApiResponse(responseCode = "500", description = "Internal server error.")
    })
    public ResponseEntity getUserById(@PathVariable String idUser) {
        try {
            // Encontra o usuário pelo ID ou lança uma exceção se não encontrado
            var user = repository.findById(idUser)
                    .orElseThrow(() -> new NotFoundException("Not found id.", idUser));
            return ResponseEntity.ok(user);
        } catch (NotFoundException e) {
            // Retorna uma resposta com status NOT FOUND se o usuário não for encontrado
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ErrorNotFoundId(e.getMessage(), e.getId()));
        } catch (Exception e) {
            // Retorna uma resposta com status INTERNAL SERVER ERROR para outras exceções
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse("Internal server error."));
        }
    }

    /**
     * Atualiza as informações do usuário com base no token de autenticação.
     *
     * @param dados Os novos dados do usuário.
     * @return ResponseEntity contendo o usuário atualizado.
     */
    @PutMapping
    @Transactional
    @Operation(summary = "Change user information based on token jwt", method = "PUT")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "User updated successfully."),
            @ApiResponse(responseCode = "404", description = "User not found."),
            @ApiResponse(responseCode = "500", description = "Internal server error.")
    })
    public ResponseEntity updateUserByToken(@RequestBody @Validated DadosAtualizarUser dados) {
        try {
            // Obtém o usuário autenticado
            var user = (Users) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

            // Verifica se o usuário autenticado é nulo
            if (user == null) {
                return ResponseEntity.notFound().build();
            }

            // Valida os dados de atualização do usuário
            validateRegistrationData(dados);

            // Atualiza os dados do usuário
            user.atualizarUser(dados);
            repository.save(user);

            return ResponseEntity.ok(user);
        } catch (NotFoundException e) {
            // Retorna uma resposta com status NOT FOUND se o usuário não for encontrado
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ErrorNotFoundId(e.getMessage(), e.getId()));
        } catch (Exception e) {
            // Retorna uma resposta com status INTERNAL SERVER ERROR para outras exceções
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse("Internal server error"));
        }
    }

    /**
     * Valida os dados de registro do usuário.
     *
     * @param dados Os dados de registro do usuário a serem validados.
     * @throws RegistrationException Se ocorrer um erro durante a validação dos dados de registro.
     */
    private void validateRegistrationData(DadosAtualizarUser dados) throws RegistrationException {
        Users users = new Users();

        // Valida o campo firstName
        users.validateField(dados.firstName(), "firstName", "firstName field must have at least 3 characters!");
        // Valida o campo lastName
        users.validateField(dados.lastName(), "lastName", "lastName field must have at least 3 characters!");
        // Valida o campo email
        users.validateField(dados.email(), "email", "Empty email field!");
        // Valida o campo birth
        users.validateField(dados.birth(), "birth", "Birth field cannot be null!");
    }

    /**
     * Atualiza a imagem do usuário.
     *
     * @param file O arquivo de imagem a ser atualizado.
     * @return ResponseEntity contendo o usuário com a imagem atualizada.
     */
    @PutMapping(value = "/updateUserImage", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @Transactional
    @Operation(summary = "Update user image", method = "PUT")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "User image updated successfully."),
            @ApiResponse(responseCode = "404", description = "User not found."),
            @ApiResponse(responseCode = "415", description = "Invalid image file format."),
            @ApiResponse(responseCode = "500", description = "Internal server error.")
    })
    public ResponseEntity updateUserImage(@RequestParam("file") MultipartFile file) {
        try {
            // Obtém o usuário autenticado
            var user = (Users) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

            // Verifica se o arquivo é nulo ou se o formato é inválido
            if (file == null || file.isEmpty() || !isValidImageFormat(file)) {
                return ResponseEntity.status(HttpStatus.UNSUPPORTED_MEDIA_TYPE).body(new ErrorResponse("Invalid image file format."));
            }

            // Verifica se o usuário está autenticado
            if (user == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(new NotFoundException("User not found.", "NULL"));
            }

            // Lógica para salvar a imagem (por exemplo, em um diretório ou no banco de dados)
            byte[] imageData = file.getBytes();
            user.setProfileImage(imageData);

            // Salva as alterações no usuário
            repository.save(user);
            return ResponseEntity.ok(user);
        } catch (IOException e) {
            // Retorna uma resposta com status INTERNAL SERVER ERROR se ocorrer um erro de processamento da imagem
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse("Error processing image."));
        }
    }

    /**
     * Verifica se o formato do arquivo de imagem é válido.
     *
     * @param file O arquivo de imagem a ser verificado.
     * @return true se o formato do arquivo for válido, false caso contrário.
     */
    private boolean isValidImageFormat(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            return false; // Arquivo é nulo ou vazio, então não é válido
        }

        String fileName = file.getOriginalFilename();
        if (fileName == null) {
            return false; // Nome do arquivo é nulo, então não é válido
        }

        String lowercaseFileName = fileName.toLowerCase();
        return lowercaseFileName.endsWith(".jpg") || lowercaseFileName.endsWith(".jpeg") || lowercaseFileName.endsWith(".png") || lowercaseFileName.endsWith(".gif") || lowercaseFileName.endsWith(".bmp");
    }


    /**
     * Deleta o usuário do banco de dados.
     *
     * @param idUser O ID do usuário a ser deletado.
     * @return ResponseEntity indicando o sucesso da operação.
     */
    @DeleteMapping("/{idUser}")
    @Transactional
    @Operation(summary = "Delete the user from the database.", method = "DELETE")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "User deleted successfully."),
            @ApiResponse(responseCode = "404", description = "User not found."),
    })
    public ResponseEntity deleteUser(@PathVariable String idUser) {
        // Verifica se o usuário existe no banco de dados
        if (repository.existsById(idUser)) {
            repository.deleteById(idUser);
            return ResponseEntity.noContent().build();
        } else {
            // Retorna uma resposta com status NOT FOUND se o usuário não for encontrado
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ErrorNotFoundId("not found id!", idUser));
        }
    }

}
