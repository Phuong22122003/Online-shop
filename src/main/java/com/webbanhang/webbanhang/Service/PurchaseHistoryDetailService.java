package com.webbanhang.webbanhang.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.webbanhang.webbanhang.Entity.PurchaseHistoryDetail;
import com.webbanhang.webbanhang.Repository.PurchaseHistoryDetailRepository;

@Service
public class PurchaseHistoryDetailService {
    @Autowired private PurchaseHistoryDetailRepository purchaseHistoryDetailRepository;

    public List<PurchaseHistoryDetail> saveAll(List<PurchaseHistoryDetail> purchaseHistoryDetails){
        return purchaseHistoryDetailRepository.saveAll(purchaseHistoryDetails);
    }
}
