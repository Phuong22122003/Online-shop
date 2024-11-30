package com.webbanhang.webbanhang.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.webbanhang.webbanhang.Entity.PurchaseHistory;
import com.webbanhang.webbanhang.Repository.PurchaseHistoryRepository;

@Service
public class PurchaseHistoryService {
    @Autowired
    private PurchaseHistoryRepository purchaseHistoryRepository;

    public PurchaseHistory findPurchaseHistoryById(Integer orderId){
        return purchaseHistoryRepository.findById(orderId).get();
    }
    public void cancelOrder(Integer orderId){
        purchaseHistoryRepository.cancelOrder(orderId);
    }
    // @Transactional(rollbackFor = Exception.class)
    public PurchaseHistory save(PurchaseHistory purchaseHistory){
        return purchaseHistoryRepository.save(purchaseHistory);
    }

    public void updateOrderStatusAndAddOrderCode(Integer orderId,String orderCode,String employeeId){
        purchaseHistoryRepository.placeOrder(orderId,orderCode,employeeId);
    }
    public void updateOrderStatus(Integer orderId,String status){
        purchaseHistoryRepository.updateStatus(orderId, status);
    }
}
