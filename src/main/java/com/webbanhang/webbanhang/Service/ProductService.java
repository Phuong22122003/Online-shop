package com.webbanhang.webbanhang.Service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.webbanhang.webbanhang.Dto.ProductInfoDto;
import com.webbanhang.webbanhang.Entity.PRODUCT;
import com.webbanhang.webbanhang.Repository.ProductRepository;

@Service
public class ProductService {
    @Autowired private ProductRepository productRepository;
    
    public List<ProductInfoDto> getListProduct() {
        try{
            List<ProductInfoDto> listProduct = new ArrayList<>();
            productRepository.findAll().forEach(item->{
                listProduct.add(new ProductInfoDto(item.getImagePath(),item.getProductId(),item.getName(),item.getPrice()));
            });
            return listProduct;
        }
        catch(Exception ex){
            return null;
        }
    }
    public PRODUCT getDetailProduct(String productId) {
        try{
           return productRepository.findByProductId(productId);
        }
        catch(Exception ex){
            return null;
        }
    }
    public List<ProductInfoDto> getListProductByKeyword(String keyword) {
        try{
            List<ProductInfoDto> listProduct = new ArrayList<>();
            productRepository.findProductBykeyword(keyword).forEach(item->{
                listProduct.add(new ProductInfoDto(item.getImagePath(),item.getProductId(),item.getName(),item.getPrice()));
            });
            return listProduct;
        }
        catch(Exception ex){
            return null;
        }
    }
}
