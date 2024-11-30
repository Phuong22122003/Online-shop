package com.webbanhang.webbanhang.Restcontroller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.webbanhang.webbanhang.Dto.ResponseDto;
import com.webbanhang.webbanhang.Dto.Admin.Management.InventoryDto;
import com.webbanhang.webbanhang.Dto.Admin.Management.UpdateProduct.ProductDetailToDisplayForAdminDto;
import com.webbanhang.webbanhang.Dto.Shopping.ProductDto;
import com.webbanhang.webbanhang.Service.OrderService;
import com.webbanhang.webbanhang.Service.ProductService;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/api/v1/admin/")
public class AdminRestController {

    private ProductService productService;
    private OrderService orderService;
    public AdminRestController(ProductService productService,OrderService orderService){
        this.orderService = orderService;
        this.productService = productService;
    }
    /**
     * Trả về tất cả sản phẩm cho admin quản lý;
     * @param page
     * @return
     */
    // @Deprecated
    @GetMapping("/inventory")
    public ResponseEntity<List<InventoryDto>> inventory(@RequestParam Integer page){
        return ResponseEntity.ok().body(productService.findInventory(page));
    }
    /**
     * Trả về các sản phẩm theo từng trang trong cơ sở dữ liệu.
     * @return
     */
    @GetMapping("/inventory/page-number")
    public ResponseEntity<Integer> pageNumer(){
        return ResponseEntity.ok().body(productService.findPageNumber());
    }
    /**
     * Trả về sản phẩm tìm kiếm.
     * Tìm trên toàn bộ dữ liệu. Không quan tâm đến số trang.
     * @param key
     * @return
     */
    @GetMapping("/inventory/search")
    public ResponseEntity<List<InventoryDto>> searchInventory(@RequestParam String key){
        return ResponseEntity.ok().body(productService.findInventoryByKey(key));
    }
    /**
     * 
     * @param status
     * @return
     */
    @PostMapping("/inventory/update-flat")
    public ResponseEntity<?> updateFlat(@RequestBody ProductDto product){
        ResponseDto response = productService.updateProductFlat(product.getId(),product.getDeletedFlat());
        if(response.getError() == true){
            return ResponseEntity.internalServerError().body(response);
        }
        return ResponseEntity.ok().body(response);
    }
    /**
     * Trả về đơn hàng theo status cho admin.
     * @param status
     * @return
     */
    @GetMapping("/orders/{status}")
    public ResponseEntity<?> orders(@PathVariable String status){
        ResponseDto response = new ResponseDto();
        try {
            response.setData(orderService.findOrdersByStatusForEmployee(status));
            response.setError(false);
            response.setMessage("Successfully");
            return ResponseEntity.ok().body(response);
        } catch (Exception e) {
            response.setError(true);
            response.setMessage("Server error");
            return ResponseEntity.internalServerError().body(response);
        }
    }
    /**
     * Trả về thông tin chi tiết của sản phẩm.
     * Cho nhân viên xem hoặc chỉnh sửa sản phẩm.
     * @param id
     * @return
     */
    @GetMapping("/product-detail")
    public ResponseEntity<?> productDetailForDisplay(@RequestParam Integer id){
        ProductDetailToDisplayForAdminDto product = productService.findProductDetailToDisplay(id);
        return ResponseEntity.ok().body(product);
    }
    /**
     * Dùng để xác nhận đơn hàng của người dùng và tạo đơn trên giao hàng nhanh.
     * @param orderId
     * @param session
     * @return
     */
    @PostMapping("/confirm-order")
    public ResponseEntity<?> confirmOrder(@RequestBody Integer orderId,HttpSession session){
       String email = session.getAttribute("email").toString();
        ResponseDto response = orderService.placeOrderOnGHN(orderId,email);
        return ResponseEntity.ok().body(response);
    }
    /**
     * Hủy đơn hàng
     * bên oder service chưa có để tạm;
     * @param orderId
     * @param session
     * @return
     */
    @PostMapping("/cancel-order")
    public ResponseEntity<?> cancelOrder(@RequestBody Integer orderId,HttpSession session){
        //String email = session.getAttribute("email").toString();
        ResponseDto response = orderService.cancelOrder(orderId);
        return ResponseEntity.ok().body(response);
    }

    /**
     * Không dùng nữa. Đùng confirmOrder
     * @param orderId
     * @param session
     * @return
     */
    @Deprecated
    @PostMapping("/place-order")
    public ResponseEntity<?> placeOrder(@RequestBody Integer orderId, HttpSession session){
        String email = session.getAttribute("email").toString();
        ResponseDto response = orderService.placeOrderOnGHN(orderId,email);
        return ResponseEntity.ok().body(response);
    }
}
