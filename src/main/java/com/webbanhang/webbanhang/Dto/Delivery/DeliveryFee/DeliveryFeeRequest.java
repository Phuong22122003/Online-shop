package com.webbanhang.webbanhang.Dto.Delivery.DeliveryFee;

public class DeliveryFeeRequest {
    //District ID pick up parcels.Use API Get District
    // If you not input , will get information from shopid
    private Integer from_district_id;
    private String from_ward_code;
    private Integer service_id;
    private Integer insurance_value;
    private Integer to_district_id;
    private String to_ward_code;
    private Integer weight;
    private Integer length;
    private Integer width;
    private Integer height;
    public Integer getService_id() {
        return service_id;
    }
    public void setService_id(Integer service_id) {
        this.service_id = service_id;
    }
    public Integer getInsurance_value() {
        return insurance_value;
    }
    public void setInsurance_value(Integer insurance_value) {
        this.insurance_value = insurance_value;
    }
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
    public Integer getFrom_district_id() {
        return from_district_id;
    }
    public void setFrom_district_id(Integer from_district_id) {
        this.from_district_id = from_district_id;
    }
    public String getFrom_ward_code() {
        return from_ward_code;
    }
    public void setFrom_ward_code(String from_ward_code) {
        this.from_ward_code = from_ward_code;
    }
    public Integer getWeight() {
        return weight;
    }
    public void setWeight(Integer weight) {
        this.weight = weight;
    }
    public Integer getLength() {
        return length;
    }
    public void setLength(Integer length) {
        this.length = length;
    }
    public Integer getWidth() {
        return width;
    }
    public void setWidth(Integer width) {
        this.width = width;
    }
    public Integer getHeight() {
        return height;
    }
    public void setHeight(Integer height) {
        this.height = height;
    }

    
}
