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
    const imgData = new FormData()
    imgData.append("file",file)
    try {
        const response = await fetch('/api/product/upload-image', {
            method: 'POST',
            body: imgData,
        });
        
        if (response.ok) {
            const imagePath = await response.text();
            console.log(imagePath)
            const d = new Date();
            let time = d.getTime(); 
            data = {
                productId: time,
                name: productName.value,
                price: productPrice.value,
                description: description.value,
                quantity: quantity.value,
                imagePath:imagePath
            }
            fetch('/api/product/add',
                {
                    method:"POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body:JSON.stringify(data)
                }
            ).then((respone)=>response.status)
            .then((status)=>{
                console.log(status)
            })
        } else {
            console.error('Upload failed:', response.statusText);
            return;
        }
    } catch (error) {
        console.error('Fetch error:', error);
        return;
    }

})