package com.webbanhang.webbanhang.Entity;

import java.util.Collection;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "CLIENT_INFO")
public class CLIENT_INFO {
    @Id
    @Column(name = "ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "LASTNAME")
    private String lastname;

    @Column(name = "FIRSTNAME")
    private String firstname;

    @Column(name = "PHONE_NUMBER")
    private String phoneNumber;

    @Column(name = "ADDRESS")
    private String address;

    @Column(name = "EMAIL")
    private String email;

    @Column(name = "USERNAME")
    private String username;
    
    @Column(name = "PASSWORD")
    private String password;

    @Column(name = "ROLE")
    private String role;

    @Column(name = "ISEDITUSERNAME")
    private Boolean isEditUsername;

    @OneToMany(mappedBy = "clientInfo",fetch = FetchType.LAZY)
    private Collection<SELLING_DETAIL> sellingDetails;
    
    @OneToMany(mappedBy = "client",fetch = FetchType.LAZY)
    private Collection<PRODUCT> products;


    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Collection<SELLING_DETAIL> getSellingDetails() {
        return sellingDetails;
    }

    public void setSellingDetails(Collection<SELLING_DETAIL> sellingDetails) {
        this.sellingDetails = sellingDetails;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public Boolean getIsEditUsername() {
        return isEditUsername;
    }

    public void setIsEditUsername(Boolean isEditUsername) {
        this.isEditUsername = isEditUsername;
    }

    public Collection<PRODUCT> getProducts() {
        return products;
    }

    public void setProducts(Collection<PRODUCT> products) {
        this.products = products;
    }
    
    
}
