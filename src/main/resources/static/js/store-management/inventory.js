import { Menu } from "./menu.js"
function ListProducts(data){

    const products = document.createElement('div')
    products.className = 'products'

    data.forEach(item =>{
        const product = document.createElement('div')
        product.className = 'product'

        const imageAndName = document.createElement('div')
        imageAndName.className = 'image-name'
        
        const image = document.createElement('img')
        image.src = item['imagePath']
        image.style.maxWidth = '100px';
        image.style.maxHeight = '100px';
        image.style.width = '100px';
        image.style.height = '100px';

        const name = document.createElement('p')
        name.textContent = item['name']

        imageAndName.appendChild(image)
        imageAndName.appendChild(name)

        const soldQuantity = document.createElement('p')
        soldQuantity.textContent = item['soldQuantity']
        soldQuantity.className = 'sold-quantity';

        const remainingQuantity = document.createElement('p');
        remainingQuantity.textContent = item['remainingQuantity'];
        remainingQuantity.className = 'remaining-quantity';

        const btnWrapper = document.createElement('div')
        btnWrapper.className = 'btn-wrapper'

        const btnDetail = document.createElement('span')
        btnDetail.textContent = 'Detail'
        btnDetail.className = 'btn-detail'
        btnDetail.onclick = ()=>{
            window.location.href = `/admin/product-detail?id=${item['id']}`
        }

        const btnPauseSale = document.createElement('span')
        btnPauseSale.textContent = 'Pause Sale'
        btnPauseSale.className = 'btn-pause-sale'

        btnWrapper.appendChild(btnDetail)
        btnWrapper.appendChild(btnPauseSale)

        product.appendChild(imageAndName)
        product.appendChild(soldQuantity)
        product.appendChild(remainingQuantity)
        product.appendChild(btnWrapper)

        const btnAdd = document.createElement('span')
        btnAdd.textContent = 'Add'
        btnAdd.className = 'btn-add'

        products.appendChild(btnAdd)
        products.appendChild(product)
    })
    return products;
}

async function init(){
    function getInventoryData(){
        const response = fetch('/api/v1/admin/inventory').then(response=> response.json())
        return response;
    }
    const data = await getInventoryData();
    console.log(data)
    const managementWrapper = document.querySelector('.management-wrapper')
    const menu = Menu()
    const products =  ListProducts(data)
    
    managementWrapper.appendChild(menu)
    managementWrapper.appendChild(products)
}

init()