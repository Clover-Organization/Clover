package com.goncalves.API.infra.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import java.io.IOException;

@Component
public class SecurityAdminFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        // Obtém a autenticação atual do contexto de segurança
        var authentication = SecurityContextHolder.getContext().getAuthentication();

        // Verifica se a autenticação não é nula e se o usuário tem algum papel (role)
        if (authentication != null && authentication.getAuthorities() != null) {
            // Itera sobre as autoridades (papéis) do usuário
            authentication.getAuthorities().forEach(authority -> {
                // Verifica se o usuário tem a role de admin
                if (authority.getAuthority().equals("ADMIN")) {
                    // Faça o que precisa ser feito para usuários com a role de admin
                    // Por exemplo, você pode logar ou tomar alguma ação específica
                    // Neste exemplo, estamos apenas imprimindo no console
                    System.out.println("Usuário tem a role de admin.");
                }
            });
        }

        // Continua a cadeia de filtros
        filterChain.doFilter(request, response);
    }
}
