package com.webbanhang.webbanhang.Dto.Admin.Management.UpdateProduct;
// {
//     "id": 1016,
//     "name": "Áo khoác nữ",
//     "description": "Áo khoác dành cho nữ. Thích hợp mặc khi đi ra ngoài hoặc đi chơi",
//     "subCategoryId": "20",
//     "newSizes": [
//         {
//             "sizeId": 3,
//             "newName": "Ma",
//             "status": "CHANGED"
//         },
//         {
//             "id": null,
//             "newName": "aaaaaaaaaaa",
//             "status": "ADD"
//         }
//     ],
//     "newColors": [
//         {
//             "name": "aaaaaaaaaaaa",
//             "imageName": "color0.jpg",
//             "status": "ADD"
//         }
//     ],
//     "productVariants": [
//         {
//             "id": null,
//             "quantity": "",
//             "price": "",
//             "status": "ADD"
//         },
//         {
//             "id": null,
//             "quantity": "",
//             "price": "",
//             "status": "ADD"
//         },
//         {
//             "id": null,
//             "quantity": "",
//             "price": "",
//             "status": "ADD"
//         }
//     ]
// }

import java.util.List;

public class ProductUpdateRequestDto {
    private Integer id;
    private String name;
    private String description;
    private Integer subCategoryId;
    private List<SizeUpdateRequestDto> newSizes;
    private List<ColorUpdateRequestDto> newColors;
    private List<ProductVariantUpdateRequestDto> productVariants;
    public Integer getId() {
        return id;
    }
    public void setId(Integer id) {
        this.id = id;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
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
    public List<SizeUpdateRequestDto> getNewSizes() {
        return newSizes;
    }
    public void setNewSizes(List<SizeUpdateRequestDto> newSizes) {
        this.newSizes = newSizes;
    }
    public List<ColorUpdateRequestDto> getNewColors() {
        return newColors;
    }
    public void setNewColors(List<ColorUpdateRequestDto> newColors) {
        this.newColors = newColors;
    }
    public List<ProductVariantUpdateRequestDto> getProductVariants() {
        return productVariants;
    }
    public void setProductVariants(List<ProductVariantUpdateRequestDto> productVariants) {
        this.productVariants = productVariants;
    }
    
}
