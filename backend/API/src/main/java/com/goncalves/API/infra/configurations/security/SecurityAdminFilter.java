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

/**
 * This class represents a security filter that checks if the authenticated user has admin role.
 * It extends the OncePerRequestFilter class from Spring Framework, which ensures it is executed once per request.
 */
@Component
public class SecurityAdminFilter extends OncePerRequestFilter {

    /**
     * This method is overridden from OncePerRequestFilter class.
     * It checks if the authenticated user has admin role and performs necessary actions.
     *
     * @param request      The HttpServletRequest object that contains the request the client made of the servlet.
     * @param response     The HttpServletResponse object that contains the response the servlet sends to the client.
     * @param filterChain  The FilterChain object provided by the servlet container to the developer giving a view into the invocation chain of a filtered request for a resource.
     * @throws ServletException if an input or output error is detected when the servlet handles the doFilter method.
     * @throws IOException if the filter chain fails.
     */
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        try {

            // Obtains the current authentication from the security context
            var authentication = SecurityContextHolder.getContext().getAuthentication();

            // Checks if the authentication is not null and if the user has any role
            if (authentication != null && !authentication.getAuthorities().isEmpty()) {
                Collection<SimpleGrantedAuthority> authorities = (Collection<SimpleGrantedAuthority>) authentication.getAuthorities();

                // Checks if the user has the admin role
                boolean isAdmin = authorities.stream()
                        .anyMatch(authority -> authority.getAuthority().equalsIgnoreCase("ADMIN"));

                // Perform necessary actions for users with admin role
                if (isAdmin) {
                    System.out.println("User has permission to access this resource.");
                }
            }
        } catch (Exception e) {
            // If an error occurs, log or handle accordingly
            System.out.println("An error occurred while trying to access the resource.");
        }

        // Continues the filter chain
        filterChain.doFilter(request, response);
    }
}