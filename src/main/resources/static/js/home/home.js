import { ChatComponent } from "../shopping/chat.js";
import {h} from "../jsx.js"
import {FormatCurrency} from "../common.js"
function formatCurrency(number, locale = 'vi-VN', currency = 'VND') {
    return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(number);
}



function createBanner(data){
    const banner = document.querySelector('.banner')
    const content = banner.querySelector('.content')
    
    const name = document.createElement('h2')
    name.className = 'text'
    const desciption = document.createElement('p')
    desciption.className = 'text'
    const btnShopNow = document.createElement('span')
    btnShopNow.textContent = 'Shop now ➨'
    btnShopNow.className = 'shop-now-btn'
    content.appendChild(name)
    content.appendChild(desciption)
    content.appendChild(btnShopNow)
    
    function loop(product) {
        name.innerHTML = product['name']
        desciption.textContent = product['description']
        banner.style.backgroundImage= `url(${product['imagePath']})`
        btnShopNow.onclick = ()=>{
            window.location.href = `/product?id=${product['id']}`;
        }
    }    
    loop(data[0])
    
    let i = 0;
    setInterval(function() {
        i++;
        i = i%data.length;
        loop(data[i])
    }, 5000);
    
}

function createBestSeller(data){

    const bestSeller = document.querySelector('.best-seller')
    console.log(data)
    data.forEach(item=>{
        const product = h(
            'div',
            {className:'product',onclick :()=> window.location.href = `/product?id=${item['id']}`},
            h('img',{src: item['imagePath'],className:'image'}),
            h(
                'div',
                {className:'info-wrapper'},
                h('h3',{textContent:item['name'],className:'name'}),
                h('p',{textContent:item['description'],className:'description'}),
                h('p',{textContent: FormatCurrency(item['price']),className:'price'}),
                // h('p',{className:'remaining-quantity',textContent:`Còn: ${item['remainingQuantity']}`},),
            )

        )
        bestSeller.appendChild(product)
    })
}



function createRecommendedProducts(data){

    const recommendedProducts = document.querySelector('.recommended-products')
    
    data.forEach(item=>{

        const product = h(
            'div',
            {className:'product',onclick :()=> window.location.href = `/product?id=${item['id']}`},
            h('img',{src: item['imagePath'],className:'image'}),
            h(
                'div',
                {className:'info-wrapper'},
                h('h3',{textContent:item['name'],className:'name'}),
                h('p',{textContent:item['description'],className:'description'}),
                h('p',{textContent: FormatCurrency(item['price']),className:'price'}),
                h('p',{className:'remaining-quantity',textContent:`Còn: ${item['remainingQuantity']}`},),
            )

        )

        recommendedProducts.appendChild(product)
    })
}






// ====================Main==============================

function init(){
    function getBannerData(){
        fetch('/api/v1/products/banner')
        .then(response => response.json())
        .then(data=>{
            console.log(data)
            createBanner(data)
        })
        .catch(error=>{
            console.log(error)
        })
    }
    function getBestSellerData(){
        fetch('/api/v1/products/best-seller')
        .then(response=>response.json())
        .then(data=>{
            console.log('best',data)
            createBestSeller(data)
        })
        .catch(error=>{
            console.log(error)
        })
    }
    function getRecommendedProductsData(){
        fetch('/api/v1/products/recommended-products')
        .then(response=> response.json())
        .then(data=>{
            createRecommendedProducts(data)
        })
        .catch(error=> {
            console.log(error)
        })
    }

    getBannerData()
    getBestSellerData()
    getRecommendedProductsData()
    new ChatComponent();
}

init()
