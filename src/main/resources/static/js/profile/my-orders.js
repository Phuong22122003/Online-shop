import { Toast } from "../toast.js"
import { Menu } from "./menu.js"
import { StarRating } from "./star-rating.js"
function MyOrders(data){
    console.log(data)
    const myOrdersWrapper = document.createElement('div')
    myOrdersWrapper.className = 'orders-wrapper'

    const translation = {
        'DELIVERED': 'Đã giao',
        'PREPARING': 'Đang chuẩn bị',
        'INPROCESS': 'Đang giao hàng',
        'CANCELLED': 'Đã hủy',
    }

    data.forEach(item =>{
        console.log('a')
        const order = document.createElement('div')
        order.className = 'order'
        const status =document.createElement('h4')
        status.textContent = translation[item['status'].toUpperCase()]
        item['orders'].forEach(orderData=>{
            const detailWrapper = document.createElement('div')
            detailWrapper.className = 'detail-wrapper'
    
            const image = document.createElement('img')
            image.src = orderData['imagePath']
    
            const nameSizeQuantityWrapper = document.createElement('div')
            const name = document.createElement('p')
            name.textContent = orderData['name']
            name.className = 'name'
    
            const size = document.createElement('p')
            size.textContent = orderData['size']
            size.className = 'size';
    
            const color = document.createElement('p')
            color.textContent = orderData['color'];
            color.className = 'color'
    
            const quantity = document.createElement('p')
            quantity.textContent = orderData['quantity']
            quantity.className = 'quantity'
    
            nameSizeQuantityWrapper.appendChild(name)
            nameSizeQuantityWrapper.appendChild(size)
            nameSizeQuantityWrapper.appendChild(color)
            nameSizeQuantityWrapper.appendChild(quantity)
    
            const total = document.createElement('p')
            total.className = 'total';
            total.textContent = orderData['price'] * orderData['quantity']
            
            const btnWriteComment = document.createElement('span')
            btnWriteComment.className = 'btn-comment'
            
            detailWrapper.appendChild(image)
            detailWrapper.appendChild(nameSizeQuantityWrapper)
            detailWrapper.appendChild(total)
            btnWriteComment.onclick = ()=>window.location.href = `/product?id=${orderData['productId']}`
            if(item['status'].toUpperCase() == 'DELIVERED'){
                // btnWriteComment.onclick = ()=>    document.body.appendChild(StarRating(orderData))//-> test
                if(orderData['isCommented'] == false){
                    btnWriteComment.textContent = 'Đánh giá';
                    btnWriteComment.onclick = ()=>    document.body.appendChild(StarRating(orderData,btnWriteComment))
                }
                else{
                    btnWriteComment.textContent = 'Mua lại';
                }
            }
            else if(item['status'].toLocaleUpperCase()== 'Cancelled'.toLocaleUpperCase())
                btnWriteComment.textContent = 'Mua lại';
            else 
                btnWriteComment.textContent = 'Xem đánh giá';


            detailWrapper.appendChild(btnWriteComment)

            order.appendChild(detailWrapper)
        })

        const extraInfo = document.createElement('div')
        extraInfo.className = 'extra-info'

        const deliveryInfo = document.createElement('div')
        deliveryInfo.className = 'delivery-info'

        const userInfo = document.createElement('p')
        userInfo.textContent = item['address']['lastname']+ ' ' +item['address']['firstname']+  ' - ' + item['address']['phone']

        const address = document.createElement('p')
        address.textContent = 'Tỉnh ' +item['address']['province'] + ' , Huyện ' + item['address']['district'] + ', Xã '+ item['address']['ward']
        
        deliveryInfo.appendChild(userInfo)
        deliveryInfo.appendChild(address)

        const deliveryFee = document.createElement('p')
        deliveryFee.textContent = item['deliveryFee']
        deliveryFee.className = 'delivery-fee'
        
        const grandTotal = document.createElement('p')
        grandTotal.textContent = item['grandTotal'];
        grandTotal.className = 'grand-total'

        extraInfo.appendChild(deliveryInfo)
        extraInfo.appendChild(deliveryFee)
        extraInfo.appendChild(grandTotal)

        const btnWrapper = document.createElement('div')
        btnWrapper.className = 'btn-wrapper'
        
        if(item['status'].toLocaleUpperCase().includes('Preparing'.toLocaleUpperCase())){
            const btnCancel = document.createElement('span')
            btnCancel.className = 'btn-cancel'
            btnCancel.textContent = 'Hủy đơn hàng';
            btnCancel.onclick = ()=>{
                fetch('/api/v1/user/cancel-order',{
                    method:'POST',
                    headers:{
                        'content-type':'application/json'
                    },
                    body: item['orderId']
                })
                .then(response =>{
                    if(response.ok)
                        window.location.reload()
                    else{
                        Toast("Thất bại","Lỗi hủy đơn");
                    }
                })
            }
            btnWrapper.appendChild(btnCancel)
        }

        order.appendChild(extraInfo)
        order.appendChild(btnWrapper)

        order.appendChild(status)
        myOrdersWrapper.appendChild(order)
    })
    return myOrdersWrapper;
}
async function init(){
    async function getOrders(){
        const response =  fetch('/api/v1/user/profile/orders')
                            .then(response=>response.json())
        const data = await response
        return data;
    }
    const userOrders = await getOrders()
    const menu = Menu('my-orders')
    const myOrders = MyOrders(userOrders)
    const profileWrapper = document.querySelector('.profile-wrapper')
    profileWrapper.appendChild(menu)
    profileWrapper.appendChild(myOrders)

}



init()