package com.webbanhang.webbanhang.Restcontroller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.webbanhang.webbanhang.Entity.CLIENT_INFO;
import com.webbanhang.webbanhang.Service.ClientService;

@RestController
@RequestMapping("/api/client/v1/")
public class ClientRestController {
    @Autowired private ClientService clientService;
    @PostMapping("/update/profile")
    public ResponseEntity<?> saveProfile(@RequestBody CLIENT_INFO client){
        try {
            clientService.saveProfile(client);
        } catch (Exception e) {
            if(e.getMessage().contains("empty"))
                return ResponseEntity.badRequest().body(e.getMessage());
            return ResponseEntity.internalServerError().body("Server error");
        }
        return ResponseEntity.ok().body("update profile successfully");
    }
}
