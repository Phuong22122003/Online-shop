package com.webbanhang.webbanhang.Service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.webbanhang.webbanhang.Dto.Shopping.Chatbot.Rating;
import com.webbanhang.webbanhang.Dto.Shopping.SearchAI.SaveRatingRequest;
import com.webbanhang.webbanhang.Dto.Shopping.SearchAI.SearchResponseDto;

@Service
public class ChatBotService {
    private RestTemplate restTemplate;
    public ChatBotService(){
        this.restTemplate = new RestTemplate();
    }
    public String callChatBotModel(String message){
        try {
            String url = "http://localhost:5000/chat";
            HttpHeaders headers = new HttpHeaders();
            headers.set("Content-Type", "application/json");
            Map<String,String> body = new HashMap<>();
            body.put("message",message);
            HttpEntity<Map<String,String>> entity = new HttpEntity<>(body, headers);
            ResponseEntity<String> response =  restTemplate.exchange(url, HttpMethod.POST, entity, String.class);
            String jsonString = response.getBody();
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode jsonNode = objectMapper.readTree(jsonString);

            // Lấy giá trị của khóa "message"
            String responseMessage = jsonNode.get("message").asText();
            // System.out.println(responseMessage)  ;
            return responseMessage;
 

        } catch (Exception e) {
           return "Hệ thống đang gặp sự cố. Xin vui lòng thử lại sau";
        }
    }
    public void saveRating(Rating rating){
        try {
            String url = "http://localhost:5000/save-rating";
            HttpHeaders headers = new HttpHeaders();
            headers.set("Content-Type", "application/json");
            Map<String,Rating> body = new HashMap<>();
            body.put("rating",rating);
            HttpEntity<Map<String,Rating>> entity = new HttpEntity<>(body, headers);
            restTemplate.exchange(url, HttpMethod.POST, entity, String.class);
        } catch (Exception e) {
            // TODO: handle exception
        }
    }
    public String response(String message){
        
        return callChatBotModel(message);
    }
}
