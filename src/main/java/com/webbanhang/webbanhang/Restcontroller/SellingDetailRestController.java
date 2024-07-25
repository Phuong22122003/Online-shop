package com.webbanhang.webbanhang.Restcontroller;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.webbanhang.webbanhang.Dto.CustomerOrderDto;
import com.webbanhang.webbanhang.Entity.SELLING_DETAIL;
import com.webbanhang.webbanhang.Service.ProductService;
import com.webbanhang.webbanhang.Service.SellingDetailService;

import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/selling-detail")
public class SellingDetailRestController {
    @Autowired private SellingDetailService sellingDetailService;
    @Autowired private ProductService productService;
    /*
     * Using for clients buy product
     */
    @PostMapping("/buy")
    public ResponseEntity<String> buy(@RequestBody List<SELLING_DETAIL> sellingDetails,HttpSession session){
        Integer clientId = Integer.parseInt(session.getAttribute("clientId").toString());
        Integer price;
        for(SELLING_DETAIL sellingDetail: sellingDetails){
            sellingDetail.setClientId(clientId);
            sellingDetail.setStatus("IN TRANSIT");
            sellingDetail.setSellingDate(LocalDateTime.now());
            price = productService.getDetailProduct(sellingDetail.getProductId()).getPrice();
           if(!price.equals(sellingDetail.getPrice()))
                return ResponseEntity.badRequest().body("Price was changed! Please reload your page");
           
           if(sellingDetail.getAddress().trim().isEmpty())
                return ResponseEntity.badRequest().body("Address is empty");
            

        }
        try{
            sellingDetailService.buyProduct(sellingDetails);
        }
        catch(Exception ex){
            return ResponseEntity.internalServerError().body("Can not buy: " +ex.getMessage());
        }
        return ResponseEntity.ok().body("Buy successfully");
    }
    @GetMapping("/customer-order")
    public List<CustomerOrderDto> customerOrder(HttpSession session){
        Integer clientId = Integer.parseInt(session.getAttribute("clientId").toString());
        return sellingDetailService.getCustomerOrder(clientId);
    }
}
