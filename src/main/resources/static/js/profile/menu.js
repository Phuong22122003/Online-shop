export  function Menu(){

    // Tạo phần 'Personal Information'
    const personalInfo  = document.createElement('div');
    const personalInfoTag = document.createElement('h3');
    personalInfoTag.textContent = 'Personal Information';
    personalInfo.appendChild(personalInfoTag);

    // Tạo phần 'My Orders'
    const myOrders = document.createElement('div');
    const myOrdersTag = document.createElement('h3');
    myOrdersTag.textContent = 'My Orders';
    myOrders.appendChild(myOrdersTag);

    // Tạo phần 'Setting'
    const setting = document.createElement('div');
    const settingTag = document.createElement('h3');
    settingTag.textContent = 'Setting';
    setting.appendChild(settingTag);

    // Giả sử bạn có một phần tử cha để chứa các mục này
    const sidebar = document.createElement('div')
    sidebar.appendChild(personalInfo);
    sidebar.appendChild(myOrders);
    sidebar.appendChild(setting);

    const avatarAndName = document.createElement('div')
    const avatar = document.createElement('img')
    avatar.src = '/....'
    const name =document.createElement('h3')
    name.textContent = 'ABC'

    avatarAndName.appendChild(avatar)
    avatarAndName.appendChild(name)

    const menu = document.createElement('div')

    menu.appendChild(avatarAndName)
    menu.appendChild(sidebar)
                                  
    return menu;
}