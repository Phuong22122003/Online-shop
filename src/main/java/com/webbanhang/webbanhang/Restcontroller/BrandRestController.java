package com.webbanhang.webbanhang.Restcontroller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.webbanhang.webbanhang.Service.BrandService;

@RestController
@RequestMapping("/api/v1/brand")
public class BrandRestController {
    private BrandService brandService;
    public BrandRestController(BrandService brandService){
        this.brandService = brandService;
    }

    @GetMapping("/all")
    public ResponseEntity<?> findAllBrands(){
        return ResponseEntity.ok().body(brandService.findAllBrands());
    }
}
