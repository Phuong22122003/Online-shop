import {Toast} from "../toast.js"
import { h } from "../jsx.js";
import { FormatCurrency } from "../common.js";
function formatCurrency(number, locale = 'vi-VN', currency = 'VND') {
    return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(number);
}

function genderDetails(data){

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
        const quantity  = document.querySelector('#remaining-quantity')
        const quantityInput = document.querySelector('.quantity-input')
        const productVariants = data['productVariants']
        productVariants.forEach(product=>{
            if(product['colorId'] == checkedColorId && product['sizeId'] == checkedSizeId){
                price.textContent = formatCurrency(product['price'])
                quantity.textContent = product['quantity'] + ' sản phẩm có sẳn'
                quantity.setAttribute("remaining-quantity",product['quantity']);
                quantityInput.value = 1;
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
    sizes_name.textContent = 'Kích thước:'

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
                const checkedSize = document.querySelector('#sizes .size[checked="true"]')
                if(checkedSize!=null){
                    checkedSize.setAttribute('checked','false');
                    checkedSize.style.color = 'black';
                }
                size.setAttribute('checked','true')
                size.style.color = 'red'
                genderProductVariantInfo()
            }            
        }
        sizes.appendChild(size)
    });

    const colors = document.createElement('div')
    colors.id = 'colors'
    const colors_name = document.createElement('h3')
    colors.className = 'properties'
    colors_name.textContent = 'Màu sắc:'
    colors.appendChild(colors_name)
    data['colors'].forEach(item =>{
        const color  = document.createElement('div')
        color.className = 'property'
        color.classList.add('color')
        color.textContent = item['color']
        color.setAttribute('colorId',item['id'])
        color.setAttribute('checked',false);
        color.onclick = ()=>{
            if(color.getAttribute('checked') === 'false'){
                const checkedColor = document.querySelector('#colors .color[checked="true"]')
                if(checkedColor!=null){
                    checkedColor.setAttribute('checked','false')
                    checkedColor.style.color = 'black';
                }
                color.setAttribute('checked','true')
                color.style.color = 'red';

                const image = document.querySelector('.main-image')
                const colorsData = data['colors']
                colorsData.forEach(tempColor=>{
                    if(item['id'] == tempColor['id']){
                        image.src = tempColor['imagePath'];
                    }
                })
                genderProductVariantInfo()
            }
        }
        colors.appendChild(color)
    });

    const quantityWrapper = document.createElement('div')
    quantityWrapper.className = 'quantity-wrapper'

    const quantityLabel = document.createElement('h3')
    quantityLabel.textContent = 'Số lượng: ';

    const btnUp = document.createElement('button')
    btnUp.textContent = '+'
    const btnDown = document.createElement('button')
    btnDown.textContent = '-'

    const quantity = document.createElement('input');
    quantity.type = 'number';
    quantity.className = 'quantity-input'
    quantity.value = 1;

    const remainingQuantity = document.createElement('span')
    remainingQuantity.id = 'remaining-quantity'
    remainingQuantity.className = 'remaining-quantity'


    btnUp.onclick = ()=>{
        const tempQuantity = remainingQuantity.getAttribute('remaining-quantity')
        if(tempQuantity == null ||(tempQuantity != null && parseInt(quantity.value) < parseInt(tempQuantity)))
            quantity.value = parseInt(quantity.value) +1;
    }
    btnDown.onclick = ()=>{
        if(quantity.value == 1)return;
        quantity.value = parseInt(quantity.value) - 1;
    }

    quantity.oninput = ()=>{
        console.log(quantity.value)
        if(quantity.value == '') 
            quantity.value =1
        else if(parseInt(quantity.value) < 1 )
            quantity.value = 1;
        else{
            const tempQuantity = remainingQuantity.getAttribute('remaining-quantity');
            if(tempQuantity == null)return;
            else if(parseInt(quantity.value)>tempQuantity){
                quantity.value = parseInt(tempQuantity)
            }
        }
    }

    quantityWrapper.appendChild(quantityLabel)
    quantityWrapper.appendChild(btnUp)
    quantityWrapper.appendChild(quantity)
    quantityWrapper.appendChild(btnDown)
    quantityWrapper.appendChild(remainingQuantity)

    const price = document.createElement('h3')
    price.textContent = 'Price'
    price.id = 'price'
    let length = data['productVariants'].length
    price.textContent = formatCurrency(data['productVariants'][0]['price'])
    if(length>1)
        price.textContent = formatCurrency(data['productVariants'][0]['price']) + ' -'  +formatCurrency(data['productVariants'][length - 1]['price'])

    const errorFiledMessage =  document.createElement('span')
    errorFiledMessage.style.color = 'red';

    const btnWrapper = document.createElement('div')
    btnWrapper.className = 'btn-wrapper'
    const btnAddToCart = document.createElement('div')
    btnAddToCart.className = 'btn'
    btnAddToCart.textContent = 'Thêm vào giỏ hàng'

    btnAddToCart.onclick = ()=>{
        const color = document.querySelector('#colors .color[checked="true"]');
        const size = document.querySelector('#sizes .size[checked="true"]');
        console.log(size)
        if(size == null || color == null){
            // alert('Vui lòng chọn phân loại sản phẩm');
            errorFiledMessage.textContent = 'Vui lòng chọn phân loại sản phẩm';
            return;
        }
        console.log(data)
        let productVariantId = null;
        data['productVariants'].forEach(variant=>{
            if(color.getAttribute("colorId") == variant['colorId']
                &&size.getAttribute("sizeId")==variant['sizeId'])
                productVariantId = variant['id'];
        })
        const cart = {
            productVariantId: productVariantId,
            quantity: quantity.value,
        }
        fetch('/api/v1/user/cart/add',{
            method:"POST",
            headers:{
                "Content-type": "application/json",
            },
            body:JSON.stringify(cart)
        })
        .then(async response=>{
            if(response.redirected||response.status == 401 ){
                window.location.href = '/login';
            }
            return response.json()
        })
        .then(temp=>{
            if(temp['error'] == true){
                Toast("Lỗi",temp['message']);
            }
            else 
                Toast("Thành công", "Đã thêm vào giỏ hàng");
        })
    }

    const btnBuy = document.createElement('div')
    btnBuy.className = 'btn'
    btnBuy.textContent = 'Mua'

    btnBuy.onclick = ()=>{
        const color = document.querySelector('#colors .color[checked="true"]');
        const size = document.querySelector('#sizes .size[checked="true"]');
        console.log(size)
        if(size == null || color == null){
            errorFiledMessage.textContent = 'Vui lòng chọn phân loại sản phẩm';
            return;
        }
        // let colorId = color.getAttribute('colorId')
        // let sizeId = size.getAttribute('sizeId')
        let productVariantId = null;
        data['productVariants'].forEach(variant=>{
            if(color.getAttribute("colorId") == variant['colorId']
                &&size.getAttribute("sizeId")==variant['sizeId'])
                productVariantId = variant['id'];
        })
        const buy = [{
            productVariantId: parseInt(productVariantId),
            quantity: parseInt(quantity.value),
            price: parseFloat(price.textContent)
        }]
        fetch('/api/v1/user/add-orders-to-session',{
            method:"POST",
            headers:{
                "Content-type": "application/json",
            },
            body:JSON.stringify(buy)
        })
        .then(async response => {
            const responseDto = await response.json();
            if(response.status == 409){
                Toast('Lỗi', responseDto.message);
                return;
            }
            window.location.href = `/order-summary`;
        })
        .catch(error=>{
            Toast('Thất bại', 'Hệ thống Lỗi. Vui lòng thử lại sau');
        })

    }

    authorize(btnBuy, btnAddToCart);
    btnWrapper.appendChild(btnAddToCart)
    btnWrapper.appendChild(btnBuy)

    infoWrapper.appendChild(name)
    infoWrapper.appendChild(start)
    infoWrapper.appendChild(sizes)
    infoWrapper.appendChild(colors)
    infoWrapper.appendChild(quantityWrapper)
    infoWrapper.appendChild(price)
    infoWrapper.appendChild(errorFiledMessage)
    infoWrapper.appendChild(btnWrapper)

    detail.appendChild(mainImage)
    detail.appendChild(infoWrapper)

    const description = document.querySelector('.description')
    description.innerHTML +=data['description']
}

function authorize(btnBuy,btnAddToCart){
    fetch('/api/v1/authentication/get-role')
    .then(response=>response.json())
    .then(role=> {
        if(role.role.toUpperCase() == 'EMPLOYEE'){
            btnBuy.onclick = null;
            btnAddToCart.onclick = null;
            btnBuy.style.backgroundColor = 'gray';
            btnBuy.style.cursor = 'not-allowed'
            btnAddToCart.style.backgroundColor = 'gray';
            btnAddToCart.style.cursor = 'not-allowed'
        }
    })
}

function genderRelatedProducts(data){
    const recommendedProducts = document.querySelector('.related-products')
    
    data.forEach(item=>{
        const product = h(
            'div',
            {className:'product',onclick :()=> window.location.href = `/product?id=${item['id']}`},
            h('img',{src: item['imagePath'],className:'image'}),
            h(
                'div',
                {className:'info-wrapper'},
                h('h3',{textContent:item['name'],className:'name'}),
                h('p',{textContent:item['description'],className:'description'}),
                h('p',{textContent: FormatCurrency(item['price']),className:'price'}),
                h('p',{className:'remaining-quantity',textContent:`Còn: ${item['remainingQuantity']}`},),
            )

        )
        recommendedProducts.appendChild(product)
    })
}
function genderComments(data){
    const comments = document.querySelector('.comments')
    for(let i = 0 ;i < 3 && i < data.length; i++){
        let commentData = data[i]
        const comment = document.createElement('div')
        comment.className ='comment'
        const userWrapper = document.createElement('div')
        userWrapper.className = 'user-wrapper'
        const icon = document.createElement('img')
        icon.src = '/assets/profile.svg';
        const nameAndStartWrapper = document.createElement('div')
        nameAndStartWrapper.className = 'name-and-start'
        const name = document.createElement('p')
        name.textContent = commentData['email']
        const start = document.createElement('div')
        for(let i = 0; i< commentData['star']; i++){
            start.textContent += '★'
        }
        nameAndStartWrapper.appendChild(name)
        nameAndStartWrapper.appendChild(start)

        userWrapper.appendChild(icon)
        userWrapper.appendChild(nameAndStartWrapper)

        const descript = document.createElement('p')
        descript.textContent = commentData['comment']

        const date = document.createElement('p')
        date.textContent = commentData['commentDate']

        
        comment.appendChild(userWrapper)
        comment.appendChild(descript)
        comment.appendChild(date)

        comments.appendChild(comment)
    }

    const seeAll = document.createElement('p')
    seeAll.className = 'see-all'
    seeAll.textContent = 'Xem tất cả'

    seeAll.onclick = ()=>{
        comments.innerHTML = '';
        for(let i = 0 ;i < data.length; i++){
            let commentData = data[i]
            const comment = document.createElement('div')
            comment.className ='comment'
            const userWrapper = document.createElement('div')
            userWrapper.className = 'user-wrapper'
            const icon = document.createElement('img')
            icon.src = '/assets/profile.svg';
            const nameAndStartWrapper = document.createElement('div')
            nameAndStartWrapper.className = 'name-and-start'
            const name = document.createElement('p')
            name.textContent = commentData['email']
            const start = document.createElement('div')
            for(let i = 0; i< commentData['star']; i++){
                start.textContent += '★'
            }
            nameAndStartWrapper.appendChild(name)
            nameAndStartWrapper.appendChild(start)
    
            userWrapper.appendChild(icon)
            userWrapper.appendChild(nameAndStartWrapper)
    
            const descript = document.createElement('p')
            descript.textContent = commentData['comment']
    
            const date = document.createElement('p')
            date.textContent = commentData['commentDate']
    
            
            comment.appendChild(userWrapper)
            comment.appendChild(descript)
            comment.appendChild(date)
    
            comments.appendChild(comment)
        }
    }


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
        fetch(`/api/v1/products/recommended-products?productId=${productId}`)
        .then(response => response.json())
        .then(data =>{
            callBack(data)
        })
    }
    getProductInfo(genderDetails)
    getCommentsData(genderComments)
    // genderStarRating()
    getgenderRelatedProducts(genderRelatedProducts)
}
init()