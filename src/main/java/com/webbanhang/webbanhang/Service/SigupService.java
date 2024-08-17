package com.webbanhang.webbanhang.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.webbanhang.webbanhang.Entity.CLIENT_INFO;

@Service
public class SigupService {
    @Autowired private ClientService clientService;
    @Autowired private CommonService commonService;
    @Autowired private EmailService emailService;
    @Autowired private PasswordEncoder passwordEncoder;
    public boolean isSameCode(String code1,String code2){
        return code1.equals(code2);
    }
    public String sendCode(String to) throws Exception{
        String code = commonService.randomNumber();
        String subject = "Mã xác thực";
        if(emailService.sendEmail(to,code,subject)){
            return code;
        }
        else throw new Exception("Can not send email");
    }
    public boolean addUser(CLIENT_INFO user){

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        try {
            clientService.addClient(user);
        } catch (Exception e) {
            return false;
        }
        return true;
    }
}
