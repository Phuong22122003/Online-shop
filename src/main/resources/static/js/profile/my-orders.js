function Menu(){

    // Tạo phần 'Personal Information'
    const personalInfo  = document.createElement('div');

    const personalInfoTag = document.createElement('h3');
    personalInfoTag.textContent = 'Personal Information';
    personalInfo.appendChild(personalInfoTag);
    personalInfo.className = 'sidebar-item'
    // Tạo phần 'My Orders'
    const myOrders = document.createElement('div');
    myOrders.style.backgroundColor = 'black'
    myOrders.style.color = 'white'
    const myOrdersTag = document.createElement('h3');
    myOrdersTag.textContent = 'My Orders';
    myOrders.appendChild(myOrdersTag);
    myOrders.className = 'sidebar-item'
    // Tạo phần 'Setting'
    const setting = document.createElement('div');
    const settingTag = document.createElement('h3');
    settingTag.textContent = 'Setting';
    setting.appendChild(settingTag);
    setting.className = 'sidebar-item'
    // Giả sử bạn có một phần tử cha để chứa các mục này
    const sidebar = document.createElement('div')
    sidebar.appendChild(personalInfo);
    sidebar.appendChild(myOrders);
    sidebar.appendChild(setting);

    const avatarAndName = document.createElement('div')
    avatarAndName.className = 'avatar-name'
    const avatar = document.createElement('img')
    avatar.src = '/....'
    const name =document.createElement('h3')
    name.textContent = 'Phuong Nguyen'

    avatarAndName.appendChild(avatar)
    avatarAndName.appendChild(name)

    const menu = document.createElement('div')
    menu.className = 'menu'

    menu.appendChild(avatarAndName)
    menu.appendChild(sidebar)
                                  
    return menu;
}
function MyOrders(data){
    data = [
        {
            id: 1,// id trong my orders/ purchase history
            image: '/img',
            name: 'T Shirt',
            size: 'S',
            quantity: 1,
            status: 'InProcess',
            total: 80000,
        },
        {
            id: 2,// id trong my orders/ purchase history
            image: '/img',
            name: 'T Shirt',
            size: 'S',
            quantity: 1,
            status: 'Delivered',
            total: 80000,
        },
        {
            id: 3,// id trong my orders/ purchase history
            image: '/img',
            name: 'T Shirt',
            size: 'S',
            color:'Red',
            quantity: 1,
            status: 'Delivered',
            total: 80000,
        },
        {
            id: 3,// id trong my orders/ purchase history
            image: '/img',
            name: 'T Shirt',
            size: 'S',
            color:'Red',
            quantity: 1,
            status: 'Delivered',
            total: 80000,
        },
        {
            id: 3,// id trong my orders/ purchase history
            image: '/img',
            name: 'T Shirt',
            size: 'S',
            color:'Red',
            quantity: 1,
            status: 'Delivered',
            total: 80000,
        },
        {
            id: 3,// id trong my orders/ purchase history
            image: '/img',
            name: 'T Shirt',
            size: 'S',
            color:'Red',
            quantity: 1,
            status: 'Delivered',
            total: 80000,
        },
    ]
    const myOrdersWrapper = document.createElement('div')
    myOrdersWrapper.className = 'orders-wrapper'

    data.forEach(item =>{
        const order = document.createElement('div')
        order.className = 'order'

        const detailWrapper = document.createElement('div')
        detailWrapper.className = 'detail-wrapper'
        const status =document.createElement('h4')
        status.textContent = item['status']

        const image = document.createElement('img')
        image.src = item['image']

        const nameSizeQuantityWrapper = document.createElement('div')
        const name = document.createElement('p')
        name.textContent = item['name']

        const size = document.createElement('p')
        size.textContent = item['size']

        const color = document.createElement('p')
        color.textContent = item['color']

        const quantity = document.createElement('p')
        quantity.textContent = item['quantity']

        nameSizeQuantityWrapper.appendChild(name)
        nameSizeQuantityWrapper.appendChild(size)
        nameSizeQuantityWrapper.appendChild(color)
        nameSizeQuantityWrapper.appendChild(quantity)

        const total = document.createElement('p')
        total.textContent = item['total']

        const btnWrapper = document.createElement('div')
        btnWrapper.className = 'btn-wrapper'

        const btnViewOrder = document.createElement('span')
        btnViewOrder.textContent = 'View Order'
        btnViewOrder.classList = 'btn-view-order'
        const btnCancelOrComment = document.createElement('span')

        if(item['status'].includes('Delivered')){
            btnCancelOrComment.textContent = 'Write a review'
            btnCancelOrComment.className = 'btn-comment'
        }
        else{
            btnCancelOrComment.textContent = 'Cancel Order'
            btnCancelOrComment.className = 'btn-cancel'
        }

        btnWrapper.appendChild(btnViewOrder)
        btnWrapper.appendChild(btnCancelOrComment)


        detailWrapper.appendChild(image)
        detailWrapper.appendChild(nameSizeQuantityWrapper)
        detailWrapper.appendChild(total)
        detailWrapper.appendChild(btnWrapper)

        order.appendChild(detailWrapper)
        order.appendChild(status)

        myOrdersWrapper.appendChild(order)
    })
    return myOrdersWrapper;
}
function init(){
    const menu = Menu()
    const myOrders = MyOrders()
    const profileWrapper = document.querySelector('.profile-wrapper')
    profileWrapper.appendChild(menu)
    profileWrapper.appendChild(myOrders)
}



init()