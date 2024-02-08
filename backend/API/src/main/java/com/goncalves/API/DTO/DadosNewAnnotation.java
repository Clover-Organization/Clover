package com.goncalves.API.DTO;

import java.time.LocalDateTime;

public record DadosNewAnnotation(String title, String annotationContent, LocalDateTime creationAnnotation, LocalDateTime progressAnnotation) {
}
