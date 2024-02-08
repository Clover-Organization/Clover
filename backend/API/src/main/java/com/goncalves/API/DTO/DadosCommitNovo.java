package com.goncalves.API.DTO;

import com.goncalves.API.entities.commits.Commits;

import java.time.LocalDateTime;

public record DadosCommitNovo(String commitMessage,
                              LocalDateTime commitDate) {

}
