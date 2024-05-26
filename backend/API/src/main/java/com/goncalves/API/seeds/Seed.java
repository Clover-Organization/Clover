package com.goncalves.API.seeds;

import com.goncalves.API.entities.user.UserRole;
import com.goncalves.API.entities.user.Users;
import com.goncalves.API.service.AdminTemplateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class Seed implements CommandLineRunner {

    @Autowired
    private AdminTemplateService service;

    @Override
    public void run(String... args) throws Exception {
        try {
            Users user = new Users(
                    "admin",
                    "admin",
                    "admin",
                    "admin@gmail.com",
                    new BCryptPasswordEncoder().encode("123456789"),
                    "01/01/2000",
                    LocalDateTime.now(),
                    UserRole.ADMIN,
                    new byte[0]
            );
            service.verifyAdminCreated(user);
        } catch (Exception e) {
            System.out.println("Erro ao criar usuário admin: " + e.getMessage());
        }
    }
}
