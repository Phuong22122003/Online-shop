package com.webbanhang.webbanhang.Service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.webbanhang.webbanhang.Entity.Address;
import com.webbanhang.webbanhang.Repository.AddressRepository;

@Service
public class AddressService {
    private AddressRepository addressRepository;
    public AddressService(AddressRepository addressRepository){
        this.addressRepository = addressRepository;
    }

    public List<Address> findAddressByEmail(String email){
        List<Address> addresses = addressRepository.findAddressByEmail(email);
        return addresses;
    }

    public Address findAddressByPurchasingId(Integer purchasingId){
        return addressRepository.findAddressByPurchasingId(purchasingId);
    }

    public Address findAddressById(Integer id){
        return addressRepository.findAddressById(id);
    }
}
