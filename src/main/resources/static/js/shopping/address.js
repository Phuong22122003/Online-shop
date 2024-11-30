import {Toast} from "./../toast.js"
class DeliveryService{
    constructor(){
        this.deliveryFeeTag = document.getElementById('delivery-charge');
        this.total = document.getElementById('total');
        this.grandTotal = document.getElementById('grand-total');
    }
    async getAvailableService(districtId){
        const response = fetch('https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/available-services', {
            method: 'POST',
            headers: {
                "token": '62c435c4-6c63-11ef-b3c4-52669f455b4f',
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                "shop_id": 5307391,
                "from_district": 3695,
                "to_district": parseInt(districtId)
            })
        }).then(value => value.json())
        console.log(response)
        const data = await response;
        return data['data']
    }
    async calculateDeliveryFee(districtId, wardId){
        const services =  await this.getAvailableService(districtId)

        let service_id = services[0]['service_id']
        
        const response = await fetch('api/v1/delivery/fee',{
            method:"POST",
            headers:{
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                    "service_id":parseInt(service_id),
                    "to_district_id":parseInt(districtId),
                    "to_ward_code":wardId,
                    "quantity": 1
                }
            )
        })
        const data = await response.json()
        this.deliveryFeeTag.innerHTML = data

        this.grandTotal.textContent = parseFloat(this.total.textContent) + parseFloat(this.deliveryFeeTag.textContent);
    }
}

class Address{
    constructor(addressData){
        this.addressesTag = document.querySelector('.addresses');
        this.addressData = addressData;
        this.deliveryService = new DeliveryService();
    }
    addAddressToAddressTag(item){
        const addressWrapper = document.createElement('div');
        addressWrapper.className = 'address';
        addressWrapper.setAttribute("addressId",item['id']);

        const fullnameAndAddress = document.createElement('p');
        fullnameAndAddress.textContent = item['lastname'] + ' ' +item['firstname'] + ' - ' + item['phone'];
        const address = document.createElement('p');
        address.textContent = item['detail'] + ', ' + item['ward'] + ', ' +item['district'] + ', ' + item['province'];
        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.onchange = ()=>{
            if(radio.checked){
                this.deliveryService.calculateDeliveryFee(item["districtId"],item["wardId"]);
            }
        }
        radio.className = 'checked-address';
        radio.name = 'checked-address';
        if(i==0){
            radio.checked = true;
            this.deliveryService.calculateDeliveryFee(item["districtId"],item["wardId"]);
        }
        i++;
        const btnWrapper = document.createElement('div')
        btnWrapper.className = 'edit-delete'

        const btnEdit = document.createElement('span')
        btnEdit.textContent = 'Edit'
        btnEdit.className = 'btn-edit'
        btnEdit.onclick = ()=>{
            this.editAddressEventHandler(item);
        } 

        const btnDelete = document.createElement('span')
        btnDelete.onclick = ()=>{
            
        }
        btnDelete.textContent = 'Delete'
        btnDelete.className = 'btn-delete'
        btnWrapper.appendChild(btnEdit)
        btnWrapper.appendChild(btnDelete)

        addressWrapper.appendChild(radio)
        addressWrapper.appendChild(fullnameAndAddress)
        addressWrapper.appendChild(address)
        addressWrapper.appendChild(btnWrapper)
        this.addressesTag.appendChild(addressWrapper)
    }
    renderAddress(){
        let i = 0;
        this.addressData.forEach(item=>{
            const addressWrapper = document.createElement('div');
            addressWrapper.className = 'address';
            addressWrapper.setAttribute("addressId",item['id']);

            const fullnameAndAddress = document.createElement('p');
            fullnameAndAddress.textContent = item['lastname'] + ' ' +item['firstname'] + ' - ' + item['phone'];
            const address = document.createElement('p');
            address.textContent = item['detail'] + ', ' + item['ward'] + ', ' +item['district'] + ', ' + item['province'];
            const radio = document.createElement('input');
            radio.type = 'radio';
            radio.onchange = ()=>{
                if(radio.checked){
                    this.deliveryService.calculateDeliveryFee(item["districtId"],item["wardId"]);
                }
            }
            radio.className = 'checked-address';
            radio.name = 'checked-address';
            if(i==0){
                radio.checked = true;
                this.deliveryService.calculateDeliveryFee(item["districtId"],item["wardId"]);
            }
            i++;
            const btnWrapper = document.createElement('div')
            btnWrapper.className = 'edit-delete'

            const btnEdit = document.createElement('span')
            btnEdit.textContent = 'Edit'
            btnEdit.className = 'btn-edit'
            btnEdit.onclick = ()=>{
                this.editAddressEventHandler(item);
            } 

            const btnDelete = document.createElement('span')
            btnDelete.onclick = ()=>{
                
            }
            btnDelete.textContent = 'Delete'
            btnDelete.className = 'btn-delete'
            btnWrapper.appendChild(btnEdit)
            btnWrapper.appendChild(btnDelete)

            addressWrapper.appendChild(radio)
            addressWrapper.appendChild(fullnameAndAddress)
            addressWrapper.appendChild(address)
            addressWrapper.appendChild(btnWrapper)
            this.addressesTag.appendChild(addressWrapper)
        })

        const btnAdd = document.createElement('span')
        btnAdd.textContent = 'Add'
        btnAdd.className = 'btn-add'
        btnAdd.onclick = async()=>{
            const form =await this.renderNewAdressForm();
            form.btnConfirm.onclick = ()=> this.addAddress(form);
        }
        this.addressesTag.appendChild(btnAdd)
    }
    deleteAddress(addressId){
        fetch('/api/v1/user/delete-address',{
            method:'POST',
            headers:{
                'content-type':'application/json'
            },
            body: JSON.stringify(addressId)
        })
        .then(response=>response.json())
        .then(data => {
            if(data.error == false){
                this.addressesTag.removeChild(addressWrapper)
            }
            else{
                Toast('Thất bại', data.message)
            }
        })
    }

    async renderNewAdressForm(){
        const form = document.createElement('form');
        const h2 = document.createElement('h2');
        h2.textContent = 'New Address';
        form.appendChild(h2);
        form.className = 'new-address';

        const nameAndPhoneWrapper = document.createElement('div');
        nameAndPhoneWrapper.className = 'name-phone';
        const nameWrapper = document.createElement('div');
        nameWrapper.style.display = 'flex';
        nameWrapper.className = 'name-wrapper';
        const wrapper1 = document.createElement('div')
        wrapper1.style.display= "flex";
        wrapper1.style.flexDirection= "column";
        wrapper1.style.flexGrow= "1";
    
        const lastName = document.createElement('input');
        lastName.placeholder = 'Họ';
        lastName.className = 'lastname';
        const lastNameError = document.createElement('span');
        lastNameError.className = 'error-message-field';
        wrapper1.appendChild(lastName);
        wrapper1.appendChild(lastNameError);
        nameWrapper.appendChild(wrapper1);

        const wrapper2 = document.createElement('div')
        wrapper2.style.display= "flex";
        wrapper2.style.flexDirection= "column";
        wrapper2.style.flexGrow= "1";

        const firstName = document.createElement('input');
        firstName.placeholder = 'Tên';
        firstName.className = 'firstname';
        const firstNameError = document.createElement('span');
        firstNameError.className = 'error-message-field';
        wrapper2.appendChild(firstName);
        wrapper2.appendChild(firstNameError);
        nameWrapper.appendChild(wrapper2);

        const phoneNumber = document.createElement('input');
        phoneNumber.placeholder = 'Số điện thoại';
        phoneNumber.className = 'phonenumber';
        const phoneNumberError = document.createElement('span');
        phoneNumberError.className = 'error-message-field';

        nameAndPhoneWrapper.appendChild(nameWrapper);
        nameAndPhoneWrapper.appendChild(phoneNumber);
        nameAndPhoneWrapper.appendChild(phoneNumberError);

        const city = document.createElement('select');
        city.id = 'city';
        const cityHolder = document.createElement('option');
        cityHolder.text = 'City/Province';
        cityHolder.disabled = true;
        cityHolder.selected = true;
        city.appendChild(cityHolder);
        const cityError = document.createElement('span');
        cityError.className = 'error-message-field';

        const district = document.createElement('select');
        district.id = 'district';
        const districtHolder = document.createElement('option');
        districtHolder.text = 'District';
        districtHolder.disabled = true;
        districtHolder.selected = true;
        district.appendChild(districtHolder);
        const districtError = document.createElement('span');
        districtError.className = 'error-message-field';

        const ward = document.createElement('select');
        ward.id = 'ward';
        const wardHolder = document.createElement('option');
        wardHolder.text = 'Ward';
        wardHolder.disabled = true;
        wardHolder.selected = true;
        ward.appendChild(wardHolder);
        const wardError = document.createElement('span');
        wardError.className = 'error-message-field';

        const detailAddress = document.createElement('textarea');
        detailAddress.placeholder = 'Detail';
        detailAddress.className = 'detail';
        const detailAddressError = document.createElement('span');
        detailAddressError.className = 'error-message-field';

        const btnWrapper = document.createElement('div');
        btnWrapper.className = 'cancel-confirm';

        const btnCancel = document.createElement('span');
        btnCancel.textContent = 'Hủy';
        const btnConfirm = document.createElement('span');
        btnConfirm.textContent = 'Xác nhận';

        btnCancel.onclick = () => {
            document.body.removeChild(preventBackground);
        };

        btnWrapper.appendChild(btnCancel);
        btnWrapper.appendChild(btnConfirm);

        form.appendChild(nameAndPhoneWrapper);
        form.appendChild(city);
        form.appendChild(cityError);
        form.appendChild(district);
        form.appendChild(districtError);
        form.appendChild(ward);
        form.appendChild(wardError);
        form.appendChild(detailAddress);
        form.appendChild(detailAddressError);
        form.appendChild(btnWrapper);

        const preventBackground = document.createElement('div');
        preventBackground.className = 'prevent-background';
        preventBackground.appendChild(form);
        document.body.appendChild(preventBackground);

        await this.renderCity();

        return {
            btnConfirm: btnConfirm,
            firstNameInput: firstName,
            firstNameError: firstNameError,
            lastNameInput: lastName,
            lastNameError: lastNameError,
            phoneNumberInput: phoneNumber,
            phoneNumberError: phoneNumberError,
            citySelect: city,
            cityError: cityError,
            districtSelect: district,
            districtError: districtError,
            wardSelect: ward,
            wardError: wardError,
            detailInput: detailAddress,
            detailError: detailAddressError
        };

    }

    getDistricts(provinceId){
        const districts = fetch(`http://localhost:8080/api/v1/delivery/address/districts?provinceId=${provinceId}`)
        .then(response=>response.json())
        return districts;
    }

    getWards(districtId){
        const wards = fetch(`/api/v1/delivery/address/wards?districtId=${districtId}`)
        .then(response=>response.json());
        return wards;
    }
    getCities(){
        const response = fetch('http://localhost:8080/api/v1/delivery/address/provices')
        .then(response=>response.json());
        return response;
    }
    validateForm(fields) {
        let isValid = true;
    
        // Check if first name is filled
        if (!fields.firstNameInput.value.trim()) {
            fields.firstNameError.textContent = 'Vui lòng nhập tên.';
            fields.firstNameError.style.display = 'block';
            isValid = false;
        } else {
            fields.firstNameError.style.display = 'none';
        }
    
        // Check if last name is filled
        if (!fields.lastNameInput.value.trim()) {
            fields.lastNameError.textContent = 'Vui lòng nhập họ.';
            fields.lastNameError.style.display = 'block';
            isValid = false;
        } else {
            fields.lastNameError.style.display = 'none';
        }
    
        // Check if phone number is filled
        if (!fields.phoneNumberInput.value.trim()) {
            fields.phoneNumberError.textContent = 'Vui lòng nhập số điện thoại.';
            fields.phoneNumberError.style.display = 'block';
            isValid = false;
        } else {
            fields.phoneNumberError.style.display = 'none';
        }
    
        // Check if city is selected
        if (fields.citySelect.selectedIndex === 0) {
            fields.cityError.textContent = 'Vui lòng chọn thành phố.';
            fields.cityError.style.display = 'block';
            isValid = false;
        } else {
            fields.cityError.style.display = 'none';
        }
    
        // Check if district is selected
        if (fields.districtSelect.selectedIndex === 0) {
            fields.districtError.textContent = 'Vui lòng chọn quận/huyện.';
            fields.districtError.style.display = 'block';
            isValid = false;
        } else {
            fields.districtError.style.display = 'none';
        }
    
        // Check if ward is selected
        if (fields.wardSelect.selectedIndex === 0) {
            fields.wardError.textContent = 'Vui lòng chọn phường xã.';
            fields.wardError.style.display = 'block';
            isValid = false;
        } else {
            fields.wardError.style.display = 'none';
        }
    
        // Check if detail address is filled
        if (!fields.detailInput.value.trim()) {
            fields.detailError.textContent = 'Vui lòng điền địa chỉ chi tiết.';
            fields.detailError.style.display = 'block';
            isValid = false;
        } else {
            fields.detailError.style.display = 'none';
        }
    
        return isValid;
    }
    async editAddressEventHandler(address){

        const form =  await this.renderNewAdressForm();
        const cities = form.citySelect;
        const districts = form.districtSelect;
        const wards = form.wardSelect;
        form.firstNameInput.value = address.firstname;
        form.lastNameInput.value = address.lastname;
        form.detailInput.value = address.detail;
        form.phoneNumberInput.value = address.phone;

        await this.renderDistrict(address.provinceId,false);
        await this.renderWard(address.districtId);
        console.log(form.wardSelect)
        cities.value = address.provinceId;
        districts.value = address.districtId;
        wards.value = address.wardId;
        form.btnConfirm.onclick = ()=>{
            if(this.validateForm(form)==false)return;
            const newAddress = {
                id: address.id,
                firstname: form.firstNameInput.value,
                lastname: form.lastNameInput.value,
                province: form.citySelect.options[form.citySelect.selectedIndex].text,
                district: form.districtSelect.options[form.districtSelect.selectedIndex].text,
                ward: form.wardSelect.options[form.wardSelect.selectedIndex].text,
                detail: form.detailInput.value,
                provinceId: form.citySelect.value,
                districtId: form.districtSelect.value,
                wardId: form.wardSelect.value,
                email: address.email,
                phone: form.phoneNumberInput.value
            }
            this.updateAddress(newAddress);
        }
    }
    addAddress(form){
        if(this.validateForm(form)==false)return;
        const newAddress = {
            id: null,
            firstname: form.firstNameInput.value,
            lastname: form.lastNameInput.value,
            province: form.citySelect.options[form.citySelect.selectedIndex].text,
            district: form.districtSelect.options[form.districtSelect.selectedIndex].text,
            ward: form.wardSelect.options[form.wardSelect.selectedIndex].text,
            detail: form.detailInput.value,
            provinceId: form.citySelect.value,
            districtId: form.districtSelect.value,
            wardId: form.wardSelect.value,
            email: null,
            phone: form.phoneNumberInput.value
        }
        fetch('/api/v1/user/add-address',{
            method:"POST",
            headers:{
                "content-type":"Application/json"
            },
            body: JSON.stringify(newAddress)
        })
        .then(async response=>{
            if(!response.ok){
                Toast('Thất bại', "Lỗi hệ thống")
                return;
            }
            const responseData = await response.json();
            
            Toast(responseData.error== true? "Thất bại":"Thàng công", responseData.message);
            if(responseData.error == false){
                this.addAddressToAddressTag(responseData.data);
                const preventBackground = document.querySelector(".prevent-background")
                document.body.removeChild(preventBackground );
            }
            
        })
    }
    updateAddress(newAddress){
        
        fetch('/api/v1/user/update-address',{
            method:"PATCH",
            headers:{
                "content-type":"Application/json"
            },
            body: JSON.stringify(newAddress)
        })
        .then(async response=>{
            if(!response.ok){
                Toast('Thất bại', "Lỗi hệ thống")
                return;
            }
            const responseData = await response.json();
            
            Toast(responseData.error== true? "Thất bại":"Thàng công", responseData.message);
            
            
        })
    }
    async renderCity(){
        const _cities = document.querySelector('#city')
        await this.getCities()
        .then(cities=>{
            const data = cities
            data.forEach(city=>{
                const option = document.createElement('option')
                option.value = city['provinceId']
                option.text = city['provinceName']
                _cities.appendChild(option)    
            })
            _cities.addEventListener('change',()=>{
                this.renderDistrict(_cities.options[_cities.selectedIndex].value)
            })
        })
    }
 
    async renderDistrict(provinceId,isRenderWards=false){
        const _districts = document.querySelector('#district')
        _districts.innerHTML = ''
        // const provinceIdInt = parseInt(provinceId)
        await this.getDistricts(provinceId)
        .then(districts=>{
            const data = districts
            data.forEach(district=>{
                const option = document.createElement('option')
    
                option.value = district['districtID']
                option.text = district['districtName']
                _districts.appendChild(option)    
            })
            if(isRenderWards==true){
                this.renderWard(_districts.options[0].value)
            }
            _districts.addEventListener('change',()=>{
                this.renderWard(_districts.options[_districts.selectedIndex].value)
            })
        })
    }
    async renderWard(district_id){
        const _ward = document.querySelector('#ward')
        _ward.innerHTML = ''
        const districtId =  parseInt(district_id)
        await this.getWards(districtId)
        .then(wards=>{
            console.log(wards)
            const data = wards
            data.forEach(ward=>{
                const option = document.createElement('option')
                option.value = ward['wardId']
                option.text = ward['wardName']
                _ward.appendChild(option)    
            })
        })
    }
}



function init(){
    fetch('/api/v1/user/addresses')
    .then(response => response.json())
    .then(data => {
        console.log(data)
        const address = new Address(data);
        address.renderAddress()
    })
}
init()
