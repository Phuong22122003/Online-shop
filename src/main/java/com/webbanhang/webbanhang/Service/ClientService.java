package com.webbanhang.webbanhang.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.webbanhang.webbanhang.Entity.CLIENT_INFO;
import com.webbanhang.webbanhang.Repository.ClientInfoRepository;

@Service
public class ClientService {
    @Autowired
    private ClientInfoRepository clientInfoRepository;

    public void addClient(CLIENT_INFO client){
        clientInfoRepository.save(client);
    }
    public CLIENT_INFO findClientById(Integer id){
        return clientInfoRepository.findByClientId(id);
    }
}
