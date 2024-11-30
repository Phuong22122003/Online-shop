function formatCurrency(number, locale = 'vi-VN', currency = 'VND') {
    return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(number);
}

function createFilter(sizesData,colorsData){
    let checkedSizes = new Set()
    let checkedColors = new Set()
    function filterProducts(){
        const products = document.querySelectorAll('.products .product')
        for(const product of products){
            let sizes = product.getAttribute('sizes')
            let colors = product.getAttribute('colors')
            sizes = JSON.parse(sizes);
            colors = JSON.parse(colors)
            if(checkedSizes.size === 0 && checkedColors.size === 0){
                product.style.display = 'inline-flex'
                continue;
            }
            
            product.style.display = 'none'
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
        const url = new URL(window.location.href);

        // Lấy phần pathname và chia nó theo dấu '/'
        const pathSegments = url.pathname.split('/');
        
        // Lấy phần tử cuối cùng
        const categoryId = pathSegments[pathSegments.length - 1];
        
        console.log(categoryId); // Kết quả sẽ là '1'
        
        fetch(`/api/v1/products/category/${categoryId}`)
        .then(response=> response.json())
        .then(data=> {
            console.log(data)
            createProducts(data['products']);
            createFilter(data['sizes'],data['colors']);
        })
    }
    findSearchData();
}
init()