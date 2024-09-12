function genderDetails(data){

    function checkedSize(sizeId){
        const sizes = document.querySelectorAll('#sizes .size')
        sizes.forEach(size=>{
            if(size.getAttribute('sizeId') == sizeId ){
                size.setAttribute('checked','true')
                size.style.color = 'red';
            }
            else{
                size.setAttribute('checked','false')
                size.style.color = 'black';
            }
        })
        genderProductVariantInfo()
    }
    function checkedColor(colorId){
        const colors = document.querySelectorAll('#colors .color')
        colors.forEach(color=>{
            if(color.getAttribute('colorId') == colorId ){
                color.setAttribute('checked','true')
                color.style.color = 'red';
            }
            else{
                color.setAttribute('checked','false')
                color.style.color = 'black';
            }
        })
        genderProductVariantInfo()
    }
    function genderProductVariantInfo(){
        const colors  = document.querySelectorAll('#colors .color')
        const sizes = document.querySelectorAll('#sizes .size')

        let checkedSizeId  = null
        let checkedColorId = null

        sizes.forEach(size=>{
            if(size.getAttribute('checked') == 'true'){
                checkedSizeId = size.getAttribute('sizeId')
            }
        })
        colors.forEach(color=>{
            if(color.getAttribute('checked') == 'true'){
                checkedColorId = color.getAttribute('colorId')
            }
        })

        const price  = document.querySelector('#price')
        const quantity  = document.querySelector('#quantity')
        const image = document.querySelector('.main-image')
        const productVariants = data['productVariants']
        productVariants.forEach(product=>{
            if(product['colorId'] == checkedColorId && product['sizeId'] == checkedSizeId){
                price.textContent = product['price']
                quantity.textContent = product['quantity']
                if(product['imageUrl'] != null){
                    image.src = product['imageUrl']
                }
                else 
                    image.src = data['imagePath']
            }
        })
    }

    const detail = document.querySelector('.detail')
    
    const mainImage = document.createElement('img')
    mainImage.src = data['imagePath']
    mainImage.className = 'main-image'

    const infoWrapper = document.createElement('div')
    infoWrapper.className = 'info-wrapper'

    const name = document.createElement('h3')
    name.textContent = data['name']
    const start = document.createElement('div')
    //làm sau
    const sizes = document.createElement('div')
    sizes.id = 'sizes'
    sizes.className = 'properties'
    const sizes_name = document.createElement('h3')
    sizes_name.textContent = 'Sizes:'

    sizes.appendChild(sizes_name)
    data['sizes'].forEach(item =>{
        const size  = document.createElement('div')
        size.className = 'property'
        size.textContent = item['size']
        size.setAttribute('sizeId',item['id']);
        size.setAttribute('checked','false');
        size.classList.add('size')
        size.onclick = ()=>{
            if(size.getAttribute('checked') === 'false'){
                size.setAttribute('checked','true')
            }
            else 
                size.setAttribute('checked','false')
            checkedSize(item['id'])
            
        }
        sizes.appendChild(size)
    });

    const colors = document.createElement('div')
    colors.id = 'colors'
    const colors_name = document.createElement('h3')
    colors.className = 'properties'
    colors_name.textContent = 'Colors:'
    colors.appendChild(colors_name)
    data['colors'].forEach(item =>{
        const color  = document.createElement('div')
        color.className = 'property'
        color.classList.add('color')
        color.textContent = item['color']
        color.setAttribute('colorId',item['id'])

        color.onclick = ()=>{
            if(color.getAttribute('checked') === 'false'){
                color.setAttribute('checked','true')
            }
            else 
                color.setAttribute('checked','false')
            checkedColor(item['id'])
        }
        colors.appendChild(color)
    });

    const quantity = document.createElement('h3')
    quantity.id = 'quantity'
    const price = document.createElement('h3')
    price.textContent = 'Price'
    price.id = 'price'
    let length = data['productVariants'].length
    price.textContent = data['productVariants'][0] 
    if(length>1)
        price.textContent = data['productVariants'][0]['price'] + ' -'  +data['productVariants'][length - 1]['price']

    const btnWrapper = document.createElement('div')
    btnWrapper.className = 'btn-wrapper'
    const btnAddToCart = document.createElement('div')
    btnAddToCart.className = 'btn'
    btnAddToCart.textContent = 'Add to Cart'

    const btnBuy = document.createElement('div')
    btnBuy.className = 'btn'
    btnBuy.textContent = 'Buy'

    btnWrapper.appendChild(btnAddToCart)
    btnWrapper.appendChild(btnBuy)

    infoWrapper.appendChild(name)
    infoWrapper.appendChild(start)
    infoWrapper.appendChild(sizes)
    infoWrapper.appendChild(colors)
    infoWrapper.appendChild(quantity)
    infoWrapper.appendChild(price)
    infoWrapper.appendChild(btnWrapper)

    detail.appendChild(mainImage)
    detail.appendChild(infoWrapper)

    const description = document.querySelector('.description')
    description.innerHTML +=data['description']
}



function genderRelatedProducts(data){
    const recommendedProducts = document.querySelector('.related-products')
    
    data.forEach(item=>{
        const product = document.createElement('div')
        product.className = 'product'
        const image = document.createElement('img')
        image.src = item['imagePath']
        image.className = 'image'
        const name = document.createElement('p')
        name.textContent = item['name']
        const price = document.createElement('p')
        price.textContent = item['price']
        product.appendChild(image)
        product.appendChild(name)
        product.appendChild(price)

        product.onclick = ()=>{
            window.location.href = `/products?id=${item['id']}`
        }

        recommendedProducts.appendChild(product)
    })
}
function genderComments(data){
    const comments = document.querySelector('.comments')
    data.forEach(item=>{
        const comment = document.createElement('div')
        comment.className ='comment'
        const userWrapper = document.createElement('div')
        userWrapper.className = 'user-wrapper'
        const icon = document.createElement('img')
        icon.src = '/assets/profile.svg';
        const nameAndStartWrapper = document.createElement('div')
        nameAndStartWrapper.className = 'name-and-start'
        const name = document.createElement('p')
        name.textContent = item['email']
        const start = document.createElement('div')
        for(let i = 0; i< item['star']; i++){
            start.textContent += '★'
        }
        nameAndStartWrapper.appendChild(name)
        nameAndStartWrapper.appendChild(start)

        userWrapper.appendChild(icon)
        userWrapper.appendChild(nameAndStartWrapper)

        const descript = document.createElement('p')
        descript.textContent = item['comment']

        const date = document.createElement('p')
        date.textContent = item['commentDate']

        
        comment.appendChild(userWrapper)
        comment.appendChild(descript)
        comment.appendChild(date)

        comments.appendChild(comment)
    })

    const seeAll = document.createElement('p')
    seeAll.className = 'see-all'
    seeAll.textContent = 'See All'
    comments.appendChild(seeAll)
}
function genderStarRating(){
    const starSvg =
    `<svg width="20px" height="20px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">
            
            <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage">
                <g id="Icon-Set-Filled" sketch:type="MSLayerGroup" transform="translate(-154.000000, -881.000000)" fill="#000000">
                    <path d="M186,893.244 L174.962,891.56 L170,881 L165.038,891.56 L154,893.244 L161.985,901.42 L160.095,913 L170,907.53 L179.905,913 L178.015,901.42 L186,893.244" id="start-favorite" sketch:type="MSShapeGroup"></path>
                </g>
            </g>
        </svg>`

    const rating = document.querySelector('.star-rating')

    const starWrapper =  document.createElement('div')

    starWrapper.className = 'star-wrapper'
    for(let i=0;i<5 ;i++){
        const stars = document.createElement('div')
        stars.className = 'stars'
        for(let j =0;j<=i;j++){
            const star = document.createElement('svg')
            star.className = 'star'
            star.innerHTML = starSvg;
            stars.appendChild(star) 
        }
        stars.onclick=()=>{
            clearFill()
            const gs = stars.querySelectorAll('svg g g')
            stars.setAttribute('isChecked','true')
            gs.forEach(g=>{
                g.style.fill= 'red'
            })
        }
        starWrapper.appendChild(stars)
    }

    function clearFill(){
        const listStars = starWrapper.querySelectorAll('.stars')
        listStars.forEach(stars=>{
            stars.setAttribute('isChecked','false');
            const gTags = stars.querySelectorAll('svg g g')
            gTags.forEach(gTags=>{
                gTags.style.fill= '#000000'
            })
        })
    }

    const yourComment = document.createElement('input')
    const submit = document.createElement('span')
    submit.className = 'submit  '
    submit.innerHTML = 'Submit'
    rating.appendChild(starWrapper)
    rating.appendChild(yourComment)
    rating.appendChild(submit)

}

function init(){
    const urlParam  = new URLSearchParams(window.location.search)
    const productId = urlParam.get("id")
    function getProductInfo(callBack){
        fetch(`/api/v1/products/detail?id=${productId}`)
        .then(response => response.json())
        .then(data=>{
            console.log(data)
            callBack(data)
        })
    }
    function getCommentsData(callBack){
        fetch(`/api/v1/comments/find-all?productId=${productId}`)
        .then(response => response.json())
        .then(data=>{
            console.log(data)
            callBack(data)
        })

    }
    function getgenderRelatedProducts(callBack){
        fetch(`/api/v1/products/recommended-products`)
        .then(response => response.json())
        .then(data =>{
            callBack(data)
        })
    }
    getProductInfo(genderDetails)
    getCommentsData(genderComments)
    genderStarRating()
    getgenderRelatedProducts(genderRelatedProducts)
}
init()