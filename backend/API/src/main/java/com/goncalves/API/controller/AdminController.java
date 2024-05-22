package com.goncalves.API.controller;

import com.goncalves.API.DTO.AutenticarDados;
import com.goncalves.API.entities.user.Users;
import com.goncalves.API.infra.exception.DadosTokenJWT;
import com.goncalves.API.service.TokenService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private TokenService tokenService;

    @Autowired
    private AuthenticationManager manager;


    @GetMapping
    public ResponseEntity serveIndex() {
        try {
            Path path = Paths.get("src/main/resources/static/index.html");
            Resource resource = new UrlResource(path.toUri());

            if (resource.exists() || resource.isReadable()) {
                return ResponseEntity.ok()
                        .header(HttpHeaders.CONTENT_DISPOSITION, "inline;filename=" + resource.getFilename())
                        .body(resource);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Arquivo não encontrado.");
            }
        } catch (MalformedURLException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao ler o arquivo.");
        }
    }

    @PostMapping("/login")
    public ResponseEntity hello(@RequestBody @Valid AutenticarDados dados) {
        try {
            var authenticationToken = new UsernamePasswordAuthenticationToken(dados.username(), dados.password());

            var authentication = manager.authenticate(authenticationToken);

            //Tratamento de erro caso as credenciais estejam erradas
            var tokenJWT = tokenService.generateToken((Users) authentication.getPrincipal());

            // Retorna o token JWT
            return ResponseEntity.ok(new DadosTokenJWT(tokenJWT));
        } catch (InternalError e) {
            return ResponseEntity.internalServerError()
                    .body(new InternalError("Internal Server Error", e));
        }
    }
}
