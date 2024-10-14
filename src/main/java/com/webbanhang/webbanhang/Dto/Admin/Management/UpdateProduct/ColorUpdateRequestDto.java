package com.webbanhang.webbanhang.Dto.Admin.Management.UpdateProduct;

import com.webbanhang.webbanhang.Dto.Shopping.ColorDto;

public class ColorUpdateRequestDto extends ColorDto{
    private String status;
    public void setColorId(Integer colorId){
        super.setId(colorId);
    }
    public Integer getColorId(){
        return super.getId();
    }
    public void setImageName(String imageName){
        super.setImagePath(imageName);
    }
    public String getImageName(){
        return super.getImagePath();
    }
    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
    
}
