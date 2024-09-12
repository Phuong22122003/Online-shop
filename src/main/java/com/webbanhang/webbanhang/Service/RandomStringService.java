package com.webbanhang.webbanhang.Service;

import java.util.Random;

import org.springframework.stereotype.Service;
@Service
public class RandomStringService {
    public String randomString() {
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        StringBuilder sb = new StringBuilder(10);
        Random random = new Random();
        for (int i = 0; i < 10; i++) {
            int randomIndex = random.nextInt(characters.length());
            char randomChar = characters.charAt(randomIndex);
            sb.append(randomChar);
        }
        return sb.toString();
    }
    public String randomNumber() {
        String characters = "123456789";
        StringBuilder sb = new StringBuilder(6);
        Random random = new Random();
        for (int i = 0; i < 6; i++) {
            int randomIndex = random.nextInt(characters.length());
            char randomChar = characters.charAt(randomIndex);
            sb.append(randomChar);
        }
        return sb.toString();
    }
    public String randomUniqueString() {
        String unique = String.valueOf(System.currentTimeMillis());
        return "user"+unique;
    }
}
