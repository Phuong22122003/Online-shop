package com.webbanhang.webbanhang.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.webbanhang.webbanhang.Dto.User.Buy.BuyRequestDto;
import com.webbanhang.webbanhang.Dto.User.Profile.Order;
import com.webbanhang.webbanhang.Dto.User.Profile.UserOrdersDto;
import com.webbanhang.webbanhang.Entity.Address;
import com.webbanhang.webbanhang.Entity.PurchaseHistory;
import com.webbanhang.webbanhang.Entity.PurchaseHistoryDetail;
import com.webbanhang.webbanhang.Entity.User;
import com.webbanhang.webbanhang.Repository.UserRepository;

enum Status{
    PREPAREING,
    CANCELLED,
    INPROCESS,
    DELIVERED
}
@Service
public class UserService {
    private UserRepository userRepository;
    private PurchaseHistoryService purchaseHistoryService;
    private PurchaseHistoryDetailService purchaseHistoryDetailService;
    private AddressService addressService;
    private ImageService imageService;
    private ProductVariantService productVariantService;
    public UserService(ProductVariantService productVariantService,AddressService addressService,
                    ImageService imageService,
                    UserRepository userRepository,PurchaseHistoryService purchaseHistoryService,
                    PurchaseHistoryDetailService purchaseHistoryDetailService){
        this.userRepository = userRepository;
        this.imageService = imageService;
        this.addressService = addressService;
        this.purchaseHistoryService = purchaseHistoryService;
        this.purchaseHistoryDetailService= purchaseHistoryDetailService;
        this.productVariantService = productVariantService;
    }   
    public User findUserByEmail(String email){
        return userRepository.findUserByEmail(email);
    }
    public List<UserOrdersDto> findUserOrdersByEmail(String email){
        List<Map<String,Object>> rows =  userRepository.findUserOdersByEmail(email);
        List<UserOrdersDto> userOrders = new ArrayList<>();
        UserOrdersDto userOrder;
        Map<Integer, UserOrdersDto> uniqueOrder = new HashMap<>();
        for(Map<String,Object> row:rows){
            Integer orderId = Integer.parseInt(row.get("OrderId").toString());
            if(uniqueOrder.containsKey(orderId))
                userOrder = uniqueOrder.get(orderId);
            else{
                userOrder = new UserOrdersDto();
                Integer addressId = Integer.parseInt(row.get("AddressId").toString());
                Address address = addressService.findAddressById(addressId);
                userOrder.setAddress(address);
                userOrder.setOrderId(orderId);
               // userOrder.setOrderId(Integer.parseInt(row.get("OrderDetailId").toString()));
                userOrder.setDeliveryFee(Double.parseDouble(row.get("DeliveryFee").toString()));
                userOrder.setStatus(row.get("Status").toString());
                userOrder.setOrders(new ArrayList<>());
                userOrder.setGrandTotal(userOrder.getDeliveryFee());
                uniqueOrder.put(orderId, userOrder);
                userOrders.add(userOrder);
                
            }
            Order order = new Order();
            order.setProductId(Integer.parseInt(row.get("ProductId").toString()));
            order.setIsCommented(row.get("IsCommented").toString().equals("1"));
            order.setOrderDetailId(Integer.parseInt(row.get("OrderDetailId").toString()));
            order.setName(row.get("Name").toString());
            order.setImagePath(imageService.getImagePath(row.get("ImagePath").toString(),""));
            order.setSize(row.get("Size").toString());
            order.setColor(row.get("Color").toString());
            order.setQuantity(Integer.parseInt(row.get("Quantity").toString()));
            order.setPrice(Double.valueOf(row.get("Price").toString()));
            userOrder.setGrandTotal(userOrder.getGrandTotal() + order.getPrice() * order.getQuantity());
            userOrder.getOrders().add(order);
        }
        return userOrders;
    }
    @Transactional(rollbackFor = Exception.class)
    public void buy(BuyRequestDto buyRequestDto){
        PurchaseHistory purchaseHistory = new PurchaseHistory();
        purchaseHistory.setAddressId(buyRequestDto.getAddressId());
        purchaseHistory.setDeliveryFee(buyRequestDto.getDeliveryFee());
        purchaseHistory.setEmail(buyRequestDto.getEmail());
        purchaseHistory.setPurchaseDate(LocalDateTime.now());
        purchaseHistory.setExpectedDate(LocalDateTime.now());
        purchaseHistory.setStatus("Preparing");
        
        PurchaseHistory savedHistory =  purchaseHistoryService.save(purchaseHistory);
        
        for(PurchaseHistoryDetail purchaseHistoryDetail: buyRequestDto.getPurchaseHistoryDetails()){
            purchaseHistoryDetail.setPurchaseHistoryId(savedHistory.getId());
            productVariantService.subtractProductVariantQuantity(purchaseHistoryDetail.getProductVariantId(),purchaseHistoryDetail.getQuantity());
        }
        
        purchaseHistoryDetailService.saveAll(buyRequestDto.getPurchaseHistoryDetails());

    }

    @Transactional(rollbackFor = Exception.class)
    public void cancelOrder(Integer orderId){
        purchaseHistoryService.cancelOrder(orderId);
        productVariantService.restoreProductQuantity(orderId);
    }
}
