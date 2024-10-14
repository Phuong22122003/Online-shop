package com.webbanhang.webbanhang.Restcontroller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.webbanhang.webbanhang.Dto.ResponseDto;
import com.webbanhang.webbanhang.Dto.Admin.Management.InventoryDto;
import com.webbanhang.webbanhang.Dto.Admin.Management.UpdateProduct.ProductDetailToDisplayForAdminDto;
import com.webbanhang.webbanhang.Service.OrderService;
import com.webbanhang.webbanhang.Service.ProductService;

@RestController
@RequestMapping("/api/v1/admin/")
public class AdminRestController {

    private ProductService productService;
    private OrderService orderService;
    public AdminRestController(ProductService productService,OrderService orderService){
        this.orderService = orderService;
        this.productService = productService;
    }

    @GetMapping("/inventory")
    public ResponseEntity<List<InventoryDto>> inventory(){
        return ResponseEntity.ok().body(productService.findInventory());
    }
    @GetMapping("/orders/{status}")
    public ResponseEntity<?> orders(@PathVariable String status){
        ResponseDto response = new ResponseDto();
        try {
            response.setData(orderService.findOrders(status));
            response.setError(false);
            response.setMessage("Successfully");
            return ResponseEntity.ok().body(response);
        } catch (Exception e) {
            response.setError(true);
            response.setMessage("Server error");
            return ResponseEntity.internalServerError().body(response);
        }
    }

    @GetMapping("/product-detail")
    public ResponseEntity<?> productDetailForDisplay(@RequestParam Integer id){
        ProductDetailToDisplayForAdminDto product = productService.findProductDetailToDisplay(id);
        return ResponseEntity.ok().body(product);
    }
}
