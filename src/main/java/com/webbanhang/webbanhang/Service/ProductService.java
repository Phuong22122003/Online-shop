package com.webbanhang.webbanhang.Service;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import com.webbanhang.webbanhang.Dto.ProductSearchDto;
import com.webbanhang.webbanhang.Dto.ProductVariantDto;
import com.webbanhang.webbanhang.Dto.SizeDto;
import com.webbanhang.webbanhang.Dto.ColorDto;
import com.webbanhang.webbanhang.Dto.ProductDetailDto;
import com.webbanhang.webbanhang.Dto.ProductDto;
import com.webbanhang.webbanhang.Entity.Product;
import com.webbanhang.webbanhang.Repository.ColorRepository;
import com.webbanhang.webbanhang.Repository.ProductRepsitory;
import com.webbanhang.webbanhang.Repository.ProductVariantRepository;
import com.webbanhang.webbanhang.Repository.SizeRepository;

@Service
public class ProductService {
    private ProductRepsitory productsRepsitory;
    private ProductVariantRepository productVariantRepository;
    private ColorRepository colorRepository;
    private SizeRepository sizeRepository;

    public ProductService(SizeRepository sizeRepository,ColorRepository colorRepository,ProductRepsitory productsRepsitory, ProductVariantRepository productVariantRepository){
        this.productsRepsitory = productsRepsitory;
        this.productVariantRepository = productVariantRepository;
        this.colorRepository = colorRepository;
        this.sizeRepository = sizeRepository;
    }

    public ProductDetailDto findProductInfo(Integer id){
        ProductDetailDto product = new ProductDetailDto();
        Product tempProduct = (Product) productsRepsitory.findById(id).get();
        if(tempProduct == null){
            return null;
        }   
        product.setId(id);
        product.setName(tempProduct.getName());
        product.setImagePath(tempProduct.getImagePath());
        product.setDescription(tempProduct.getDescription());

        List<ColorDto> colors = new ArrayList<>();
        colorRepository.findColorsByProductId(id).forEach(item->{
            ColorDto color = new ColorDto();
            color.setId(item.getId());
            color.setColor(item.getColor());
            colors.add(color);
        });
        product.setColors(colors);

        List<SizeDto> sizes = new ArrayList<>();
        sizeRepository.findSizesByProductId(id).forEach(item->{
            SizeDto size = new SizeDto();
            size.setId(item.getId());
            size.setSize(item.getSize());
            sizes.add(size);
        });
        product.setSizes(sizes);

        List<ProductVariantDto> productVariants = new ArrayList<>();
        productVariantRepository.findAllByProductId(id).forEach(item->{
            ProductVariantDto productVariant = new ProductVariantDto();
            productVariant.setId(item.getId());
            productVariant.setColorId(item.getColorId());
            productVariant.setSizeId(item.getSizeId());
            productVariant.setQuantity(item.getQuantity());
            productVariant.setPrice(item.getUnitPrice());
            productVariant.setImageUrl(item.getImagePath());
            productVariants.add(productVariant);
        });
        product.setProductVariants(productVariants);
        return product;
        
    }
    public List<Product> findAll(){
        return productsRepsitory.findAll();
    }
    public List<ProductSearchDto> findAllProductsForSearch(){
        List<Map<String,Object>> products = this.productsRepsitory.findAllProductsForSearch();
        List<ProductSearchDto> productSearchDtos = new ArrayList<>();
        Map<Integer,ProductSearchDto> uniqueProducts = new HashMap<>();
       
        for(Map<String, Object> product : products){
            Integer id = Integer.parseInt(product.get("Id").toString());
            Integer sizeId = Integer.parseInt(product.get("SizeId").toString());
            Integer colorId = Integer.parseInt(product.get("ColorId").toString());
            String price = product.get("Price").toString();
            if(!uniqueProducts.containsKey(id)){
                String name = product.get("Name").toString();
                String imagePath = product.get("ImagePath").toString();
                Integer CategoryId = Integer.parseInt(product.get("MainCategoryId").toString());
                ProductSearchDto productSearchDto = new ProductSearchDto();
                productSearchDto.setId(id);
                productSearchDto.setName(name);
                productSearchDto.setPrice(price);
                productSearchDto.setCategoryId(CategoryId);
                productSearchDto.setImagePath(imagePath);
                productSearchDto.setSizes(new HashSet<>());
                productSearchDto.setColors(new HashSet<>());
                productSearchDto.getSizes().add(sizeId);
                productSearchDto.getColors().add(colorId);
                uniqueProducts.put(id, productSearchDto);
                productSearchDtos.add(productSearchDto);
            }
            else{
                ProductSearchDto productSearchDto = uniqueProducts.get(id);

                productSearchDto.getColors().add(colorId);
                productSearchDto.getSizes().add(sizeId);

                if(Double.valueOf(productSearchDto.getPrice())>Double.valueOf(price)){
                    productSearchDto.setPrice(price);
                }
                
            }
        }
        return productSearchDtos;

    }
    public List<ProductDto> findBannerProducts(){
        List<Product> products = productsRepsitory.findAll();//update
        List<ProductDto> productsDto = new ArrayList<>();
        for(Product temp: products){
            ProductDto product = new ProductDto();
            product.setId(temp.getId());
            product.setName(temp.getName());
            product.setDescription(temp.getDescription());
            product.setImagePath(temp.getImagePath());
            productsDto.add(product);
        }
        return productsDto;
    }

    public List<ProductDto> findBestSellerProducts(){
        List<Map<String,Object> >bestSeller = productsRepsitory.bestSeller();
        List<ProductDto> products = new ArrayList<>();
        ProductDto temp = null;
        for(Map<String,Object> product: bestSeller){
            temp = new ProductDto();
            temp.setId(Integer.valueOf(product.get("Id").toString()));
            temp.setImagePath(product.get("ImagePath").toString());
            temp.setName(product.get("Name").toString());
            temp.setPrice(product.get("Price").toString());
            products.add(temp);
        } 
        return products;
    }

    public List<ProductDto> findRecommendedProducts(){
        List<Map<String, Object>> products = productsRepsitory.findAllProducts();
        List<ProductDto> productsDto = new ArrayList<>();
        for(Map<String,Object> temp: products){
            ProductDto product = new ProductDto();
            product.setId(Integer.valueOf(temp.get("Id").toString()));
            product.setName(temp.get("Name").toString());
            product.setImagePath(temp.get("ImagePath").toString());
            product.setPrice(temp.get("Price").toString());
            productsDto.add(product);
        }
        return productsDto;
    }
    
}
