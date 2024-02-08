package com.goncalves.API.controller;

import com.goncalves.API.DTO.AutenticarDados;
import com.goncalves.API.DTO.DadosAtualizarUser;
import com.goncalves.API.DTO.DadosListagemUser;
import com.goncalves.API.entities.user.UserRepository;
import com.goncalves.API.entities.user.Users;
import com.goncalves.API.infra.security.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
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
@RequestMapping
public class UserController {

    @Autowired
    private UserRepository repository;


    @GetMapping
    public ResponseEntity<Page<DadosListagemUser>> getUsers(@PageableDefault(size = 10, sort = {"creationAccount"})Pageable paginacao){
        var page = repository.findAll(paginacao).map(DadosListagemUser::new);
        return ResponseEntity.ok(page);
    }

    @GetMapping("/user/token")
    public ResponseEntity getUserFromToken (){
        Users user = (Users) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return ResponseEntity.ok().body(repository.findById(user.getIdUsers()));
    }

    @GetMapping("/{idUser}")
    public ResponseEntity getUserById(@PathVariable String idUser) {
        try {
            var user = repository.findById(idUser)
                    .orElseThrow(() -> new NotFoundException("ID não encontrado", idUser));
            return ResponseEntity.ok(user);
        } catch (NotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ErrorNotFoundId(e.getMessage(), e.getId()));
        } catch (Exception e) {
            // Lidar com outras exceções aqui, se necessário
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ErrorResponse("Erro interno do servidor"));
        }
    }

    @PutMapping("/{idUser}")
    @Transactional
    public ResponseEntity updateUser(@PathVariable String idUser, @RequestBody @Validated DadosAtualizarUser dados) {
        try {
            var user = repository.findById(idUser)
                    .orElseThrow(() -> new NotFoundException("ID não encontrado", idUser));

            // Atualizar os dados do usuário
            user.atualizarUser(dados);

            repository.save(user);

            return ResponseEntity.ok(user);
        } catch (NotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ErrorNotFoundId(e.getMessage(), e.getId()));
        } catch (Exception e) {
            // Lidar com outras exceções aqui, se necessário
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ErrorResponse("Erro interno do servidor"));
        }
    }

    @PutMapping
    @Transactional
    public ResponseEntity updateUserForToken(@RequestBody @Validated DadosAtualizarUser dados) {

        try {
            var user = (Users) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

            if (user == null){
                return ResponseEntity.notFound().build();
            }

            validateRegistrationData(dados);

            user.atualizarUser(dados);

            repository.save(user);
            return ResponseEntity.ok(user);
        } catch (NotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ErrorNotFoundId(e.getMessage(), e.getId()));
        } catch (Exception e) {
            // Lidar com outras exceções aqui, se necessário
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ErrorResponse("Erro interno do servidor"));
        }
    }

    private void validateRegistrationData(DadosAtualizarUser dados) throws RegistrationException {
        Users users = new Users();
        users.validateField(dados.firstName(), "firstName", "Campo firstName deve ter no mínimo 3 caracteres!");
        users.validateField(dados.lastName(), "lastName", "Campo lastName deve ter no mínimo 3 caracteres!");
        users.validateField(dados.email(), "email", "Campo email vazio!");
        users.validateField(dados.birth(), "birth", "Campo birth não pode ser nulo");
    }

    @PutMapping("/updateUserImage")
    @Transactional
    public ResponseEntity updateUserImage(@RequestParam("file") MultipartFile file) {
        try {
            var user = (Users) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            if (user == null) {
                return ResponseEntity.notFound().build();
            }

            // Lógica para salvar a imagem (por exemplo, em um diretório ou no banco de dados)
            byte[] imageData = file.getBytes();
            user.setProfileImage(imageData);

            repository.save(user);
            return ResponseEntity.ok(user);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ErrorResponse("Erro ao processar a imagem"));
        }
    }
    
    @DeleteMapping("/{idUser}")
    @Transactional
    public ResponseEntity deleteUser(@PathVariable String idUser) {
        if (repository.existsById(idUser)) {
            repository.deleteById(idUser);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ErrorNotFoundId("ID não encontrado!", idUser));
        }
    }

}
