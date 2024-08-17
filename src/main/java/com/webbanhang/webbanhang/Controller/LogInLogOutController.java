package com.webbanhang.webbanhang.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.webbanhang.webbanhang.Entity.CLIENT_INFO;
import com.webbanhang.webbanhang.Service.AuthService;
import com.webbanhang.webbanhang.Service.ClientService;
import com.webbanhang.webbanhang.Service.SigupService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

@Controller
public class LogInLogOutController {
    @Autowired private SigupService sigupService;
    @Autowired private ClientService clientService;
    @Autowired private AuthService authService;
    @GetMapping("/logout")
    public String logout(HttpServletRequest request, HttpServletResponse response){
        HttpSession session = request.getSession();
        session.removeAttribute("clientId");
        session.removeAttribute("role");
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null) {
            new SecurityContextLogoutHandler().logout(request, response, auth);
        }
        return "redirect:/login?logout"; // Chuyển hướng đến trang login sau khi logout
    }
    @GetMapping("/login")
    public String login(){
        return "login";
    }
    @PostMapping("/customlogin")
    public String custom(@RequestParam("username")String username, @RequestParam("password")String password){
        return "home";
    }
    @GetMapping("/sigup")
    public String sigup(){
        return "sigup";
    }
    
    @PostMapping("/sigup")
    public String sigupPost(CLIENT_INFO info,HttpSession session,Model model){
        boolean checkError = false;
        if(info.getEmail().trim().isEmpty())
        {
            checkError = true;
            model.addAttribute("emailError","email không được để trống");
        }
        else if(clientService.findClientByEmail(info.getEmail())!=null)
        {
            checkError = true;
            model.addAttribute("emailError","email đã được sử dụng");
        }
        if(info.getFirstname().trim().isEmpty())
        {
            checkError = true;
            model.addAttribute("firstnameError","Tên không được để trống");
        }
        if(info.getLastname().trim().isEmpty())
        {
            checkError = true;
            model.addAttribute("lastnameError","Tên không được để trống");
        }
        if(checkError == true){
            return "sigup";
        }

        session.setAttribute("info", info);
        
        return "redirect:/validate-code";
    }

    @GetMapping("/validate-code")
    public String validate(HttpSession session, RedirectAttributes model){
        CLIENT_INFO client = (CLIENT_INFO) session.getAttribute("info");
        if(client == null){
            model.addFlashAttribute("message", "Không thể gửi mã xác thực");
            return "redirect:/sigup";
        }
        try{
            String code= sigupService.sendCode(client.getEmail());
            session.setAttribute("code",code);
            return "validate";
        }
        catch(Exception ex){
            model.addFlashAttribute("message","Gửi mã xác thực thất bại");
            session.removeAttribute("info");
            return "redirect:/sigup";
        }

    }
    @PostMapping("/validate-code")
    public String validatePost(@RequestParam String code,HttpSession session,RedirectAttributes redirect){
        if(session.getAttribute("code")==null){
            redirect.addFlashAttribute("message","Mã xác thực đã hết hiệu lực");
            session.removeAttribute("info");
            return "redirect:/sigup";
        }
        String originalCode= session.getAttribute("code").toString();
        boolean check =  sigupService.isSameCode(code, originalCode);
        if(check == true){
            return "redirect:/add-user";
        }
        else {
            redirect.addFlashAttribute("error", "Mã không giống nhau");
            return "redirect:/validate-code";
        }
    }
    @GetMapping("add-user")
    public String addUser(HttpSession session,RedirectAttributes redirect){
        CLIENT_INFO client = (CLIENT_INFO) session.getAttribute("info");
        if(client == null){
            redirect.addFlashAttribute("message", "Vui lòng điền thông tin");
            session.removeAttribute("info");
            session.removeAttribute("code");
            return "redirect:/sigup";
        }
        return "add-user";
    }
    @PostMapping("add-user")
    public String addUserPost(@RequestParam String originalPassword, @RequestParam String confirmPassword,@RequestParam String username ,HttpSession session, RedirectAttributes redirect){
        CLIENT_INFO client = (CLIENT_INFO) session.getAttribute("info");
        if(client == null){
            redirect.addFlashAttribute("message", "Vui lòng điền thông tin");
            session.removeAttribute("info");
            session.removeAttribute("code");
            return "redirect:/sigup";
        }
        if(clientService.findClientByUsername(username)!=null){
            redirect.addFlashAttribute("error","Tên đăng nhập đã được sử dụng");
            return "redirect:/add-user";
        }
        if(sigupService.isSameCode(originalPassword, confirmPassword)){
            client.setUsername(username);
            client.setIsEditUsername(false);
            client.setRole("USER");
            client.setPassword(originalPassword);
            
            if(!sigupService.addUser(client)){
                redirect.addFlashAttribute("message","Không thể tạo tài khoảng");
                session.removeAttribute("info");
                session.removeAttribute("code");
                return "redirect:/sigup";
            }
            try{
                authService.autoLogin(username, originalPassword, session);
                return "redirect:/profile";
            }
            catch(Exception ex){
                return "redirect:/login";
            }
        }
        redirect.addFlashAttribute("error","Mật khẩu không khơp");
        return "redirect:/add-user";
    }
}
