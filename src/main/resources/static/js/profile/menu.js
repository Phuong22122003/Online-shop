export function Menu(selected){
    // Tạo phần 'Personal Information'
    const personalInfo  = document.createElement('div');

    const personalInfoTag = document.createElement('h3');
    personalInfoTag.textContent = 'Thông tin';
    personalInfo.appendChild(personalInfoTag);
    personalInfo.className = 'sidebar-item'
    if(selected === 'personal-info'){
        personalInfo.style.backgroundColor = 'black'
        personalInfo.style.color = 'white'
    }
    else 
        personalInfo.onclick = ()=>window.location.href = '/profile/info'
    // Tạo phần 'My Orders'
    const myOrders = document.createElement('div');

    const myOrdersTag = document.createElement('h3');
    myOrdersTag.textContent = 'Đơn mua';
    myOrders.appendChild(myOrdersTag);
    myOrders.className = 'sidebar-item'
    if(selected === 'my-orders'){
        myOrders.style.backgroundColor = 'black'
        myOrders.style.color = 'white'
    }
    else 
        myOrders.onclick = ()=>window.location.href = '/profile/orders'

    const cart = document.createElement('div')
    cart.className = 'sidebar-item'
    const cartTag = document.createElement('h3')
    cartTag.textContent = 'Giỏ hàng';
    cart.appendChild(cartTag)
    if(selected === 'cart'){
        cart.style.backgroundColor = 'black';
        cart.style.color = 'white';
    }
    else
        cart.onclick = ()=> window.location.href = '/cart'

    // Tạo phần 'Setting'
    const setting = document.createElement('div');

    const settingTag = document.createElement('h3');
    settingTag.textContent = 'Cài đặt';
    setting.appendChild(settingTag);
    setting.className = 'sidebar-item';
    if(selected ==='setting'){
        setting.style.backgroundColor = 'black'
        setting.style.color = 'white'
    }
    else 
        setting.onclick =()=>window.location.href = '/profile/setting'

    // Giả sử bạn có một phần tử cha để chứa các mục này
    const sidebar = document.createElement('div')
    sidebar.appendChild(personalInfo);
    sidebar.appendChild(myOrders);
    sidebar.appendChild(cart);
    sidebar.appendChild(setting);

    const avatarAndName = document.createElement('div')
    avatarAndName.className = 'avatar-name'
    const avatar = document.createElement('img')
    avatar.src = '/assets/profile.svg'
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