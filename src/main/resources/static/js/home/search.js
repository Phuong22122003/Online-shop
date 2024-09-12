function createFilter(categoriesData,sizesData,colorsData){
    let checkedCategories = []
    let checkedSizes = []
    let checkedColors = []
    function filterProducts(){
        const products = document.querySelectorAll('.products .product')
        products.forEach(product =>{
            let categoryId = product.getAttribute('categoryId')
            let sizeIds = product.getAttribute('colorIds')
            let colorsIds = product.getAttribute('colorIds')
            if(checkedCategories.length === 0&& checkedSizes.length === 0 && checkedColors.length === 0){
                product.style.display = 'inline-flex'
                return;
            }
            
            product.style.display = 'none'
            if(checkedCategories.includes(categoryId)){
                product.style.display = 'inline-flex'
                return;
            }
            if(checkedSizes.some(sizeId => sizeIds.includes(sizeId))){
                product.style.display = 'inline-flex'
                return;
            }
            if(checkedColors.some(colorId=>colorsIds.includes(colorId))){
                product.style.display = 'inline-flex'
                return;
            }
            
        })
    }
    const filter = document.querySelector('.filter')

    const categories = document.createElement('div')
    categories.className = 'filter-item'

    const categories_name = document.createElement('h2')
    categories_name.textContent = 'Categories'

    categories.appendChild(categories_name)

    categoriesData.forEach(item=>{
        const category = document.createElement('input')
        category.type = 'checkbox'
        category.value = item['id'];
        category.onchange = ()=>{
            if(category.checked){
                checkedCategories.push(category.value)
            }
            else {
                checkedCategories = checkedCategories.filter(id=> id!=category.value)
            }
            filterProducts()
        }
        const lable = document.createElement('lable')
        lable.textContent = item['name']

        const checkBoxContainer = document.createElement('div')

        checkBoxContainer.appendChild(category)
        checkBoxContainer.appendChild(lable)
        categories.appendChild(checkBoxContainer)
    }) 
    const colors = document.createElement('div')
    colors.className = 'filter-item'
    const colors_name = document.createElement('h2')
    colors_name.textContent = 'Colors'
    colors.appendChild(colors_name)
    console.log(colorsData)
    colorsData.forEach(item=>{
        const color = document.createElement('input')
        color.type = 'checkbox'
        color.value = item['id'];
        
        color.onchange = ()=>{
            if(color.checked){
                checkedColors.push(color.value)
            }
            else {
                checkedColors = checkedColors.filter(id=> id!=color.value)
            }
            filterProducts()
        }

        const lable = document.createElement('lable')
        lable.textContent = item['color']
        const checkBoxContainer = document.createElement('div')

        checkBoxContainer.appendChild(color)
        checkBoxContainer.appendChild(lable)
        colors.appendChild(checkBoxContainer)
    }) 
    const sizes = document.createElement('div')
    sizes.className = 'filter-item'
    const sizes_name = document.createElement('h2')
    sizes_name.textContent = 'Sizes'
    sizes.appendChild(sizes_name)
    sizesData.forEach(item=>{
        const size = document.createElement('input')
        size.type = 'checkbox'
        size.value = item['id'];

        size.onchange = ()=>{
            if(size.checked){
                checkedSizes.push(size.value)
            }
            else {
                checkedSizes = checkedSizes.filter(id=> id!=size.value)
            }
            filterProducts()
        }
        const lable = document.createElement('lable')
        lable.textContent = item['size']
        const checkBoxContainer = document.createElement('div')

        checkBoxContainer.appendChild(size)
        checkBoxContainer.appendChild(lable)
        sizes.appendChild(checkBoxContainer)
    }) 
    filter.appendChild(categories)
    filter.appendChild(colors)
    filter.appendChild(sizes)


}

function createProducts(productsData){
    const products = document.querySelector('.products')
    console.log(productsData)
    if(productsData.length == 0 )
    {
        products.innerHTML = "Không tìm thấy sản phẩm"
        return;
    }
    productsData.forEach(item=>{
        const product = document.createElement('div')
        product.onclick = ()=>{
            window.location.href = `/products?id=${item['id']}`
        }
        product.className = 'product'
        const image = document.createElement('img')
        image.src = item['imagePath']
        image.className = 'image'
        const name = document.createElement('p')
        name.textContent = item['name']
        const price = document.createElement('p')
        price.textContent = item['price']

        product.setAttribute('productId',item['id'])
        product.setAttribute('categoryId',item['categoryId'])
        product.setAttribute('sizeIds',item['sizes'])
        product.setAttribute('colorIds',item['colors'])


        product.appendChild(image)
        product.appendChild(name)
        product.appendChild(price)
        products.appendChild(product)
    })
}

function init(){
    function findSearchData(){
        // Lấy URL hiện tại
        const urlParams = new URLSearchParams(window.location.search);
        
        // Lấy giá trị của tham số 'key'
        const key = urlParams.get('key');
        
        console.log(key); // In ra giá trị của 'key', trong trường hợp này là 'xo'
        fetch(`/api/v1/products/search?key=${key}`)
        .then(response=> response.json())
        .then(data=> {
            createProducts(data['products']);
            createFilter(data['categories'],data['sizes'],data['colors']);
        })
    }
    findSearchData();
}
init()

li = [1,2,3]
console.log(li.some(id => [5,5].includes(id)))