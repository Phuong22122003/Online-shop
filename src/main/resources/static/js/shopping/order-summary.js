function genderAddress(data){
    async function getAvailableService(DistrictID){
        const response = await fetch('https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/available-services', {
            method: 'POST',
            headers: {
                "token": '62c435c4-6c63-11ef-b3c4-52669f455b4f',
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                "shop_id": 5307391,
                "from_district": 3695,
                "to_district": parseInt(DistrictID)
            })
        })
        const data = await response.json()
        return data['data']
    }

    async function calculateDeliveryFee(ProvinceID,DistrictID,  WardID){
        const services =  await getAvailableService(DistrictID)
        console.log(services)
        let service_id = services[0]['service_id']
        
        const response = await fetch('api/v1/delivery/fee',{
            method:"POST",
            headers:{
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                    "service_id":parseInt(service_id),
                    "to_district_id":parseInt(DistrictID),
                    "to_ward_code":WardID,
                    "quantity": 1
                }
            )
        })
        const data = await response.json()
        const deliveryFeeTag = document.getElementById('delivery-charge')
        deliveryFeeTag.innerHTML = data
        console.log(data)

        const total = document.getElementById('total')
        const grandTotal = document.getElementById('grand-total')

        grandTotal.textContent = parseFloat(total.textContent) + parseFloat(deliveryFeeTag.textContent)
    }
    const addresses = document.querySelector('.addresses')
    let i = 0;
    data.forEach(item=>{
        console.log(item)
        const addressWrapper = document.createElement('div')
        addressWrapper.className = 'address'
        addressWrapper.setAttribute("addressId",item['id'])


        const fullnameAndAddress = document.createElement('p')
        fullnameAndAddress.textContent = item['lastname'] + ' ' +item['firstname'] + ' - ' + item['phone']
        const address = document.createElement('p')
        address.textContent = item['detail'] + ', ' + item['ward'] + ', ' +item['district'] + ', ' + item['province']
        const radio = document.createElement('input')
        radio.type = 'radio'
        radio.onchange = ()=>{
            if(radio.checked){
                calculateDeliveryFee(item["provinceId"],item["districtId"],item["wardId"])
            }
        }
        radio.className = 'checked-address'
        radio.name = 'checked-address'
        if(i==0){
            radio.checked = true
            calculateDeliveryFee(item["provinceId"],item["districtId"],item["wardId"])
        }
        i++;
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
    btnAdd.onclick = ()=>{
        genderNewAdressForm();
    }
    addresses.appendChild(btnAdd)
}



function genderNewAdressForm(){
    function cityList(){
        const _cities = document.querySelector('#city')
        fetch('http://localhost:8080/api/v1/delivery/address/provices',{
        })
        .then(response=>response.json())
        .then(cities=>{
            const data = cities
            console.log(data)
            data.forEach(city=>{
                const option = document.createElement('option')
                option.value = city['provinceId']
                option.text = city['provinceName']
                _cities.appendChild(option)    
            })
            _cities.addEventListener('change',()=>{
                districtList(_cities.options[_cities.selectedIndex].value)
            })
        })
    }
    
    function districtList(provinceId){
        console.log(provinceId)
        const _districts = document.querySelector('#district')
        _districts.innerHTML = ''
        const provinceIdInt = parseInt(provinceId)
        console.log(provinceIdInt);
        fetch(`http://localhost:8080/api/v1/delivery/address/districts?provinceId=${provinceIdInt}`)
        .then(response=>response.json())
        .then(districts=>{
            console.log(districts)
            const data = districts
            console.log(data)
            data.forEach(district=>{
                const option = document.createElement('option')

                option.value = district['districtID']
                option.text = district['districtName']
                _districts.appendChild(option)    
            })
            wardList(_districts.options[0].value)
            _districts.addEventListener('change',()=>{
                wardList(_districts.options[_districts.selectedIndex].value)
            })
        })
    }
    function wardList(district_id){
        console.log(district_id )
        const _ward = document.querySelector('#ward')
        _ward.innerHTML = ''
        const districtId =  parseInt(district_id)
        fetch(`/api/v1/delivery/address/wards?districtId=${districtId}`)
        .then(response=>response.json())
        .then(wards=>{
            console.log(wards)
            const data = wards
            console.log(data)
            data.forEach(ward=>{
                const option = document.createElement('option')
                option.value = ward['wardID']
                option.text = ward['wardName']
                _ward.appendChild(option)    
            })
        })
    }
    
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

    btnCancel.onclick = ()=>{
        document.body.removeChild(preventBackground );
    }

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

function buy(){
    const data = {
        addressId: null,
        deliveryFee: null,
        purchaseHistoryDetails: [],
    }
    const deliveryFee = document.querySelector("#delivery-charge").textContent;
    data.deliveryFee = parseInt(deliveryFee)
    const addresses = document.querySelectorAll('.address')

    for(let i =0 ;i < addresses.length ;i++){
        const radio = addresses[i].querySelector('input')
        if(radio.checked){
            data.addressId = parseInt(addresses[i].getAttribute('addressId'))
            break;
        } 
    }
    const orders = document.querySelectorAll('table tr')
    for(let i = 1;i< orders.length; i++){
        const purchaseHistoryDetail = {
            productVariantId:null,
            quantity: null,
            unitPrice: null
        }
        purchaseHistoryDetail.productVariantId = parseInt(orders[i].getAttribute('productVariantId'))
        const tds = orders[i].querySelectorAll('td');
        purchaseHistoryDetail.unitPrice = parseFloat(tds[1].textContent);
        purchaseHistoryDetail.quantity = parseInt(tds[2].textContent);
        data.purchaseHistoryDetails.push(purchaseHistoryDetail);
        console.log(orders[i]);
    }
    console.log(data)
    fetch('/api/v1/user/buy',{
        method:"POST",
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify(data)
    })
    .then(async response=>{
        const r = await response.json();
        console.log(r)
        if(response.ok){
            window.location.href = '/profile/orders'
        }
        else{
            toast("Lỗi", r['message']);
        }
    })
    .catch(error =>
        console.log(error)
    )
}

function init(){
    function getAddresses(callBack){
        fetch('/api/v1/user/addresses')
        .then(response => response.json())
        .then(data => {
            console.log(data)
            callBack(data)
        })
    }
    getAddresses(genderAddress);

}
init()
