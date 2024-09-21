package com.webbanhang.webbanhang.Dto;

import org.springframework.web.multipart.MultipartFile;

public class ColorRequestDto extends ColorDto{
    private MultipartFile colorImage;

    public MultipartFile getColorImage() {
        return colorImage;
    }

    public void setColorImage(MultipartFile colorImage) {
        this.colorImage = colorImage;
    }
    
}
