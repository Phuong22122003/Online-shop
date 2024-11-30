package com.webbanhang.webbanhang.Service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.webbanhang.webbanhang.Entity.SizeOption;
import com.webbanhang.webbanhang.Repository.SizeOptionRepository;


@Service
public class SizeOptionService {
    private SizeOptionRepository sizeOptionRepository;
    public SizeOptionService(SizeOptionRepository sizeOptionRepository){
        this.sizeOptionRepository = sizeOptionRepository;
    }
    public List<SizeOption> findAllOptions(){
        return sizeOptionRepository.findAll();
    }
    public SizeOption findSizeOptionById(Integer id){
        return sizeOptionRepository.findById(id).get();
    }
}
