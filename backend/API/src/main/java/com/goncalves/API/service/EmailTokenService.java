package com.goncalves.API.service;

import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Service
public class EmailTokenService {

    private static final long TEMPO_EXPIRACAO = 3600000; // 1 hora
    private Map<String, String> tokens = new HashMap<>();

    public String gerarToken(String email) {
        String token = UUID.randomUUID().toString();
        tokens.put(token, email);
        return token;
    }

    public boolean validarToken(String token) {
        return tokens.containsKey(token);
    }

    public String getEmailPorToken(String token) {
        return tokens.get(token);
    }
}
