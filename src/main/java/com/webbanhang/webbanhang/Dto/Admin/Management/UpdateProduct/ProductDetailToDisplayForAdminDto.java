package com.webbanhang.webbanhang.Dto.Admin.Management.UpdateProduct;

import java.util.List;

import com.webbanhang.webbanhang.Dto.Admin.Management.AddProduct.ProductVariantAddRequestDto;
import com.webbanhang.webbanhang.Entity.Color;
import com.webbanhang.webbanhang.Entity.Size;

/*
 * Use to display for admin about product details
 */

public class ProductDetailToDisplayForAdminDto {
    private Integer id;
    private String coverImagePath;
    private String productName;
    private String description;
    private Integer mainCategoryId;
    private Integer subCategoryId;
    private Integer brandId;
    private List<Color> colors;
    private List<Size> sizes;
    private List<ProductVariantAddRequestDto> productVariants;
    
    public String getCoverImagePath() {
        return coverImagePath;
    }
    
    public void setCoverImagePath(String coverImagePath) {
        this.coverImagePath = coverImagePath;
    }
    public String getProductName() {
        return productName;
    }
    public void setProductName(String productName) {
        this.productName = productName;
    }
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }
    
    public Integer getSubCategoryId() {
        return subCategoryId;
    }
    public void setSubCategoryId(Integer subCategoryId) {
        this.subCategoryId = subCategoryId;
    }
    public List<ProductVariantAddRequestDto> getProductVariants() {
        return productVariants;
    }
    public void setProductVariants(List<ProductVariantAddRequestDto> productVariants) {
        this.productVariants = productVariants;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public List<Color> getColors() {
        return colors;
    }

    public void setColors(List<Color> colors) {
        this.colors = colors;
    }

    public List<Size> getSizes() {
        return sizes;
    }

    public void setSizes(List<Size> sizes) {
        this.sizes = sizes;
    }

    public Integer getMainCategoryId() {
        return mainCategoryId;
    }

    public void setMainCategoryId(Integer mainCategoryId) {
        this.mainCategoryId = mainCategoryId;
    }

    public Integer getBrandId() {
        return brandId;
    }

    public void setBrandId(Integer brandId) {
        this.brandId = brandId;
    }
    
}
