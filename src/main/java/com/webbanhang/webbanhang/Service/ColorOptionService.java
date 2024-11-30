package com.webbanhang.webbanhang.Service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.webbanhang.webbanhang.Entity.ColorOption;
import com.webbanhang.webbanhang.Repository.ColorOptionRepository;

@Service
public class ColorOptionService {
    private ColorOptionRepository colorOptionRepository;
    public ColorOptionService(ColorOptionRepository colorOptionRepository){
        this.colorOptionRepository = colorOptionRepository;
    }
    public List<ColorOption> findAllOptions(){
        return colorOptionRepository.findAll();
    }
    public ColorOption findColorOptionById(Integer id){
        return colorOptionRepository.findById(id).get();
    }
}
