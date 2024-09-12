package com.webbanhang.webbanhang.Dto;

import java.util.List;

public class ProductDetailDto extends ProductDto{
    private List<ColorDto> colors;
    private List<SizeDto> sizes;

    private List<ProductVariantDto> productVariants;

    public List<ColorDto> getColors() {
        return colors;
    }

    public void setColors(List<ColorDto> colors) {
        this.colors = colors;
    }

    public List<SizeDto> getSizes() {
        return sizes;
    }

    public void setSizes(List<SizeDto> sizes) {
        this.sizes = sizes;
    }

    public List<ProductVariantDto> getProductVariants() {
        return productVariants;
    }

    public void setProductVariants(List<ProductVariantDto> productVariants) {
        this.productVariants = productVariants;
    }
    
}
