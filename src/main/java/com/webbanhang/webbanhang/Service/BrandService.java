package com.webbanhang.webbanhang.Service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.webbanhang.webbanhang.Entity.Brand;
import com.webbanhang.webbanhang.Repository.BrandRepository;

@Service
public class BrandService {
    private BrandRepository brandRepository;
    public BrandService(BrandRepository brandRepository){
        this.brandRepository = brandRepository;
    }
    public List<Brand> findAllBrands(){
        return brandRepository.findAll();
    }
}
