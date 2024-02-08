package com.goncalves.API.DTO;

import com.goncalves.API.entities.commits.Commits;

public record DadosAtualizarFiles(String fileName, byte[] fileContent, Commits commits) {

}
