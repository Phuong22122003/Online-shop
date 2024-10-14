package com.webbanhang.webbanhang.Config;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.webbanhang.webbanhang.Service.UserService;

@Service
public class CustomUserDetailsService implements UserDetailsService{
    @Autowired private UserService userService;
    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        List<GrantedAuthority> grantList = new ArrayList<GrantedAuthority>();
        com.webbanhang.webbanhang.Entity.User user =  userService.findUserByEmail(email);
        if(user != null){
            GrantedAuthority authority = new SimpleGrantedAuthority("admin");
            grantList.add(authority);
            return new User(email, encoder.encode(user.getPassword()) , grantList);
        }
        
        throw new UnsupportedOperationException("Invalid username or password");
    }
}
