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
    // data = [
    //     {
    //         brand:'Roadstart',
    //         name: 'Printed Cotton T shirt',
    //         price: '38000',
    //         image: 'https://www.marinavernicos.com/wp-content/uploads/2021/02/black1.jpg'
    //     },
    // ]
    const bestSeller = document.querySelector('.best-seller')
    console.log(data)
    data.forEach(item=>{
        const product = document.createElement('div')
        product.className = 'product'
        const image = document.createElement('img')
        image.src = item['imagePath']
        image.className = 'image'
        const name = document.createElement('p')
        name.textContent = item['name']
        const price = document.createElement('p')
        price.textContent = item['price']
        product.appendChild(image)
        product.appendChild(name)
        product.appendChild(price)

        product.onclick = ()=>{
            window.location.href = `/product?id=${item['id']}`
        }
        bestSeller.appendChild(product)
    })
}



function createRecommendedProducts(data){
    // data = [
    //     {
    //         brand:'Roadstart',
    //         name: 'Printed Cotton T shirt',
    //         price: '38000',
    //         image: 'https://www.marinavernicos.com/wp-content/uploads/2021/02/black1.jpg'
    //     }
    // ]
    const recommendedProducts = document.querySelector('.recommended-products')
    
    data.forEach(item=>{
        const product = document.createElement('div')

        product.onclick = ()=>{
            window.location.href = `/product?id=${item['id']}`
        }

        product.className = 'product'
        const image = document.createElement('img')
        image.src = item['imagePath']
        image.className = 'image'
        const name = document.createElement('p')
        name.textContent = item['name']
        const price = document.createElement('p')
        price.textContent = item['price']
        product.appendChild(image)
        product.appendChild(name)
        product.appendChild(price)
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
            console.log(data)
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
}

init()


// const a = [1,2,3,4]
// a.length = 10
// a['hello'] = 5
// console.log(a)
// console.log(Object.keys(a))
// a.forEach((item,index)=>{
//     console.log(item,index);
// })