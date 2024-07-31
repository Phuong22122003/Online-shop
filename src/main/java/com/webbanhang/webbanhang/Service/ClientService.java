package com.webbanhang.webbanhang.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.webbanhang.webbanhang.Entity.CLIENT_INFO;
import com.webbanhang.webbanhang.Repository.ClientInfoRepository;

import jakarta.transaction.Transactional;

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
    public CLIENT_INFO findClientByEmail(String email){
        return clientInfoRepository.findByEmail(email);
    }
    @Transactional
    public void saveProfile(CLIENT_INFO client) throws Exception{
        if(client.getEmail().trim().isEmpty()) throw new Exception("email is empty");
        if(client.getUsername().trim().isEmpty()) throw new Exception("username is empty");
        if(client.getFirstname().trim().isEmpty()) throw new Exception("first is empty");
        if(client.getLastname().trim().isEmpty()) throw new Exception("lastname is empty");
        if(client.getPhoneNumber().trim().isEmpty()) throw new Exception("phone number is empty");
        CLIENT_INFO clientInData = findClientByEmail(client.getEmail());
        if(clientInData == null) throw new Exception("Can not find client");
        if(clientInData.getIsEditUsername() && !clientInData.getUsername().trim().toUpperCase().equals(client.getUsername().trim().toUpperCase()))
            throw new Exception("Can not update username");
        if(clientInData.getIsEditUsername()==false) clientInfoRepository.updateUsername(client.getUsername(),client.getEmail());
        clientInfoRepository.updateProfile(client.getFirstname(),client.getLastname(),client.getPhoneNumber(), client.getEmail());
    }
}
