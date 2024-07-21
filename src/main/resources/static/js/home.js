function loadProduct(){
    const keyword = document.getElementById('keyword')
    let url = ''
    if(keyword.textContent!='')
        url = '/api/search?keyword='+keyword.textContent
    else url = '/api/list-product'
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

const home = document.querySelector(".home")
const selectionBar = document.querySelector('.selection_bar')
const body = document.querySelector('body')
const btnHome = document.createElement('p')
btnHome.innerHTML = '☰ Home'
btnHome.style.display = 'none'
body.appendChild(btnHome)
home.addEventListener('click',()=>{
    selectionBar.style.display = 'none';
    btnHome.style.position = 'fixed'
    btnHome.style.display = 'block'
    btnHome.style.cursor = 'pointer'
    btnHome.style.top = '71px';
})
btnHome.addEventListener('click',()=>{
    selectionBar.style.display = 'inline-flex'
    btnHome.style.display = 'none'
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
    window.location.href = '/client-stock';
})
const logout = document.getElementById("logout")
logout.addEventListener(('click'),()=>{
    window.location.href = '/logout'
})
const logo = document.querySelector('.logo')
logo.addEventListener('click',()=>{
    window.location.href = '/home'
})
loadProduct()
