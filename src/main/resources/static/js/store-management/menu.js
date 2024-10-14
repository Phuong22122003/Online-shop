export function Menu(){
    const href = window.location.href;
    const productsManagement = document.createElement('div');
    productsManagement.className = 'menu-items'
    
    const productsManagementLable = document.createElement('h4');
    productsManagementLable.textContent = 'Quản lý sản phẩm';

    const allProductLabel = document.createElement('span')
    allProductLabel.textContent = 'Tất cả sản phẩm'
    allProductLabel.className = 'menu-item'

    if(href.includes('products')) {
        allProductLabel.style.backgroundColor = 'black'
        allProductLabel.style.color = 'white'
    }
    allProductLabel.onclick = ()=>{
        if(href.includes('products')) {
            return;
        }
        window.location.href = '/admin/products'
    }

    const addProductLabel = document.createElement('span')
    addProductLabel.textContent = 'Thêm sản phẩm';
    addProductLabel.className = 'menu-item'
    if(href.includes('add')) {
        addProductLabel.style.backgroundColor = 'black'
            addProductLabel.style.color = 'white'
    }
    addProductLabel.onclick = ()=>{
        if(href.includes('add')){
            return;
        }
        window.location.href = '/admin/add'
    }

    const updateProductLabel = document.createElement('span')
    updateProductLabel.textContent = 'Cập nhật sản phẩm';
    updateProductLabel.className = 'menu-item';
    updateProductLabel.style.cursor = 'not-allowed'

    productsManagement.appendChild(productsManagementLable);
    productsManagement.appendChild(allProductLabel);
    productsManagement.appendChild(addProductLabel);
    productsManagement.appendChild(updateProductLabel);

    // Tạo phần 'Setting'
    const orders = document.createElement('div');
    orders.className = 'menu-items'
    const ordersLable = document.createElement('h4');
    ordersLable.textContent = 'Các đơn đặt hàng';

    const allOrders = document.createElement('span');
    allOrders.textContent = 'Tất cả đơn hàng';
    allOrders.className = 'menu-item';

    if(href.includes('orders?status=all')){
        allOrders.style.backgroundColor = 'black'
        allOrders.style.color = 'white'
    }
    allOrders.onclick = ()=>{
        if(href.includes('orders?status=all')){
            return;
        }
        window.location.href = '/admin/orders?status=all';
    }
    const cancelledOrders = document.createElement('span');
    cancelledOrders.textContent = 'Đơn hủy';
    cancelledOrders.className = 'menu-item';
    if(href.includes('orders?status=cancelled')){
        cancelledOrders.style.backgroundColor ='black'
        cancelledOrders.style.color ='white'
    }
    cancelledOrders.onclick = ()=>{
        
        window.location.href = '/admin/orders?status=cancelled'
    }
    const preparingOrder = document.createElement('span');
    preparingOrder.textContent = 'Đang chờ';
    preparingOrder.className = 'menu-item';
    if(href.includes('orders?status=preparing')){
        preparingOrder.style.backgroundColor ='black'
        preparingOrder.style.color ='white'
    }
    preparingOrder.onclick = ()=>{
        
        window.location.href = '/admin/orders?status=preparing'
    }
    const inProcessOrder = document.createElement('span');
    inProcessOrder.textContent = 'Đang giao';
    inProcessOrder.className = 'menu-item';
    if(href.includes('orders?status=inprocess')){
        inProcessOrder.style.backgroundColor ='black'
        inProcessOrder.style.color ='white'
    }
    inProcessOrder.onclick = ()=>{
        
        window.location.href = '/admin/orders?status=inprocess'
    }

    orders.appendChild(ordersLable);
    orders.appendChild(allOrders);
    orders.appendChild(cancelledOrders);
    orders.appendChild(preparingOrder);
    orders.appendChild(inProcessOrder);

    const menu = document.createElement('div')
    menu.className = 'menu'

    menu.appendChild(productsManagement)
    menu.appendChild(orders)
    return menu;
}