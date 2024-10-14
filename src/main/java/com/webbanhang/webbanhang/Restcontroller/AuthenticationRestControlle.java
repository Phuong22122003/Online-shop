package com.webbanhang.webbanhang.Restcontroller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpSession;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;



@RestController
@RequestMapping("/api/v1/authentication")
public class AuthenticationRestControlle {
    @GetMapping("is-loggedin")
    public ResponseEntity<Boolean> isLoggedIn(HttpSession session){
        Object email = session.getAttribute("email");
        return ResponseEntity.ok().body(email!=null);
    }
}
