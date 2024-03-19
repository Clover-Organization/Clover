package com.goncalves.API.entities.user;

import com.goncalves.API.entities.request.Project;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Range;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.List;

public interface UserRepository extends MongoRepository<Users ,String> {
    UserDetails findByUsername(String username);
    @Query("{ 'username' : ?0 }")
    Users findByUsernameForgot(String username);

    Users findByEmail(String email);

    Page<Users> findAllByUsernameIsNot(String username, Pageable paginacao);
}
