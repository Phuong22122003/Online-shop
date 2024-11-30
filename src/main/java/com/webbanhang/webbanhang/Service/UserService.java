package com.webbanhang.webbanhang.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.webbanhang.webbanhang.Dto.ResponseDto;
import com.webbanhang.webbanhang.Dto.Delivery.OrderStatus;
import com.webbanhang.webbanhang.Dto.User.Buy.BuyRequestDto;
import com.webbanhang.webbanhang.Dto.User.Profile.Order;
import com.webbanhang.webbanhang.Dto.User.Profile.UserOrdersDto;
import com.webbanhang.webbanhang.Entity.Address;
import com.webbanhang.webbanhang.Entity.PurchaseHistory;
import com.webbanhang.webbanhang.Entity.PurchaseHistoryDetail;
import com.webbanhang.webbanhang.Entity.User;
import com.webbanhang.webbanhang.Repository.UserRepository;

import jakarta.servlet.http.HttpSession;

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
    private PasswordEncoder encoder;
    private EmailService emailService;
    private RandomStringService randomService;
    private DeliveryService deliveryService;
    public UserService(DeliveryService deliveryService,
                    EmailService emailService,
                    RandomStringService randomService,
                    PasswordEncoder encoder,
                    ProductVariantService productVariantService,
                    AddressService addressService,
                    ImageService imageService,
                    UserRepository userRepository,
                    PurchaseHistoryService purchaseHistoryService,
                    PurchaseHistoryDetailService purchaseHistoryDetailService
                    ){
        this.encoder = encoder;
        this.emailService = emailService;
        this.randomService = randomService;
        this.userRepository = userRepository;
        this.imageService = imageService;
        this.addressService = addressService;
        this.purchaseHistoryService = purchaseHistoryService;
        this.purchaseHistoryDetailService= purchaseHistoryDetailService;
        this.productVariantService = productVariantService;
        this.deliveryService = deliveryService;
    }   
    public User findUserByEmail(String email){
        return userRepository.findUserByEmail(email);
    }

    public void addGoogleUser(OAuth2User ggUser){
        User user = new User();
        user.setEmail(ggUser.getAttribute("email"));
        user.setFirstname(ggUser.getAttribute("given_name"));
        user.setLastname(ggUser.getAttribute("family_name"));
        String password = randomService.randomNumber();
        password = encoder.encode(password);
        user.setPassword(password);
        user.setRole("Customer");
        addUser(user);
    }
    public void addUser(User user){
        userRepository.save(user);
    }

    @Deprecated
    /**
     * Không dùng cái này nữa chuyển qua dùng bên order service.
     * Lý do: Đặt sai chỗ.
     * @param email
     * @return
     */
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
                String status = row.get("Status").toString();
                if(status.toLowerCase().trim().equals("inprocess")||
                    status.toLowerCase().trim().equals("preparing")){
                    String orderCode = row.get("DeliveryOrderId").toString();
                    try {
                        List<OrderStatus> realStatus = deliveryService.getOrderStatus(orderCode);
                        OrderStatus curentStatus = realStatus.get(realStatus.size()-1);
                        if(status.toLowerCase().trim().equals("preparing")&&
                            curentStatus.getStatus().toLowerCase().trim().equals("picked")){
                            purchaseHistoryService.updateOrderStatus(orderId, "InProcess");
                            status = "Inprocess";
                        }
                        else
                            if(status.toLowerCase().trim().equals("inprocess")&&
                                curentStatus.getStatus().toLowerCase().trim().equals("delivered")){
                                purchaseHistoryService.updateOrderStatus(orderId, "Delivered");
                                status = "Delivered";
                            }
                        else 
                        //Nghiệp vụ sẽ còn nhiều công đoạn hơn như chờ giao lại -> lên trang người ghn xác nhận chờ giao lại
                        // Trong hệ thống sẽ đang vận chuyển. Cho đến khi không giao được nữa thì cập nhật là cancelled
                            if(curentStatus.getStatus().toLowerCase().trim().equals("return")){
                                purchaseHistoryService.updateOrderStatus(orderId, "Cancelled");
                                status = "Cancelled";
                            }
                                
                    } catch (Exception e) {
                        status = "Unknow";
                    }
                }   
                Integer addressId = Integer.parseInt(row.get("AddressId").toString());
                Address address = addressService.findAddressById(addressId);
                userOrder.setAddress(address);
                userOrder.setOrderId(orderId);
               // userOrder.setOrderId(Integer.parseInt(row.get("OrderDetailId").toString()));
                userOrder.setDeliveryFee(Double.parseDouble(row.get("DeliveryFee").toString()));
                userOrder.setStatus(status);
                userOrder.setOrders(new ArrayList<>());
                userOrder.setGrandTotal(userOrder.getDeliveryFee());
                DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss.SSS");
                String purchaseDate = row.get("PurchaseDate").toString();
                if(purchaseDate.length()==22){
                    purchaseDate += "0";
                }
                LocalDate date = LocalDate.parse(purchaseDate, formatter);
                userOrder.setPurchaseDate(date);
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
    @Deprecated
    /**
     * Dùng bên order service. có hàm tương tự
     * @param email
     * @param from
     * @param to
     * @return
     */
    public List<UserOrdersDto> findOrderByDate(String email, LocalDate from, LocalDate to){
        List<UserOrdersDto> orders = findUserOrdersByEmail(email);
        orders.removeIf(order-> order.getPurchaseDate().isAfter(to)|| order.getPurchaseDate().isBefore(from));
        return orders;
    }
    /**
     * Dùng bên orderservice
     * @param order
     * @param key
     * @return
     */
    @Deprecated
    private Boolean isContainedKey(UserOrdersDto order,String key){
        if(order.getOrderId().toString().equals(key)) return true;
        for(Order o: order.getOrders()){
            if(o.getName().toLowerCase().contains(key.toLowerCase()))return true;
        }
        return false;
    }
    /**
     * Dùng bên orderservice
     * @param email
     * @param key
     * @return
     */
    @Deprecated
    public List<UserOrdersDto> findOrderByKey(String email,String key){
        List<UserOrdersDto> orders = findUserOrdersByEmail(email);
        orders.removeIf(order-> 
            !isContainedKey(order, key)
        );
        return orders;
    }
    @Transactional(rollbackFor = Exception.class)
    public void buy(BuyRequestDto buyRequestDto){
        PurchaseHistory purchaseHistory = new PurchaseHistory();
        purchaseHistory.setAddressId(buyRequestDto.getAddressId());
        purchaseHistory.setDeliveryFee(buyRequestDto.getDeliveryFee());
        purchaseHistory.setEmail(buyRequestDto.getEmail());
        purchaseHistory.setPurchaseDate(LocalDateTime.now());
        purchaseHistory.setExpectedDate(LocalDateTime.now());
        purchaseHistory.setStatus("Confirming");
        
        PurchaseHistory savedHistory =  purchaseHistoryService.save(purchaseHistory);
        
        for(PurchaseHistoryDetail purchaseHistoryDetail: buyRequestDto.getPurchaseHistoryDetails()){
            purchaseHistoryDetail.setPurchaseHistoryId(savedHistory.getId());
            productVariantService.subtractProductVariantQuantity(purchaseHistoryDetail.getProductVariantId(),purchaseHistoryDetail.getQuantity());
        }
        
        purchaseHistoryDetailService.saveAll(buyRequestDto.getPurchaseHistoryDetails());

    }

    @Deprecated
    /**
     * Chuyển qua order service
     * @param orderId
     */
    @Transactional(rollbackFor = Exception.class)
    public void cancelOrder(Integer orderId){
        PurchaseHistory order = purchaseHistoryService.findPurchaseHistoryById(orderId);
        if(order.getStatus().toLowerCase().trim().equals("preparing")){
            deliveryService.cancelOrder(order.getDeliveryOrderId());
        }
        purchaseHistoryService.cancelOrder(orderId);
        productVariantService.restoreProductQuantity(orderId);
    }

    // Add new user
    public ResponseDto saveUser(User user){
        user.setRole("User");
        user.setPassword(encoder.encode(user.getPassword()));
        ResponseDto response = new ResponseDto();
        if(userRepository.findUserByEmail(user.getEmail())!=null){
            response.setError(true);
            response.setMessage("Email đã tồn tại");
            return response;
        }
        try {
            userRepository.save(user);
            response.setError(false);
            response.setMessage("Save successfully");
        } catch (Exception e) {
            response.setError(true);
            response.setMessage(e.getMessage());
        }
        return response;
    }

    public ResponseDto sendOtp(String email,HttpSession session){
        ResponseDto response = new ResponseDto();
        response.setError(true);
        User user = userRepository.findUserByEmail(email);
        if(user==null){
                response.setMessage("Email chưa được đăng ký");
        }
        else{
            String otp = randomService.randomNumber();
            Boolean check = emailService.sendEmail(email,otp,"OTP");
            session.setAttribute("otp", otp);
            session.setAttribute("temp-email", email);
            if(check == true){
                response.setMessage("Đã gửi OTP tới email: " +email);
            }
            else response.setMessage("Lỗi hệ thống");
            response.setError(!check);
        }
        return response;
    }
    public ResponseDto updatePassword(String optRequest,HttpSession session){
        Object email = session.getAttribute("temp-email");
        Object otp = session.getAttribute("otp");
        ResponseDto response = new ResponseDto();
        response.setError(true);
        if(email==null) {
            response.setMessage("Hết thời hạn kiểm tra otp");
            return response;
        }
        if(otp==null||!otp.toString().equals(optRequest)){
            response.setMessage("OTP không khớp");
            return response;
        }
        
        User user = userRepository.findUserByEmail(email.toString());
        String password = randomService.randomString();
        Boolean isSent = emailService.sendEmail(email.toString(), password, "New Password");
        if(isSent == true){
            response.setError(false);
            response.setMessage("Đổi thành công");
            
            password = encoder.encode(password);
            user.setPassword(password);
            userRepository.save(user);
        }
        else response.setMessage("Không thể gửi tới email:" +email.toString());
        return response;
    }
    public ResponseDto updateUserInfo(User user){
        ResponseDto response = new ResponseDto();
        response.setError(true);
        User orginalUser = userRepository.findUserByEmail(user.getEmail());
        if(orginalUser == null) {
            response.setMessage("Người dùng không tồn tại");
            return response;
        }
        if(!user.getFirstname().equals(orginalUser.getFirstname()))
        orginalUser.setFirstname(user.getFirstname());
        if(!user.getLastname().equals(orginalUser.getLastname()))
        orginalUser.setLastname(user.getLastname());
        if(user.getAge()!=orginalUser.getAge())
        orginalUser.setAge(user.getAge());
        if(user.getGender()!=orginalUser.getGender())
            orginalUser.setGender(user.getGender());
        try {
            userRepository.save(orginalUser);
            response.setError(false);
            response.setMessage("Lưu thành công");
            
        } catch (Exception e) {
            response.setMessage("Lưu thất bại");
        }
        return response;
    }
}
