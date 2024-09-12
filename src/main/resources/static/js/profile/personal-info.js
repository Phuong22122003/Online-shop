function Menu(){

    // Tạo phần 'Personal Information'
    const personalInfo  = document.createElement('div');
    personalInfo.style.backgroundColor = 'black'
    personalInfo.style.color = 'white'
    const personalInfoTag = document.createElement('h3');
    personalInfoTag.textContent = 'Personal Information';
    personalInfo.appendChild(personalInfoTag);
    personalInfo.className = 'sidebar-item'
    // Tạo phần 'My Orders'
    const myOrders = document.createElement('div');
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


function Info(data){
    data = {
        firstname:'Robert',
        lastname:'fox',
        phone: '(252) 555-0126',
        email: 'abc@gmail.com',
        age: 18,
        gender: 'female'
    }
    const svg = document.createElement('div')
    svg.id ='edit-pen'
    svg.innerHTML = 
        `<svg  width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11 4H7.2C6.0799 4 5.51984 4 5.09202 4.21799C4.71569 4.40974 4.40973 4.7157 4.21799 5.09202C4 5.51985 4 6.0799 4 7.2V16.8C4 17.9201 4 18.4802 4.21799 18.908C4.40973 19.2843 4.71569 19.5903 5.09202 19.782C5.51984 20 6.0799 20 7.2 20H16.8C17.9201 20 18.4802 20 18.908 19.782C19.2843 19.5903 19.5903 19.2843 19.782 18.908C20 18.4802 20 17.9201 20 16.8V12.5M15.5 5.5L18.3284 8.32843M10.7627 10.2373L17.411 3.58902C18.192 2.80797 19.4584 2.80797 20.2394 3.58902C21.0205 4.37007 21.0205 5.6364 20.2394 6.41745L13.3774 13.2794C12.6158 14.0411 12.235 14.4219 11.8012 14.7247C11.4162 14.9936 11.0009 15.2162 10.564 15.3882C10.0717 15.582 9.54378 15.6885 8.48793 15.9016L8 16L8.04745 15.6678C8.21536 14.4925 8.29932 13.9048 8.49029 13.3561C8.65975 12.8692 8.89125 12.4063 9.17906 11.9786C9.50341 11.4966 9.92319 11.0768 10.7627 10.2373Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`
    svg.innerHTML += 'Edit'

    const infoPanel = document.createElement('div')
    infoPanel.className = 'info-panel'

    const firstname = document.createElement('input')
    firstname.placeholder = 'Firstname'

    const lastname = document.createElement('input')
    lastname.placeholder = 'Lastname'

    const phone = document.createElement('input')
    phone.placeholder = 'Phone'

    const email = document.createElement('input')
    email.type = 'email'
    email.placeholder = 'Email'

    const age = document.createElement('input')
    age.placeholder = 'Age'

    const gender = document.createElement('input')
    gender.placeholder = 'Gender'

    const btnSubmit = document.createElement('span')
    btnSubmit.className = 'btn-submit'
    btnSubmit.textContent = 'Update';
    
    infoPanel.appendChild(svg)
    infoPanel.appendChild(firstname)
    infoPanel.appendChild(lastname)
    infoPanel.appendChild(phone)
    infoPanel.appendChild(email)
    infoPanel.appendChild(age)
    infoPanel.appendChild(gender)

    svg.onclick = ()=>{
        infoPanel.appendChild(btnSubmit)   
    }

    return infoPanel;
}
function init(){
    const menu = Menu()
    const info = Info()
    const profileWrapper = document.querySelector('.profile-wrapper')
    profileWrapper.appendChild(menu)
    profileWrapper.appendChild(info)
}



init()