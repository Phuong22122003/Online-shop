package com.webbanhang.webbanhang.Dto.Admin.Management;

import com.webbanhang.webbanhang.Dto.Shopping.ProductDto;

/*
 * Use to display product for amin.
 */
public class InventoryDto  extends ProductDto{
    private String subCategoryName;
    private Integer soldQuantity;
    private Integer remainingQuantity;
    private Integer confirmingQuantity;
    private Integer cancelledQuantity;
    private Integer inprocessQuantity;
    private Integer preparingQuantity;
    
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
    public Integer getConfirmingQuantity() {
        return confirmingQuantity;
    }
    public void setConfirmingQuantity(Integer confirmingQuantity) {
        this.confirmingQuantity = confirmingQuantity;
    }
    public Integer getCancelledQuantity() {
        return cancelledQuantity;
    }
    public void setCancelledQuantity(Integer cancelledQuantity) {
        this.cancelledQuantity = cancelledQuantity;
    }
    public Integer getInprocessQuantity() {
        return inprocessQuantity;
    }
    public void setInprocessQuantity(Integer inprocessQuantity) {
        this.inprocessQuantity = inprocessQuantity;
    }
    public Integer getPreparingQuantity() {
        return preparingQuantity;
    }
    public void setPreparingQuantity(Integer preparingQuantity) {
        this.preparingQuantity = preparingQuantity;
    }
    public String getSubCategoryName() {
        return subCategoryName;
    }
    public void setSubCategoryName(String subCategoryName) {
        this.subCategoryName = subCategoryName;
    }
    
}
