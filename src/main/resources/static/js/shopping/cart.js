function genderCart(data){
  
    const cartWrapper = document.querySelector('.cart-wrapper')


    const table = document.createElement('table')
    const header = document.createElement('tr')
    const thProduct = document.createElement('th')
    thProduct.textContent = 'Products'
    const thPrice = document.createElement('th')
    thPrice.textContent = 'Price'
    const thQuantity = document.createElement('th')
    thQuantity.textContent = 'Quantity'
    const thSubtotal = document.createElement('th')
    thSubtotal.textContent = 'SubTotal'
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

        btnUp.onclick = ()=>{
            quantityTag.textContent = parseFloat(quantityTag.textContent) + 1
            const oldSubtotal = parseFloat(subtotal.textContent)
            subtotal.textContent = parseFloat(quantityTag.textContent) * parseFloat(row['price'])
            if(checkbox.checked){
                total.textContent = parseFloat(total.textContent) - oldSubtotal + parseFloat(subtotal.textContent)
            }
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
    totalTag.textContent = 'Total:'
    const total = document.createElement('h3')
    total.id = 'total'
    total.textContent = '0'

    _totalWrapper.appendChild(totalTag)
    _totalWrapper.appendChild(total)

    const btnBuy = document.createElement('span')
    btnBuy.className = 'btn-buy'
    btnBuy.textContent = 'Buy'

    totalPanel.appendChild(_totalWrapper)
    totalPanel.appendChild(btnBuy)

    cartWrapper.appendChild(totalPanel)
}
function init(){
    function getCartData(callBack){
        fetch('/api/v1/user/cart')
        .then(response => response.json())
        .then(data=>{
            console.log(data)
            callBack(data)
        })
    }
    getCartData(genderCart);
}


init()