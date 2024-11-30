// package com.webbanhang.webbanhang.Restcontroller;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.RequestBody;
// import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RestController;

// import com.webbanhang.webbanhang.Service.ChatBotService;

// @RestController
// @RequestMapping("/api/v1/chatbot")
// public class ChatBotRestController {
//     @Autowired ChatBotService chatBotService;
//     @PostMapping("/conversation")
//     public ResponseEntity<?> chat(@RequestBody String message){
//         String responseMessage = chatBotService.response(message);
//         return ResponseEntity.ok().body(responseMessage);
//     }
// }
