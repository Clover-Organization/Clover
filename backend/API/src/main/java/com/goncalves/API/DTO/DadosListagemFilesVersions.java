package com.goncalves.API.DTO;

import java.time.LocalDateTime;

public record DadosListagemFilesVersions(String fileName, String fileType, byte[] changes, LocalDateTime creationFile) {

}
