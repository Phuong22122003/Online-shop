package com.webbanhang.webbanhang.Restcontroller;

import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;

import com.webbanhang.webbanhang.Dto.ResponseDto;
import com.webbanhang.webbanhang.Dto.RoleDto;
import com.webbanhang.webbanhang.Entity.User;
import com.webbanhang.webbanhang.Service.UserService;

import jakarta.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
@RequestMapping("/api/v1/authentication")
public class AuthenticationRestControlle {
    @Autowired private UserService userService;
    @GetMapping("is-loggedin")
    public ResponseEntity<Boolean> isLoggedIn(HttpSession session){
        Object email = session.getAttribute("email");
        return ResponseEntity.ok().body(email!=null);
    }
    @GetMapping("get-role")
    public ResponseEntity<?> getRole(HttpSession session){
        Object email = session.getAttribute("email");
        RoleDto role = new RoleDto();
        role.setIsLoggedIn(false);
        if(email != null){
            role.setIsLoggedIn(true);
            role.setRole(userService.findUserByEmail(email.toString()).getRole());
        }
        return ResponseEntity.ok().body(role);
    }
    @PostMapping("/sigup")
    public ResponseEntity<?> sigup(@RequestBody User user){
        ResponseDto response = userService.saveUser(user);
        return ResponseEntity.ok().body(response);
    }
    @PostMapping("/send-otp")
    public ResponseEntity<?> forgotPassword(@RequestBody String email,HttpSession session){
        ResponseDto response = userService.sendOtp(email,session);
        return ResponseEntity.ok().body(response);
    }
    @PostMapping("/update-password")
    public ResponseEntity<?> updatePassword(@RequestBody String otp,HttpSession session){

        ResponseDto responseDto = userService.updatePassword(otp,session);
        return ResponseEntity.ok().body(responseDto);
    }
}
