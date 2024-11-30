
export class Product {
    /**
        data = 
        {
            products:[
                {
                    productId: 1, int
                    imagePath: '\...', string
                    name: '...', string
                    price: 000, float
                    colors: ['...'], list<string>
                    sizes: ['...'], list<string>
                    price: [1,2,..], list<int>
                },
            ],
            sizes: [
                {
                    size: '', string
                    numOfProducts: 10,int
                },
            ],
            colors: [
                {
                    color: '', string
                    numOfProducts: 10, int
                },
            ],
            prices: [
                {   
                    min: 10000,
                    numOfProducts:10,
                    max: 20000,
                },
                {
                    min: 20000,
                    numOfProducts:10,
                    max: 50000,
                },
                {
                    min: 50000,
                    numOfProducts:10,
                    max: null,
                }
            ]

        }
    */
    constructor(data) {
        // this.data = data;
        this.data = this.getDataSample();
        this.checkedColors = [];
        this.checkedSizes = [];
        this.checkedPrices = [];
        this.filterProductWrapper = document.createElement('div');
        this.filterProductWrapper.className = 'filter-product-wrapper'
        this.products = this.createProducts();
        this.filter = this.createFilter();
        this.filterProductWrapper.appendChild(this.filter);
        this.filterProductWrapper.appendChild(this.products);
    }
    getDataSample(){
        let data = {
            products:[
                {
                    productId: 1,
                    imagePath: '\img.jpg',
                    name: 'Áo',
                    price: 1000, 
                    colors: ['Xanh','Đỏ','Tím','Vàng'],
                    sizes: ['X','XL','XXL'],
                    price: [100000,20000,30000],
                },
            ],
            sizes: [
                {
                    size: 'X',
                    numOfProducts: 10,
                },
                {
                    size: 'XL',
                    numOfProducts: 10,
                },
                {
                    size: 'XLL',
                    numOfProducts: 10,
                },
            ],
            colors: [
                {
                    color: 'Xanh',
                    numOfProducts: 10,
                },
                {
                    color: 'Đỏ',
                    numOfProducts: 10,
                },
                {
                    color: 'Tím',
                    numOfProducts: 10,
                },
                {
                    color: 'Vàng',
                    numOfProducts: 10,
                },
            ],
            prices: [
                {   
                    min: 10000,
                    numOfProducts:10,
                    max: 20000,
                },
                {
                    min: 20000,
                    numOfProducts:10,
                    max: 50000,
                },
                {
                    min: 50000,
                    numOfProducts:10,
                    max: null,
                }
            ]

        }
        return data;
    }
    createProducts(){
        const products = document.createElement('div');
        products.className = 'product-for-search-wrapper';
        if(this.data.products.length == 0 )
        {
            products.innerHTML = "Không tìm thấy sản phẩm"
            return;
        }
        this.data.products.forEach(item=>{
            const product = document.createElement('div')
            product.onclick = ()=>{
                window.location.href = `/product?id=${item['id']}`
            }
            product.className = 'product-for-search'
            const image = document.createElement('img')
            image.src = item['imagePath']
            image.className = 'image-for-search'
            const name = document.createElement('p')
            name.textContent = item['name']
            const price = document.createElement('p')
            price.textContent = item.price[0] + '- ' + item.price[item.price.length-1];

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
        return products;
    }
    createFilter(){
        const filter = document.createElement('div');
        filter.className = 'filter';
        const colors =this.createColorFilter();
        const sizes = this.createSizeFilter();
        const prices = this.createPriceFilter();
        filter.appendChild(colors);
        filter.appendChild(sizes);
        filter.appendChild(prices);
        return filter;
    }
    createColorFilter(){
        const colors = document.createElement('div');
        const color_name = document.createElement('h2')
        color_name.textContent = 'Colors'
        colors.appendChild(color_name);

        for(let i = 0;i< this.data.colors.length;i++){
            let colorData = this.data.colors[i];
            const color = document.createElement('input');
            color.type = 'checkbox';
            color.value = colorData.color;

            const lable = document.createElement('lable');
            lable.textContent =` ${colorData.color} (${colorData.numOfProducts})`;
            const checkBoxContainer = document.createElement('div')

            checkBoxContainer.appendChild(color)
            checkBoxContainer.appendChild(lable)
            colors.appendChild(checkBoxContainer)
        }
        return colors;
    }
    createSizeFilter(){
        const sizes = document.createElement('div');
        sizes.className = 'filter-item';
        const size_name = document.createElement('h2');
        size_name.textContent = 'Sizes';
        sizes.appendChild(size_name);
        for(let i =0;i< this.data.sizes.length;i++){
            let sizeData = this.data.sizes[i];
            const size = document.createElement('input');
            size.type = 'checkbox';
            size.value = sizeData.size;
            
            const lable = document.createElement('lable');
            lable.textContent =` ${sizeData.size} (${sizeData.numOfProducts})`;

            const checkBoxContainer = document.createElement('div');
            checkBoxContainer.appendChild(size);
            checkBoxContainer.appendChild(lable);
            sizes.appendChild(checkBoxContainer);
        }
        return sizes;
    }

    createPriceFilter(){
        const prices = document.createElement('div');
        prices.className = 'filter-item';
        const price_name = document.createElement('h2');
        price_name.textContent = 'Sizes';
        prices.appendChild(price_name);
        for(let i =0;i< this.data.prices.length;i++){
            let priceData = this.data.prices[i];
            const price = document.createElement('input');
            price.type = 'checkbox';
            price.value = priceData.min;
            
            const lable = document.createElement('lable');
            lable.textContent =` ${priceData.min} - ${priceData.max||'+'} (${priceData.numOfProducts})`;

            const checkBoxContainer = document.createElement('div');
            checkBoxContainer.appendChild(price);
            checkBoxContainer.appendChild(lable);
            prices.appendChild(checkBoxContainer);
        }
        return prices;
    }
    
    render() {
        return this.filterProductWrapper;
    }
}
