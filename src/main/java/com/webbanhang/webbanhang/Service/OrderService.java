package com.webbanhang.webbanhang.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.webbanhang.webbanhang.Dto.ResponseDto;
import com.webbanhang.webbanhang.Dto.Delivery.OrderStatus;
import com.webbanhang.webbanhang.Dto.Shopping.OrderDto;
import com.webbanhang.webbanhang.Dto.Shopping.ProductOrderDto;
import com.webbanhang.webbanhang.Dto.User.Profile.Order;
import com.webbanhang.webbanhang.Dto.User.Profile.UserOrdersDto;
import com.webbanhang.webbanhang.Entity.Address;
import com.webbanhang.webbanhang.Entity.PurchaseHistory;
import com.webbanhang.webbanhang.Repository.PurchaseHistoryRepository;
import com.webbanhang.webbanhang.Repository.UserRepository;

/**
 * Service kết hợp không phải service cho từng repo
 */
@Service
public class OrderService {
    private PurchaseHistoryRepository purchaseHistoryRepository;
    private PurchaseHistoryService purchaseHistoryService;
    private ImageService imageService;
    private DeliveryService deliveryService;
    private UserRepository userRepository;
    private AddressService addressService;
    private ProductVariantService productVariantService;
    public OrderService(PurchaseHistoryService purchaseHistoryService,
                        DeliveryService deliveryService,
                        PurchaseHistoryRepository purchaseHistoryRepository,
                        ImageService imageService,
                        UserRepository userRepository,
                        AddressService addressService,
                        ProductVariantService productVariantService
                        ){
        this.productVariantService = productVariantService;
        this.purchaseHistoryRepository = purchaseHistoryRepository;
        this.imageService = imageService;
        this.deliveryService = deliveryService;
        this.purchaseHistoryService = purchaseHistoryService;
        this.userRepository = userRepository;
        this.addressService = addressService;
    }
    /***
     * Tìm kiếm đơn đặt theo trạng thái dành cho nhân viên.
     * 
     * @param statusRequest
     * @return
     */
    public List<OrderDto> findOrdersByStatusForEmployee(String statusRequest){
        List<Map<String,Object>> orders = purchaseHistoryRepository.findOrders();
        OrderDto order = null;
        Map<Integer, OrderDto> orderMap = new TreeMap<>(Comparator.reverseOrder());;
        for(Map<String,Object> item:orders){
            Integer id = Integer.parseInt(item.get("OrderId").toString());
            Integer productId = Integer.parseInt(item.get("ProductId").toString());
            String productName = item.get("Name").toString();
            String imagePath = imageService.getImagePath(item.get("ImagePath").toString(),"");
            Integer quantity = Integer.parseInt(item.get("Quantity").toString());
            Double unitPrice = Double.parseDouble(item.get("UnitPrice").toString());
            String size = item.get("Size").toString();
            String color = item.get("Color").toString();
            String deliveryOrderId = item.get("DeliveryOrderId") == null? null:item.get("DeliveryOrderId").toString();
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
                if(status.toLowerCase().trim().equals("preparing")||status.toLowerCase().trim().equals("inprocess")){
                    try{
                        List<OrderStatus> orderStatus =  deliveryService.getOrderStatus(deliveryOrderId);
                        String currentStatus = orderStatus.get(orderStatus.size()-1).getStatus();
                        //Bên vận chuyển đã tới lấy hàng
                        if(status.toLowerCase().trim().equals("preparing")&&currentStatus.toLowerCase().trim().equals("picked")){
                            purchaseHistoryService.updateOrderStatus(id, "InProcess");
                            status = "InProcess";
                        }
                        //Vận chuyển không thành công nên trả hàng về thì chuyển thành trạng thái hủy
                        else if(status.toLowerCase().trim().equals("inprocess")&&currentStatus.toLowerCase().trim().equals("return")){
                            purchaseHistoryService.updateOrderStatus(id, "Cancelled");
                            status = "Cancelled";
                        }
                        else if(status.toLowerCase().trim().equals("inprocess")&&currentStatus.toLowerCase().trim().equals("delivered")){
                            purchaseHistoryService.updateOrderStatus(id, "Delivered");
                            status = "Cancelled";
                        }

                    }
                    catch(Exception ex){
                        
                    }
                }
                if(statusRequest!=null&&!statusRequest.trim().toUpperCase().equals("ALL")&&!status.trim().toUpperCase().equals(statusRequest.trim().toUpperCase())) continue;
                Double deliveryFee = Double.parseDouble(item.get("DeliveryFee").toString());
                DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss.SSS");
                LocalDate purchasingDate = LocalDate.parse(item.get("PurchasingDate").toString(),formatter);
                String address = item.get("Address").toString();
                String phone = item.get("Phone").toString();
                String fullname = item.get("Fullname").toString();
                order.setOrderId(id);
                order.setDeliveryOrderId(deliveryOrderId);
                order.setAddress(address);
                order.setStatus(status);
                order.setDeliveryFee(deliveryFee);
                order.setPurchasingDate(purchasingDate);
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

    /**
     * Dùng cho nhân viên xác nhận đơn hàng
     * Bên phía khách hàng sẽ là đang chờ giao.
     * Nhân viên đã tạo đơn do đó sẽ chờ người vận chuyển đến lấy hàng. Theo dõi trên kênh ghn.
     * @param orderId
     * @return
     */
    @Transactional(rollbackFor = Exception.class)
    public ResponseDto placeOrderOnGHN(Integer orderId,String employeeId){
        ResponseDto response = new ResponseDto();
        response.setError(true);
        try {
            // String order_code =deliveryService.createOrder(orderId);
            String order_code ="G8X7L63R";//tạm
            purchaseHistoryService.updateOrderStatusAndAddOrderCode(orderId,order_code,employeeId);
            response.setError(false);
            response.setMessage("Tạo đơn hàng thành công");
            response.setData(order_code);
        } catch (Exception e) {
            response.setMessage(e.getMessage());
        }
        return response;
    }

    /**
     * Không dùng cái này nữa. Chuyển qua placeOrderOnGHN
     * @param orderId
     * @return
     */
    @Deprecated
    @Transactional(rollbackFor = Exception.class)
    public ResponseDto confirmOrder(Integer orderId){
        ResponseDto response = new ResponseDto();
        response.setError(true);
        try {
            purchaseHistoryService.updateOrderStatus(orderId, "Preparing");
            response.setError(false);
            response.setMessage("Tạo đơn hàng thành công");
        } catch (Exception e) {
            response.setMessage(e.getMessage());
        }
        return response;
    }
    /**
     * Tìm kiếm đơn đặt hàng của người dùng.
     * Cần chú ý sửa lại userRepo => userService.
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
                LocalDate date = LocalDate.parse(row.get("PurchaseDate").toString(), formatter);
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

    @Transactional(rollbackFor = Exception.class)
    public ResponseDto cancelOrder(Integer orderId){
        ResponseDto responseDto = new ResponseDto();
        
        PurchaseHistory order = purchaseHistoryService.findPurchaseHistoryById(orderId);
        if(order == null){
            responseDto.setError(true);
            responseDto.setMessage("Đơn hàng trống");
            return responseDto;
        }
            
        if(order.getStatus().toLowerCase().trim().equals("preparing")){
            deliveryService.cancelOrder(order.getDeliveryOrderId());
        }
        purchaseHistoryService.cancelOrder(orderId);
        productVariantService.restoreProductQuantity(orderId);
        responseDto.setError(false);
        responseDto.setMessage("Hủy thành công");
        return responseDto;
    }
    public List<UserOrdersDto> findOrderByDate(String email, LocalDate from, LocalDate to){
        List<UserOrdersDto> orders = findUserOrdersByEmail(email);
        orders.removeIf(order-> order.getPurchaseDate().isAfter(to)|| order.getPurchaseDate().isBefore(from));
        return orders;
    }

    private Boolean isContainedKey(UserOrdersDto order,String key){
        if(order.getOrderId().toString().equals(key)) return true;
        for(Order o: order.getOrders()){
            if(o.getName().toLowerCase().contains(key.toLowerCase()))return true;
        }
        return false;
    }

    @Deprecated
    public List<UserOrdersDto> findOrderByKey(String email,String key){
        List<UserOrdersDto> orders = findUserOrdersByEmail(email);
        orders.removeIf(order-> 
            !isContainedKey(order, key)
        );
        return orders;
    }
}
