import { Menu } from "./menu.js"

function genderCart(data){

    const cartWrapper = document.createElement('div')
    cartWrapper.className = 'cart-wrapper'

    const table = document.createElement('table')
    const header = document.createElement('tr')
    const thProduct = document.createElement('th')
    thProduct.textContent = 'Sản phẩm'
    const thPrice = document.createElement('th')
    thPrice.textContent = 'Giá'
    const thQuantity = document.createElement('th')
    thQuantity.textContent = 'Số lượng'
    const thSubtotal = document.createElement('th')
    thSubtotal.textContent = 'Tổng'
    const emptyTh = document.createElement('th')
    header.appendChild(emptyTh)
    header.appendChild(thProduct)
    header.appendChild(thPrice)
    header.appendChild(thQuantity)
    header.appendChild(thSubtotal)
    table.appendChild(header)
    
    data.forEach(row=>{

        const tableRow = document.createElement('tr')   

        const tdcheckbox = document.createElement('td')
        const checkbox =document.createElement('input')
        checkbox.className = 'checkbox'
        checkbox.type = 'checkbox'
        checkbox.onchange = ()=>{
            if(checkbox.checked){
                total.textContent = parseFloat(total.textContent) + parseFloat(subtotal.textContent);
            }
            else{
                total.textContent = parseFloat(total.textContent) -parseFloat(subtotal.textContent);
            }
        }
        tdcheckbox.appendChild(checkbox)

        const product = document.createElement('td')
        product.className = 'product'
        product.setAttribute("productVariantId",row['productVariantId']);

        const image = document.createElement('img')
        image.className = 'image'
        image.src = row['imagePath']
        const nameAndSize = document.createElement('div')
        const name = document.createElement('p')
        name.textContent = row['name']
        const size = document.createElement('p')
        size.textContent = row['size']
        const color = document.createElement('p')
        color.textContent = row['color']
        
        nameAndSize.appendChild(name)
        nameAndSize.appendChild(size)
        nameAndSize.appendChild(color)

        product.appendChild(image)
        product.appendChild(nameAndSize)

        const price = document.createElement('td')
        price.textContent = row['price']

        const quantity = document.createElement('td')
        const quantityWrapper = document.createElement('div')
        quantityWrapper.className = 'quantity-wrapper'
        const btnUp = document.createElement('h2')
        btnUp.className = 'btn-adjustment'
        btnUp.textContent = '+'
        
        function updateQuantity(productVariantId,quantity){
            return fetch('/api/v1/user/update-cart-quantity',{
                method:'POST',
                headers:{
                    'content-type':'application/json'
                },
                body:JSON.stringify({
                    productVariantId:productVariantId,
                    quantity:quantity,
                })
            })
        }
        function debounce(callback, delay) {
            let timer
            return function(...args) {
              clearTimeout(timer)
              timer = setTimeout(() => {
                callback(...args);
              }, delay)
            }
          }
        const update = debounce(updateQuantity,1000)
        btnUp.onclick = ()=>{
            if(parseFloat(quantityTag.textContent) == row['leftQuantity']) return;
            quantityTag.textContent = parseFloat(quantityTag.textContent) + 1
            const oldSubtotal = parseFloat(subtotal.textContent)
            subtotal.textContent = parseFloat(quantityTag.textContent) * parseFloat(row['price'])
            if(checkbox.checked){
                total.textContent = parseFloat(total.textContent) - oldSubtotal + parseFloat(subtotal.textContent)
            }
            
            update(row['productVariantId'],quantityTag.textContent);

        }
        
        const btnDown = document.createElement('h2')
        btnDown.textContent = '-'
        btnDown.className = 'btn-adjustment'
        
        btnDown.onclick = ()=>{
            if(parseFloat(quantityTag.textContent) == 1) return;
            quantityTag.textContent = parseFloat(quantityTag.textContent) - 1
            const oldSubtotal = parseFloat(subtotal.textContent)
            subtotal.textContent = parseFloat(quantityTag.textContent) * parseFloat(row['price'])
            if(checkbox.checked){
                total.textContent = parseFloat(total.textContent) - oldSubtotal + parseFloat(subtotal.textContent)
            }
            update(row['productVariantId'],quantityTag.textContent);
            
        }

        const quantityTag = document.createElement('p')
        quantityTag.textContent = row['quantity']
        quantityWrapper.appendChild(btnUp)
        quantityWrapper.appendChild(quantityTag)
        quantityWrapper.appendChild(btnDown)

        quantity.appendChild(quantityWrapper)

        const subtotal = document.createElement('td')
        subtotal.textContent = parseFloat(row['total'])
        subtotal.className = 'subtotal'
        tableRow.appendChild(tdcheckbox)
        tableRow.appendChild(product)
        tableRow.appendChild(price)
        tableRow.appendChild(quantity)
        tableRow.appendChild(subtotal)

        table.appendChild(tableRow)
    })


    cartWrapper.append(table)

    const totalPanel = document.createElement('div')
    totalPanel.className = 'total-panel'

    const _totalWrapper = document.createElement('div')
    _totalWrapper.className = 'total-tag'

    const totalTag = document.createElement('h3')
    totalTag.textContent = 'Tổng đơn hàng:'
    const total = document.createElement('h3')
    total.id = 'total'
    total.textContent = '0'

    _totalWrapper.appendChild(totalTag)
    _totalWrapper.appendChild(total)

    const btnBuy = document.createElement('span')
    btnBuy.className = 'btn-buy'
    btnBuy.textContent = 'Mua'
    btnBuy.onclick = ()=>{
            
        const buy = []

        const tableRow = table.querySelectorAll('tr')
        console.log(tableRow)

        for(let i = 1;i< tableRow.length ;i++){
            const tableData = tableRow[i].querySelectorAll('td');
            const checkboxData = tableData[0].querySelector('input');
            if(checkboxData.checked){
                buy.push({
                    productVariantId: tableData[1].getAttribute('productVariantId'),
                    quantity: tableData[3].querySelector('p').textContent
                })
            }
        }
        console.log(buy)
        fetch('/api/v1/user/add-orders-to-session',{
            method:"POST",
            headers:{
                "Content-type": "application/json",
            },
            body:JSON.stringify(buy)
        })
        .then(response => {
            if(response.ok){
                window.location.href = `/order-summary`;
            }
        })
    }

    totalPanel.appendChild(_totalWrapper)
    totalPanel.appendChild(btnBuy)

    cartWrapper.appendChild(totalPanel)

    return cartWrapper;
}
async function init(){
    function getCartData(){
        return fetch('/api/v1/user/cart')
        .then(response => response.json())
        .then(data=>{
            console.log(data)
            return data;
        })
    }
    const data = await getCartData();
    const menu = Menu('cart');
    const cart = genderCart(data)
    const profileWrapper = document.querySelector('.profile-wrapper')
    profileWrapper.appendChild(menu)
    profileWrapper.appendChild(cart)
}


init()