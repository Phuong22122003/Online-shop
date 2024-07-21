package com.webbanhang.webbanhang.Restcontroller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.io.File;
import java.io.IOException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.webbanhang.webbanhang.Dto.ClientStockDto;
import com.webbanhang.webbanhang.Entity.CLIENT_INFO;
import com.webbanhang.webbanhang.Entity.PRODUCT;
import com.webbanhang.webbanhang.Service.ClientService;
import com.webbanhang.webbanhang.Service.ProductService;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/api/product")
public class ProductRestController {
    @Value("${file.upload-dir}")
    private String uploadDir;
    @Autowired private ProductService productService;
    @Autowired private ClientService clientService;
    @GetMapping("/client-stock")
    public List<ClientStockDto> getClientStock(HttpSession session){
        Integer clientId = Integer.parseInt(session.getAttribute("clientId").toString());
        return productService.getClientStock(clientId);
    }
    @PostMapping("/update-price")
    public ResponseEntity<String> updatePrice (@RequestParam("productId")String productId,@RequestParam("price") Integer price){
        try {
            productService.updatePrice(productId,price);
            return ResponseEntity.ok().body("Cập nhật thành công");
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Lỗi");
        }
    }
    @PostMapping("/update-quantity")
    public ResponseEntity<String> updateQuantity (@RequestParam("productId")String productId,@RequestParam("quantity") Integer quantity){
        try {
            productService.updateQuantity(productId,quantity);
            return ResponseEntity.ok().body("Cập nhật thành công");
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Lỗi");
        }
    }
    @PostMapping("/update-description")
    public ResponseEntity<String> updateDesciption (@RequestBody Map<String,Object> data){
        try {
            productService.updateDescription(data.get("productId").toString(),data.get("description").toString());
            return ResponseEntity.ok().body("Cập nhật thành công");
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Lỗi");
        }
    }
    @PostMapping("/update-name")
    public ResponseEntity<String> updateName (@RequestParam("productId")String productId,@RequestParam("name") String name){
        try {
            productService.updateName(productId,name);
            return ResponseEntity.ok().body("Cập nhật thành công");
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Lỗi");
        }
    }

    @PostMapping("/upload-image")
    public ResponseEntity<String> uploadImage(@RequestPart(value = "file") MultipartFile file){
        if (file.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Please select a file to upload.");
        }

        try {
            // Lưu tệp vào một đường dẫn cố định
            File uploadDirFile = new File(uploadDir);
            if (!uploadDirFile.exists()) {
                uploadDirFile.mkdirs();
            }
            String name = file.getOriginalFilename();
            Path uploadPath = Paths.get(uploadDir);
            Path filePath = uploadPath.resolve(file.getOriginalFilename());
            Files.write(filePath, file.getBytes());
            return ResponseEntity.ok("/file/image/" + name);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload file: " + e.getMessage());
        }
    }
    @PostMapping("/add")
    public ResponseEntity<String> add(@RequestBody PRODUCT product,HttpSession session){
       try{
           Integer clientId = Integer.parseInt(session.getAttribute("clientId").toString());
           CLIENT_INFO client =  clientService.findClientById(clientId);
           product.setClient(client);
           productService.addProduct(product);
           return ResponseEntity.ok().body("Lưu thành công");
       }
       catch(Exception ex){
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Lỗi hệ thống");
       }
    }
}
