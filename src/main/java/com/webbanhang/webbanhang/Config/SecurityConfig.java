package com.webbanhang.webbanhang.Config;

import java.util.ArrayList;
import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.savedrequest.DefaultSavedRequest;

import com.webbanhang.webbanhang.Entity.User;
import com.webbanhang.webbanhang.Service.UserService;
import jakarta.servlet.http.HttpSession;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Autowired
    private UserService userService;
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception{
        httpSecurity.authorizeHttpRequests((request)->request
            .requestMatchers("/js/**","/assets/**","/css/**").permitAll()
            .requestMatchers("/login","/","/sigup","/forgot-password","/enter-otp").permitAll()
            .requestMatchers("/home","/search","/search-by-des","/product").permitAll()
            .requestMatchers("/api/v1/user/add-orders-to-session").permitAll()
            .requestMatchers("/api/v1/categories/all").permitAll()
            .requestMatchers("/api/v1/brand/all").permitAll()
            .requestMatchers("/api/v1/user/**").permitAll()//hasAuthority("Customer")
            .requestMatchers("/api/v1/resource/**").permitAll()
            .requestMatchers("/api/v1/products/**").permitAll()
            .requestMatchers("/api/v1/comments/find-all").permitAll()
            .requestMatchers("/api/v1/products/add").hasAuthority("Employee")
            .requestMatchers("/api/v1/admin/**").hasAuthority("Employee")
            .requestMatchers("/admin/**").hasAuthority("Employee")
            .requestMatchers("/api/v1/authentication/get-role",
                            "/api/v1/authentication/sigup",
                            "/api/v1/authentication/send-otp",
                            "/api/v1/authentication/update-password").permitAll()
            .requestMatchers("/api/v1/ai/**").permitAll()
            .anyRequest().authenticated()
        )
        .oauth2Login(oauth2Login ->oauth2Login
            .loginPage("/login")
            .successHandler(authenticationSuccessHandler())
        )
        .formLogin((formLogin)->formLogin
            .loginPage("/login")
            .permitAll()
            .successHandler((request,response,authentication)->{
                HttpSession session = request.getSession();
                Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
                String username = authentication.getName();
                GrantedAuthority authority =(GrantedAuthority)authorities.toArray()[0];

                session.setAttribute("email",username);
                session.setAttribute("role", authority.getAuthority().trim().toUpperCase());

                DefaultSavedRequest savedRequest = (DefaultSavedRequest) session.getAttribute("SPRING_SECURITY_SAVED_REQUEST");
                if(savedRequest !=null){
                    String redirectUrl = savedRequest.getRedirectUrl();
                    response.sendRedirect(redirectUrl);
                }
                else   
                    response.sendRedirect("/home");
                    
            })
        )
        .csrf((crsf)->crsf.disable());
        return httpSecurity.build();
    }
    @Bean
	public AuthenticationManager authenticationManager(UserDetailsService userDetailsService,
			                                                PasswordEncoder passwordEncoder) {

		DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider();
		authenticationProvider.setUserDetailsService(userDetailsService);
		authenticationProvider.setPasswordEncoder(passwordEncoder);

		ProviderManager providerManager = new ProviderManager(authenticationProvider);
		providerManager.setEraseCredentialsAfterAuthentication(false);

		return providerManager;
	}

    @Bean
    public OAuth2UserService<OAuth2UserRequest, OAuth2User> oauth2UserService() {
        DefaultOAuth2UserService delegate = new DefaultOAuth2UserService();
        return request -> {
            OAuth2User oAuth2User = delegate.loadUser(request);
            return oAuth2User;
        };
    }

    @Bean
    public AuthenticationSuccessHandler authenticationSuccessHandler() {
        return (request, response, authentication) -> {
            OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
            // Lấy thông tin người dùng từ oAuth2User
            String email = oAuth2User.getAttribute("email");
            HttpSession session = request.getSession();
            User user = userService.findUserByEmail(email);
            String role = user!=null?user.getRole():"Customer";
            Collection<GrantedAuthority> grantedAuthorities = new ArrayList<>(oAuth2User.getAuthorities());
            grantedAuthorities.add(new SimpleGrantedAuthority(role));


            Authentication newAuth = new UsernamePasswordAuthenticationToken(authentication.getPrincipal(), authentication.getCredentials(),grantedAuthorities);
            SecurityContextHolder.getContext().setAuthentication(newAuth);

            if(user==null){
               userService.addGoogleUser(oAuth2User);
            }

            // Xử lý sau khi đăng nhập thành công
            session.setAttribute("email",email);
            session.setAttribute("role", "customer");

            DefaultSavedRequest savedRequest = (DefaultSavedRequest) session.getAttribute("SPRING_SECURITY_SAVED_REQUEST");
            if(savedRequest !=null){
                String redirectUrl = savedRequest.getRedirectUrl();
                if(redirectUrl.contains("/api"))
                    response.sendRedirect("/home");
                response.sendRedirect(redirectUrl);
            }
            else   
                response.sendRedirect("/home");
        };
    }
}
