import { Toast } from "../toast.js"
import { Menu } from "./menu.js"
import { StarRating } from "./star-rating.js"
function formatCurrency(number, locale = 'vi-VN', currency = 'VND') {
    return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(number);
}
class MyOrders{
    constructor(data){
        console.log(data)
        this.data = data;
        console.log(data)
        this.myOrdersWrapper = document.createElement('div')
        this.myOrdersWrapper.className = 'orders-wrapper';
        this.translation = {
            'CONFIRMING':'Đang chờ xác nhận',
            'DELIVERED': 'Đã giao hàng',
            'PREPARING': 'Đang chuẩn bị',
            'INPROCESS': 'Đang giao hàng',
            'CANCELLED': 'Đã hủy',
        }
        this.now  = new Date();
        this.oneMonthAgo = new Date();
        this.oneMonthAgo.setMonth(this.oneMonthAgo.getMonth() - 1)
        console.log(this.now.getMonth());
        console.log(this.oneMonthAgo.getMonth())
        this.init()
    }
    render(){
        return this.myOrdersWrapper;
    }
    init(){
        this.createFilter();
        this.createOrders();
    }
    formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() +1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    createFilter(){
        const filterWrapper = document.createElement('div');
        filterWrapper.className = 'filter';

        const dateFilter = document.createElement('div');   
        dateFilter.className = 'date-filter';

        const fromTag = document.createElement('span')
        fromTag.textContent = 'Từ ngày:';

        
        const from = document.createElement('input');
        from.id = 'from';
        from.type = 'date';
        from.value =  this.formatDate(this.oneMonthAgo);
        from.onchange = ()=>{this.filterOrder()}

        const toTag = document.createElement('span');
        toTag.textContent = ' Đến ngày:';

        const to = document.createElement('input');
        to.id = 'to';
        to.type = 'date';
        to.placeholder =
        to.value = this.formatDate(this.now);
        to.onchange = ()=>{this.filterOrder()}

        
        dateFilter.appendChild(fromTag);
        dateFilter.appendChild(from);
        dateFilter.appendChild(toTag)
        dateFilter.appendChild(to)

        const searchOrder = document.createElement('div');
        searchOrder.className = 'search-orders';
        
        const searchInput = document.createElement('input');
        const magnifier = document.createElement('span')
        magnifier.innerHTML = this.getMagnifierSvg();
        magnifier.onclick = ()=>{
            const key = searchInput.value;

            this.filterOrder(key);
        }
        searchOrder.appendChild(searchInput);
        searchOrder.appendChild(magnifier);
        
        const orderFilter = document.createElement('select');
        orderFilter.className = 'order-filter';
        const options = ['Tất cả','Đang chờ xác nhận','Đang chuẩn bị','Đang giao hàng', 'Đã giao','Đã hủy']
        options.forEach(it=>{
            const option = document.createElement('option')
            option.text = it;
            orderFilter.appendChild(option)
        })
        orderFilter.onchange = ()=>{
            this.filterOrder();
        }
        filterWrapper.appendChild(dateFilter)
        filterWrapper.appendChild(searchOrder);
        filterWrapper.appendChild(orderFilter);
        this.myOrdersWrapper.appendChild(filterWrapper)
    }


    filterOrder(){
        const select = this.myOrdersWrapper.querySelector('.order-filter');
        const from = this.myOrdersWrapper.querySelector('#from');
        const to = this.myOrdersWrapper.querySelector('#to');
        const searchInput = this.myOrdersWrapper.querySelector('.search-orders input')
        const orders = this.myOrdersWrapper.querySelectorAll('.order');
      
        
        const fromToDate = new Date(from.value);
        const toToDate = new Date(to.value);
        const statusFiler = select.value;
        const keyFiler =searchInput.value;
        
        orders.forEach(order =>{
            const status = order.querySelector('.status').textContent;
            const purchaseDate = new Date(order.querySelector('.purchase-date').textContent);
            
            const name = order.querySelector('.name').textContent;
            console.log(name!=''&&name.includes(keyFiler)||name=='')
            if((statusFiler=='Tất cả'||status == statusFiler) &&
                (purchaseDate>=fromToDate&&purchaseDate<=toToDate)&&
                (name!=''&&name.toLowerCase().includes(keyFiler.toLowerCase())||name==''))
                order.style.display = 'inline-flex';
            else 
                order.style.display = 'none';

        })
    }
    createOrders(){
        this.data.forEach(item =>{
            const order = document.createElement('div')
            order.className = 'order'


            const purchaseDate = new Date(item['purchaseDate']);
            if(purchaseDate>this.now || purchaseDate<this.oneMonthAgo) order.style.display = 'None';

            const orderHead = document.createElement('div');
            orderHead.className = 'order-header';

            const orderIdAndTime = document.createElement('div');
            orderIdAndTime.className = 'orderid-time';
            const orderId = document.createElement('h2');
            orderId.className = 'orderid';
            orderId.textContent = "Đơn hàng #"+ item['orderId'];

            const datePlacing = document.createElement('span');
            datePlacing.textContent = item['purchaseDate'];
            datePlacing.className = 'purchase-date';
            orderIdAndTime.appendChild(orderId);
            orderIdAndTime.appendChild(datePlacing);


            const status =document.createElement('div');
            status.className = 'status';
            status.textContent = this.translation[item['status'].toUpperCase()]
            
            orderHead.appendChild(orderIdAndTime);
            orderHead.appendChild(status);

            order.appendChild(orderHead)


            const orderItems = document.createElement('div');
            orderItems.className = 'order-items';
            let productPriceTotal = 0;
            item['orders'].forEach(orderData=>{
                productPriceTotal += parseFloat(orderData['price'] * orderData['quantity'])
                const orderItem = document.createElement('div')
                orderItem.className = 'order-item';
                
                const imageWrapper = document.createElement('div');
                imageWrapper.className = 'image-wrapper';
                const image = document.createElement('img')
                image.className = 'image';
                image.src = orderData['imagePath']
                imageWrapper.appendChild(image);
                
                const productInfo = document.createElement('div');
                productInfo.className = 'product-info';
                
                const name = document.createElement('h3')
                name.textContent = orderData['name']
                name.className = 'name'

                const variantInfoWrapper = document.createElement('div');
                variantInfoWrapper.className = 'variant-info-wrapper';

                const size = document.createElement('p')
                size.textContent = "Kích thước: " +orderData['size']
                size.className = 'size';
        
                const color = document.createElement('p')
                color.textContent = "Màu sắc: " + orderData['color'];
                color.className = 'color'
        
                const quantity = document.createElement('p')
                quantity.textContent = "Số lượng: " + orderData['quantity']
                quantity.className = 'quantity'
                
                variantInfoWrapper.appendChild(size)
                variantInfoWrapper.appendChild(color)
                variantInfoWrapper.appendChild(quantity)

                productInfo.appendChild(name);
                productInfo.appendChild(variantInfoWrapper);
        
                const itemPrice = document.createElement('div');
                itemPrice.className = 'product-price';
                itemPrice.textContent = formatCurrency(orderData['price'] * orderData['quantity'])
                
                const arbitraryBtn = document.createElement('button');
                arbitraryBtn.className = 'arbitrary-btn';
                arbitraryBtn.textContent = 'Xem sản phẩm';

                arbitraryBtn.onclick = ()=>window.location.href = `/product?id=${orderData['productId']}`

                if(item['status'].toUpperCase() == 'DELIVERED'){
                    if(orderData['isCommented'] == false){
                        arbitraryBtn.textContent = 'Đánh giá';
                        arbitraryBtn.onclick = ()=>    document.body.appendChild(StarRating(orderData,arbitraryBtn))
                    }
                }
         
    
                orderItem.appendChild(imageWrapper);
                orderItem.appendChild(productInfo);
                orderItem.appendChild(itemPrice);
                orderItem.appendChild(arbitraryBtn);

                order.appendChild(orderItem)
            })

            const wrapper = document.createElement('div');
            wrapper.className = 'order-footer';

            const deliveryAndCost = document.createElement('div');
            deliveryAndCost.className = 'delivery-cost'
            const deliveryInfo = document.createElement('div')
            deliveryInfo.className = 'delivery-info'
    
            const userInfo = document.createElement('p')
            userInfo.textContent ="Người nhận: "+  item['address']['lastname']+ ' ' +item['address']['firstname']+  ' - ' + item['address']['phone']
    
            const address = document.createElement('p');
            address.style.marginTop = '10px';
            address.textContent = "Địa chỉ: " +'Tỉnh ' +item['address']['province'] + ' , Huyện ' + item['address']['district'] + ', Xã '+ item['address']['ward']
            
            deliveryInfo.appendChild(userInfo);
            deliveryInfo.appendChild(address);
    
            const costWrapper = document.createElement('div');
            costWrapper.className = 'cost';
            
            const deliveryFee = document.createElement('div');
            deliveryFee.textContent = 'Phí vận chuyển: ' + formatCurrency(item['deliveryFee'])
            deliveryFee.className = 'delivery-fee'

            const productTotal = document.createElement('div');
            productTotal.textContent = 'Tiền hàng: ' + formatCurrency(productPriceTotal);

            const grandTotal = document.createElement('h3');
            grandTotal.textContent ='Tổng thanh toán: '+  formatCurrency(item['grandTotal']);
            grandTotal.className = 'grand-total'
            
            costWrapper.appendChild(productTotal);
            costWrapper.appendChild(deliveryFee);
            costWrapper.appendChild(grandTotal);

            deliveryAndCost.appendChild(deliveryInfo);
            deliveryAndCost.appendChild(costWrapper);
            wrapper.appendChild(deliveryAndCost);

            
            const btnWrapper = document.createElement('div')
            btnWrapper.className = 'btn-wrapper'
            
            if(item['status'].toLocaleUpperCase().includes('PREPARING')||
               item['status'].toLocaleUpperCase().includes('CONFIRMING')){
                   const btnCancel = document.createElement('span');
                btnCancel.className = 'btn-cancel';
                btnCancel.textContent = 'Hủy đơn hàng';
                btnCancel.onclick = ()=>{
                    this,this.cancelOrder(item['orderId'],wrapper,btnWrapper,status);
                }
                btnWrapper.appendChild(btnCancel);
                wrapper.appendChild(btnWrapper);
            }
            
            order.appendChild(wrapper);

            this.myOrdersWrapper.appendChild(order)
        })
    }
    cancelOrder(orderId,parrentNode,btnWrapper,status){
        fetch('/api/v1/user/cancel-order',{
            method:'POST',
            headers:{
                'content-type':'application/json'
            },
            body: orderId
        })
        .then(async response =>{
            const responseDto = await response.json();
            if(response.ok&&responseDto.error == false){
                console.log(btnWrapper)
                if(btnWrapper!=null)
                    parrentNode.removeChild(btnWrapper);
                status.textContent = 'Đã hủy';
                Toast('Thành công', 'Đơn hàng đã được hủy');
            }
            else{
                Toast("Thất bại",responseDto.message);
            }
        })
    }
    getMagnifierSvg(){
        return `
        <svg width="20px" height="20px" viewBox="0 -0.5 17 17" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="si-glyph si-glyph-magnifier">
            <title>1142</title>
            <defs></defs>
            <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g transform="translate(1.000000, 0.000000)" fill="#434343">
                    <path d="M16,5.954 C16,2.665 13.317,0 10.009,0 C6.698,0 4.016,2.665 4.016,5.954 C4.016,9.241 6.699,11.906 10.009,11.906 C13.317,11.906 16,9.241 16,5.954 L16,5.954 Z M4.934,6.019 C4.934,3.213 7.213,0.943 10.026,0.943 C12.837,0.943 15.114,3.214 15.114,6.019 C15.114,8.823 12.837,11.094 10.026,11.094 C7.213,11.094 4.934,8.822 4.934,6.019 L4.934,6.019 Z" class="si-glyph-fill"></path>
                    <path d="M1.822,15.964 L0,14.142 L4.037,10.104 C4.037,10.104 4.133,10.869 4.617,11.351 C5.099,11.835 5.859,11.927 5.859,11.927 L1.822,15.964 L1.822,15.964 Z" class="si-glyph-fill">        </path>
                    <path d="M13.398,5.073 C13.398,5.645 13.838,5.429 13.838,4.634 C13.838,3.264 12.729,2.154 11.359,2.154 C10.562,2.154 10.347,2.593 10.92,2.593 C12.29,2.593 13.398,3.704 13.398,5.073 L13.398,5.073 Z" class="si-glyph-fill"></path>
                </g>
            </g>
        </svg>`
    }
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
    const myOrders = new MyOrders(userOrders)
    const profileWrapper = document.querySelector('.profile-wrapper')
    profileWrapper.appendChild(menu)
    profileWrapper.appendChild(myOrders.render())

}



init()