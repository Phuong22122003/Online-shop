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
                "from_district": 1542,
                "to_district": parseInt(DistrictID)
            })
        })
        const data = await response.json()
        return data['data']
    }

async function calculateDeliveryFee(ProvinceID,DistrictID,  WardID){
        const services =  await getAvailableService(DistrictID)
        let service_id = services[0]['service_id']
        
        const response = await fetch('https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee',{
            method: 'POST',
            headers:{
                "token":'62c435c4-6c63-11ef-b3c4-52669f455b4f',
                "shop_id" :5307391,
                "Content-type":"application/json"
            },
            body: JSON.stringify({
                    // "service_id":53322,
                    "service_id":parseInt(service_id),
                    "insurance_value":0,
                    "coupon": null,
                    "from_district_id":1542,
                    "to_district_id":parseInt(DistrictID),
                    "to_ward_code":WardID,
                    "height":15,
                    "length":15,
                    "weight":1000,
                    "width":15
                }
            )
        })
        const data = await response.json()
        const deliveryFeeTag = document.getElementById('delivery-charge')
        deliveryFeeTag.innerHTML = data['data']['total']
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
        fetch('https://online-gateway.ghn.vn/shiip/public-api/master-data/province',{
            headers:{
                token: '62c435c4-6c63-11ef-b3c4-52669f455b4f'
            }
        })
        .then(response=>response.json())
        .then(cities=>{
            const data = cities['data']
            console.log(data)
            data.forEach(city=>{
                const option = document.createElement('option')
                option.value = city['ProvinceID']
                option.text = city['ProvinceName']
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
        fetch(`https://online-gateway.ghn.vn/shiip/public-api/master-data/district`,{
            method:"POST",
            headers:{
                'token': '62c435c4-6c63-11ef-b3c4-52669f455b4f',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                province_id: parseInt(provinceId)
            })
        })
        .then(response=>response.json())
        .then(districts=>{
            console.log(districts)
            const data = districts['data']
            console.log(data)
            data.forEach(district=>{
                const option = document.createElement('option')

                option.value = district['DistrictID']
                option.text = district['DistrictName']
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
        fetch(`https://online-gateway.ghn.vn/shiip/public-api/master-data/ward`,{
            method:"POST",
            headers:{
                'token': '62c435c4-6c63-11ef-b3c4-52669f455b4f',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                district_id: parseInt(district_id)
            })
        })
        .then(response=>response.json())
        .then(wards=>{
            console.log(wards)
            const data = wards['data']
            console.log(data)
            data.forEach(ward=>{
                const option = document.createElement('option')
                option.value = ward['WardID']
                option.text = ward['WardName']
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
