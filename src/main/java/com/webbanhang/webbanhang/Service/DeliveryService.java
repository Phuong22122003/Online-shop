package com.webbanhang.webbanhang.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.webbanhang.webbanhang.Dto.Delivery.OrderStatus;
import com.webbanhang.webbanhang.Dto.Delivery.Address.District;
import com.webbanhang.webbanhang.Dto.Delivery.Address.Province;
import com.webbanhang.webbanhang.Dto.Delivery.Address.Ward;
import com.webbanhang.webbanhang.Dto.Delivery.CreateOrder.CreateOrder;
import com.webbanhang.webbanhang.Dto.Delivery.CreateOrder.Item;
import com.webbanhang.webbanhang.Dto.Delivery.DeliveryFee.ApiResponse;
import com.webbanhang.webbanhang.Dto.Delivery.DeliveryFee.DeliveryFeeRequest;
import com.webbanhang.webbanhang.Dto.Delivery.DeliveryFee.ToAddress;
import com.webbanhang.webbanhang.Entity.Address;

import jakarta.persistence.criteria.CriteriaBuilder.In;

@Service
public class DeliveryService {
    @Value("${token}")
    private String token;
    @Value("${shopId}")
    private String shopId;
    private RestTemplate restTemplate;
    private AddressService addressService;
    private ProductVariantService productVariantService;
    public DeliveryService(AddressService addressService,ProductVariantService productVariantService) {
        this.restTemplate = new RestTemplate();
        this.addressService = addressService;
        this.productVariantService = productVariantService;
    }
    public Integer calculateDeliveryFee(ToAddress toAddress){
        String url = "https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee";
        HttpHeaders headers = new HttpHeaders();
        headers.set("Content-Type", "application/json");
        headers.set("ShopId", shopId);
        headers.set("Token", token);
        DeliveryFeeRequest deliveryFeeRequest = new DeliveryFeeRequest();
        deliveryFeeRequest.setService_id(toAddress.getService_id());
        deliveryFeeRequest.setTo_district_id(toAddress.getTo_district_id());
        deliveryFeeRequest.setTo_ward_code(toAddress.getTo_ward_code());
        deliveryFeeRequest.setWeight(toAddress.getQuantity() *100);
        deliveryFeeRequest.setWidth(12);
        deliveryFeeRequest.setHeight(toAddress.getQuantity()*5);
        deliveryFeeRequest.setLength(12);
        HttpEntity<DeliveryFeeRequest> entity = new HttpEntity<>(deliveryFeeRequest, headers);
        ResponseEntity<ApiResponse> response = restTemplate.exchange(url, HttpMethod.POST, entity, ApiResponse.class);

        ApiResponse responseData = response.getBody();
        return responseData.getData().getTotal();
    }

    public void createOrder(Integer PurchaseHistoryId){
        String url = "https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/create";
        Address address = addressService.findAddressByPurchasingId(PurchaseHistoryId);
        List<Item> items = productVariantService.findProductInforOfOrder(PurchaseHistoryId);

        Integer codAmount = 0;
        Integer weight = 0;
        Integer height = 0;
        for(Item item:items){
            height += item.getHeight();
            codAmount += item.getQuantity() * item.getPrice();
            weight += item.getWeight();
        }

        HttpHeaders headers = new HttpHeaders();
        headers.set("Content-Type", "application/json");
        headers.set("ShopId", shopId);
        headers.set("Token", token);
        CreateOrder order = new CreateOrder();
        order.setPayment_type_id(2);
        order.setRequired_note("CHOXEMHANGKHONGTHU");
        order.setFrom_name("Fashion Shop");
        order.setFrom_phone("0565688609");
        order.setFrom_address("61/11 Hàng tre");
        order.setFrom_province_name("HCM");
        order.setFrom_district_name("TP Thủ Đức");
        order.setFrom_ward_name("P. Long Thạnh Mỹ");
        order.setTo_name(address.getLastname() + " " + address.getFirstname());
        order.setTo_phone(address.getPhone());
        order.setTo_address(address.getDetail());
        order.setTo_ward_code(address.getWardId());
        order.setTo_district_id(address.getDistrictId());
        order.setCod_amount(codAmount);
        order.setContent("Giao hàng");
        order.setWeight(weight);
        order.setLength(12);
        order.setWidth(12);
        order.setHeight(height);
        order.setInsurance_value(0);
        order.setService_type_id(2);//chuẩn
        List<Integer> picking_shift = new ArrayList<>();
        picking_shift.add(3);
        order.setPick_shift(picking_shift);
        order.setItems(items);
          // Tạo HttpEntity chứa body và headers
        HttpEntity<CreateOrder> entity = new HttpEntity<>(order, headers);
         ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST, entity, String.class);

        response.getBody();
    }

    public List<OrderStatus> getOrderStatus(String orderId) throws Exception{
        String url= "https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/detail";
        HttpHeaders headers = new HttpHeaders();
        headers.set("Content-Type", "application/json");
        headers.set("Token", token);
        Map<String,String> orderIdWrapper = new HashMap<>();
        orderIdWrapper.put("order_code",orderId);
        HttpEntity<Map<String,String>> entity = new HttpEntity<>(orderIdWrapper, headers);
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST, entity, String.class);
        List<OrderStatus> orderStatus = new ArrayList<>();
        String data = response.getBody();
        try {
                // Tạo một ObjectMapper
                ObjectMapper objectMapper = new ObjectMapper();

                // Đọc JSON và chuyển đổi nó thành JsonNode
                JsonNode rootNode = objectMapper.readTree(data);

                // Truy cập vào phần log trong data
                JsonNode logNode = rootNode.path("data").path("log");

                // Duyệt qua danh sách các log và lấy status
                if (logNode.isArray()) {
                    for (JsonNode node : logNode) {
                        String status = node.path("status").asText();
                        String updated_date = node.path("updated_date").asText();
                        OrderStatus temp = new OrderStatus();
                        temp.setStatus(status);
                        temp.setUpdatedDate(updated_date);
                        orderStatus.add(temp);
                    }
                }
            } catch (Exception e) {
                throw new Exception("Can not get status");
            }
        return orderStatus;
    }
    public List<Province> getProvinces() throws Exception{
        String url = "https://online-gateway.ghn.vn/shiip/public-api/master-data/province";
        HttpHeaders headers = new HttpHeaders();
        headers.set("Token", token);
        HttpEntity<Map<String,String>> entity = new HttpEntity<>(headers);
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);
        String data = response.getBody();
        List<Province> provinces = new ArrayList<>();
        try {
            // Tạo một ObjectMapper
            ObjectMapper objectMapper = new ObjectMapper();

            // Đọc JSON và chuyển đổi nó thành JsonNode
            JsonNode rootNode = objectMapper.readTree(data);

            // Truy cập vào phần log trong data
            JsonNode logNode = rootNode.path("data");

            // Duyệt qua danh sách các log và lấy status
            if (logNode.isArray()) {
                for (JsonNode node : logNode) {
                    Integer provinceId= node.path("ProvinceID").asInt();
                    String proviceName = node.path("ProvinceName").asText();
                    Province province = new Province();
                    province.setProvinceId(provinceId);
                    province.setProvinceName(proviceName);
                    provinces.add(province);
                }
            }
        } catch (Exception e) {
            throw new Exception("Can not get status");
        }
        return provinces;
    }

    public List<District> getDistricts(Integer provinceId) throws Exception{
        String url = "https://online-gateway.ghn.vn/shiip/public-api/master-data/district";
        HttpHeaders headers = new HttpHeaders();
        headers.set("Token", token);
        Map<String,Integer> requestBody = new HashMap<>();
        requestBody.put("province_id", provinceId);
        HttpEntity<Map<String,Integer>> entity = new HttpEntity<>(requestBody,headers);
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST, entity, String.class);
        String data = response.getBody();
        List<District> districts = new ArrayList<>();
        try {
            // Tạo một ObjectMapper
            ObjectMapper objectMapper = new ObjectMapper();

            // Đọc JSON và chuyển đổi nó thành JsonNode
            JsonNode rootNode = objectMapper.readTree(data);

            // Truy cập vào phần log trong data
            JsonNode logNode = rootNode.path("data");

            // Duyệt qua danh sách các log và lấy status
            if (logNode.isArray()) {
                for (JsonNode node : logNode) {
                    Integer districtId= node.path("DistrictID").asInt();
                    String districtName = node.path("DistrictName").asText();
                    District district = new District();
                    district.setDistrictID(districtId);
                    district.setDistrictName(districtName);
                    districts.add(district);
                }
            }
        } catch (Exception e) {
            throw new Exception("Can not get status");
        }
        return districts;
    }

    public List<Ward> getWards(Integer districtId) throws Exception{
        String url = "https://online-gateway.ghn.vn/shiip/public-api/master-data/ward";
        HttpHeaders headers = new HttpHeaders();
        headers.set("Token", token);
        Map<String,Integer> requestBody = new HashMap<>();
        requestBody.put("district_id", districtId);
        HttpEntity<Map<String,Integer>> entity = new HttpEntity<>(requestBody,headers);
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST, entity, String.class);
        String data = response.getBody();
        List<Ward> wards = new ArrayList<>();
        try {
            // Tạo một ObjectMapper
            ObjectMapper objectMapper = new ObjectMapper();

            // Đọc JSON và chuyển đổi nó thành JsonNode
            JsonNode rootNode = objectMapper.readTree(data);

            // Truy cập vào phần log trong data
            JsonNode logNode = rootNode.path("data");

            // Duyệt qua danh sách các log và lấy status
            if (logNode.isArray()) {
                for (JsonNode node : logNode) {
                    String wardId= node.path("WardID").asText();
                    String wardName = node.path("WardName").asText();
                    Ward ward = new Ward();
                    ward.setWardId(wardId);
                    ward.setWardName(wardName);
                    wards.add(ward);
                }
            }
        } catch (Exception e) {
            throw new Exception("Can not get status");
        }
        return wards;
    }
}
