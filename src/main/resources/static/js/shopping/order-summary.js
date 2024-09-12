function genderOrderSummary(data){
    data = [
        {
            id: 1,
            name: 'Girls Pink Moana Printed Dress',
            size: 'S',
            color:'Blue',
            image: 'https://down-vn.img.susercontent.com/file/1a79196bade7e06d694045cf088e5314',
            price: 800,
            quantity: 1,
            subtotal: 800,
        },
        {
            id: 2,
            name: 'Women handle bag',
            size: 'S',
            color:'Blue',
            image: 'https://down-vn.img.susercontent.com/file/1a79196bade7e06d694045cf088e5314',
            price: 800,
            quantity: 1,
            subtotal: 800,
        },
        {
            id: 3,
            name: 'T shirt',
            size: 'S',
            color:'Blue',
            image: 'https://down-vn.img.susercontent.com/file/1a79196bade7e06d694045cf088e5314',
            price: 800,
            quantity: 1,
            subtotal: 800,
        },
    ]
    const cartWrapper = document.querySelector('.order-summary-wrapper')


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
    header.appendChild(thProduct)
    header.appendChild(thPrice)
    header.appendChild(thQuantity)
    header.appendChild(thSubtotal)
    table.appendChild(header)
    
    data.forEach(row=>{

        const tableRow = document.createElement('tr')  

        const product = document.createElement('td')
        product.className = 'product'

        const image = document.createElement('img')
        image.className = 'image'
        image.src = row['image']
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
        quantity.textContent = row['quantity']

        const subtotal = document.createElement('td')
        subtotal.textContent = row['subtotal']

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
    _totalWrapper.className = 'wrapper'

    const totalTag = document.createElement('h3')
    totalTag.textContent = 'Total'
    const total = document.createElement('h3')
    total.textContent = '100'

    _totalWrapper.appendChild(totalTag)
    _totalWrapper.appendChild(total)

    
    const deliveryWrapper = document.createElement('div')
    deliveryWrapper.className = 'wrapper'
    const deliveryTag = document.createElement('h3')
    deliveryTag.textContent = 'Delivery Charge'

    const deliveryFee = document.createElement('h3')
    deliveryFee.textContent = '15000d';//Theem cho nay

    deliveryWrapper.appendChild(deliveryTag)
    deliveryWrapper.appendChild(deliveryFee)
    
    const totalAfterAddDeliveryFeeWrapper = document.createElement('div')
    totalAfterAddDeliveryFeeWrapper.className = 'wrapper'
    const totalAfterAddDeliveryFeeTag = document.createElement('h3')
    totalAfterAddDeliveryFeeTag.textContent = 'Grand Total'

    const totalAfterAddDeliveryFee = document.createElement('h3')
    totalAfterAddDeliveryFee.textContent = '15000d';//Theem cho nay

    totalAfterAddDeliveryFeeWrapper.appendChild(totalAfterAddDeliveryFeeTag)
    totalAfterAddDeliveryFeeWrapper.appendChild(totalAfterAddDeliveryFee)

    const btnBuy = document.createElement('span')
    btnBuy.className = 'btn-buy'
    btnBuy.textContent = 'Buy'

    totalPanel.appendChild(_totalWrapper)
    totalPanel.appendChild(deliveryWrapper)
    totalPanel.appendChild(totalAfterAddDeliveryFeeWrapper)
    totalPanel.appendChild(btnBuy)

    cartWrapper.appendChild(totalPanel)
}


function genderAddress(data){
    data = [
        {
            fullname:'Nguyen binh phuong',
            phone:'0948241164',
            city: 'TP.HCM',
            district: 'District 9',
            ward: 'Long thanh my',
            detail: '61/11 Hang tre'
        },
        {
            fullname:'Nguyen binh phuong',
            phone:'0948241164',
            city: 'TP.HCM',
            district: 'District 9',
            ward: 'Long thanh my',
            detail: '61/11 Hang tre'
        },
    ]

    const addresses = document.querySelector('.addresses')
    data.forEach(item=>{
        const addressWrapper = document.createElement('div')
        addressWrapper.className = 'address'
        const fullnameAndAddress = document.createElement('p')
        fullnameAndAddress.textContent = item['fullname'] + ' ' + item['phone']
        const address = document.createElement('p')
        address.textContent = item['detail'] + ', ' + item['ward'] + ', ' +item['district'] + ', ' + item['city']

        const radio = document.createElement('input')
        radio.type = 'radio'
        radio.className = 'checked-address'
        radio.name = 'checked-address'

        const btnWrapper = document.createElement('div')
        btnWrapper.className = 'edit-delete'
        const btnEdit = document.createElement('span')
        btnEdit.textContent = 'Edit'
        btnEdit.className = 'btn-edit'
        const btnDelete = document.createElement('span')
        btnDelete.textContent = 'Delete'
        btnDelete.className = 'btn-delete'
        btnWrapper.appendChild(btnEdit)
        btnWrapper.appendChild(btnDelete)

        addressWrapper.appendChild(radio)
        addressWrapper.appendChild(fullnameAndAddress)
        addressWrapper.appendChild(address)
        addressWrapper.appendChild(btnWrapper)
        addresses.appendChild(addressWrapper)
    })

    const btnAdd = document.createElement('span')
    btnAdd.textContent = 'Add'
    btnAdd.className = 'btn-add'
    addresses.appendChild(btnAdd)
}


function cityList(){
    const _cities = document.querySelector('#city')
    fetch('https://esgoo.net/api-tinhthanh/1/0.htm')
    .then(response=>response.json())
    .then(cities=>{
        const data = cities['data']
        console.log(data)
        data.forEach(city=>{
            const option = document.createElement('option')
            option.value = city['id']
            option.text = city['name']
            _cities.appendChild(option)    
        })
        _cities.addEventListener('change',()=>{
            districtList(_cities.options[_cities.selectedIndex].value)
        })
    })
}

function districtList(districtId){
    console.log(districtId)
    const _districts = document.querySelector('#district')
    _districts.innerHTML = ''
    fetch(`https://esgoo.net/api-tinhthanh/2/${districtId}.htm`)
    .then(response=>response.json())
    .then(districts=>{
        console.log(districts)
        const data = districts['data']
        console.log(data)
        data.forEach(district=>{
            const option = document.createElement('option')
            option.value = district['id']
            option.text = district['name']
            _districts.appendChild(option)    
        })
        _districts.addEventListener('change',()=>{
            wardList(_districts.options[_districts.selectedIndex].value)
        })
    })
}
function wardList(wardId){
    console.log(wardId)
    const _ward = document.querySelector('#ward')
    _ward.innerHTML = ''
    fetch(`https://esgoo.net/api-tinhthanh/3/${wardId}.htm`)
    .then(response=>response.json())
    .then(wards=>{
        console.log(wards)
        const data = wards['data']
        console.log(data)
        data.forEach(ward=>{
            const option = document.createElement('option')
            option.value = ward['id']
            option.text = ward['name']
            _ward.appendChild(option)    
        })
    })
}

async function genderNewAdressForm(){

    const form = document.createElement('form')
    const h2 = document.createElement('h2')
    h2.textContent = 'New Adress'
    form.appendChild(h2)
    form.className = 'new-address'
    const nameAndPhoneWrapper = document.createElement('div')
    nameAndPhoneWrapper.className = 'name-phone'

    const name = document.createElement('input')
    name.placeholder = 'Full name'


    const phoneNumber = document.createElement('input')
    phoneNumber.placeholder = 'Phone Number'

    nameAndPhoneWrapper.appendChild(name)
    nameAndPhoneWrapper.appendChild(phoneNumber)


    const city = document.createElement('select')
    city.id = 'city'
    const cityHolder = document.createElement('option')
    cityHolder.text = 'City/Province'
    cityHolder.disabled = true
    cityHolder.selected = true
    city.appendChild(cityHolder)

    const district = document.createElement('select')
    district.id = 'district'
    const districtHolder = document.createElement('option')
    districtHolder.text = 'District'
    districtHolder.disabled = true
    districtHolder.selected = true
    district.append(districtHolder)


    const ward = document.createElement('select')
    ward.id = 'ward'
    const wardHolder = document.createElement('option')
    wardHolder.text = 'Ward'
    wardHolder.disabled = true
    wardHolder.selected = true
    ward.append(wardHolder)

    const detailAddress = document.createElement('textarea')
    detailAddress.placeholder = 'Detail'
    detailAddress.className = 'detail'

    const btnWrapper = document.createElement('div')
    btnWrapper.className = 'cancel-confirm'

    const btnCancel = document.createElement('span')
    btnCancel.textContent = 'Cancel'
    const btnConfirm = document.createElement('span')
    btnConfirm.textContent = 'Confirm'

    btnWrapper.appendChild(btnCancel)
    btnWrapper.appendChild(btnConfirm)

    form.appendChild(nameAndPhoneWrapper)
    form.appendChild(city)
    form.appendChild(district)
    form.appendChild(ward)
    form.appendChild(detailAddress)
    form.appendChild(btnWrapper)


    const preventBackground = document.createElement('div')
    preventBackground.className = 'prevent-background'
    preventBackground.appendChild(form)
    document.body.appendChild(preventBackground)

    cityList()
}
genderAddress()
genderOrderSummary()
// genderNewAdressForm()