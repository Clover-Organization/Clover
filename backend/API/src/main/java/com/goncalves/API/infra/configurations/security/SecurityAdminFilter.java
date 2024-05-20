package com.goncalves.API.infra.configurations.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collection;

@Component
public class SecurityAdminFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        try {
            // Obtém a autenticação atual do contexto de segurança
            var authentication = SecurityContextHolder.getContext().getAuthentication();

            // Verifica se a autenticação não é nula e se o usuário tem algum papel (role)
            if (authentication != null && !authentication.getAuthorities().isEmpty()) {
                Collection<SimpleGrantedAuthority> authorities = (Collection<SimpleGrantedAuthority>) authentication.getAuthorities();

                // Verifica se o usuário tem a role de admin
                boolean isAdmin = authorities.stream()
                        .anyMatch(authority -> authority.getAuthority().equalsIgnoreCase("ADMIN"));

                // Faça o que precisa ser feito para usuários com a role de admin
                if (isAdmin) {
                    System.out.println("User has permission to access this resource.");
                }
            }
        } catch (Exception e) {
            // Se ocorrer um erro, registre ou manipule de acordo
            System.out.println("An error occurred while trying to access the resource.");
        }

        // Continua a cadeia de filtros
        filterChain.doFilter(request, response);
    }
}
