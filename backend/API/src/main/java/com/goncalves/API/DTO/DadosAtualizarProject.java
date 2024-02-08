package com.goncalves.API.DTO;
import java.time.LocalDateTime;

public record DadosAtualizarProject( String projectName,
                                     LocalDateTime projectProgress,
                                     String projectDescription) {
}
