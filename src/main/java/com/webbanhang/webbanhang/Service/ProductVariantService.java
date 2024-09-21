package com.webbanhang.webbanhang.Service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.webbanhang.webbanhang.Entity.ProductVariant;
import com.webbanhang.webbanhang.Repository.ProductVariantRepository;

@Service
public class ProductVariantService {
    private ProductVariantRepository productVariantRepository;
    public ProductVariantService(ProductVariantRepository productVariantRepository){
        this.productVariantRepository = productVariantRepository;
    }

    public List<ProductVariant> saveAll(List<ProductVariant>productVariants){
        return productVariantRepository.saveAll(productVariants);
    }
}
