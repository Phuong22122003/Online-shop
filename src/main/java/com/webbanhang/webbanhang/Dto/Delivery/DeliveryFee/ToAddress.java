package com.webbanhang.webbanhang.Dto.Delivery.DeliveryFee;

public class ToAddress {
    private Integer service_id;
    private Integer to_district_id;
    private String to_ward_code;
    private Integer quantity;
    public Integer getTo_district_id() {
        return to_district_id;
    }
    public void setTo_district_id(Integer to_district_id) {
        this.to_district_id = to_district_id;
    }
    public String getTo_ward_code() {
        return to_ward_code;
    }
    public void setTo_ward_code(String to_ward_code) {
        this.to_ward_code = to_ward_code;
    }
    public Integer getQuantity() {
        return quantity;
    }
    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }
    public Integer getService_id() {
        return service_id;
    }
    public void setService_id(Integer service_id) {
        this.service_id = service_id;
    }
    
}
