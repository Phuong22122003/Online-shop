package com.webbanhang.webbanhang.Dto.Admin.Management;

import com.webbanhang.webbanhang.Dto.Shopping.ProductDto;

/*
 * Use to display product for amin.
 */
public class InventoryDto  extends ProductDto{
    private Integer soldQuantity;
    private Integer remainingQuantity;
    public Integer getSoldQuantity() {
        return soldQuantity;
    }
    public void setSoldQuantity(Integer soldQuantity) {
        this.soldQuantity = soldQuantity;
    }
    public Integer getRemainingQuantity() {
        return remainingQuantity;
    }
    public void setRemainingQuantity(Integer remainingQuantity) {
        this.remainingQuantity = remainingQuantity;
    }
    
}
