import {Menu} from "./menu.js"
function Setting(){
    const setting = document.createElement('div')
    setting.className = 'setting'
    const emailNotification = document.createElement('div')
    emailNotification.className = 'setting-item'

    const emailTextWrapper = document.createElement('div')
    const emailNotificationText = document.createElement('h3')
    emailNotificationText.textContent = 'Email Notifications'
    const emailDescript = document.createElement('p')
    emailDescript.textContent = 'Nhận email thông báo.'

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
    changePasswordDesc.textContent = 'Đổi mật khẩu';
    changePasswordTextWrapper.appendChild(changePasswordText)
    changePasswordTextWrapper.appendChild(changePasswordDesc)

    const btnChangePass = document.createElement('span')
    btnChangePass.textContent = 'Đổi mật khẩu'
    btnChangePass.className = 'btn'
    changePassword.appendChild(changePasswordTextWrapper)
    changePassword.appendChild(btnChangePass)

    const deleteAccount  = document.createElement('div')
    deleteAccount.className = 'setting-item'


    const deleteAccountTextWrapper = document.createElement('div')

    const deleteAccountText = document.createElement('h3')
    deleteAccountText.textContent = 'Delete Account'
    const deleteAccountDesc = document.createElement('p')
    deleteAccountDesc.textContent = 'Xóa tài khoảng.'
    
    deleteAccountTextWrapper.appendChild(deleteAccountText)
    deleteAccountTextWrapper.appendChild(deleteAccountDesc)

    const btnDeleteAccount = document.createElement('span')
    btnDeleteAccount.textContent = 'Xóa tài khoảng'
    btnDeleteAccount.className = 'btn'

    deleteAccount.appendChild(deleteAccountTextWrapper)
    deleteAccount.appendChild(btnDeleteAccount)
    
    const logout = document.createElement('span')
    logout.className = 'btn'
    logout.textContent = 'Log out'
    logout.onclick = ()=>{window.location.href = '/logout'}
    setting.appendChild(emailNotification)
    setting.appendChild(changePassword)
    setting.appendChild(deleteAccount)
    setting.appendChild(logout)
    return setting
}
function init(){
    const menu = Menu('setting')
    const setting = Setting()
    const profileWrapper = document.querySelector('.profile-wrapper')
    profileWrapper.appendChild(menu)
    profileWrapper.appendChild(setting)
}



init()