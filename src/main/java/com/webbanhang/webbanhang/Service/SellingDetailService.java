package com.webbanhang.webbanhang.Service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.webbanhang.webbanhang.Dto.CustomerOrderDto;
import com.webbanhang.webbanhang.Entity.SELLING_DETAIL;
import com.webbanhang.webbanhang.Repository.SellingDetailRepository;

import jakarta.transaction.Transactional;

@Service
public class SellingDetailService {
    @Autowired private SellingDetailRepository sellingDetailRepository;
    @Transactional
    public void buyProduct(List<SELLING_DETAIL> sellingDetails){
        sellingDetailRepository.saveAll(sellingDetails);
    }
    public List<CustomerOrderDto> getCustomerOrder(Integer clientId){
        List<SELLING_DETAIL> sellingDetails =  sellingDetailRepository.findAll();
        List<CustomerOrderDto> customerOrderDto = new ArrayList<>();
        sellingDetails.forEach((item)->{
                customerOrderDto.add(new CustomerOrderDto(item.getProductId(), item.getProduct().getName(), item.getStatus(),item.getPrice(),item.getAddress(), item.getQuantity(),item.getProduct().getImagePath()));
            }
        );
        return customerOrderDto;
    }
}
