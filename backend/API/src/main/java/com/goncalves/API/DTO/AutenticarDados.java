package com.goncalves.API.DTO;

import com.goncalves.API.entities.user.UserRole;

import java.time.LocalDateTime;

public record AutenticarDados(String username,
                              String firstName,
                              String lastName,
                              String email,
                              String password,
                              String birth,
                              LocalDateTime creationAccount,
                              UserRole role,
                              byte[] profileImage) {
}
