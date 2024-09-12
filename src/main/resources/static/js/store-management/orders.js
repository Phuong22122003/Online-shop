function Menu(){
    const inventory = document.createElement('div');

    inventory.className = 'menu-item'

    const inventoryLable = document.createElement('h3');
    inventoryLable.textContent = 'Inventory';
    inventory.appendChild(inventoryLable);


    // Tạo phần 'Setting'
    const orders = document.createElement('div');
    orders.style.backgroundColor = 'black'
    orders.style.color = 'white'
    orders.className = 'menu-item'
    const ordersLable = document.createElement('h3');
    ordersLable.textContent = 'Orders';
    orders.appendChild(ordersLable);

    const menu = document.createElement('div')
    menu.className = 'menu'

    menu.appendChild(inventory)
    menu.appendChild(orders)
                                  
    return menu;
}

function Orders(){
    data = [
        {
            orderId:1,
            productId: 1,
            productName: 'abc',
            quantity: 2,
            purchasingDate: '11:00 01/09/2024',
            status: 'Prepared'
        },
        {
            orderId:1,
            productId: 1,
            productName: 'abc',
            quantity: 2,
            purchasingDate: '11:00 01/09/2024',
            status:'InProcess'
        },
        {
            orderId:1,
            productId: 1,
            productName: 'abc',
            quantity: 2,
            purchasingDate: '11:00 01/09/2024',
            status:'Deliveried'
        },
        {
            orderId:1,
            productId: 1,
            productName: 'abc',
            quantity: 2,
            purchasingDate: '11:00 01/09/2024',
            status:'Cancelled'
        },
    ]

    const orders = document.createElement('table')
    orders.className = 'orders'
    const listTableHeader = ['Product Id','Product Name', 'Quantity','Purchasing Date','Status', '']
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
        const productId = document.createElement('td')
        productId.textContent = item['productId']

        const productName = document.createElement('td')
        productName.textContent = item['productName']

        const quantity = document.createElement('td')
        quantity.textContent = item['quantity']

        const purchasingDate = document.createElement('td')
        purchasingDate.textContent = item['purchasingDate']

        const status = document.createElement('td')
        status.textContent = item['status']

        const schedulePickup = document.createElement('td')
        const btnSchedulePickup = document.createElement('span')
        btnSchedulePickup.className = 'btn-schedule'
        btnSchedulePickup.textContent = 'Schedule Pickup';
        if(item['status'].includes('Prepared')){
            btnSchedulePickup.style.backgroundColor = 'grey' 
            btnSchedulePickup.style.cursor =  'not-allowed'
        }

        schedulePickup.appendChild(btnSchedulePickup )

        order.appendChild(productId)
        order.appendChild(productName)
        order.appendChild(quantity)
        order.appendChild(purchasingDate)
        order.appendChild(status)
        order.appendChild(schedulePickup)
        orders.appendChild(order)
    })
   return orders;
}

function init(){
    const managementWrapper = document.querySelector('.management-wrapper')
    const menu = Menu()
    const orders = Orders()
    managementWrapper.appendChild(menu)
    managementWrapper.appendChild(orders)
}

init()