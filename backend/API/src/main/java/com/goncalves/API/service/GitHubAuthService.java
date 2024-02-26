package com.goncalves.API.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService;
import org.springframework.stereotype.Service;

@Service
public class GitHubAuthService {

    @Autowired
    private OAuth2AuthorizedClientService authorizedClientService;

    @Autowired
    private ClientRegistrationRepository clientRegistrationRepository;

    public String getAccessToken(OAuth2AuthenticationToken authenticationToken) {
        // Obter o registro do cliente OAuth2 para o provedor GitHub
        ClientRegistration clientRegistration = clientRegistrationRepository.findByRegistrationId("github");

        // Obter o cliente autorizado OAuth2 com base no token de autenticação
        OAuth2AuthorizedClient authorizedClient = authorizedClientService.loadAuthorizedClient(
                clientRegistration.getRegistrationId(), authenticationToken.getName());

        // Obter o token de acesso do cliente autorizado
        String accessToken = authorizedClient.getAccessToken().getTokenValue();

        return accessToken;
    }

}
