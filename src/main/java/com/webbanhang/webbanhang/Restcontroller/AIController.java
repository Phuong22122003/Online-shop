package com.webbanhang.webbanhang.Restcontroller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.webbanhang.webbanhang.Dto.Shopping.Chatbot.Rating;
import com.webbanhang.webbanhang.Dto.Shopping.SearchAI.SaveRatingRequest;
import com.webbanhang.webbanhang.Service.ChatBotService;
import com.webbanhang.webbanhang.Service.SearchByDescService;

@RestController
@RequestMapping("/api/v1/ai")
public class AIController {
    @Autowired private SearchByDescService searchByDescService;
    @Autowired ChatBotService chatBotService;
    @PostMapping("/save-rating")
    public ResponseEntity<?> saveRating(@RequestBody SaveRatingRequest request){
        // System.out.println("save");
        searchByDescService.saveRatingRequest(request);
        return ResponseEntity.ok().body(null);
    }
    @PostMapping("/conversation")
    public ResponseEntity<?> chat(@RequestBody String message){
        String responseMessage = chatBotService.response(message);
        return ResponseEntity.ok().body(responseMessage);
    }
    @PostMapping("/save-message")
    public ResponseEntity<?> saveMessage(@RequestBody Rating rating){
        chatBotService.saveRating(rating);
        return ResponseEntity.ok().body("");
    }
}
