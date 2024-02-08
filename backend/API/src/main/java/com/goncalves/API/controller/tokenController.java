package com.goncalves.API.controller;

import com.goncalves.API.DTO.DadosRole;
import com.goncalves.API.entities.user.UserRepository;
import com.goncalves.API.entities.user.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/token")
public class tokenController {
    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public ResponseEntity testToken() {
        Users user = (Users) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return ResponseEntity.ok().body(new DadosRole(user.getRole().toString()));
    }
}
