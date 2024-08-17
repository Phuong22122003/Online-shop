package com.webbanhang.webbanhang.Restcontroller;

import java.io.IOException;

import java.time.Instant;
import java.util.List;
import java.util.Map;
import java.io.File;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
import net.coobird.thumbnailator.Thumbnails;

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
            return ResponseEntity.ok().body("Update successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Can not update price: "+ e.getMessage());
        }
    }
    @PostMapping("/update-quantity")
    public ResponseEntity<String> updateQuantity (@RequestParam("productId")String productId,@RequestParam("quantity") Integer quantity){
        try {
            productService.updateQuantity(productId,quantity);
            return ResponseEntity.ok().body("Update successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Can not update quantity: "+ e.getMessage());
        }
    }
    @PostMapping("/update-description")
    public ResponseEntity<String> updateDesciption (@RequestBody Map<String,Object> data){
        try {
            productService.updateDescription(data.get("productId").toString(),data.get("description").toString());
            return ResponseEntity.ok().body("Update successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Can not update description: "+ e.getMessage());
        }
    }
    @PostMapping("/update-name")
    public ResponseEntity<String> updateName (@RequestParam("productId")String productId,@RequestParam("name") String name){
        try {
            productService.updateName(productId,name);
            return ResponseEntity.ok().body("Update successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Can not update product name: "+ e.getMessage());
        }
    }


    private String saveImage(MultipartFile image) throws Exception{
        if (image.isEmpty()) {
            throw new Exception("Empty");
        }

        try {
            // Lưu tệp vào một đường dẫn cố định
            File uploadDirFile = new File(uploadDir);
            if (!uploadDirFile.exists()) {
                uploadDirFile.mkdirs();
            }
            
            String name = Instant.now().getEpochSecond() +image.getOriginalFilename();
            // Path filePath = Paths.get(uploadDir).resolve(name);
            File file = new File(uploadDir, name);
            Thumbnails.of(image.getInputStream()).size(616, 646).toFile(file);
            // Files.write(filePath, image.getBytes());
            return "/file/image/" + name;
        } catch (IOException e) {
            throw new Exception("Fail: " +e.getMessage());
        }
    }
    @PostMapping("/upload-image")
    public ResponseEntity<String> uploadImage(@RequestPart(value = "file") MultipartFile file){


        try {

            String imagePath = saveImage(file);
            return ResponseEntity.ok(imagePath);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload file: " + e.getMessage());
        }
        catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload file: " + e.getMessage());
        }
    }
    @PostMapping("/add")
    public ResponseEntity<String> add(@RequestParam("image") MultipartFile image,
                                    @RequestParam("productId") String productId,
                                    @RequestParam("name") String name,
                                    @RequestParam("price") Integer price,
                                    @RequestParam(value = "description",required = false) String description,
                                    @RequestParam("quantity") Integer quantity,
                                    HttpSession session){
        if(image.isEmpty()) return ResponseEntity.badRequest().body("Image is empty");
       try{
            String imagePath = saveImage(image);
            PRODUCT product = new PRODUCT();
            product.setName(name);
            product.setDescription(description);
            product.setPrice(price);
            product.setQuantity(quantity);
            product.setImagePath(imagePath);
            product.setProductId(productId);
            Integer clientId = Integer.parseInt(session.getAttribute("clientId").toString());
            CLIENT_INFO client =  clientService.findClientById(clientId);
            product.setClient(client);
            productService.addProduct(product);
            return ResponseEntity.ok().body("Saved");
       }
       catch(Exception ex){
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Fail");
       }
    }

    @DeleteMapping("/delete/{productId}")
    public ResponseEntity<?> deleteProduct(@PathVariable String productId,HttpSession session){
        if(session.getAttribute("clientId")==null) ResponseEntity.badRequest().body("Please sigin");
        Integer clientId = Integer.parseInt(session.getAttribute("clientId").toString());
        try {
            productService.deleteProduct(productId, clientId);
        } catch (Exception e) {
            if(e.getMessage().equals("Unable to delete product"))
            return ResponseEntity.badRequest().body(e.getMessage());
            else 
            return ResponseEntity.internalServerError().body("Server error");
        }
        return ResponseEntity.ok().body("Successfully");
    }
    @PostMapping("/resell/{productId}")
    public ResponseEntity<?> resell(@PathVariable String productId,HttpSession session){
        if(session.getAttribute("clientId")==null) ResponseEntity.badRequest().body("Please sigin");
        Integer clientId = Integer.parseInt(session.getAttribute("clientId").toString());
        try {
            productService.resell(productId, clientId);
        } catch (Exception e) {
            if(e.getMessage().equals("Unable to resell product"))
            return ResponseEntity.badRequest().body(e.getMessage());
            else 
            return ResponseEntity.internalServerError().body("Server error");
        }
        return ResponseEntity.ok().body("Successfully");
    }
}
