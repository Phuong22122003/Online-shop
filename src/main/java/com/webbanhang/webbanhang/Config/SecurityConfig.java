package com.webbanhang.webbanhang.Config;

import java.util.Collection;
import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.oidc.user.DefaultOidcUser;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.security.oauth2.core.oidc.user.OidcUserAuthority;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.savedrequest.DefaultSavedRequest;

import com.webbanhang.webbanhang.Entity.CLIENT_INFO;
// import com.webbanhang.webbanhang.JWT.JwtAuthenticationFilter;
import com.webbanhang.webbanhang.Repository.ClientInfoRepository;
import com.webbanhang.webbanhang.Service.ClientService;
import com.webbanhang.webbanhang.Service.CommonService;

import jakarta.servlet.http.HttpSession;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Autowired private ClientInfoRepository clientInfoRepository;
    @Autowired private ClientService clientService;
    @Autowired private CommonService commonService;
    // @Autowired private JwtAuthenticationFilter jwtAuthenticationFilter;
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception{
        httpSecurity.authorizeHttpRequests((request)->request
            .requestMatchers("/login","/home","/product-detail/**","/api/authenticate","/file/image/**","/api/home/**","/js/**","/assets/**","/css/**").permitAll()
            .requestMatchers("/sigup","/validate-code","/add-user","/add-password").permitAll()
            .anyRequest().authenticated()
        )
        .oauth2Login(oauth2Login ->oauth2Login
            // .userInfoEndpoint(userInfoEndpoint ->
            //     userInfoEndpoint
            //         .userService(oauth2UserService())
            // )
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
                session.setAttribute("username",username);
                session.setAttribute("clientId", clientInfoRepository.findByUsername(username).getId());
                session.setAttribute("role", authority.getAuthority().trim().toUpperCase());
                DefaultSavedRequest savedRequest = (DefaultSavedRequest) session
                                    .getAttribute("SPRING_SECURITY_SAVED_REQUEST");
                if(savedRequest !=null){
                    String redirectUrl = savedRequest.getRedirectUrl();
                    response.sendRedirect(redirectUrl);
                }
                else   
                    response.sendRedirect("/home");
                    
            })
        )
        // .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
        .csrf((crsf)->crsf.disable());
        return httpSecurity.build();
    }
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
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
    //cách 2
    // @Bean
    // public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration)
    //         throws Exception {
    //     return authenticationConfiguration.getAuthenticationManager();
    // }

    /*
     * Tương tụ như UserDetailsService dùng để lấy thông tin và trả về.
     */
    @Bean
    public OAuth2UserService<OAuth2UserRequest, OAuth2User> oauth2UserService() {
        DefaultOAuth2UserService delegate = new DefaultOAuth2UserService();
        return request -> {
            OAuth2User oAuth2User = delegate.loadUser(request);
            String authority = "USER";
            GrantedAuthority grantedAuthority = new SimpleGrantedAuthority(authority);
            // oAuth2User.getAuthorities()
                if (oAuth2User instanceof OidcUser) {
                    OidcUser oidcUser = (OidcUser) oAuth2User;
                    return new DefaultOidcUser(
                        Collections.singletonList(new OidcUserAuthority(authority, oidcUser.getIdToken(), oidcUser.getUserInfo())),
                        oidcUser.getIdToken(),
                        oidcUser.getUserInfo()
                );
            }

            // Nếu không phải là OidcUser, trả về oAuth2User gốc
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
            if(clientService.findClientByEmail(email)==null){
                CLIENT_INFO client = new CLIENT_INFO();
                client.setEmail(email);
                client.setFirstname(oAuth2User.getAttribute("given_name"));
                client.setLastname(oAuth2User.getAttribute("family_name"));
                client.setRole("USER");
                client.setUsername(commonService.randomString());
                client.setPassword(commonService.randomString());
                client.setIsEditUsername(false);
                clientService.addClient(client);
                session.setAttribute("email",email);
                response.sendRedirect("profile");
            }
            // Xử lý sau khi đăng nhập thành công
            session.setAttribute("email",email);
            session.setAttribute("clientId", clientInfoRepository.findByEmail(email).getId());
            session.setAttribute("role", "USER");
            DefaultSavedRequest savedRequest =
                                                (DefaultSavedRequest) session.getAttribute("SPRING_SECURITY_SAVED_REQUEST");
            if(savedRequest !=null){
                String redirectUrl = savedRequest.getRedirectUrl();
                response.sendRedirect(redirectUrl);
            }
            else   
                response.sendRedirect("/home");
        };
    }
}
