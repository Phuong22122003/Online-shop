package com.webbanhang.webbanhang.Service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.webbanhang.webbanhang.Entity.Size;
import com.webbanhang.webbanhang.Repository.SizeRepository;

@Service
public class SizeService {

    private SizeRepository sizeRepository;

    public SizeService(SizeRepository sizeRepository){
        this.sizeRepository = sizeRepository;
    }

    public List<Size> findAll(){
        return sizeRepository.findAll();
    }
}
