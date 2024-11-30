package com.webbanhang.webbanhang.Service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.webbanhang.webbanhang.Dto.ResponseDto;
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
    public ResponseDto deleteAddress(Integer id){
        ResponseDto response = new ResponseDto();
        try {
            addressRepository.deleteById(id);
            response.setMessage("Xóa thành công");
            response.setError(false);
        } catch (Exception e) {
            response.setMessage("Địa chỉ đã được sử dụng");
            response.setError(true);
        }
        return response;
    }
    public ResponseDto addAddress(Address address){
        ResponseDto response = new ResponseDto();
        try {
            Address saveAddress = addressRepository.save(address);
            response.setData(saveAddress);
            response.setMessage("Thêm thành công");
            response.setError(false);
        } catch (Exception e) {
            response.setMessage("Thêm thất bại");
            response.setError(true);
        }
        return response;
    }
    public ResponseDto updateAddress(Address address){
        ResponseDto response = new ResponseDto();
        try {
            Address saveAddress =addressRepository.save(address);
            response.setData(saveAddress);
            response.setMessage("Cập nhật công");
            response.setError(false);
        } catch (Exception e) {
            response.setMessage("Cập nhật thất bại");
            response.setError(true);
        }
        return response;
    }
}
