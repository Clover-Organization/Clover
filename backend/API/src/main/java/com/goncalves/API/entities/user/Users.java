package com.goncalves.API.entities.user;

import com.goncalves.API.DTO.DadosAtualizarUser;
import com.goncalves.API.infra.exception.RegistrationException;
import io.micrometer.common.util.StringUtils;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;
import java.util.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

@Document(collection = "users")
public class Users implements UserDetails {

    @Id
    private String idUsers;

    private String username;
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String birth;
    private LocalDateTime creationAccount;
    private UserRole role;
    private byte[] profileImage;

    public Users(String username, String firstName, String lastName, String email, String password, String birth, LocalDateTime creationAccount, UserRole role, byte[] profileImage) {
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.birth = birth;
        this.creationAccount = creationAccount;
        this.role = role;
        this.profileImage = profileImage;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Users users = (Users) o;
        return Objects.equals(idUsers, users.idUsers) && Objects.equals(username, users.username) && Objects.equals(firstName, users.firstName) && Objects.equals(lastName, users.lastName) && Objects.equals(email, users.email) && Objects.equals(password, users.password) && Objects.equals(birth, users.birth) && Objects.equals(creationAccount, users.creationAccount) && role == users.role && Arrays.equals(profileImage, users.profileImage);
    }

    @Override
    public int hashCode() {
        int result = Objects.hash(idUsers, username, firstName, lastName, email, password, birth, creationAccount, role);
        result = 31 * result + Arrays.hashCode(profileImage);
        return result;
    }

    public void atualizarUser(DadosAtualizarUser dados) {
        if (dados.firstName() != null && !dados.firstName().isEmpty()) {
            this.firstName = dados.firstName();
        }
        if (dados.lastName() != null && !dados.lastName().isEmpty()) {
            this.lastName = dados.lastName();
        }
        if (dados.email() != null && !dados.email().isEmpty()) {
            this.email = dados.email();
        }
        if (dados.birth() != null && !dados.birth().isEmpty()) {
            this.birth = dados.birth();
        }
    }

    public void validateField(String value, String fieldName, String errorMessage) throws RegistrationException {
        if (StringUtils.isBlank(value) || value.length() < 3) {
            throw new RegistrationException(fieldName, errorMessage);
        }
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        if (this.role == UserRole.ADMIN)
            return List.of(new SimpleGrantedAuthority("ROLE_ADMIN"), new SimpleGrantedAuthority("ROLE_USER"));
        else return List.of(new SimpleGrantedAuthority("ROLE_USER"));
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
