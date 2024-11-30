package com.webbanhang.webbanhang.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.webbanhang.webbanhang.Dto.ResponseDto;
import com.webbanhang.webbanhang.Dto.Delivery.CreateOrder.Category;
import com.webbanhang.webbanhang.Dto.Delivery.CreateOrder.Item;
import com.webbanhang.webbanhang.Dto.User.Buy.OrderRequestDto;
import com.webbanhang.webbanhang.Entity.ProductVariant;
import com.webbanhang.webbanhang.Repository.ProductVariantRepository;

@Service
public class ProductVariantService {
    private ProductVariantRepository productVariantRepository;
    public ProductVariantService(ProductVariantRepository productVariantRepository){
        this.productVariantRepository = productVariantRepository;
    }

    public List<ProductVariant> saveAll(List<ProductVariant>productVariants){
        return productVariantRepository.saveAll(productVariants);
    }

    public List<Item> findProductInforOfOrder(Integer purchasingId){
        List<Map<String,Object>> rawItems = productVariantRepository.findProductInforOfOrder(purchasingId);
        List<Item> items = new ArrayList<>();
        for(Map<String,Object> row: rawItems){
            Item item = new Item();
            Category category = new Category();
            category.setLevel1(row.get("Category").toString());
            item.setName(row.get("Name").toString());
            item.setCode(row.get("ProductId").toString());
            item.setQuantity(Integer.parseInt(row.get("Quantity").toString()));
            item.setPrice(Integer.parseInt(row.get("Price").toString()));
            item.setCategory(category);
            item.setWeight(100);
            item.setHeight(5);
            item.setLength(12);
            item.setWidth(12);
            items.add(item);
        }
        return items;
    }
    public void subtractProductVariantQuantity(Integer productVariantId,Integer quantity){
        productVariantRepository.subtractProductVariantQuantity(productVariantId, quantity);
    }
    public void restoreProductQuantity(Integer orderId){
        productVariantRepository.restoreProductQuantity(orderId);
    }

    public ResponseDto checkBeforeBuy(List<OrderRequestDto> orders){
        ResponseDto response = new ResponseDto();

        for(OrderRequestDto order:orders){
            ProductVariant product = productVariantRepository.findById(order.getProductVariantId()).get();
            if(product == null){
                response.setMessage("Sản phẩm không tồn tại");
                response.setError(true);
                return response;
            }
            if(product.getQuantity()<order.getQuantity()){
                response.setMessage("Số lượng sản phẩm không đủ");
                response.setError(true);
                return response;    
            }
        }
        response.setError(false);
        response.setMessage("");
        return response;
    }
}
