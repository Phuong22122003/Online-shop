function loadClientOrder(){
    fetch('/api/customer-order')
    .then((respone)=>respone.json())
    .then((data)=>{
       genderItem(data)
    })
}
function genderItem(data){
    const listItem = document.querySelector('.list-item')
    data.forEach(element=>{
        let item = document.createElement('div')
        item.className = 'item'
        let top = document.createElement('div')
        top.className = 'top'
        let img = document.createElement('img')
        img.className = "image";
        img.src = element['imagePath']
        let name = document.createElement('a')
        name.className = 'name'
        name.textContent = element['productName']
        name.href = '/product-detail/'+element['productId'];
        let quantity  = document.createElement('p')
        quantity.className = 'quantity'
        quantity.textContent = 'Số lượng: '+element['productQuantity']
        let price =document.createElement('p')
        price.className = 'price'
        price.textContent = 'Giá: ' + parseInt(element['productPrice']) * parseInt(element['productQuantity']) + 'vnđ'

        let status = document.createElement('p')
        if(element['status'].includes('SUCCESS'))
            status.textContent = 'Trạng thái: Thành công';
        else if(element['status'].includes('IN TRANSIT'))
            status.textContent = 'Trạng thái: Đang vận chuyển';
        else if(element['status'].includes('FAILED'))
            status.textContent = 'Trạng thái: Đã hủy';

        top.appendChild(img)
        top.appendChild(name)
        top.appendChild(status)
        top.appendChild(quantity)
        top.appendChild(price)

        let bottom = document.createElement('div')
        bottom.className = 'bottom'
        let address = document.createElement('p')
        address.className = 'address'
        address.textContent = element['address']
        let btnBuy  = document.createElement('span')
        btnBuy.textContent = 'Mua'
        btnBuy.className = 'btnBuy'
        btnBuy.addEventListener('click',()=>{
            window.location.href = '/product-detail/'+element['productId'];
        })

        bottom.appendChild(address)
        bottom.appendChild(btnBuy)

        item.appendChild(top)
        item.appendChild(bottom)
        let p = document.createElement('p')
        p.style.display = 'none'
        p.textContent = element['status']
        p.className = 'status'
        item.appendChild(p)
        listItem.appendChild(item)
    })
}

function swichByStatus(status){
    const listItem = document.querySelectorAll('.list-item .item')
    listItem.forEach(element=>{
        let statusElement = element.querySelector('.status')
        if(status === 'ALL') element.style.display = 'inline-flex'
        else if(statusElement.textContent.includes(status))
            element.style.display = 'inline-flex'
        else element.style.display = 'none'
    })
}
loadClientOrder()
const all = document.getElementById('all')
all.style.borderBottom = '2px solid rgb(235, 73, 9)'
const inTransit = document.getElementById('in-transit')
const success = document.getElementById('success')
const cancel = document.getElementById('cancel')
all.addEventListener('click',()=>{
    all.style.borderBottom = '2px solid rgb(235, 73, 9)'
    cancel.style.borderBottom = ''
    success.style.borderBottom = ''
    inTransit.style.borderBottom = ''
    swichByStatus('ALL')
})
inTransit.addEventListener('click',()=>{
    all.style.borderBottom = ''
    cancel.style.borderBottom = ''
    success.style.borderBottom = ''
    inTransit.style.borderBottom = '2px solid rgb(235, 73, 9)'
    swichByStatus('IN TRANSIT')
})
success.addEventListener('click',()=>{
    all.style.borderBottom = ''
    cancel.style.borderBottom = ''
    success.style.borderBottom = '2px solid rgb(235, 73, 9)'
    inTransit.style.borderBottom = ''
    swichByStatus('SUCCESS')
})
cancel.addEventListener('click',()=>{
    all.style.borderBottom = ''
    cancel.style.borderBottom = '2px solid rgb(235, 73, 9)'
    success.style.borderBottom = ''
    inTransit.style.borderBottom = ''
    swichByStatus('CANCEL')
})
const header = document.querySelector('.header')
header.addEventListener('click',()=>{
    window.location.href = '/home';
})