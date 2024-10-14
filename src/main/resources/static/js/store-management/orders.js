import { Menu } from "./menu.js"
function Orders(data){
    console.log(data)
    // data = [
    //     {
    //         orderId:1,
    //         status:'Cancelled',
    //         deliveryFee: 15000, 
    //         purchasingDate: '11:00 01/09/2024',
    //         address: 'địa chỉ',
    //         phone: '0948241164',
    //         fullname: 'Davis Phuong Nguyen',
    //         products:[
    //             {
    //                 productId: 1,
    //                 productName: 'Áo khoác nữ',
    //                 imagePath: '/api/v1/resource/image?name=1726939533ao.png&&folder=',
    //                 quantity: 2,
    //                 size: 'S',
    //                 color:'Vàng',
    //                 unitPrice: 20000,
    //             },
    //             {
    //                 productId: 1,
    //                 productName: 'Áo khoác nữ',
    //                 imagePath: '/api/v1/resource/image?name=1726939533ao.png&&folder=',
    //                 quantity: 2,
    //                 size: 'S',
    //                 color:'Vàng',
    //                 unitPrice: 20000,
    //             },
    //             {
    //                 productId: 1,
    //                 productName: 'Áo khoác nữ',
    //                 imagePath: '/api/v1/resource/image?name=1726939533ao.png&&folder=',
    //                 quantity: 2,
    //                 size: 'S',
    //                 color:'Vàng',
    //                 unitPrice: 20000,
    //             },
    //         ]
    //     },
    // ]

    const orders = document.createElement('table')
    orders.className = 'orders'
    const listTableHeader = ['Mã đơn đặt','Sản phẩm','Doanh thu' , 'Người mua','Trạng thái','']
    const header = document.createElement('tr')
    listTableHeader.forEach(item=>{
        const th = document.createElement('th')
        th.textContent = item
        header.appendChild(th)
    })

    orders.appendChild(header)

    data.forEach(item=>{
        const order = document.createElement('tr')
        order.className = 'order'

        const orderId = document.createElement('td')
        orderId.className = 'order-id'
        orderId.textContent = item['orderId']

        const products = document.createElement('td');
        let priceTemp = 0;
        item['products'].forEach(product=>{

            priceTemp += parseFloat(product['quantity']) * parseFloat(product['unitPrice']);
            const productWrapper = document.createElement('div')
            productWrapper.className = 'product-wrapper'
    
            const productImage = document.createElement('img');
            productImage.src = product['imagePath']
            productImage.style.width = '50px';
            productImage.style.height = '50px';
    
            const productInfo = document.createElement('div')
            productInfo.className = 'product-info'
            
            const productName = document.createElement('span')
            productName.textContent = product['name']
            productName.style.maxWidth = '120px';

            const size = document.createElement('span')
            size.textContent = product['size']
            size.className = 'size';

            const color = document.createElement('span');
            color.textContent = product['color'];
            color.className = 'color';

            const unitPrice = document.createElement('span');
            unitPrice.className = 'unit-price';
            unitPrice.textContent = product['unitPrice'];

            productInfo.appendChild(productName)
            productInfo.appendChild(size)
            productInfo.appendChild(color)
            productInfo.appendChild(unitPrice)

            const productQuantity = document.createElement('span')
            productQuantity.textContent = product['quantity']
            productQuantity.className = 'product-quantity'

    
            productWrapper.appendChild(productImage);
            productWrapper.appendChild(productInfo);
            productWrapper.appendChild(productQuantity);
            // productWrapper.appendChild(unitPrice);
    
            products.appendChild(productWrapper)
        })

        const total = document.createElement('td')
        const totalWrapper = document.createElement('div')
        totalWrapper.className = 'total-wrapper'

        const productPrice = document.createElement('span')
        productPrice.textContent = priceTemp;
        productPrice.className = 'product-price'
        
        const deliveryFee = document.createElement('span');
        deliveryFee.textContent = item['deliveryFee'];
        deliveryFee.className = 'delivery-fee'

        const grandTotal = document.createElement('span')
        grandTotal.textContent = priceTemp + item['deliveryFee']
        grandTotal.className = 'grand-total'

        totalWrapper.appendChild(productPrice)
        totalWrapper.appendChild(deliveryFee)
        totalWrapper.appendChild(grandTotal)

        total.appendChild(totalWrapper)

        const userInfo = document.createElement('td')
        userInfo.style.maxWidth = '200px';
        const userWrapper = document.createElement('div')
        userWrapper.className = 'user-info';

        const fullname = document.createElement('span');
        fullname.textContent = item['fullname'];
        fullname.className = 'fullname';

        const purchasingDate = document.createElement('span');
        purchasingDate.textContent = item['purchasingDate'];
        purchasingDate.className = 'purchasing-date';

        const phoneNumber = document.createElement('span');
        phoneNumber.textContent = item['phone'];
        phoneNumber.className = 'phone';

        const address = document.createElement('span');
        address.textContent = item['address'];
        address.className = 'address'

        userWrapper.appendChild(fullname);
        userWrapper.appendChild(phoneNumber);
        userWrapper.appendChild(address);
        userWrapper.appendChild(purchasingDate);

        userInfo.appendChild(userWrapper)

        const statusTranslation =  {
            cancelled: 'Đã hủy',
            preparing: 'Đang chuẩn bị',
            inprocess: 'Đang giao',
            delivered: 'Đã giao',
        }
        const status = document.createElement('td')
        status.textContent = statusTranslation[item['status'].toLowerCase()]

        const schedulePickup = document.createElement('td')
        const btnSchedulePickup = document.createElement('span')
        btnSchedulePickup.className = 'btn-schedule'
        btnSchedulePickup.textContent = 'Chuẩn bị hàng';
        if(!item['status'].includes('Preparing')){
            btnSchedulePickup.style.backgroundColor = 'grey' 
            btnSchedulePickup.style.cursor =  'not-allowed'
        }

        schedulePickup.appendChild(btnSchedulePickup )

        order.appendChild(orderId)
        order.appendChild(products)
        order.appendChild(total)
        order.appendChild(userInfo)
        order.appendChild(status)
        order.appendChild(schedulePickup)
        orders.appendChild(order)
    })
   return orders;
}

async function init(){
    function getOrdersData(){
        const params = new URLSearchParams(window.location.search)
        let status = params.get("status")
        let url = ''
        if(status == null)
            url = '/api/v1/admin/orders/all'
        else 
            url  = `/api/v1/admin/orders/${status}`
        const response = fetch(url).then(response => response.json())

        return response;
    }
    const ordersData = await getOrdersData()
    console.log(ordersData)

    const managementWrapper = document.querySelector('.management-wrapper')
    const menu = Menu()
    const orders = Orders(ordersData['data'])
    managementWrapper.appendChild(menu)
    managementWrapper.appendChild(orders)
}

init()