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
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.webbanhang.webbanhang.Entity.CLIENT_INFO;
import com.webbanhang.webbanhang.Repository.ClientInfoRepository;

@Service
public class ClientDetail implements UserDetailsService{
    @Autowired private PasswordEncoder passwordEncoder;
    @Autowired private ClientInfoRepository clientInfoRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        List<GrantedAuthority> grantList = new ArrayList<GrantedAuthority>();
        CLIENT_INFO client =  clientInfoRepository.findByUsername(username);
        if(client != null){
            GrantedAuthority authority = new SimpleGrantedAuthority(client.getRole());
            grantList.add(authority);
           // System.out.println(passwordEncoder.encode(client.getPassword()));
            return new User(username,client.getPassword() , grantList);
        }
        
        throw new UnsupportedOperationException("Invalid username or password");
    }
}
