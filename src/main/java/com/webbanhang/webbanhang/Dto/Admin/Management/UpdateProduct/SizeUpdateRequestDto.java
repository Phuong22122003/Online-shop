package com.webbanhang.webbanhang.Dto.Admin.Management.UpdateProduct;

import com.webbanhang.webbanhang.Dto.Shopping.SizeDto;

public class SizeUpdateRequestDto  extends SizeDto{
    private String status;

    public void setSizeId(Integer sizeId){
        super.setId(sizeId);
    }
    public Integer getSizeId(){
        return super.getId();
    }
    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
    
}
