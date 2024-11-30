function formatCurrency(number, locale = 'vi-VN', currency = 'VND') {
    return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(number);
}
function createFilter(categoriesData,sizesData,colorsData){
    let checkedCategories = []
    let checkedSizes = new Set()
    let checkedColors = new Set()
    function filterProducts(){
        const products = document.querySelectorAll('.products .product')
        for(const product of products){
            let categoryId = product.getAttribute('categoryId')
            let sizes = product.getAttribute('sizes')
            let colors = product.getAttribute('colors')
            sizes = JSON.parse(sizes);
            colors = JSON.parse(colors)
            if(checkedCategories.length === 0&& checkedSizes.size === 0 && checkedColors.size === 0){
                product.style.display = 'inline-flex'
                continue;
            }
            
            product.style.display = 'none'
            if(checkedCategories.includes(categoryId)){
                product.style.display = 'inline-flex'
                continue;
            }
            if(colors.some(color=>checkedColors.has(color))){
                product.style.display = 'inline-flex'
                continue;
            }
            if(sizes.some(size => checkedSizes.has(size))){
                product.style.display = 'inline-flex'
                continue;
            }
            
        }
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
    Object.keys(colorsData).forEach(key=>{
        const color = document.createElement('input')
        color.type = 'checkbox'
        color.value = key;
        
        color.onchange = ()=>{
            if(color.checked){
                checkedColors.add(color.value);
            }
            else {
                checkedColors.delete(color.value);
            }
            filterProducts()
        }

        const lable = document.createElement('lable')
        lable.textContent =` ${key} (${colorsData[key]})`;
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
    Object.keys(sizesData).forEach(key=>{
        const size = document.createElement('input')
        size.type = 'checkbox'
        size.value = key;

        size.onchange = ()=>{
            if(size.checked){
                checkedSizes.add(size.value);
            }
            else {
                checkedSizes.delete(size.value);
            }
            filterProducts()
        }
        const lable = document.createElement('lable')
        lable.textContent =` ${key} (${sizesData[key]})`;
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
            window.location.href = `/product?id=${item['id']}`
        }
        product.className = 'product'
        const image = document.createElement('img')
        image.src = item['imagePath']
        image.className = 'image'
        const name = document.createElement('p')
        name.textContent = item['name']
        const price = document.createElement('p')
        price.textContent = formatCurrency(item['price'])

        product.setAttribute('productId',item['id'])
        product.setAttribute('categoryId',item['categoryId'])
        const sizesJson = JSON.stringify(item['sizes'])
        const colorsJson = JSON.stringify(item['colors'])

        product.setAttribute('sizes',sizesJson)
        product.setAttribute('colors',colorsJson)


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
        let url = window.location.href;
        console.log(url)
        if(url.includes('search-by-des')){
            const des = urlParams.get('des');
            url = `/api/v1/products/search-by-des?des=${des}`
        }
        else {
            const key = urlParams.get('key');
            url = `/api/v1/products/search?key=${key}`
        }

        fetch(url)
        .then(response=> response.json())
        .then(data=> {
            console.log(data)
            createProducts(data['products']);
            createFilter(data['categories'],data['sizes'],data['colors']);
        })
    }
    findSearchData();
}
init()
