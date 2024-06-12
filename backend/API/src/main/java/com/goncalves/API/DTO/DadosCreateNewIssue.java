package com.goncalves.API.DTO;

import java.util.List;

public record DadosCreateNewIssue(String title, String description, List<String> files){
}
