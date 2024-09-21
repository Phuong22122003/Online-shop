package com.webbanhang.webbanhang.Service;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.webbanhang.webbanhang.Dto.ProductSearchDto;
import com.webbanhang.webbanhang.Dto.ProductVariantAddRequestDto;
import com.webbanhang.webbanhang.Dto.ProductVariantDto;
import com.webbanhang.webbanhang.Dto.SizeDto;
import com.webbanhang.webbanhang.Dto.UserOrderSummary;
import com.webbanhang.webbanhang.Dto.ColorAddRequestDto;
import com.webbanhang.webbanhang.Dto.ColorDto;
import com.webbanhang.webbanhang.Dto.OrderRequestDto;
import com.webbanhang.webbanhang.Dto.ProductAddRequestDto;
import com.webbanhang.webbanhang.Dto.ProductDetailDto;
import com.webbanhang.webbanhang.Dto.ProductDto;
import com.webbanhang.webbanhang.Entity.Color;
import com.webbanhang.webbanhang.Entity.Product;
import com.webbanhang.webbanhang.Entity.ProductVariant;
import com.webbanhang.webbanhang.Entity.Size;
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
    private ImageService imageService;
    private ProductVariantService productVariantService;
    public ProductService(ProductVariantService productVariantService,ImageService imageService,SizeRepository sizeRepository,ColorRepository colorRepository,ProductRepsitory productsRepsitory, ProductVariantRepository productVariantRepository){
        this.productsRepsitory = productsRepsitory;
        this.productVariantRepository = productVariantRepository;
        this.colorRepository = colorRepository;
        this.sizeRepository = sizeRepository;
        this.imageService = imageService;
        this.productVariantService = productVariantService;
    }
    @Transactional(rollbackFor = Exception.class)
    public void addProduct(ProductAddRequestDto productRequest,MultipartFile coverImage, MultipartFile[] colorImages) throws Exception{
        Product product = new Product();
        String coverImagePath = null;
        List<Color> colors = new ArrayList<>();
        List<Size> sizes = new ArrayList<>();
        try{
            coverImagePath = imageService.addImage(coverImage,"");
        }
        catch(Exception ex){
            throw new Exception("Can not save cover image");
        }
        product.setImagePath(coverImagePath);
        product.setName(productRequest.getName());
        product.setDescription(productRequest.getDescription());
        product.setSubCategoryId(productRequest.getSubCategory());
        product.setDeletedFlat(false);

        Product savedProduct =  productsRepsitory.save(product);

 

        try{
            String colorPath = null;
            for(int i =0; i< colorImages.length;i++){
                colorPath = imageService.addImage(colorImages[i],"");

                for(ColorAddRequestDto color: productRequest.getColors()){
                    if(color.getImageName().trim().toLowerCase().equals(colorImages[i].getOriginalFilename().trim().toLowerCase())){
                        Color c = new Color();
                        c.setColor(color.getName());
                        c.setProductId(savedProduct.getId());
                        c.setImagePath(colorPath);
                        colors.add(c);
                        break;
                    }
                }
            }
        }
        catch(Exception ex){
            throw new Exception("Can not save color image");
        }
        for(String size: productRequest.getSizes()){
            Size s = new Size();
            s.setId(savedProduct.getId());
            s.setSize(size);
            sizes.add(s);
        }
        List<ProductVariant> variants = new ArrayList<>(); 

        List<Color> savedColors = colorRepository.saveAll(colors);
        List<Size> savedSized =  sizeRepository.saveAll(sizes);
        for(ProductVariantAddRequestDto variant: productRequest.getProductVariants()){
            ProductVariant v = new ProductVariant();
            v.setUnitPrice(variant.getPrice());
            v.setQuantity(variant.getQuantity());
            v.setProductId(savedProduct.getId());
            
            for(Color color: savedColors){
                if(variant.getColor().equals(color.getColor())){
                    v.setColorId(color.getId());
                    break;
                }
            }
            for(Size size: savedSized){
                if(variant.getSize().equals(size.getSize())){
                    v.setSizeId(size.getId());
                    break;
                }
            }
            variants.add(v);
        }
        productVariantService.saveAll(variants);
    }
    public List<UserOrderSummary> orderSummary(List<OrderRequestDto> orderRequests){
        List<UserOrderSummary> orders = new ArrayList<>();
        UserOrderSummary order = null;
        for(OrderRequestDto orderRequest: orderRequests){
            Map<String,Object> item = productVariantRepository.findProductVariantById(orderRequest.getProductVariantId());
            order = new UserOrderSummary();
            order.setProductVariantId(orderRequest.getProductVariantId());
            order.setUnitPrice(Double.parseDouble(item.get("UnitPrice").toString()));
            order.setName(item.get("Name").toString());
            order.setColor(item.get("Color").toString());
            order.setSize(item.get("Size").toString());
            order.setImagePath(item.get("ImagePath").toString());
            order.setQuantity(orderRequest.getQuantity());
            order.setSubTotal(order.getUnitPrice()*order.getQuantity());
            orders.add(order);
        }
        return orders;
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
            color.setImagePath(item.getImagePath());
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
        productVariantRepository.findAllByProductVariantsByProductId(id).forEach(item->{
            ProductVariantDto productVariant = new ProductVariantDto();
            productVariant.setId(item.getId());
            productVariant.setColorId(item.getColorId());
            productVariant.setSizeId(item.getSizeId());
            productVariant.setQuantity(item.getQuantity());
            productVariant.setPrice(item.getUnitPrice());
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
