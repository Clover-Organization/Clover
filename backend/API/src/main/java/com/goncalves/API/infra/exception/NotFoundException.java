package com.goncalves.API.infra.exception;

public class NotFoundException extends RuntimeException {
    private final String id;

    public NotFoundException(String message, String id) {
        super(message);
        this.id = id;
    }

    public String getId() {
        return id;
    }
}