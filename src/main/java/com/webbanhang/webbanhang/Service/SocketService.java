// package com.webbanhang.webbanhang.Service;

// import org.springframework.messaging.simp.SimpMessagingTemplate;
// import org.springframework.stereotype.Service;
// @Service
// public class SocketService {
//     private SimpMessagingTemplate simpMessagingTemplate;
//     // @Autowired
//     public SocketService(SimpMessagingTemplate simpMessagingTemplate){
//         this.simpMessagingTemplate = simpMessagingTemplate;
//     }
//     public boolean sendNotification(Integer clientId,String message){
//         try{
//             simpMessagingTemplate.convertAndSendToUser(clientId.toString(), "/queue/notifications", message);
//             return true;
//         }
//         catch(Exception ex){
//             return false;
//         }
//     }
// }
