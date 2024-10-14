package com.webbanhang.webbanhang.Restcontroller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/resource")
public class ImageRestController {
    @Value("${file.upload-dir}")
    private String uploadDir;
        @GetMapping("/image")
    public ResponseEntity<Resource> getImage(@RequestParam String name,@RequestParam(required = false,defaultValue = "") String folder) throws IOException {
        try {
            Path path = Paths.get(uploadDir+"/" +folder + name);
            byte[] imageBytes = Files.readAllBytes(path);
    
            ByteArrayResource resource = new ByteArrayResource(imageBytes);
    
            return ResponseEntity.ok()
                    .contentType(MediaType.IMAGE_JPEG) // Thay đổi loại MIME nếu cần
                    .contentLength(imageBytes.length)
                    .body(resource);
            
        } catch (Exception e) {
           return ResponseEntity.internalServerError().body(null);
        }
    }
}
