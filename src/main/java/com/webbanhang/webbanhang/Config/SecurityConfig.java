package com.webbanhang.webbanhang.Config;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.savedrequest.DefaultSavedRequest;

import com.webbanhang.webbanhang.Repository.ClientInfoRepository;

import jakarta.servlet.http.HttpSession;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Autowired private ClientInfoRepository clientInfoRepository;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception{
        httpSecurity.authorizeHttpRequests((request)->
            request.requestMatchers("/login","/home","/product-detail/**","/file/image/**","/api/list-product","/js/**","/css/**").permitAll()
            .requestMatchers("/add-product","/api/product/add","/api/product/update-price","/api/product/update-quantity","/api/product/update-description","/api/product/update-name","/api/product/upload-image").hasAuthority("STORE OWNER")
            .anyRequest().authenticated()
        ).formLogin((formLogin)->formLogin
            // .loginPage("/login")
            .permitAll()
            .successHandler((request,respone,authentication)->{
                HttpSession session = request.getSession();
                Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
                String username = authentication.getName();
                GrantedAuthority authority =(GrantedAuthority)authorities.toArray()[0];
                session.setAttribute("username",username);
                session.setAttribute("clientId", clientInfoRepository.findByUsername(username).getId());
                session.setAttribute("role", authority.getAuthority().trim().toUpperCase());
                DefaultSavedRequest savedRequest = (DefaultSavedRequest) session
                                    .getAttribute("SPRING_SECURITY_SAVED_REQUEST");
                if(savedRequest !=null){
                    String redirectUrl = savedRequest.getRedirectUrl();
                    respone.sendRedirect(redirectUrl);
                }
                else   
                    respone.sendRedirect("/home");
                    
            })
        ).csrf((crsf)->crsf.disable());
        return httpSecurity.build();
    }
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
