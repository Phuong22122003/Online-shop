function Menu(){
    const inventory = document.createElement('div');
    inventory.style.backgroundColor = 'black'
    inventory.style.color = 'white'
    inventory.className = 'menu-item'

    const inventoryLable = document.createElement('h3');
    inventoryLable.textContent = 'Inventory';
    inventory.appendChild(inventoryLable);


    // Tạo phần 'Setting'
    const orders = document.createElement('div');
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

function ListProducts(){
    data = [
        {
            id: 1,//id cua product do
            image: '/img',
            name: 'T Shirt',
            quantity_sold:10
        },
        {
            id: 1,//id cua product do
            image: '/img',
            name: 'T Shirt',
            quantity_sold:10
        },
        {
            id: 1,//id cua product do
            image: '/img',
            name: 'T Shirt',
            quantity_sold:10
        },
        {
            id: 1,//id cua product do
            image: '/img',
            name: 'T Shirt',
            quantity_sold:10
        },
        {
            id: 1,//id cua product do
            image: '/img',
            name: 'T Shirt',
            quantity_sold:10
        },
       
    ]
    const products = document.createElement('div')
    products.className = 'products'

    data.forEach(item =>{
        const product = document.createElement('div')
        product.className = 'product'

        const imageAndName = document.createElement('div')
        imageAndName.className = 'image-name'
        
        const image = document.createElement('img')
        image.src = item['image']

        const name = document.createElement('p')
        name.textContent = item['name']

        imageAndName.appendChild(image)
        imageAndName.appendChild(name)

        const quantitySold = document.createElement('p')
        quantitySold.textContent = item['quantity_sold']

        const btnWrapper = document.createElement('div')
        btnWrapper.className = 'btn-wrapper'

        const btnDetail = document.createElement('span')
        btnDetail.textContent = 'Detail'
        btnDetail.className = 'btn-detail'

        const btnPauseSale = document.createElement('span')
        btnPauseSale.textContent = 'Pause Sale'
        btnPauseSale.className = 'btn-pause-sale'

        btnWrapper.appendChild(btnDetail)
        btnWrapper.appendChild(btnPauseSale)

        product.appendChild(imageAndName)
        product.appendChild(quantitySold)
        product.appendChild(btnWrapper)

        const btnAdd = document.createElement('span')
        btnAdd.textContent = 'Add'
        btnAdd.className = 'btn-add'

        products.appendChild(btnAdd)
        products.appendChild(product)
    })
    return products;
}

function init(){
    const managementWrapper = document.querySelector('.management-wrapper')

    const menu = Menu()
    const products = ListProducts()
    managementWrapper.appendChild(menu)
    managementWrapper.appendChild(products)
}

init()