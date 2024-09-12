// package com.webbanhang.webbanhang.Service;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.mail.MailException;
// import org.springframework.mail.SimpleMailMessage;
// import org.springframework.mail.javamail.JavaMailSenderImpl;
// import org.springframework.stereotype.Service;

// @Service
// public class EmailService {
//     @Autowired private JavaMailSenderImpl mailSender;
//     public boolean sendEmail(String to,String content,String subject){
//         SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
//         simpleMailMessage.setTo(to);
//         simpleMailMessage.setText(content);
//         simpleMailMessage.setSubject(subject);
//         try{
//             mailSender.send(simpleMailMessage);
//         }
//         catch (MailException ex){
//             return false;
//         }
//         catch(Exception ex){
//             return false;
//         }
//         return true;
//     }
// }
