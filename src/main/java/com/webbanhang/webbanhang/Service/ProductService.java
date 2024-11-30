package com.webbanhang.webbanhang.Service;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.webbanhang.webbanhang.Dto.ResponseDto;
import com.webbanhang.webbanhang.Dto.Admin.Management.InventoryDto;
import com.webbanhang.webbanhang.Dto.Admin.Management.AddProduct.ColorAddRequestDto;
import com.webbanhang.webbanhang.Dto.Admin.Management.AddProduct.ProductAddRequestDto;
import com.webbanhang.webbanhang.Dto.Admin.Management.AddProduct.ProductVariantAddRequestDto;
import com.webbanhang.webbanhang.Dto.Admin.Management.UpdateProduct.ColorUpdateRequestDto;
import com.webbanhang.webbanhang.Dto.Admin.Management.UpdateProduct.ProductDetailToDisplayForAdminDto;
import com.webbanhang.webbanhang.Dto.Admin.Management.UpdateProduct.ProductUpdateRequestDto;
import com.webbanhang.webbanhang.Dto.Admin.Management.UpdateProduct.ProductVariantUpdateRequestDto;
import com.webbanhang.webbanhang.Dto.Admin.Management.UpdateProduct.SizeUpdateRequestDto;
import com.webbanhang.webbanhang.Dto.Shopping.ColorDto;
import com.webbanhang.webbanhang.Dto.Shopping.ProductDetailDto;
import com.webbanhang.webbanhang.Dto.Shopping.ProductDto;
import com.webbanhang.webbanhang.Dto.Shopping.ProductSearchDto;
import com.webbanhang.webbanhang.Dto.Shopping.ProductVariantDto;
import com.webbanhang.webbanhang.Dto.Shopping.SearchDto;
import com.webbanhang.webbanhang.Dto.Shopping.SizeDto;
import com.webbanhang.webbanhang.Dto.Shopping.SubCategoryDto;
import com.webbanhang.webbanhang.Dto.Shopping.UserOrderSummary;
import com.webbanhang.webbanhang.Dto.Shopping.SearchAI.ProductForAISearch;
import com.webbanhang.webbanhang.Dto.User.Buy.OrderRequestDto;
import com.webbanhang.webbanhang.Entity.Color;
import com.webbanhang.webbanhang.Entity.ColorOption;
import com.webbanhang.webbanhang.Entity.Product;
import com.webbanhang.webbanhang.Entity.ProductVariant;
import com.webbanhang.webbanhang.Entity.Size;
import com.webbanhang.webbanhang.Entity.SizeOption;
import com.webbanhang.webbanhang.Repository.ColorRepository;
import com.webbanhang.webbanhang.Repository.ProductRepsitory;
import com.webbanhang.webbanhang.Repository.ProductVariantRepository;
import com.webbanhang.webbanhang.Repository.SizeRepository;
import com.webbanhang.webbanhang.Repository.SubCategoryRepository;

import jakarta.persistence.Id;

/**
 * Service đơn cho repo. Xử lý chuyên về sản phẩm.
 */
@Service
public class ProductService {
    private ProductRepsitory productsRepsitory;
    private ProductVariantRepository productVariantRepository;
    private ColorRepository colorRepository;
    private SizeRepository sizeRepository;
    private ImageService imageService;
    private ProductVariantService productVariantService;
    private CatergoryService catergoryService;
    private ColorOptionService colorOptionService;
    private SizeOptionService sizeOptionService;
    private Integer pageSize = 5;
    public ProductService(CatergoryService catergoryService,
                        ProductVariantService productVariantService,ImageService imageService,
                        SizeRepository sizeRepository,ColorRepository colorRepository,
                        ProductRepsitory productsRepsitory, ProductVariantRepository productVariantRepository,
                        ColorOptionService colorOptionService,SizeOptionService sizeOptionService){
        this.sizeOptionService = sizeOptionService;
        this.colorOptionService = colorOptionService;
        this.productsRepsitory = productsRepsitory;
        this.productVariantRepository = productVariantRepository;
        this.colorRepository = colorRepository;
        this.sizeRepository = sizeRepository;
        this.imageService = imageService;
        this.productVariantService = productVariantService;
        this.catergoryService = catergoryService;
    }

    public Double findLowestPriceOfProduct(Integer productId){
        List<ProductVariant> productVariants = productVariantRepository.findAllByProductVariantsByProductId(productId);
        Double lowestPrice = null;
        for(ProductVariant productVariant:productVariants){
            if(lowestPrice == null||lowestPrice>productVariant.getUnitPrice()){
                lowestPrice = productVariant.getUnitPrice();
            }
        }
        return lowestPrice;
    }
    public Double findHighestPriceOfProduct(Integer productId){
        List<ProductVariant> productVariants = productVariantRepository.findAllByProductVariantsByProductId(productId);
        Double highestPrice = null;
        for(ProductVariant productVariant:productVariants){
            if(highestPrice == null||highestPrice<productVariant.getUnitPrice()){
                highestPrice = productVariant.getUnitPrice();
            }
        }
        return highestPrice;
    }

    public Integer findRemainingQuantity(Integer productId){
        List<ProductVariant> productVariants = productVariantRepository.findAllByProductVariantsByProductId(productId);
        Integer quantity = 0;
        for(ProductVariant productVariant:productVariants){
            quantity += productVariant.getQuantity();
        }
        return quantity;
    }

    public List<InventoryDto> findInventoryByKey(String key){
        key = key.toLowerCase();
        List<Map<String,Object>> inventory = new ArrayList<>();
        Integer i = 1;
        while(true){
            List<Map<String,Object>> temp =  productsRepsitory.findInventory(i++,1000);
            if(temp.size()==0) break;
            inventory.addAll(temp);
        }
        List<InventoryDto> inventoryDto = new ArrayList<>();
        InventoryDto inventoryTemp = null;
        for(Map<String,Object> item: inventory){
            String name = item.get("Name").toString();
            Integer id = Integer.parseInt(item.get("ProductId").toString());
            if(!name.toLowerCase().contains(key)&&!id.toString().toLowerCase().contains(key)) continue;
            
            inventoryTemp = new InventoryDto();
            inventoryTemp.setId(Integer.parseInt(item.get("ProductId").toString()));    
            inventoryTemp.setName(item.get("Name").toString());
            inventoryTemp.setImagePath(imageService.getImagePath(item.get("ImagePath").toString(),""));
            inventoryTemp.setRemainingQuantity(Integer.parseInt(item.get("RemainingQuantity").toString()));

            inventoryTemp.setCancelledQuantity(Integer.parseInt(item.get("CancelledQuantity").toString()));

            inventoryTemp.setConfirmingQuantity(Integer.parseInt(item.get("ConfirmingQuantity").toString()));

            inventoryTemp.setPreparingQuantity(Integer.parseInt(item.get("PreparingQuantity").toString()));
            
            inventoryTemp.setInprocessQuantity(Integer.parseInt(item.get("InprocessQuantity").toString()));
            
            inventoryTemp.setSoldQuantity(Integer.parseInt(item.get("SoldQuantity").toString()));
            Integer subCategoryId = Integer.parseInt(item.get("SubCategoryId").toString());
            SubCategoryDto subCategoryDto = catergoryService.findSubCategoryById(subCategoryId);
            if(subCategoryDto!=null){
                inventoryTemp.setSubCategoryName(subCategoryDto.getName());
            }
            inventoryDto.add(inventoryTemp);
        }
        return inventoryDto;
    }
    public Integer findPageNumber(){
        List<Product> products = productsRepsitory.findAll();
        Integer pageNumber =  products.size()/pageSize + 1;
        return pageNumber;
    }

    public List<InventoryDto> findInventory(Integer page){
        List<Map<String,Object>> inventory = productsRepsitory.findInventory(page,pageSize);
        List<InventoryDto> inventoryDto = new ArrayList<>();
        InventoryDto inventoryTemp = null;
        for(Map<String,Object> item: inventory){
            inventoryTemp = new InventoryDto();
            inventoryTemp.setId(Integer.parseInt(item.get("ProductId").toString()));    
            inventoryTemp.setImagePath(imageService.getImagePath(item.get("ImagePath").toString(),""));
            inventoryTemp.setName(item.get("Name").toString());
            inventoryTemp.setDeletedFlat(Boolean.parseBoolean(item.get("DeletedFlat").toString()));
            inventoryTemp.setRemainingQuantity(Integer.parseInt(item.get("RemainingQuantity").toString()));

            inventoryTemp.setCancelledQuantity(Integer.parseInt(item.get("CancelledQuantity").toString()));

            inventoryTemp.setConfirmingQuantity(Integer.parseInt(item.get("ConfirmingQuantity").toString()));

            inventoryTemp.setPreparingQuantity(Integer.parseInt(item.get("PreparingQuantity").toString()));
            
            inventoryTemp.setInprocessQuantity(Integer.parseInt(item.get("InprocessQuantity").toString()));

            inventoryTemp.setSoldQuantity(Integer.parseInt(item.get("SoldQuantity").toString()));

            Integer subCategoryId = Integer.parseInt(item.get("SubCategoryId").toString());
            SubCategoryDto subCategoryDto = catergoryService.findSubCategoryById(subCategoryId);
            if(subCategoryDto!=null){
                inventoryTemp.setSubCategoryName(subCategoryDto.getName());
            }
    
            inventoryDto.add(inventoryTemp);
        }
        return inventoryDto;
    }

    /***
     * Cập nhật thông tin sản phẩm
     * Cập nhật ảnh chính cho sản phẩm nếu có
     * Tạo list color,size sẽ xóa
     * Tạo list color,size sẽ thêm hoặc sửa đổi
     * Lưu list color sẽ thêm hoặc sửa (1)
     * Tạo list variant thêm,sửa 
     * Tạo list variant sẽ xóa
     * Lưu variant thêm, sửa
     * Lưu variant xóa
     * Lưu size và color xóa ->  
     * @param productRequest
     * @param coverImage
     * @param colorImages
     * @throws Exception
     */
    @Transactional(rollbackFor =  Exception.class)
    public void updateProduct(ProductUpdateRequestDto productRequest,MultipartFile coverImage, MultipartFile [] colorImages)throws Exception{
        Product product = productsRepsitory.findById(productRequest.getId()).get();
        List<Color> colors = new ArrayList<>();
        List<Color> deletedColors = new ArrayList<>();
        List<Size> sizes = new ArrayList<>();
        List<Size> deletedSizes = new ArrayList<>();
        product.setId(productRequest.getId());
        product.setDescription(productRequest.getDescription());
        product.setName(productRequest.getName());
        product.setSubCategoryId(productRequest.getSubCategoryId());
        product.setBrandId(productRequest.getBrandId());
        if(coverImage!=null){
            String uniqueCoverImageName = imageService.getUniqueName(coverImage.getOriginalFilename());
            product.setImagePath(uniqueCoverImageName);
        }

        Product savedProduct = productsRepsitory.save(product);
        
        String uniqueColorName = "";
        Map<String,MultipartFile> colorFiles = new HashMap<>();
        for(ColorUpdateRequestDto color: productRequest.getNewColors()){
            Color clr = new Color();
            clr.setId(color.getColorId());
            // if status is 'delete' then color.getColorId always != null
            if(color.getStatus().trim().toUpperCase().equals("DELETED")){
                deletedColors.add(clr);
                continue;
            }
            
            clr.setProductId(savedProduct.getId());
            clr.setColor(color.getColor());
            if(colorImages==null) throw new Exception("Lỗi xung đột dữ liệu ảnh màu sắc");
            for(MultipartFile colorImage: colorImages){
                if(colorImage.getOriginalFilename()!=null&&colorImage.getOriginalFilename().trim().toUpperCase().equals(color.getImageName().trim().toUpperCase())){
                    uniqueColorName = imageService.getUniqueName(colorImage.getOriginalFilename());
                    colorFiles.put(uniqueColorName, colorImage);
                    clr.setImagePath(uniqueColorName);
                    break;
                }
            }
            colors.add(clr);
        }

        for(SizeUpdateRequestDto size: productRequest.getNewSizes()){
            Size sz = new Size();
            sz.setId(size.getSizeId());
            if(size.getStatus().toUpperCase().equals("DELETED")){
                deletedSizes.add(sz);
                continue;
            }
            sz.setProductId(savedProduct.getId());
            sz.setSize(size.getSize());
        }
        
        colorRepository.saveAll(colors);
        sizeRepository.saveAll(sizes);


        List<Color> savedColors = colorRepository.findColorsByProductId(productRequest.getId());
        List<Size> savedSizes = sizeRepository.findSizesByProductId(productRequest.getId());
 

        List<ProductVariant> productVariants = new ArrayList<>();
        List<ProductVariant> deletedProductVariants = new ArrayList<>();
        for(ProductVariantUpdateRequestDto productVariant: productRequest.getProductVariants()){
            ProductVariant variant = new ProductVariant();
            variant.setId(productVariant.getId());
            if(productVariant.getStatus().toUpperCase().equals("DELETED")){
                deletedProductVariants.add(variant);
                continue;
            }
            variant.setProductId(savedProduct.getId());
            variant.setUnitPrice(productVariant.getPrice());
            variant.setQuantity(productVariant.getQuantity());
            //change
            if(productVariant.getStatus().equals("CHANGED")){
                ProductVariant temp = productVariantRepository.findById(productVariant.getId()).get();
                if(temp!=null){
                    variant.setColorId(temp.getColorId());
                    variant.setSizeId(temp.getSizeId());
                }
            }
            //add
            else{
                for(Color color: savedColors){
                    if(productVariant.getColor().equals(color.getColor())){
                        variant.setColorId(color.getId());
                        break;
                    }
                }
                for(Size size: savedSizes){
                    if(productVariant.getSize().equals(size.getSize())){
                        variant.setSizeId(size.getId());
                        break;
                    }
                }
            }
            productVariants.add(variant);
        }
        productVariantRepository.saveAll(productVariants);
        productVariantRepository.deleteAll(deletedProductVariants);
        

        if(deletedColors.size()>0)
            colorRepository.deleteAll(deletedColors);
        if(deletedSizes.size()>0)
            sizeRepository.deleteAll(deletedSizes);

        try {
            if(coverImage!=null)
                imageService.addImage(coverImage, product.getImagePath(), "");
            for(Map.Entry<String,MultipartFile> entry: colorFiles.entrySet()){
                imageService.addImage(entry.getValue(), entry.getKey(), "");
            }
        } catch (Exception e) {
            throw new Exception("Can not save color image");
        }
    }

    @SuppressWarnings("null")
    @Transactional(rollbackFor = Exception.class)
    public void addProduct(ProductAddRequestDto productRequest,MultipartFile coverImage, MultipartFile[] colorImages) throws Exception{
        Product product = new Product();
        List<Color> colors = new ArrayList<>();
        List<Size> sizes = new ArrayList<>();
        Map<String,MultipartFile> colorFiles = new HashMap<>();
        String coverImageUniqueName = imageService.getUniqueName(coverImage.getOriginalFilename());
        // String coverImagePath =  imageService.getImagePath(coverImageUniqueName, "");
        String folder = "";// configure folder follow subcategoryId or subcategoryName
        product.setImagePath(coverImageUniqueName);
        product.setName(productRequest.getName());
        product.setDescription(productRequest.getDescription());
        product.setSubCategoryId(productRequest.getSubCategory());
        product.setDeletedFlat(false);
        product.setBrandId(productRequest.getBrandId());
        Product savedProduct =  productsRepsitory.save(product);

        String colorUniqueName = null;
        for(int i =0; i< colorImages.length;i++){
            colorUniqueName = imageService.getUniqueName(colorImages[i].getOriginalFilename());
            colorFiles.put(colorUniqueName, colorImages[i]);
            for(ColorAddRequestDto color: productRequest.getColors()){
                if(color.getImageName().trim().toLowerCase().equals(colorImages[i].getOriginalFilename().trim().toLowerCase())){
                    Color c = new Color();
                    c.setColor(color.getName());
                    c.setProductId(savedProduct.getId());
                    c.setImagePath(colorUniqueName);
                    colors.add(c);
                    break;
                }
            }
        }
        for(String size: productRequest.getSizes()){
            Size s = new Size();
            s.setProductId(savedProduct.getId());
            s.setSize(size);
            sizes.add(s);
        }
        List<ProductVariant> variants = new ArrayList<>(); 

        List<Color> savedColors = colorRepository.saveAll(colors);
        List<Size> savedSizes =  sizeRepository.saveAll(sizes);
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
            for(Size size: savedSizes){
                if(variant.getSize().equals(size.getSize())){
                    v.setSizeId(size.getId());
                    break;
                }
            }
            variants.add(v);
        }
        productVariantService.saveAll(variants);



        try {
            imageService.addImage(coverImage, coverImageUniqueName, folder);
            for(Map.Entry<String,MultipartFile> entry: colorFiles.entrySet()){
                imageService.addImage(entry.getValue(), entry.getKey(), folder);
            }
        } catch (Exception e) {
            throw new Exception("Can not save color image");
        }
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
            order.setImagePath(imageService.getImagePath(item.get("ImagePath").toString(),""));
            order.setQuantity(orderRequest.getQuantity());
            order.setSubTotal(order.getUnitPrice()*order.getQuantity());
            orders.add(order);
        }
        return orders;
    }

    @SuppressWarnings("null")
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
        Double minPrice = null;
        Double maxPrice = null;
        List<ProductVariant> tempVariants =  productVariantRepository.findAllByProductVariantsByProductId(id);
        for(ProductVariant item: tempVariants){
            ProductVariantDto productVariant = new ProductVariantDto();
            productVariant.setId(item.getId());
            productVariant.setColorId(item.getColorId());
            productVariant.setSizeId(item.getSizeId());
            productVariant.setQuantity(item.getQuantity());
            productVariant.setPrice(item.getUnitPrice());
            productVariants.add(productVariant);
            if(minPrice == null){
                minPrice = maxPrice = item.getUnitPrice();
            }
            else if(minPrice > item.getUnitPrice()){
                minPrice = item.getUnitPrice();
            }
            else if(maxPrice < item.getUnitPrice()){
                maxPrice = item.getUnitPrice();
            }
        }
        // productVariantRepository.findAllByProductVariantsByProductId(id).forEach(item->{
        // });
        product.setProductVariants(productVariants);
        if(minPrice == maxPrice && minPrice!=null)
            product.setPrice(minPrice.toString());
        else if(minPrice!=null && maxPrice !=null){
            product.setPrice(minPrice.toString() + "-" + maxPrice.toString());
        }
        else{
            product.setPrice("---");
        }
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
            String size = product.get("Size").toString().toUpperCase();
            String color = product.get("Color").toString().trim().toUpperCase();
            String price = product.get("Price").toString().trim();
            if(!uniqueProducts.containsKey(id)){
                String name = product.get("Name").toString();
                String imagePath = imageService.getImagePath(product.get("ImagePath").toString(),"");
                String description = product.get("Description").toString();
                Integer CategoryId = Integer.parseInt(product.get("MainCategoryId").toString());
                ProductSearchDto productSearchDto = new ProductSearchDto();
                productSearchDto.setId(id);
                productSearchDto.setName(name);
                productSearchDto.setPrice(price);
                productSearchDto.setCategoryId(CategoryId);
                productSearchDto.setImagePath(imagePath);
                productSearchDto.setSizes(new HashSet<>());
                productSearchDto.setColors(new HashSet<>());
                productSearchDto.setColors(new HashSet<>());
                productSearchDto.setSizes(new HashSet<>());
                productSearchDto.getSizes().add(size);
                productSearchDto.getColors().add(color);
                productSearchDto.setDescription(description);
                uniqueProducts.put(id, productSearchDto);
                productSearchDtos.add(productSearchDto);
            }
            else{
                ProductSearchDto productSearchDto = uniqueProducts.get(id);

                productSearchDto.getColors().add(color);
                productSearchDto.getSizes().add(size);

                if(Double.valueOf(productSearchDto.getPrice())
                    >Double.valueOf(price)){
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
            temp.setDescription(product.get("Description").toString());
            temp.setId(Integer.valueOf(product.get("Id").toString()));
            temp.setImagePath(imageService.getImagePath(product.get("ImagePath").toString(),""));
            temp.setName(product.get("Name").toString());
            temp.setPrice(product.get("Price").toString());
            products.add(temp);
        } 
        return products;
    }

    public List<ProductDto> findRecommendedProducts(Integer productId){
        List<Map<String, Object>> products = productsRepsitory.findAllProducts();
        List<ProductDto> productsDto = new ArrayList<>();
        Integer tempId;
        for(Map<String,Object> temp: products){
            tempId = Integer.valueOf(temp.get("Id").toString());
            if(productId!=null&&tempId.equals(productId))continue;
            ProductDto product = new ProductDto();
            product.setId(tempId);
            product.setName(temp.get("Name").toString());
            product.setImagePath(imageService.getImagePath(temp.get("ImagePath").toString(),""));
            product.setPrice(temp.get("Price").toString());
            product.setDescription(temp.get("Description").toString());
            product.setRemainingQuantity(Integer.parseInt(temp.get("RemaingQuantity").toString()));
            productsDto.add(product);
        }
        return productsDto;
    }
    public SearchDto findProductsOfCategory(Integer categoryId){
        List<Map<String,Object>> products = this.productsRepsitory.findAllProductsOfCategory(categoryId);
        SearchDto result = new SearchDto();
        result.setProducts(new ArrayList<>());
        Map<String,Integer>sizes = new HashMap<>();
        Map<String,Integer> colors = new HashMap<>();
        List<ProductSearchDto> productSearchDtos = new ArrayList<>();
        Map<Integer,ProductSearchDto> uniqueProducts = new HashMap<>();
       
        for(Map<String, Object> product : products){
            Integer id = Integer.parseInt(product.get("Id").toString());
            String size = product.get("Size").toString();
            String color = product.get("Color").toString().trim().toUpperCase();
            String price = product.get("Price").toString().trim().toUpperCase();
            colors.put(color,colors.containsKey(color)?colors.get(color) +1 :1);
            sizes.put(size,sizes.containsKey(size)?sizes.get(size) +1 :1);
            if(!uniqueProducts.containsKey(id)){
                String name = product.get("Name").toString();
                String imagePath = imageService.getImagePath((product.get("ImagePath").toString()),"");
                String description = product.get("Description").toString();
                Integer CategoryId = Integer.parseInt(product.get("MainCategoryId").toString());
                ProductSearchDto productSearchDto = new ProductSearchDto();
                productSearchDto.setId(id);
                productSearchDto.setName(name);
                productSearchDto.setPrice(price);
                productSearchDto.setCategoryId(CategoryId);
                productSearchDto.setImagePath(imagePath);
                productSearchDto.setSizes(new HashSet<>());
                productSearchDto.setColors(new HashSet<>());
                productSearchDto.getSizes().add(size);
                productSearchDto.getColors().add(color);
                productSearchDto.setDescription(description);
                uniqueProducts.put(id, productSearchDto);
                productSearchDtos.add(productSearchDto);
            }
            else{
                ProductSearchDto productSearchDto = uniqueProducts.get(id);

                productSearchDto.getColors().add(color);
                productSearchDto.getSizes().add(size);

                if(Double.valueOf(productSearchDto.getPrice())>Double.valueOf(price)){
                    productSearchDto.setPrice(price);
                }
                
            }
        }
        result.setColors(colors);
        result.setSizes(sizes);
        result.setProducts(productSearchDtos);
        return result;
    }
    /* 
     * Use to find product to display info for admin
    */
    public ProductDetailToDisplayForAdminDto findProductDetailToDisplay(Integer id){
        Product productData = (Product) productsRepsitory.findById(id).get();
        Integer mainCategoryId = catergoryService.findMainCategoryIdBySubId(productData.getSubCategoryId());
        List<Color> colors = colorRepository.findColorsByProductId(id);
        List<Size> sizes = sizeRepository.findSizesByProductId(id);
        List<ProductVariant> productVariants = productVariantRepository.findAllByProductVariantsByProductId(id);

        ProductDetailToDisplayForAdminDto productDetail = new ProductDetailToDisplayForAdminDto();
        productDetail.setId(id);
        productDetail.setProductName(productData.getName());
        productDetail.setDescription(productData.getDescription());
        productDetail.setCoverImagePath(productData.getImagePath());
        productDetail.setMainCategoryId(mainCategoryId);
        productDetail.setSubCategoryId(productData.getSubCategoryId());
        productDetail.setBrandId(productData.getBrandId());
        productDetail.setColors(colors);
        productDetail.setSizes(sizes);

        List<ProductVariantAddRequestDto> productVariantAddRequestDtos = new ArrayList<>();
        for(ProductVariant variant: productVariants){
            ProductVariantAddRequestDto productVariant = new ProductVariantAddRequestDto();
            productVariant.setId(variant.getId());
            productVariant.setColorId(variant.getColorId());
            productVariant.setSizeId(variant.getSizeId());
            productVariant.setQuantity(variant.getQuantity());
            productVariant.setPrice(variant.getUnitPrice());

            for(Size size:sizes){
                if(productVariant.getSizeId().equals(size.getId())){
                    productVariant.setSize(size.getSize());
                    break;
                }
            }
            for(Color color: colors){
                if(productVariant.getColorId().equals(color.getId())){
                    productVariant.setColor(color.getColor());
                    break;
                }
            }
            productVariantAddRequestDtos.add(productVariant);
        }
        productDetail.setProductVariants(productVariantAddRequestDtos);
        return productDetail;
    }

    @Transactional
    public ResponseDto updateProductFlat(Integer productId,Boolean flat){
        ResponseDto response = new ResponseDto();
        try {
            productsRepsitory.updateProductFlat(productId,flat);
            response.setMessage("Đã cập nhật thành công");
            response.setError(false);
        } catch (Exception e) {
            response.setError(true);
            response.setMessage("Lỗi cập nhật sản phẩm");
        }
        return response;
    }
    @Transactional
    public List<ProductForAISearch> findAllProductForAiSearch(List<String> genders,List<String> subCategories,List<String>colorOptions,List<String>sizeOptions){
        List<ProductForAISearch> productForAISearchs = new ArrayList<>();
        String male = null;
        String female = null;
        if(genders.contains("nam")){
            male = "nam";
        }
        if(genders.contains("nữ")){
            female = "nữ";
        }
        for(String subCategory: subCategories){
            List<Product> products = productsRepsitory.findProductByCategoryName(subCategory,male,female);
            for(Product product: products){

                ProductForAISearch productForAISearch = new ProductForAISearch();
                productForAISearch.setId(product.getId());
                productForAISearch.setImagePath(product.getImagePath());
                productForAISearch.setName(product.getName());
                productForAISearch.setSubCategoryId(product.getSubCategoryId());
                productForAISearch.setCategoryId(product.getSubCategoryId());
                productForAISearch.setSizes(new HashSet<>());
                productForAISearch.setColors(new HashSet<>());
          
                Integer productId = product.getId();
                List<Size> sizes = sizeRepository.findSizesByProductId(productId);
                List<Color> colors = colorRepository.findColorsByProductId(productId);
                for(Size size: sizes){
                    Integer sizeOptionId = size.getSizeOptionId();
                    SizeOption sizeOption = sizeOptionService.findSizeOptionById(sizeOptionId);
                    if(sizeOptions.size() == 0){
                        productForAISearch.getSizes().add(size.getSize().toUpperCase());
                    }
                    else if(sizeOptions.contains(size.getSize().toLowerCase())||sizeOptions.contains(sizeOption.getName().toLowerCase())){
                        productForAISearch.getSizes().add(size.getSize().toUpperCase());
                    }
                }
                for(Color color: colors){
                    Integer colorOptionId = color.getColorOptionId();
                    ColorOption colorOption = colorOptionService.findColorOptionById(colorOptionId);
                    //Nếu không có yêu cầu màu sắc thì màu nào cũng được
                    if(colorOptions.size() == 0){
                        productForAISearch.getColors().add(color.getColor().toUpperCase());
                    }
                    else if(colorOptions.contains(colorOption.getName().toLowerCase())||colorOptions.contains(color.getColor().toLowerCase())){
                        productForAISearch.getColors().add(color.getColor().toUpperCase());
                    }
                }
                if(productForAISearch.getSizes().size()!=0&&productForAISearch.getColors().size()!=0){
                    //giả định
                    Double price = findLowestPriceOfProduct(productId);
                    productForAISearch.setPrice(price.toString());
                    productForAISearchs.add(productForAISearch);
                }
            }
        }
        return productForAISearchs;
    }
}
