package com.webbanhang.webbanhang.Restcontroller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.webbanhang.webbanhang.Service.ColorOptionService;

@RestController
@RequestMapping("/api/v1/color-option")
public class ColorOptionRestController {
    public ColorOptionService colorOptionService;
    public ColorOptionRestController(ColorOptionService colorOptionService){
        this.colorOptionService = colorOptionService;
    }
    @GetMapping("/all")
    public ResponseEntity<?> findAll(){
        return ResponseEntity.ok().body(colorOptionService.findAllOptions());
    }
}
