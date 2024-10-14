package com.webbanhang.webbanhang.Dto.Admin.Management.AddProduct;

import com.webbanhang.webbanhang.Dto.Shopping.ProductVariantDto;

/*
 * Use to get product variant with simple information and not containt id;
 */
public class ProductVariantAddRequestDto extends ProductVariantDto{
    private String size;
    private String color;
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
