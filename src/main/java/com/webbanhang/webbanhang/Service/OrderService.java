package com.webbanhang.webbanhang.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.webbanhang.webbanhang.Dto.Shopping.OrderDto;
import com.webbanhang.webbanhang.Dto.Shopping.ProductOrderDto;
import com.webbanhang.webbanhang.Repository.PurchaseHistoryRepository;

@Service
public class OrderService {
    private PurchaseHistoryRepository purchaseHistoryRepository;
    private ImageService imageService;
    public OrderService(PurchaseHistoryRepository purchaseHistoryRepository,ImageService imageService){
        this.purchaseHistoryRepository = purchaseHistoryRepository;
        this.imageService = imageService;
    }

    public List<OrderDto> findOrders(String statusRequest){
        List<Map<String,Object>> orders = purchaseHistoryRepository.findOrders();
        OrderDto order = null;
        Map<Integer, OrderDto> orderMap = new HashMap<>();
        for(Map<String,Object> item:orders){
            Integer id = Integer.parseInt(item.get("OrderId").toString());
            Integer productId = Integer.parseInt(item.get("ProductId").toString());
            String productName = item.get("Name").toString();
            String imagePath = imageService.getImagePath(item.get("ImagePath").toString(),"");
            Integer quantity = Integer.parseInt(item.get("Quantity").toString());
            Double unitPrice = Double.parseDouble(item.get("UnitPrice").toString());
            String size = item.get("Size").toString();
            String color = item.get("Color").toString();
            order = orderMap.get(id);

            ProductOrderDto product = new ProductOrderDto();
            product.setColor(color);
            product.setName(productName);
            product.setSize(size);
            product.setId(productId);
            product.setImagePath(imagePath);
            product.setUnitPrice(unitPrice);
            product.setQuantity(quantity);
            product.setTotal(unitPrice*quantity);
            if(order==null){
                order = new OrderDto();
                String status = item.get("Status").toString();
                if(statusRequest!=null&&!statusRequest.trim().toUpperCase().equals("ALL")&&!status.trim().toUpperCase().equals(statusRequest.trim().toUpperCase())) continue;
                Double deliveryFee = Double.parseDouble(item.get("DeliveryFee").toString());
                // DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss.S");
                // LocalDateTime purchasingDate = LocalDateTime.parse(item.get("PurchasingDate").toString(),formatter);
                String address = item.get("Address").toString();
                String phone = item.get("Phone").toString();
                String fullname = item.get("Fullname").toString();
                order.setOrderId(id);
                order.setAddress(address);
                order.setStatus(status);
                order.setDeliveryFee(deliveryFee);
                // order.setPurchasingDate(purchasingDate);
                order.setPhone(phone);
                order.setFullname(fullname);
                order.setProducts(new ArrayList<>());
                order.getProducts().add(product);
                orderMap.put(id, order);
            }
            else{
                order.getProducts().add(product);
            }
        }
        List<OrderDto> orderDtos = new ArrayList<>();
        for(Map.Entry<Integer,OrderDto> entry: orderMap.entrySet()){
            orderDtos.add(entry.getValue());
        }
        return orderDtos;
          
    }
}
