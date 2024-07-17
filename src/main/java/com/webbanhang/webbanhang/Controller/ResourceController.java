package com.webbanhang.webbanhang.Controller;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
// import org.springframework.web.bind.annotation.RequestParam;

import jakarta.servlet.http.HttpServletResponse;

@Controller
@RequestMapping("/file")
public class ResourceController {
    @Value("${file.upload-dir}")
    private String uploadDir;

    @GetMapping("/image/{imageName:.+}")
    public void getImage(@PathVariable String imageName, HttpServletResponse response) throws IOException {
        Path imagePath = Paths.get(uploadDir).resolve(imageName);
        // try {
        //     if (!Files.exists(imagePath)) {
        //         // Tạo thư mục nếu không tồn tại
        //         if (!Files.exists(imagePath.getParent())) {
        //             Files.createDirectories(imagePath.getParent());
        //         }
                
        //         // Tạo tệp mới
        //         Files.createFile(imagePath);

        //         // Thông báo về việc tạo tệp mới
        //         System.out.println("File created: " + imagePath);
        //     }
        // } catch (IOException e) {
        //     e.printStackTrace();
        // }
        if (!Files.exists(imagePath)) {
            response.setStatus(HttpStatus.NOT_FOUND.value());
            System.out.println("========================");
            System.out.println(imageName);
            return;
        }
        // Đặt loại hình ảnh trong tiêu đề
        response.setContentType(MediaType.IMAGE_JPEG_VALUE);

        // Đọc hình ảnh vào InputStream và ghi vào OutputStream của HttpServletResponse
        try (InputStream inputStream = new FileInputStream(imagePath.toFile())) {
            int bytesRead;
            byte[] buffer = new byte[4096];
            while ((bytesRead = inputStream.read(buffer)) != -1) {
                response.getOutputStream().write(buffer, 0, bytesRead);
            }
        }
        return;
    }
}
