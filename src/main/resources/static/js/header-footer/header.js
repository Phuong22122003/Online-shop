
function createHeader(){
    const header = document.getElementById('header')
    header.className = 'header'
    const name = document.createElement('h1')
    name.textContent = 'Shopping'

    const navigationBar = document.createElement('div')
    navigationBar.className = 'navigation'

    const home = document.createElement('p')
    home.className = 'item'
    home.textContent = 'Home'
    home.addEventListener('click',()=>{
        window.location.href = '/home'
    })
    const shop = document.createElement('div')
    shop.id = 'shop'
    shop.textContent = 'Shop ⌵'
    shop.className = 'item'
    shop.style.position = 'relative'
    const ourStory = document.createElement('p')
    ourStory.textContent = 'Our story'
    ourStory.className = 'item'

    const blog = document.createElement('p')
    blog.textContent = 'Blog'
    blog.className = 'item'

    const contactUs = document.createElement('p')
    contactUs.textContent = 'Contact Us'
    contactUs.className = 'item'

    const searchWrapper = document.createElement('div')
    searchWrapper.className = 'search-wrapper'
    const searchInput = document.createElement('input')
    
    const magnifier = document.createElement('img')
    magnifier.className = 'magnifier'
    magnifier.src = '/assets/magnifier-svgrepo-com.svg'

    magnifier.onclick = ()=>{
        const key = searchInput.value;
        if(key === '') return;
        window.location.href = `/search?key=${key}`
    }
    

    searchWrapper.appendChild(searchInput)
    searchWrapper.appendChild(magnifier)

    const userWrapper = document.createElement('div')
    userWrapper.className = 'user-wrapper'
    const notification = document.createElement('img')
    notification.className = 'notification'
    notification.src = '/assets/ring-bell.svg'
    
    const profile = document.createElement('img')
    profile.className = 'profile'
    profile.src = '/assets/profile.svg'
    profile.addEventListener('click',()=>{
        window.location.href = "/profile"
    })

    const loginBtn = document.createElement('span')
    loginBtn.textContent='login'
    loginBtn.className = 'login-btn'
    loginBtn.onclick = ()=>{
        window.location.href = '/login';
    }

    userWrapper.appendChild(notification)
    userWrapper.appendChild(profile)
    userWrapper.appendChild(loginBtn)

    navigationBar.appendChild(home)
    navigationBar.appendChild(shop)
    navigationBar.appendChild(ourStory)
    navigationBar.appendChild(blog)

    header.appendChild(name)
    header.appendChild(navigationBar)
    header.appendChild(searchWrapper)
    header.appendChild(userWrapper)
}
function createCategoriesPanel(data){
    const panel = document.createElement('div')
    panel.className = 'categories-panel'
    data.forEach(category => {
        // console.log(category)
        const mainCategory = document.createElement('div')
        mainCategory.className = 'main-category'
        let name = document.createElement('h3')
        name.textContent = category['name']
        mainCategory.appendChild(name)
        category['subCategories'].forEach(item => {
            const subCategory = document.createElement('p')
            subCategory.className = 'sub-category'
            subCategory.textContent = item['name'];
            subCategory.onclick = ()=>{
                window.location.href = '/category/' + item['id']
            }
            mainCategory.appendChild(subCategory)
        });
        panel.appendChild(mainCategory)
    });
    const shop = document.getElementById('shop')
    shop.appendChild(panel)
}

function createNotification(data){
    let notification = document.createElement('div')
    notification.className = 'notification';
    let header = document.createElement('div')
    header.className = 'item'
    header.textContent = 'Notifications'
    notification.appendChild(header)
    data.forEach(message => {
        let item = document.createElement('div')
        item.className = 'item'
        item.textContent = message
        item.addEventListener('click',()=>{
            window.location.href = '/order-details';
        })
        let dot = document.createElement('img')
        dot.src = '/assets/dot.svg'
        item.appendChild(dot)
        notification.appendChild(item)
    });
    document.querySelector('.notification-wrapper').append(notification)
    return notification;
}


function init(){
    function getCategories(){
        fetch('/api/v1/categories/all')
        .then(response=> response.json())
        .then(data=>{
            // console.log(data)
            createCategoriesPanel(data)
        })
    }
    createHeader()
    getCategories()
}
init()