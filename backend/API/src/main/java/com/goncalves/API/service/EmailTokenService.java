package com.goncalves.API.service;

import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

/**
 * This service class is responsible for managing email tokens.
 * It provides methods to generate, validate, remove, and retrieve email by token.
 */
@Service
public class EmailTokenService {

    /**
     * The expiration time for the tokens.
     * Currently set to 1 hour (3600000 milliseconds).
     */
    private static final long TEMPO_EXPIRACAO = 3600000;

    /**
     * A map to store the tokens. The key is the token and the value is the email.
     */
    private Map<String, String> tokens = new HashMap<>();

    /**
     * Generates a new token for the given email.
     * The token is a random UUID string.
     *
     * @param email The email for which to generate the token.
     * @return The generated token.
     */
    public String gerarToken(String email) {
        String token = UUID.randomUUID().toString();
        tokens.put(token, email);
        return token;
    }

    /**
     * Validates the given token.
     * A token is valid if it exists in the tokens map.
     *
     * @param token The token to validate.
     * @return true if the token is valid, false otherwise.
     */
    public boolean validarToken(String token) {
        return tokens.containsKey(token);
    }

    /**
     * Removes the given token from the tokens map.
     *
     * @param token The token to remove.
     */
    public void removerToken(String token) {
        tokens.remove(token);
    }

    /**
     * Retrieves the email associated with the given token.
     *
     * @param token The token for which to retrieve the email.
     * @return The email associated with the token, or null if the token does not exist.
     */
    public String getEmailPorToken(String token) {
        return tokens.get(token);
    }
}