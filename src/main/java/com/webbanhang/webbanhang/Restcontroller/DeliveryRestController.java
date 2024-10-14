package com.webbanhang.webbanhang.Restcontroller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.webbanhang.webbanhang.Dto.ResponseDto;
import com.webbanhang.webbanhang.Dto.Delivery.OrderStatus;
import com.webbanhang.webbanhang.Dto.Delivery.Address.District;
import com.webbanhang.webbanhang.Dto.Delivery.Address.Province;
import com.webbanhang.webbanhang.Dto.Delivery.Address.Ward;
import com.webbanhang.webbanhang.Dto.Delivery.DeliveryFee.ToAddress;
import com.webbanhang.webbanhang.Service.DeliveryService;

@RestController
@RequestMapping("/api/v1/delivery/")
public class DeliveryRestController {
    
    @Autowired private DeliveryService deliveryService;
    
    @PostMapping("/fee")
    public Integer deliveryFee(@RequestBody ToAddress toAddress){
        return deliveryService.calculateDeliveryFee(toAddress);
    }
    
    @PostMapping("/shipping-order/create")
    public void createOrder(@RequestBody Integer orderId){
        deliveryService.createOrder(orderId);
    }

    @PostMapping("order-status")
    public ResponseEntity<List<OrderStatus>> getOrderStatus(@RequestParam String orderId){
        try {
            List<OrderStatus> status = deliveryService.getOrderStatus(orderId);
            return ResponseEntity.ok().body(status);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(null);
        }
    }

    @GetMapping("/address/provices")
    public ResponseEntity<List<Province>> getProvinces(){
        try {
            List<Province> provinces = deliveryService.getProvinces();
            return ResponseEntity.ok().body(provinces);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(null);
        } 
    } 

    @GetMapping("/address/districts")
    public ResponseEntity<List<District>> getDistricts(@RequestParam Integer provinceId){
        try {
            List<District> districts = deliveryService.getDistricts(provinceId);
            return ResponseEntity.ok().body(districts);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(null);
        }
    }
    @GetMapping("/address/wards")
    public ResponseEntity<List<Ward>> getWards(@RequestParam Integer districtId){
        try {
            List<Ward> wards = deliveryService.getWards(districtId);
            return ResponseEntity.ok().body(wards);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(null);
        }
    }
}
