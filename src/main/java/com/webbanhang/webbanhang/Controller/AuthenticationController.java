package com.webbanhang.webbanhang.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import jakarta.servlet.http.HttpSession;

@Controller
public class AuthenticationController {
    @GetMapping("/login")
    public String getLoginPage(HttpSession session){
        Object email = session.getAttribute("email");
        if(email == null)
            return "/login/login";
        else 
            return "redirect:/home";
    }

    @GetMapping("/sigup")
    public String getSigupPage(){
        return "/login/sigup";
    }

    @GetMapping("/forgot-password")
    public String forgotPassword(){
        return "/login/forgot-password";
    }
    @GetMapping("/enter-otp")
    public String enterOtpPage(){
        return "/login/enter-otp";
    }
}
