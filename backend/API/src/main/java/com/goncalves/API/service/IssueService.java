package com.goncalves.API.service;

import com.goncalves.API.DTO.DadosCreateNewIssue;
import org.springframework.stereotype.Service;

@Service
public class IssueService {

    public boolean validarIssue(DadosCreateNewIssue issue) {
        try {
            if (issue.title().isEmpty() || issue.description().isEmpty()) {
                return false;
            }
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
