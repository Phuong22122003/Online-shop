package com.webbanhang.webbanhang.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.webbanhang.webbanhang.Dto.ClientStockDto;
import com.webbanhang.webbanhang.Dto.ProductInfoDto;
import com.webbanhang.webbanhang.Entity.PRODUCT;
import com.webbanhang.webbanhang.Repository.ProductRepository;

import jakarta.transaction.Transactional;

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
    public List<ProductInfoDto> getOtherProductExceptThisId(String productId){
        List<ProductInfoDto> products = getListProduct();
        if(products!=null)
            products.removeIf((product)->product.getProductId().trim().toUpperCase().equals(productId.trim().toUpperCase()));
        return products;
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
    public List<ClientStockDto> getClientStock(Integer clientId){
        try{
            List<ClientStockDto> listClientStock = new ArrayList<>();
            productRepository.getClientStock(clientId).forEach(item->{
                listClientStock.add(new ClientStockDto(item.getProductId(),item.getImagePath(),item.getName(),item.getPrice(),item.getQuantity()));
            });
            return listClientStock;
        }
        catch(Exception ex){
            return null;
        }
    }
    @Transactional
    public void updateQuantity(String productId ,Integer quantity){
        productRepository.updateQuantity(quantity, productId);
    }
    @Transactional
    public void updatePrice(String productId, Integer price){
        productRepository.updatePrice(price, productId);
    }
    @Transactional
    public void updateDescription(String productId, String description){

        productRepository.updateDescription(description, productId);
    }
    @Transactional
    public void updateName(String productId, String name){
        productRepository.updateName(productId,name);
    }
    @Transactional
    public void addProduct(PRODUCT product)
    {
        productRepository.save(product);
    }
}
