package com.webbanhang.webbanhang.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.webbanhang.webbanhang.Dto.CustomerOrderDto;
import com.webbanhang.webbanhang.Dto.OrderDetail;
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
    @Transactional
    public void cancleOrder(CustomerOrderDto customerOrderDto, Integer clientId){
        sellingDetailRepository.cancleOrder(customerOrderDto.getProductId(),clientId,customerOrderDto.getAddress(),customerOrderDto.getProductPrice(),customerOrderDto.getProductQuantity());
    }
    public List<CustomerOrderDto> getCustomerOrder(Integer clientId){
        List<SELLING_DETAIL> sellingDetails =  sellingDetailRepository.findClientOrderByClientId(clientId);
        List<CustomerOrderDto> customerOrderDto = new ArrayList<>();
        sellingDetails.forEach((item)->{
                customerOrderDto.add(new CustomerOrderDto(item.getProductId(), item.getProduct().getName(), item.getStatus(),item.getPrice(),item.getAddress(), item.getQuantity(),item.getProduct().getImagePath()));
            }
        );
        return customerOrderDto;
    }
    public List<OrderDetail> orderDetails(Integer clientId){
        List<Map<String,Object>> queryResult = sellingDetailRepository.orDetails(clientId);
        System.out.println('a');
        List<OrderDetail> results = new ArrayList<>();
        OrderDetail temp = null;
        for(Map<String,Object> row : queryResult){
            temp = new OrderDetail();
            temp.setClientId(Double.valueOf(row.get("CLIENT_ID").toString()));
            temp.setPurchasingDate(row.get("SELLING_DATE").toString());
            temp.setUnitPrice(Double.valueOf(row.get("PRICE").toString()));
            temp.setQuantity(Double.valueOf(row.get("QUANTITY").toString()));
            temp.setStatus(row.get("STATUS").toString());
            temp.setProductName(row.get("PRODUCT_NAME").toString());
            temp.setProductId(row.get("PRODUCT_ID").toString());
            temp.setTotal(temp.getUnitPrice()* temp.getQuantity());
            results.add(temp);
        }
        return results;
    }
}
