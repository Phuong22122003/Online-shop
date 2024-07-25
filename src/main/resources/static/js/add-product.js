const productName = document.getElementById('product-name')
const svgEditName = document.getElementById('edit-name')
svgEditName.addEventListener('click',()=>{
    productName.disabled = false;
    productName.focus();
})
productName.onblur = ()=>{
    if(productName.value === ''){
        productName.focus()
        return;
    }
    productName.disabled = true;
}

const productPrice= document.getElementById('product-price')
const svgEditPrice = document.getElementById('edit-price')
svgEditPrice.addEventListener('click',()=>{
    productPrice.disabled = false;
    productPrice.focus();
})
productPrice.oninput = ()=>{
    productPrice.value = productPrice.value.replace(/\D/g, '')
}
productPrice.onblur = ()=>{
    if(productPrice.value.trim() ===''){
        productPrice.focus()
        return
    }
    productPrice.disabled = true;
}


const up = document.getElementById('up')
const quantity = document.getElementById('quantity-value')
const down = document.getElementById('down')

quantity.oninput = ()=>{
    quantity.value = quantity.value.replace(/\D/g, '')
}
quantity.onblur = ()=>{
    if(quantity.value ==''){
        quantity.focus()
        return;
    }

}
up.addEventListener('click',()=>{
    quantity.value = parseInt(quantity.value) + 1;

})
down.addEventListener('click',()=>{
    
    if(quantity.value == '1' )
    {
        quantity.focus()
        return;
    }
    quantity.value = parseInt(quantity.value) - 1;

})


const svgEditDescription = document.getElementById("edit-description")
const description = document.querySelector('.description')
svgEditDescription.addEventListener('click',()=>{
    description.disabled = false;
    description.focus()
})
description.onblur = ()=>{
    console.log(description.value)
    if(description.value.trim().length ===0){
        description.focus()
        return;
    }
    description.disabled = true;
}


const add = document.querySelector('.btn-finished')
add.addEventListener('click',async ()=>{
    const image = document.querySelector('.image')
    const file = image.files[0]
    console.log(image)
    if(file == null)
    {
        window.alert('Vui lòng chọn ảnh sản phẩm')
        return;
    }
    if(productName.value.trim() === ''){
        window.alert('Vui lòng nhập tên sản phẩm')
        return;
    }
    if(productPrice.value.trim() === ''){
        window.alert('Vui lòng nhập giá sản phẩm')
        return;
    }
    const d = new Date();
    let time = d.getTime(); 
    const data = new FormData()
    data.append("image",file)
    data.append('productId', time);
    data.append('name', productName.value);
    data.append('price', productPrice.value);
    data.append('description', description.value);
    data.append('quantity', quantity.value);
    try {
        const response = await fetch('/api/product/add', {
            method: 'POST',
            body: data,
        });
        if(response.ok)
            window.alert('Lưu thành công')
        else window.alert('Lưu thất bại')

    } catch (error) {
        console.error('Fetch error:', error);
        return;
    }

})