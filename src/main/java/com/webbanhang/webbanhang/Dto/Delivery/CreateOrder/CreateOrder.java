package com.webbanhang.webbanhang.Dto.Delivery.CreateOrder;

import java.util.List;

public class CreateOrder {
    /*
        Required = true
     * Choose who pay shipping fee.
        1: Shop/Seller. 
        2: Buyer/Consignee. <=
     */
    private int payment_type_id;

    /*
    required = false
     * Client note for shipper.
     * Ex: Please call before delivery
     */
    private String note;


    /*
    required = true
    * Note shipping order.Allowed values: CHOTHUHANG, CHOXEMHANGKHONGTHU, KHONGCHOXEMHANG 
    * CHOTHUHANG mean Buyer can request to see and trial goods
    * CHOXEMHANGKHONGTHU mean Buyer can see goods but not allow to trial goods <=
    * KHONGCHOXEMHANG mean Buyer not allow to see goods
    */
    private String required_note;

    //Sender's name . required = true
    private String from_name;

    //Sender's phone number
    private String from_phone;

    //Sender address.
    private String from_address;

    //Ward/Commune of the sender.
    private String from_ward_name;

    //Sender's district
    private String from_district_name;

    //sender's province
    private String from_province_name;

    //require = false. Contact phone number to return parcels.
    private String return_phone;
    private String return_address;
    private Integer return_district_id;
    private String return_ward_code;

    //External order code managed by logged client [Unique field].
    //Default value: null
    private String client_order_code;

    // Client name. (Customer / Buyer)
    private String to_name;

    // Client phone number.(Customer / Buyer)
    private String to_phone;

    // length = 1024. Client address.(Customer / Buyer)
    private String to_address;
    // Ward Code pick up parcels.Use API Get Ward,
    private String to_ward_code;

    // District ID drop off parcels.Use API Get District
    private int to_district_id;

    //Amount cash to collect.
    // Maximum 50.000.000
    // Default value: 0
    // Delivery person will take that money and send back to sender
    private int cod_amount;

    // require = false
    private String content;

    private int weight;
    private int length;
    private int width;
    private int height;

    // The shipper not pickup parcels at shop’s address
    // Value > 0
    private int pick_station_id;
    private Integer deliver_station_id;

    //required = false. => 0
    private int insurance_value;


    private int service_id;
    private int service_type_id;


    private String coupon;

    private List<Integer> pick_shift;
    
    private List<Item> items;
    public int getPayment_type_id() {
        return payment_type_id;
    }
    public void setPayment_type_id(int payment_type_id) {
        this.payment_type_id = payment_type_id;
    }
    public String getNote() {
        return note;
    }
    public void setNote(String note) {
        this.note = note;
    }
    public String getRequired_note() {
        return required_note;
    }
    public void setRequired_note(String required_note) {
        this.required_note = required_note;
    }
    public String getFrom_name() {
        return from_name;
    }
    public void setFrom_name(String from_name) {
        this.from_name = from_name;
    }
    public String getFrom_phone() {
        return from_phone;
    }
    public void setFrom_phone(String from_phone) {
        this.from_phone = from_phone;
    }
    public String getFrom_address() {
        return from_address;
    }
    public void setFrom_address(String from_address) {
        this.from_address = from_address;
    }
    public String getFrom_ward_name() {
        return from_ward_name;
    }
    public void setFrom_ward_name(String from_ward_name) {
        this.from_ward_name = from_ward_name;
    }
    public String getFrom_district_name() {
        return from_district_name;
    }
    public void setFrom_district_name(String from_district_name) {
        this.from_district_name = from_district_name;
    }
    public String getFrom_province_name() {
        return from_province_name;
    }
    public void setFrom_province_name(String from_province_name) {
        this.from_province_name = from_province_name;
    }
    public String getReturn_phone() {
        return return_phone;
    }
    public void setReturn_phone(String return_phone) {
        this.return_phone = return_phone;
    }
    public String getReturn_address() {
        return return_address;
    }
    public void setReturn_address(String return_address) {
        this.return_address = return_address;
    }
    public Integer getReturn_district_id() {
        return return_district_id;
    }
    public void setReturn_district_id(Integer return_district_id) {
        this.return_district_id = return_district_id;
    }
    public String getReturn_ward_code() {
        return return_ward_code;
    }
    public void setReturn_ward_code(String return_ward_code) {
        this.return_ward_code = return_ward_code;
    }
    public String getClient_order_code() {
        return client_order_code;
    }
    public void setClient_order_code(String client_order_code) {
        this.client_order_code = client_order_code;
    }
    public String getTo_name() {
        return to_name;
    }
    public void setTo_name(String to_name) {
        this.to_name = to_name;
    }
    public String getTo_phone() {
        return to_phone;
    }
    public void setTo_phone(String to_phone) {
        this.to_phone = to_phone;
    }
    public String getTo_address() {
        return to_address;
    }
    public void setTo_address(String to_address) {
        this.to_address = to_address;
    }
    public String getTo_ward_code() {
        return to_ward_code;
    }
    public void setTo_ward_code(String to_ward_code) {
        this.to_ward_code = to_ward_code;
    }
    public int getTo_district_id() {
        return to_district_id;
    }
    public void setTo_district_id(int to_district_id) {
        this.to_district_id = to_district_id;
    }
    public int getCod_amount() {
        return cod_amount;
    }
    public void setCod_amount(int cod_amount) {
        this.cod_amount = cod_amount;
    }
    public String getContent() {
        return content;
    }
    public void setContent(String content) {
        this.content = content;
    }
    public int getWeight() {
        return weight;
    }
    public void setWeight(int weight) {
        this.weight = weight;
    }
    public int getLength() {
        return length;
    }
    public void setLength(int length) {
        this.length = length;
    }
    public int getWidth() {
        return width;
    }
    public void setWidth(int width) {
        this.width = width;
    }
    public int getHeight() {
        return height;
    }
    public void setHeight(int height) {
        this.height = height;
    }
    public int getPick_station_id() {
        return pick_station_id;
    }
    public void setPick_station_id(int pick_station_id) {
        this.pick_station_id = pick_station_id;
    }
    public Integer getDeliver_station_id() {
        return deliver_station_id;
    }
    public void setDeliver_station_id(Integer deliver_station_id) {
        this.deliver_station_id = deliver_station_id;
    }
    public int getInsurance_value() {
        return insurance_value;
    }
    public void setInsurance_value(int insurance_value) {
        this.insurance_value = insurance_value;
    }
    public int getService_id() {
        return service_id;
    }
    public void setService_id(int service_id) {
        this.service_id = service_id;
    }
    public int getService_type_id() {
        return service_type_id;
    }
    public void setService_type_id(int service_type_id) {
        this.service_type_id = service_type_id;
    }
    public String getCoupon() {
        return coupon;
    }
    public void setCoupon(String coupon) {
        this.coupon = coupon;
    }

    public List<Integer> getPick_shift() {
        return pick_shift;
    }
    /**
     * {
        "code": 200,
        "message": "Success",
            "data":[  
                {
                "id":2 
                "title":"Ca lấy 12-03-2021 (12h00 - 18h00)",
                "from_time":43200,
                "to_time":64800
                }, 
                {
                "id":3 
                "title":"Ca lấy 13-03-2021 (7h00 - 12h00)",
                "from_time":111600,
                "to_time":129600
                }, 
                {
                "id":4 
                "title":"Ca lấy 13-03-2021 (12h00 - 18h00)",
                "from_time":129600,
                "to_time":151200
                }
            ]
        }
     * @return
     */
    public void setPick_shift(List<Integer> pick_shift) {
        this.pick_shift = pick_shift;
    }
    public List<Item> getItems() {
        return items;
    }
    public void setItems(List<Item> items) {
        this.items = items;
    }


    
}
