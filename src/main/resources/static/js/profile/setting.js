function Menu(){

    // Tạo phần 'Personal Information'
    const personalInfo  = document.createElement('div');

    const personalInfoTag = document.createElement('h3');
    personalInfoTag.textContent = 'Personal Information';
    personalInfo.appendChild(personalInfoTag);
    personalInfo.className = 'sidebar-item'
    personalInfo.onclick = ()=>window.location.href = '/profile/info'
    // Tạo phần 'My Orders'
    const myOrders = document.createElement('div');

    const myOrdersTag = document.createElement('h3');
    myOrdersTag.textContent = 'My Orders';
    myOrders.appendChild(myOrdersTag);
    myOrders.className = 'sidebar-item'
    myOrders.onclick = ()=>window.location.href = '/profile/orders'
    // Tạo phần 'Setting'
    const setting = document.createElement('div');
    setting.style.backgroundColor = 'black'
    setting.style.color = 'white'
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

function Setting(){
    const setting = document.createElement('div')
    setting.className = 'setting'
    const emailNotification = document.createElement('div')
    emailNotification.className = 'setting-item'

    const emailTextWrapper = document.createElement('div')
    const emailNotificationText = document.createElement('h3')
    emailNotificationText.textContent = 'Email Notifications'
    const emailDescript = document.createElement('p')
    emailDescript.textContent = 'Receive email notification'

    emailTextWrapper.appendChild(emailNotificationText)
    emailTextWrapper.appendChild(emailDescript)
    emailNotification.appendChild(emailTextWrapper)

    emailNotification.innerHTML += 
                `<label class="switch">
                    <input type="checkbox" checked>
                    <span class="slider round"></span>
                </label>` 

    const changePassword = document.createElement('div')
    changePassword.className = 'setting-item'

    const changePasswordTextWrapper = document.createElement('div')
    const changePasswordText = document.createElement('h3')
    changePasswordText.innerHTML = 'Change Password'
    const changePasswordDesc = document.createElement('p')
    changePasswordDesc.textContent = 'Change your password by email'
    changePasswordTextWrapper.appendChild(changePasswordText)
    changePasswordTextWrapper.appendChild(changePasswordDesc)

    const btnChangePass = document.createElement('span')
    btnChangePass.textContent = 'Change Password'
    btnChangePass.className = 'btn'
    changePassword.appendChild(changePasswordTextWrapper)
    changePassword.appendChild(btnChangePass)

    const deleteAccount  = document.createElement('div')
    deleteAccount.className = 'setting-item'


    const deleteAccountTextWrapper = document.createElement('div')

    const deleteAccountText = document.createElement('h3')
    deleteAccountText.textContent = 'Delete Account'
    const deleteAccountDesc = document.createElement('p')
    deleteAccountDesc.textContent = 'Your account will be delete permanently'
    
    deleteAccountTextWrapper.appendChild(deleteAccountText)
    deleteAccountTextWrapper.appendChild(deleteAccountDesc)

    const btnDeleteAccount = document.createElement('span')
    btnDeleteAccount.textContent = 'Delete account'
    btnDeleteAccount.className = 'btn'

    deleteAccount.appendChild(deleteAccountTextWrapper)
    deleteAccount.appendChild(btnDeleteAccount)
    
    const logout = document.createElement('span')
    logout.className = 'btn'
    logout.textContent = 'Log out'

    setting.appendChild(emailNotification)
    setting.appendChild(changePassword)
    setting.appendChild(deleteAccount)
    setting.appendChild(logout)
    return setting
}
function init(){
    const menu = Menu()
    const setting = Setting()
    const profileWrapper = document.querySelector('.profile-wrapper')
    profileWrapper.appendChild(menu)
    profileWrapper.appendChild(setting)
}



init()