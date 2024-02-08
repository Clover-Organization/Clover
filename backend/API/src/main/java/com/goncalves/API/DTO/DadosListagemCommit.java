package com.goncalves.API.DTO;

import java.time.LocalDateTime;

public record DadosListagemCommit(String commitMessage, LocalDateTime commitDate) {
}
