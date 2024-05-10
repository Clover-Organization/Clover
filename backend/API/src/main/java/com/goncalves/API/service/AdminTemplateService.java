package com.goncalves.API.service;

import com.goncalves.API.entities.user.UserRepository;
import com.goncalves.API.entities.user.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdminTemplateService {

    @Autowired
    private UserRepository repository;

    public Users verifyAdminCreated(Users users) {
        try {
            var existingUser = repository.findByEmail(users.getEmail());
            if (existingUser == null) {
                System.out.println("Creating user admin...");
                return repository.save(users);
            } else {
                System.out.println("User admin already exists!");
                return null;
            }
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
