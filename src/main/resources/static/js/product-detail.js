const btnBuy= document.getElementById("buy")
btnBuy.addEventListener('click',()=>{
    const productId = document.getElementById("productId");
    const quantity = document.getElementById('quantity-value')
    const address = document.getElementById('address-value')
    if(address.textContent.trim().length == 0)
    {
        // window.alert('Vui lòng nhập địa chỉ')
        const form = document.querySelector('.form-wrapper')
        form.style.display = 'flex'
        document.body.style.overflow = 'hidden';
        return
    }
    window.location.href = '/buy-product?productId=' + productId.textContent+'&quantity='+quantity.value +'&address='+address.textContent;
})
const btnAdd = document.getElementById("add")
btnAdd.addEventListener('click',()=>{
    const productId = document.getElementById('productId')
    const quantity = document.getElementById('quantity-value')
    const address = document.getElementById('address-value')
    if(address.textContent.trim().length == 0)
        {
            // window.alert('Vui lòng nhập địa chỉ')
            const form = document.querySelector('.form-wrapper')
            form.style.display = 'flex'
            document.body.style.overflow = 'hidden';
            return
        }
    let data = {
        'productId':productId.textContent,
        'quantity': quantity.value,
        'address':address.textContent
    }
    console.log(data)
    fetch('/api/cart/add-order',{
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
    const productId = document.getElementById("productId");
    fetch('/api/home/other-product?except='+productId.textContent,{
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


const addressForm = document.querySelector('.address')
addressForm.addEventListener('click',()=> {
    document.body.style.overflow = 'hidden';
    const form = document.querySelector('.form-wrapper')
    form.style.display = 'flex'
})


// ===========Select address===================//
const btnCancel = document.querySelectorAll('.form-wrapper .btn-wrapper .btn')[0]
const btnAgree = document.querySelectorAll('.form-wrapper .btn-wrapper .btn')[1]

const province = document.getElementById('province')
const district = document.getElementById('district')
const commune = document.getElementById('commune')
btnCancel.addEventListener('click',()=>{
    const form = document.querySelector('.form-wrapper')
    form.style.display = 'none'
    document.body.style.overflow = 'scroll';
})

btnAgree.addEventListener('click',()=>{

    if(province.value == 'none'){
        province.style.color = 'red'
        return;
    }
    if(district.value == 'none'){
        district.style.color = 'red'
        return;
    }
    if(commune.value == 'none'){
        commune.style.color = 'red'
        return;
    }
    const form = document.querySelector('.form-wrapper')
    form.style.display = 'none'
    
    const address = document.getElementById('address-value');
    address.textContent ='Tỉnh ' +province.options[province.selectedIndex].text + ' ,  huyện ' +district.options[district.selectedIndex].text+ ' ,  xã ' +commune.options[commune.selectedIndex].text;
    document.body.style.overflow = 'scroll';
})
function setDistrictValue(value){
    
    fetch('https://esgoo.net/api-tinhthanh/2/'+ value+'.htm')
    .then((respone)=>respone.json())
    .then((data)=>{
        var opt;
        data['data'].forEach((districtValue)=>{
            opt = document.createElement('option')
            console.log(districtValue['id'])
            console.log(districtValue['name'])
            opt.value = districtValue['id']
            opt.innerHTML = districtValue['name']
            district.appendChild(opt)
        })
    })
    .then(()=>{
        district.addEventListener('change',()=>{
            commune.innerHTML ='<option value="none">Chọn xã</option>'
            commune.disabled =false;
            setCommuneValue(district.value)
        })
    })

}

function setProvinceValue(){

    fetch('https://esgoo.net/api-tinhthanh/1/0.htm')
        .then((respone)=>respone.json())
        .then((data)=>{
            var opt;
            
            data['data'].forEach(provinceValue=>{
                opt = document.createElement('option')
                console.log(provinceValue['id'])
                console.log(provinceValue['name'])
                opt.value = provinceValue['id']
                opt.innerHTML = provinceValue['name']
                province.appendChild(opt)
            })
        })
        .then(()=>{
            province.addEventListener('change',()=>{
                district.innerHTML = '<option value="none">Chọn huyện</option>'
                district.disabled =false;
                commune.innerHTML ='<option value="none">Chọn xã</option>'
                commune.disabled =true;
                setDistrictValue(province.value)
            })
        })
        .catch((error)=>{
            console.log(error)
        })
}

function setCommuneValue(value){
    console.log(value)
    fetch('https://esgoo.net/api-tinhthanh/3/'+value+'.htm')
    .then((respone)=>respone.json())
    .then((data)=>{
        commune.innerHTML = ''
        var opt;
        data['data'].forEach(communeValue=>{
            opt = document.createElement('option')
            console.log(communeValue['id'])
            console.log(communeValue['name'])
            opt.value = communeValue['id']
            opt.innerHTML = communeValue['name']
            commune.appendChild(opt)
        })
        commune.querySelectorAll('option')[0].selected = true
    })
    .catch((error)=>{
        console.log(error)
    })
}
setProvinceValue()