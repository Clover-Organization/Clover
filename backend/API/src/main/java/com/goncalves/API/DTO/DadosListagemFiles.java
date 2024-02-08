package com.goncalves.API.DTO;

public record DadosListagemFiles(String fileName,
                                 String fileType,
                                 byte[] fileContent) {
}
