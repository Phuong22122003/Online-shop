package com.webbanhang.webbanhang.Config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

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
            .anyRequest().authenticated()
        ).formLogin((formLogin)->formLogin
            // .loginPage("/login")
            .permitAll()
            .successHandler((request,respone,authentication)->{
                HttpSession session = request.getSession();
                String username = authentication.getName();
                session.setAttribute("username",username);
                session.setAttribute("clientId", clientInfoRepository.findByUsername(username).getId());
                
            })
        ).csrf((crsf)->crsf.disable());
        return httpSecurity.build();
    }
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
