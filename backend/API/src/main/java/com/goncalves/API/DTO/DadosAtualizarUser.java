package com.goncalves.API.DTO;

import com.goncalves.API.entities.user.Users;

public record DadosAtualizarUser(String firstName,
                                 String lastName,
                                 String email,
                                 String birth) {

}
