package com.webbanhang.webbanhang.Dto.Admin.Management.UpdateProduct;

import com.webbanhang.webbanhang.Dto.Shopping.ProductVariantDto;

public class ProductVariantUpdateRequestDto extends ProductVariantDto{
    private String status;
    private String size;
    private String color;
    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getSize() {
        return size;
    }

    public void setSize(String size) {
        this.size = size;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }
    
}
