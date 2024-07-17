const btnBuy= document.getElementById("buy")
btnBuy.addEventListener('click',()=>{
    const productId = document.getElementById("productId");
    const quantity = document.getElementById('quantity-value')
    const address = document.getElementById('address-value')
    window.location.href = '/buy-product?productId=' + productId.textContent+'&quantity='+quantity.value +'&address='+address.textContent;
})
const btnAdd = document.getElementById("add")
btnAdd.addEventListener('click',()=>{
    const productId = document.getElementById('productId')
    const quantity = document.getElementById('quantity-value')
    const address = document.getElementById('address-value')
    let data = {
        'productId':productId.textContent,
        'quantity': quantity.value,
        'address':address.textContent
    }
    console.log(data)
    fetch('/api/add-product',{
            method:"POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
    })
    .then((respone)=>{
        return respone.text()
    })
    .then((text)=>{
        if(text.includes('sign in')) 
            window.location.href = '/login';
        else window.alert(text)
    })
})

const up = document.getElementById('up')
const down = document.getElementById('down')
const quantity = document.getElementById('quantity-value')
const availableQuantity = document.getElementById('available-quantity')
quantity.oninput = ()=>{
    quantity.value = quantity.value.replace(/\D/g, '')
}
quantity.onblur = ()=>{
    if(quantity.value =='') quantity.value = 1
    console.log(availableQuantity.textContent)
    if(parseInt(quantity.value) > parseInt(availableQuantity.textContent)) quantity.value = availableQuantity.textContent;
}
up.addEventListener('click',()=>{
    if(quantity.value === availableQuantity.textContent) return
    quantity.value = parseInt(quantity.value) + 1;
})
down.addEventListener('click',()=>{
    
    if(quantity.value == '1' )
    {
        return;
    }
    quantity.value = parseInt(quantity.value) - 1;
})


function loadProduct(){
   
    fetch('/api/list-product',{
        method: "GET"
    })
    .then((respone)=>respone.json())
    .then((data)=>{
        genderProductGrid(data);
    })
}

function genderProductGrid(data){
    const productGrid = document.querySelector(".other-products")
    data.forEach(element => {
        let productCell = document.createElement("div");
        productCell.className = "product-item";
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
loadProduct();
const logo = document.querySelector('.logo')
logo.addEventListener('click',()=>{
    window.location.href = '/home'
})

const addressForm = document.querySelector('.address')
addressForm.addEventListener('click',()=> {
    document.body.style.overflow = 'hidden';
    const form = document.querySelector('.address-form')
    form.style.display = 'flex'
})

const btnCancel = document.querySelectorAll('.address-form .btn-wrapper .btn')[0]
const btnAgree = document.querySelectorAll('.address-form .btn-wrapper .btn')[1]

btnCancel.addEventListener('click',()=>{
    const form = document.querySelector('.address-form')
    form.style.display = 'none'
})

btnAgree.addEventListener('click',()=>{
    const form = document.querySelector('.address-form')
    form.style.display = 'none'
    
    const commune = document.getElementById('commune')
    let text = commune.options[commune.selectedIndex].text;
    const address = document.getElementById('address-value');
    address.textContent = ' '+text;
})