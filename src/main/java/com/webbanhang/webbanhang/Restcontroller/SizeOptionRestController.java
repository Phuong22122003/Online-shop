package com.webbanhang.webbanhang.Restcontroller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.webbanhang.webbanhang.Service.SizeOptionService;

@RestController
@RequestMapping("/api/v1/size-option")
public class SizeOptionRestController {
    private SizeOptionService sizeOptionService;
    public SizeOptionRestController(SizeOptionService sizeOptionService){
        this.sizeOptionService = sizeOptionService;
    }
    @GetMapping("/all")
    public ResponseEntity<?> findAll(){
        return ResponseEntity.ok().body(sizeOptionService.findAllOptions());
    }
}
