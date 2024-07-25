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
        detail.className = 'detail'
        detail.innerHTML = `
           <?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
            <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M4.87617 3.75H19.1238L21 8.86683V10.5C21 11.2516 20.7177 11.9465 20.25 12.4667V21H3.75V12.4667C3.28234 11.9465 3 11.2516 3 10.5V8.86683L4.87617 3.75ZM18.1875 13.3929C18.3807 13.3929 18.5688 13.3731 18.75 13.3355V19.5H15V15H9L9 19.5H5.25V13.3355C5.43122 13.3731 5.61926 13.3929 5.8125 13.3929C6.63629 13.3929 7.36559 13.0334 7.875 12.4667C8.38441 13.0334 9.11371 13.3929 9.9375 13.3929C10.7613 13.3929 11.4906 13.0334 12 12.4667C12.5094 13.0334 13.2387 13.3929 14.0625 13.3929C14.8863 13.3929 15.6156 13.0334 16.125 12.4667C16.6344 13.0334 17.3637 13.3929 18.1875 13.3929ZM10.5 19.5H13.5V16.5H10.5L10.5 19.5ZM19.5 9.75V10.5C19.5 11.2965 18.8856 11.8929 18.1875 11.8929C17.4894 11.8929 16.875 11.2965 16.875 10.5V9.75H19.5ZM19.1762 8.25L18.0762 5.25H5.92383L4.82383 8.25H19.1762ZM4.5 9.75V10.5C4.5 11.2965 5.11439 11.8929 5.8125 11.8929C6.51061 11.8929 7.125 11.2965 7.125 10.5V9.75H4.5ZM8.625 9.75V10.5C8.625 11.2965 9.23939 11.8929 9.9375 11.8929C10.6356 11.8929 11.25 11.2965 11.25 10.5V9.75H8.625ZM12.75 9.75V10.5C12.75 11.2965 13.3644 11.8929 14.0625 11.8929C14.7606 11.8929 15.375 11.2965 15.375 10.5V9.75H12.75Z" fill="#080341"/>
            </svg>
            Xem chi tiết`

        detail.onclick = ()=>{
            window.location.href = '/store-owner/edit-product/'+element['productId']
        }

        
        item.appendChild(image)
        item.appendChild(name)
        item.appendChild(quantity)
        item.appendChild(price)
        item.appendChild(detail)
        listItem.appendChild(item)
    });
}
loadClientStock() 

const btnAddProduct = document.querySelector('.btn-add');
btnAddProduct.addEventListener('click',()=>{
    window.location.href = '/store-owner/add-product';
})