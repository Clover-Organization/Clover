package com.goncalves.API.DTO;

import jakarta.validation.constraints.NotBlank;

public record DadosTokenEmailValidation(@NotBlank String token, @NotBlank String newPassword) {
}
