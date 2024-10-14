package com.webbanhang.webbanhang.Dto.Admin.Management.AddProduct;

import com.webbanhang.webbanhang.Dto.Shopping.ColorDto;

/*
 * Use to save color image.
 * Name for saving name.
 * Image name for getting image by name from list image (Multipartfile)
 */
public class ColorAddRequestDto extends ColorDto {
    // private String name;
    // private String imageName;
    public String getName() {
        return super.getColor();
    }
    public void setName(String name) {
        super.setColor(name);
    }
    public String getImageName() {
        return super.getImagePath();
    }
    public void setImageName(String imageName) {
        super.setImagePath(imageName);
    }
}
