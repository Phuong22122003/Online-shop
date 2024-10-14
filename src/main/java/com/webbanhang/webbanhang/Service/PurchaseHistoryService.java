package com.webbanhang.webbanhang.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.webbanhang.webbanhang.Entity.PurchaseHistory;
import com.webbanhang.webbanhang.Repository.PurchaseHistoryRepository;

@Service
public class PurchaseHistoryService {
    @Autowired
    private PurchaseHistoryRepository purchaseHistoryRepository;

    public void cancelOrder(Integer orderId){
        purchaseHistoryRepository.cancelOrder(orderId);
    }
    // @Transactional(rollbackFor = Exception.class)
    public PurchaseHistory save(PurchaseHistory purchaseHistory){
        return purchaseHistoryRepository.save(purchaseHistory);
    }
}
