const productId = document.getElementById("productId").textContent;

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
    fetch('/api/product/update-name?productId='+productId+'&name='+productName.value,{
        method:"POST"
    })
    //check và gửi đi
}

const productPrice= document.getElementById('product-price')
const svgEditPrice = document.getElementById('edit-price')
svgEditPrice.addEventListener('click',()=>{
    productPrice.disabled = false;
    productPrice.focus();
})
productPrice.onblur = ()=>{
    productPrice.disabled = true;
    //check và gửi đi
    //làm thêm cookie để xem thử có thay đổi không tránh gửi về nhiều lần
    fetch('/api/product/update-price?productId='+productId+"&price="+productPrice.value,
        {
            method:"POST"
        }
    )
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
    fetch('/api/product/update-quantity?productId='+productId+"&quantity="+quantity.value,
        {
            method:"POST"
        }
    )
}
up.addEventListener('click',()=>{
    quantity.value = parseInt(quantity.value) + 1;
    fetch('/api/product/update-quantity?productId='+productId+"&quantity="+quantity.value,
        {
            method:"POST"
        }
    )
})
down.addEventListener('click',()=>{
    
    if(quantity.value == '1' )
    {
        quantity.focus()
        return;
    }
    quantity.value = parseInt(quantity.value) - 1;
    fetch('/api/product/update-quantity?productId='+productId+"&quantity="+quantity.value,
        {
            method:"POST"
        }
    )
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
    data = {
        productId:productId,
        description:description.value
    }
    fetch('/api/product/update-description',
        {
            method:"POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        }
    )
}
