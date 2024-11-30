package com.webbanhang.webbanhang.Dto.Shopping.SearchAI;

import java.util.ArrayList;
import java.util.List;

import com.webbanhang.webbanhang.Dto.Shopping.ProductSearchDto;
import com.webbanhang.webbanhang.Dto.Shopping.SearchDto;

public class SearchAIDto extends SearchDto {
    private List<ProductForAISearch> productForAISearchs;
    private SearchResponseDto searchResponseDto;
    private String description;
    
    public SearchAIDto() {
    }

    public void setProductIntoSuperClass(List<ProductForAISearch> products){
        List<ProductSearchDto> productSearchDtos = new ArrayList<>();
        for(ProductForAISearch productSearchDto: products){
            productSearchDtos.add(productSearchDto);
        }
        super.setProducts(productSearchDtos);
    }
    public List<ProductForAISearch> getProductForAISearchs() {
        return productForAISearchs;
    }

    public void setProductForAISearchs(List<ProductForAISearch> productForAISearchs) {
        this.productForAISearchs = productForAISearchs;
    }

    public SearchResponseDto getSearchResponseDto() {
        return searchResponseDto;
    }

    public void setSearchResponseDto(SearchResponseDto searchResponseDto) {
        this.searchResponseDto = searchResponseDto;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

   
    
}
