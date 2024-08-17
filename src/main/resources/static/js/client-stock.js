function loadClientStock() {
    fetch('/api/product/client-stock')
        .then((respone) => respone.json())
        .then((data) => {
            // console.log(data)
            rederClientStock(data)
        })
}
function rederClientStock(data) {
    data.forEach(element => {

        
        let item = document.createElement('div')
        item.className = "item"
        
        let productId = document.createElement('p')
        productId.textContent = element["productId"]
        productId.style.display = 'none'
        productId.className = 'productId'
        
        let image = document.createElement('img')
        image.className = "image"
        image.src = element["imagePath"]

        let name = document.createElement('a')
        name.className = "product-name"
        name.href = '/product-detail/' + element['productId'];
        name.innerHTML = element['name']

        let quantity = document.createElement('div')
        quantity.innerHTML = element["quantity"]
        quantity.className = 'quantity'

        let price = document.createElement('p')
        price.className = 'price'
        price.textContent = element['price']

        let detail = document.createElement('span')
        detail.className = 'btn'
        detail.innerHTML = `
            <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11 4H7.2C6.0799 4 5.51984 4 5.09202 4.21799C4.71569 4.40974 4.40973 4.7157 4.21799 5.09202C4 5.51985 4 6.0799 4 7.2V16.8C4 17.9201 4 18.4802 4.21799 18.908C4.40973 19.2843 4.71569 19.5903 5.09202 19.782C5.51984 20 6.0799 20 7.2 20H16.8C17.9201 20 18.4802 20 18.908 19.782C19.2843 19.5903 19.5903 19.2843 19.782 18.908C20 18.4802 20 17.9201 20 16.8V12.5M15.5 5.5L18.3284 8.32843M10.7627 10.2373L17.411 3.58902C18.192 2.80797 19.4584 2.80797 20.2394 3.58902C21.0205 4.37007 21.0205 5.6364 20.2394 6.41745L13.3774 13.2794C12.6158 14.0411 12.235 14.4219 11.8012 14.7247C11.4162 14.9936 11.0009 15.2162 10.564 15.3882C10.0717 15.582 9.54378 15.6885 8.48793 15.9016L8 16L8.04745 15.6678C8.21536 14.4925 8.29932 13.9048 8.49029 13.3561C8.65975 12.8692 8.89125 12.4063 9.17906 11.9786C9.50341 11.4966 9.92319 11.0768 10.7627 10.2373Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Thay đổi thông tin`

        detail.onclick = ()=>{
            window.location.href = '/store-owner/edit-product/'+element['productId']
        }

        let btnDelete = document.createElement('div')
        btnDelete.className = "btn";
        let svgDelete = document.createElement('img')
        svgDelete.src = "/assets/delete-svgrepo-com.svg"
        let text = document.createElement('p')
        console.log(element)
        if(element['isDeleted'] === true)
            text.innerHTML = 'Bán lại';
        else 
            text.innerHTML = 'Ngừng kinh doanh';
        btnDelete.appendChild(svgDelete)
        btnDelete.appendChild(text)
        
        btnDelete.onclick = ()=>{
            if(element["isDeleted"] === false){
                let confirm = window.confirm('Bạn chắc chắn muốn ngừng kinh doanh sản phẩm');
                if(!confirm) return;
            }
            let url = ""
            let method = ""
            if(element["isDeleted"] === true){
                url = `/api/product/resell/${element['productId']}`
                method = "POST"
            }
            else{
                url = `/api/product/delete/${element['productId']}`
                method = "DELETE"
            } 

            fetch(url,{
                method:method,
            })
            .then(async response => {
                if(response.ok){
                    if(element["isDeleted"] === true) text.innerHTML = 'Ngừng kinh doanh'
                    else text.innerHTML = 'Bán lại'
                }
            })
            
        }
        item.appendChild(productId)
        item.appendChild(image)
        item.appendChild(name)
        item.appendChild(quantity)
        item.appendChild(price)
        item.appendChild(detail)
        item.appendChild(btnDelete)
        listItem.appendChild(item)//CÁI NÀY TRONG HTML LÀ ID
    });
}
// const items = listItem.querySelectorAll('.item')
// listItem.innerHTML = ''
// for(let i = 0; i< items.length ; i++){
//     if(items[i].querySelector('.productId').textContent === element['productId']){
//         console.log(items[i])
//     }
//     else listItem.appendChild(items[i])
// }
loadClientStock() 

const btnAddProduct = document.querySelector('.btn-add');
btnAddProduct.addEventListener('click',()=>{
    window.location.href = '/store-owner/add-product';
})