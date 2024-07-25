function loadClientCart(){
    const productId = document.getElementById('productId')
    const quantity = document.getElementById('quantity')
    const address = document.getElementById('address')
    let url = ''
    if(productId.textContent == '')
        url =  '/api/cart/client'
    else url = 'api/cart/buy?productId='+productId.textContent+'&quantity='+quantity.textContent +'&address='+address.textContent
    fetch(url)
    .then((respone)=>respone.json())
    .then((data)=>{
        rederClientCart(data)
    })
}
function rederClientCart(data){
    const productId = document.getElementById('productId')
    const price = document.querySelector('.tail .price')
    const listItem = document.querySelector('#listItem')
    let cost = 0
    data.forEach(element => {
        let item = document.createElement('div')
        item.className = "item"
        let checkBox =document.createElement('input')
        checkBox.className = "checkbox"
        checkBox.type = 'checkbox'
        if(productId.textContent == element["productId"])
            checkBox.checked =true

        if(checkBox.checked) cost += parseFloat(element['price']) * parseFloat(element['quantity'])
        checkBox.addEventListener('change',()=>{
            calculateCost()
        })

        let image = document.createElement('img')
        image.className = "image"
        image.src = element["imagePath"]
        let name = document.createElement('a')
        name.className = "product-name"
        name.href = '/product-detail/'+element['productId'];
        name.innerHTML = element['name']
        let address = document.createElement('p')
        address.innerHTML = element['address']
        address.className = 'address'

        let quantity = document.createElement('div')
        quantity.innerHTML = 'Số lượng '
        quantity.className = 'quantity'
        let up = document.createElement('button') 
        up.innerHTML = '+'
        let subQuantity = document.createElement('input')
        subQuantity.value = element['quantity']
        subQuantity.disabled = true
        subQuantity.type = 'text'
        let down = document.createElement('button') 
        down.innerHTML = '-'
        quantity.appendChild(down)
        quantity.appendChild(subQuantity)
        quantity.appendChild(up)
        let priceTag = document.createElement('p')
        priceTag.innerHTML = 'Giá: '

        let price = document.createElement('p')
        price.className = 'price'
        price.textContent = element['price']

        let priceWrapper = document.createElement('div')
        priceWrapper.appendChild(priceTag)
        priceWrapper.appendChild(price)
        priceWrapper.style.display = 'flex'
        let remove = document.createElement('span')
        remove.className = 'remove'
        remove.innerHTML = `
            <svg width="15px" height="15px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 11V17" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M14 11V17" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M4 7H20" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M6 7H12H18V18C18 19.6569 16.6569 21 15 21H9C7.34315 21 6 19.6569 6 18V7Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Xóa`

        if(productId.textContent == element["productId"])
            remove.addEventListener('click',()=>{
                window.location.href = '/cart/client';
            })
        else 
            remove.addEventListener('click',()=>{
                removeProductFromCart(element['productId']);
            })
        up.addEventListener('click',()=>{
            subQuantity.value = parseInt(subQuantity.value) +1;
            if(checkBox.checked){
                calculateCost();
            }
        })
        down.addEventListener('click',()=>{
            if(parseInt(subQuantity.value) == 1)return;
            subQuantity.value = parseInt(subQuantity.value) - 1;
            if(checkBox.checked){
                calculateCost();
            }
        })
        let p = document.createElement('p')
        p.textContent = element['productId']
        p.style.display = 'none'
        p.className = 'productId'
        item.appendChild(p)
        item.appendChild(checkBox)
        item.appendChild(image)
        item.appendChild(name)
        item.appendChild(address)
        item.appendChild(quantity)
        // item.appendChild(priceTag)
        // item.appendChild(price)
        item.appendChild(priceWrapper)
        item.appendChild(remove)
        listItem.appendChild(item)
    });
    price.textContent += cost
}
function removeProductFromCart(productId){
    fetch('/api/cart/remove/' + productId,{
        method:'DELETE'
    })
    .then((respone)=>respone)
    .then((respone)=>{
        if(respone.status == 200){
            window.location.reload();
        }
    })
}
function calculateCost(){
    const price = document.querySelector('.tail .price')
    const listItem = document.querySelectorAll('.item')
    let cost = 0 
    listItem.forEach((element)=>{
        if(element.querySelector('.checkbox').checked){
            cost += parseFloat(element.querySelector('.price').textContent) * parseFloat(element.querySelectorAll('input')[1].value)
        }
    })
    price.innerHTML = 'Tổng tiền: ' + cost
}

loadClientCart()
const seleteAll = document.getElementById('select-all')
seleteAll.addEventListener('change',()=>{
    const price = document.querySelector('.tail .price')
    const listItem = document.querySelectorAll('.item')
    let cost = 0 
    if(seleteAll.checked){
        listItem.forEach((element)=>{
            element.querySelector('.checkbox').checked =true
            cost += parseFloat(element.querySelector('.price').textContent) * parseFloat(element.querySelectorAll('input')[1].value)
        })
        price.innerHTML = 'Tổng tiền: ' + cost
    }
})

// const logo = document.querySelector('.logo')
// logo.addEventListener('click',()=>{
//     window.location.href = '/home'
// })

const btnPurchase = document.querySelector('.tail .btnPurchase')
btnPurchase.addEventListener('click',()=>{
    const form = document.querySelector('.purchase-form')
    form.style.display = 'flex';
})
const btnCancel = document.querySelectorAll('.purchase-form .btn-wrapper .btn')[0]
btnCancel.addEventListener('click',()=>{
    const form = document.querySelector('.purchase-form')
    form.style.display = 'none';
})
const btnConfirm = document.querySelectorAll('.purchase-form .btn-wrapper .btn')[1]
btnConfirm.addEventListener('click',()=>{
    const listItem = document.querySelectorAll('.item')
    console.log(listItem)
    let data = []
    listItem.forEach((element)=>{
        if(element.querySelector('.checkbox').checked){
          console.log( element.querySelector('.productId').textContent  )
          console.log(element.querySelector('.address').textContent)
          console.log(element.querySelectorAll('input')[1].value)
          console.log(element.querySelector('.price').textContent)
          let item  = {
            productId:element.querySelector('.productId').textContent,
            address: element.querySelector('.address').textContent,
            quantity: element.querySelectorAll('input')[1].value,
            price:element.querySelector('.price').textContent
          }
          data.push(item)
        } 
    })
    fetch('/api/selling-detail/buy',{
        method:'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })
    .then((respone)=>respone)
    .then((respone)=>{
        const form = document.querySelector('.purchase-form')
        form.style.display = 'none';
        if(respone.status == 200){
            window.alert('thành công');
        }
        else 
            window.alert('Thất bại');
    })
    
})