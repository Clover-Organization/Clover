package com.goncalves.API.DTO;

import org.apache.commons.io.IOUtils;
import org.springframework.core.io.ByteArrayResource;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.nio.charset.StandardCharsets;

public record DadosFileDownload(String fileName, String fileType, String fileContent) {

    // Construtor que aceita um ByteArrayResource e converte para string
    public DadosFileDownload(String fileName, String fileType, ByteArrayResource byteArrayResource) {
        this(fileName, fileType, convertByteArrayResourceToString(byteArrayResource));
    }

    // Método para converter ByteArrayResource para string
    private static String convertByteArrayResourceToString(ByteArrayResource byteArrayResource) {
        if (byteArrayResource == null) {
            return null;
        }
        try {
            ByteArrayInputStream inputStream = new ByteArrayInputStream(byteArrayResource.getByteArray());
            return IOUtils.toString(inputStream, String.valueOf(StandardCharsets.UTF_8));
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }
}
