package com.webbanhang.webbanhang.Service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.Instant;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;


@Service
public class ImageService {
    @Value("${file.upload-dir}")
    private String uploadDir;
    public String getUniqueName(String originalName){
        return Instant.now().getEpochSecond() + originalName;
    }
    public String getImagePath(String uniqueName, String folder){
        return "/api/v1/resource/image?name=" + uniqueName+"&&folder="+folder;
    }
    public String addImage(MultipartFile image, String name, String folder) throws Exception{
          if (image.isEmpty()) {
            throw new Exception("Empty");
        }

        try {
            // Lưu tệp vào một đường dẫn cố định
            File uploadDirFile = new File(uploadDir+"/" + folder);
            if (!uploadDirFile.exists()) {
                uploadDirFile.mkdirs();
            }
            
            Path filePath = Paths.get(uploadDir).resolve(name);
            Files.write(filePath, image.getBytes());

            return "/api/v1/resource/image?name=" + name+"&&path="+folder;
            
        } catch (IOException e) {
            throw new Exception("Fail: " +e.getMessage());
        }
    }
}
