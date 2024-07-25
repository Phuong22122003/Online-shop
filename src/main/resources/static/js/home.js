function loadProduct(){
    const keyword = document.getElementById('keyword')
    let url = ''
    if(keyword.textContent!='')
        url = '/api/home/search?keyword='+keyword.textContent
    else url = '/api/home/list-product'
    fetch(url,{
        method: "GET"
    })
    .then((respone)=>respone.json())
    .then((data)=>{
        genderProductGrid(data);
    })
}

function genderProductGrid(data){
    const productGrid = document.querySelector(".product-grid")
    data.forEach(element => {
        let productCell = document.createElement("div");
        productCell.className = "product-cell";
        let image = document.createElement("img");
        image.className = 'image';
        image.src = element["imagePath"];
        let name = document.createElement('p')
        name.textContent = element["name"]
        let price = document.createElement('p')
        price.textContent = element["price"] +'đ'
        productCell.addEventListener('click',()=>{
            window.location.href='/product-detail/'+element['productId'];
        })
        productCell.appendChild(image);
        productCell.appendChild(name);
        productCell.appendChild(price);
        productGrid.appendChild(productCell)
    });
}

// ====================================

const selectionBar = document.querySelector('.selection_bar')
const body = document.querySelector('body')
const home = document.querySelector(".home")

home.addEventListener('click',()=>{
    if(selectionBar.style.display === 'none')
        selectionBar.style.display = 'flex';
    else 
        selectionBar.style.display = 'none';
})


const cart = document.getElementById('cart')
cart.addEventListener('click',()=>{
    window.location.href = '/cart'
})
const order = document.getElementById('purchase')
order.addEventListener('click',()=>{
    window.location.href = '/purchase';
})
const btnSearch = document.getElementById('btn-search')
const inputSearch = document.getElementById('input-search')
btnSearch.addEventListener(('click'),()=>{
    window.location.href= '/search?keyword='+inputSearch.value; 
})

const btnClientStock = document.getElementById('client-stock')
btnClientStock.addEventListener('click',()=>{
    window.location.href = '/store-owner/client-stock';
})
const logout = document.getElementById("logout")
logout.addEventListener(('click'),()=>{
    window.location.href = '/logout'
})

loadProduct()
