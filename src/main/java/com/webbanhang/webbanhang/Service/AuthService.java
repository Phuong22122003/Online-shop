package com.webbanhang.webbanhang.Service;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import jakarta.servlet.http.HttpSession;

@Service
public class AuthService {


    private ClientService clientService;
    private AuthenticationManager authenticationManager;

    @Autowired
    public AuthService(ClientService clientService, AuthenticationManager authenticationManager){
        this.clientService  = clientService;
        this.authenticationManager = authenticationManager;
    }

    public void autoLogin(String username, String password,HttpSession session) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(username, password));
        SecurityContext context = SecurityContextHolder.getContext();
        context.setAuthentication(authentication);
        session.setAttribute("SPRING_SECURITY_CONTEXT", context);
        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
        session.setAttribute("username",username);
        session.setAttribute("clientId", clientService.findClientByUsername(username).getId());
        GrantedAuthority authority =(GrantedAuthority)authorities.toArray()[0];
        session.setAttribute("role",  authority.getAuthority().trim().toUpperCase());
    }
}

