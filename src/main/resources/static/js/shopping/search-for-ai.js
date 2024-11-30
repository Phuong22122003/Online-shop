import { ChatComponent } from "./chat.js";
import { PopUp } from "../popup.js";
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
    categories_name.textContent = 'Danh mục'

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
    colors_name.textContent = 'Màu sắc'
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
    sizes_name.textContent = 'Kích thước'
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
class RatingComponent{
    constructor(data){
        this.data = data;
        this.chat = new ChatComponent()
        this.chat.creatChatBox();
    }
    getLikeSvg(){
        return`<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
            <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M15.0501 7.04419C15.4673 5.79254 14.5357 4.5 13.2163 4.5C12.5921 4.5 12.0062 4.80147 11.6434 5.30944L8.47155 9.75H5.85748L5.10748 10.5V18L5.85748 18.75H16.8211L19.1247 14.1428C19.8088 12.7747 19.5406 11.1224 18.4591 10.0408C17.7926 9.37439 16.8888 9 15.9463 9H14.3981L15.0501 7.04419ZM9.60751 10.7404L12.864 6.1813C12.9453 6.06753 13.0765 6 13.2163 6C13.5118 6 13.7205 6.28951 13.627 6.56984L12.317 10.5H15.9463C16.491 10.5 17.0133 10.7164 17.3984 11.1015C18.0235 11.7265 18.1784 12.6814 17.7831 13.472L15.8941 17.25H9.60751V10.7404ZM8.10751 17.25H6.60748V11.25H8.10751V17.25Z" fill="#080341"/>
            </svg>`
    }
    getDislikeSvg(){
        return `<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
            <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M15.0501 16.9558C15.4673 18.2075 14.5357 19.5 13.2164 19.5C12.5921 19.5 12.0063 19.1985 11.6435 18.6906L8.47164 14.25L5.85761 14.25L5.10761 13.5L5.10761 6L5.85761 5.25L16.8211 5.25L19.1247 9.85722C19.8088 11.2253 19.5407 12.8776 18.4591 13.9592C17.7927 14.6256 16.8888 15 15.9463 15L14.3982 15L15.0501 16.9558ZM9.60761 13.2596L12.8641 17.8187C12.9453 17.9325 13.0765 18 13.2164 18C13.5119 18 13.7205 17.7105 13.6271 17.4302L12.317 13.5L15.9463 13.5C16.491 13.5 17.0133 13.2836 17.3984 12.8985C18.0235 12.2735 18.1784 11.3186 17.7831 10.528L15.8941 6.75L9.60761 6.75L9.60761 13.2596ZM8.10761 6.75L6.60761 6.75L6.60761 12.75L8.10761 12.75L8.10761 6.75Z" fill="#080341"/>
            </svg>`
    }
    getSadSvg(){
        return `<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
            <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle opacity="0.5" cx="12" cy="12" r="10" stroke="#1C274C" stroke-width="1.5"/>
            <path d="M9 17C9.85038 16.3697 10.8846 16 12 16C13.1154 16 14.1496 16.3697 15 17" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"/>
            <ellipse cx="15" cy="10.5" rx="1" ry="1.5" fill="#1C274C"/>
            <ellipse cx="9" cy="10.5" rx="1" ry="1.5" fill="#1C274C"/>
            </svg>`
    }
    getCloseSvg(){
        return `<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
            <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="24" height="24" fill="white"/>
            <path d="M7 17L16.8995 7.10051" stroke="#000000" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M7 7.00001L16.8995 16.8995" stroke="#000000" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>`
    }
    render(){
        const messageBox = this.chat.getMessageBox();
        messageBox.innerHTML = '';
        const ratingWrapper = document.createElement('div');
        ratingWrapper.className = 'ratting-wrapper';
        const message = document.createElement('span');
        message.textContent = 'Bạn có thể giúp hệ thống đánh giá';

        const like = document.createElement('span');
        like.className = 'rating-btn';
        like.innerHTML = this.getLikeSvg();
        like.onclick = ()=>{
            this.likeHandler();
        }
        const dislike = document.createElement('span'); 
        dislike.className = 'rating-btn';
        dislike.innerHTML = this.getDislikeSvg();
        dislike.onclick = ()=>{
            this.dislikeHandler();
        }
        ratingWrapper.appendChild(message);
        ratingWrapper.appendChild(like);
        ratingWrapper.appendChild(dislike);
        messageBox.appendChild(ratingWrapper);
    }   
    dislikeHandler(){
        const popupComponent = new PopUp();
        const popup = popupComponent.getPopUp();
        popup.className = 'popup-dislike';
        popup.style.width = 'fit-content';
        popup.style.height = '20px';
        const sad = document.createElement('span');
        sad.innerHTML = this.getSadSvg();
        const message = document.createElement('span');
        message.textContent = 'Xin lỗi! Hệ thống sẽ sớm được cập nhật';
        const wrapper = document.createElement('div');
        wrapper.style.display = 'flex';
        wrapper.appendChild(sad);
        wrapper.appendChild(message);
        popup.appendChild(wrapper); 
        popupComponent.addPopUp();
        setTimeout(function(){
            popupComponent.remove();
        }, 1000)
    }
    
    sendResponseData(responseData){
        console.log(responseData);
        //gửi
        fetch('/api/v1/ai/save-rating',{
            method:'POST',
            headers:{
                'Content-type':'application/json'
            },
            body: JSON.stringify(responseData)
        })
        .then(async response=>{
            console.log(response.ok)
            console.log('Oke')
        })
    }
    likeHandler(){
        const data = {
            description: this.data.searchResponseDto.description,
            colorLabels: [],
            sizeLabels: [],
            subCategoryLabels: [],
            genderLabels: []
        }
        let i = 0;
        const popupComponent = new PopUp();
        const popup = popupComponent.getPopUp();
        popup.className = 'popup-like';
        const close = document.createElement('span');
        close.innerHTML = this.getCloseSvg();
        close.className = 'close';
        close.onclick = ()=>popupComponent.remove();
        const title = document.createElement('span');
        title.textContent = 'Đánh giá tìm kiếm';
        const wrapper1 =document.createElement('div');
        const isRightGenders = document.createElement('span');
        isRightGenders.className = 'rating-option';
        isRightGenders.textContent = 'Đúng giới tính';
        const checkbox1 = document.createElement('input')
        checkbox1.type = 'checkbox';
        checkbox1.onclick =  ()=>{
            if(checkbox1.checked){
                data.genderLabels = this.data.searchResponseDto.genders;
                i++;
            }
            else{
                i--;
                data.genderLabels = [];
            }
            if(i==0){
                submit.onclick = null;
                submit.style.backgroundColor = 'gray';
                submit.style.cursor = 'not-allowed';
            }
            else{
                submit.style.cursor = 'pointer';
                submit.style.backgroundColor = 'black';

                submit.onclick = ()=>{
                    this.sendResponseData(data);
                    popupComponent.remove();
                }
            }
        }
        wrapper1.appendChild(checkbox1);
        wrapper1.appendChild(isRightGenders);
        
        const wrapper2 =document.createElement('div');
        const isRightColors = document.createElement('span');
        isRightColors.className = 'rating-option';
        isRightColors.textContent = 'Đúng màu sắc';
        const checkbox2 = document.createElement('input')
        checkbox2.type = 'checkbox';
        checkbox2.onclick =  ()=>{
            if(checkbox2.checked){
                data.colorLabels = this.data.searchResponseDto.colorOptions;
                i++;
            }
            else{
                i--;
                data.colorLabels = [];
            }
            if(i==0){
                submit.onclick = null;
                submit.style.backgroundColor = 'gray';
                submit.style.cursor = 'not-allowed';
            }
            else{
                submit.style.cursor = 'pointer';
                submit.style.backgroundColor = 'black';

                submit.onclick = ()=>{
                    this.sendResponseData(data);
                    popupComponent.remove();

                }
            }
        }
        wrapper2.appendChild(checkbox2);
        wrapper2.appendChild(isRightColors);
        
        const wrapper3 =document.createElement('div');
        const isRightSizes = document.createElement('span');
        isRightSizes.className = 'rating-option';
        isRightSizes.textContent += 'Đúng kích thước';
        const checkbox3 = document.createElement('input')
        checkbox3.type = 'checkbox';
        checkbox3.onclick =  ()=>{
            if(checkbox3.checked){
                data.sizeLabels = this.data.searchResponseDto.sizeOptions;
                i++;
            }
            else{
                data.sizeLabels = [];
                i--;
            }
            if(i==0){
                submit.onclick = null;
                submit.style.backgroundColor = 'gray';
                submit.style.cursor = 'not-allowed';
            }
            else{
                submit.style.cursor = 'pointer';
                submit.style.backgroundColor = 'black';

                submit.onclick = ()=>{
                    this.sendResponseData(data);
                    popupComponent.remove();

                }
            }
        }
        wrapper3.appendChild(checkbox3);
        wrapper3.appendChild(isRightSizes);
        
        const wrapper4 =document.createElement('div');
        const isRightSubCategories = document.createElement('span');
        isRightSubCategories.className = 'rating-option';
        isRightSubCategories.textContent += 'Đúng loại sản phẩm';
        const checkbox4 = document.createElement('input')
        checkbox4.type = 'checkbox';
        checkbox4.onclick =  ()=>{
            if(checkbox4.checked){
                data.subCategoryLabels = this.data.searchResponseDto.subCategories;
                i++;
            }
            else{
                data.subCategoryLabels = [];
                i--;
            }
            if(i==0){
                submit.onclick = null;
                submit.style.backgroundColor = 'gray';
                submit.style.cursor = 'not-allowed';
                
            }
            else{
                submit.style.cursor = 'pointer';
                submit.style.backgroundColor = 'black';

                submit.onclick = ()=>{
                    this.sendResponseData(data);
                    popupComponent.remove();

                }
            }
        }
        wrapper4.appendChild(checkbox4);
        wrapper4.appendChild(isRightSubCategories);

        const submit = document.createElement('span');
        submit.textContent = 'Gửi';
        submit.className = 'submit';
        submit.style.backgroundColor = 'gray';
        submit.style.cursor = 'not-allowed';
        submit.style.alignSelf = 'flex-end';
        const wrapper = document.createElement('div');
        wrapper.className ='popup-like-wrapper';

        wrapper.appendChild(close);
        wrapper.appendChild(title);
        wrapper.appendChild(wrapper1);
        wrapper.appendChild(wrapper2);
        wrapper.appendChild(wrapper3);
        wrapper.appendChild(wrapper4);
        wrapper.appendChild(submit);

        popup.appendChild(wrapper); 
        popupComponent.addPopUp();

    }
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
            const rating = new RatingComponent(data);
            rating.render()
            createProducts(data['products']);
            createFilter(data['categories'],data['sizes'],data['colors']);
        })
    }
    findSearchData();
}
init()
