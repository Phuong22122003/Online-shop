package com.webbanhang.webbanhang.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.webbanhang.webbanhang.Entity.Color;
import com.webbanhang.webbanhang.Repository.ColorRepository;

@Service
public class ColorService {
    @Autowired
    private ColorRepository colorsRepository;
    public List<Color> findAll(){
        return colorsRepository.findAll();
    }
}
