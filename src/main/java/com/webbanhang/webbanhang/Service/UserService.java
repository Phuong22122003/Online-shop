package com.webbanhang.webbanhang.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.webbanhang.webbanhang.Dto.UserOrdersDto;
import com.webbanhang.webbanhang.Entity.User;
import com.webbanhang.webbanhang.Repository.UserRepository;

@Service
public class UserService {
    private UserRepository userRepository;
    public UserService(UserRepository userRepository){
        this.userRepository = userRepository;
    }   
    public User findUserByEmail(String email){
        return userRepository.findById(email).get();
    }
    public List<UserOrdersDto> findUserOrdersByEmail(String email){
        List<Map<String,Object>> rows =  userRepository.findUserOdersByEmail(email);
        List<UserOrdersDto> userOrders = new ArrayList<>();
        UserOrdersDto userOrder;
        for(Map<String,Object> row:rows){
            userOrder = new UserOrdersDto();
            userOrder.setOrderId(Integer.parseInt(row.get("OrderId").toString()));
            userOrder.setName(row.get("Name").toString());
            userOrder.setImagePath(row.get("ImagePath").toString());
            userOrder.setSize(row.get("Size").toString());
            userOrder.setColor(row.get("Color").toString());
            userOrder.setQuantity(Integer.parseInt(row.get("Quantity").toString()));
            userOrder.setPrice(Double.valueOf(row.get("Price").toString()));
            userOrder.setStatus(row.get("Status").toString());
            userOrders.add(userOrder);
        }
        return userOrders;
    }
}
