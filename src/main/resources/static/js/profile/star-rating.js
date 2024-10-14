import {Toast} from "../toast.js"
export function StarRating(product, btnWriteComment) {
    let star = 0;
    const starSvg =`<svg width="20px" height="20px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">
    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage">
    <g id="Icon-Set-Filled" sketch:type="MSLayerGroup" transform="translate(-154.000000, -881.000000)" fill="#000000">
    <path d="M186,893.244 L174.962,891.56 L170,881 L165.038,891.56 L154,893.244 L161.985,901.42 L160.095,913 L170,907.53 L179.905,913 L178.015,901.42 L186,893.244" id="start-favorite" sketch:type="MSShapeGroup"></path>
    </g>
    </g>
    </svg>`
    const preventBackground = document.createElement('div');
    preventBackground.className = 'prevent-background'
    const rating =document.createElement('div');
    rating.className = 'star-rating-wrapper';
    const ratingLabel = document.createElement('h3')
    ratingLabel.textContent = 'Đánh giá sản phẩm';
    const productInfoWrapper = document.createElement('div')
    productInfoWrapper.className = 'product-info-wrapper';
    const image = document.createElement('img')
    image.className = 'rating-image'
    image.src = product['imagePath'];
    const infoDetail = document.createElement('div')
    const name = document.createElement('div')
    name.textContent = product['name'];
    const size = document.createElement('div')
    size.textContent = product['size'];
    const color = document.createElement('div')
    color.textContent = product['color'];
    infoDetail.appendChild(name)
    infoDetail.appendChild(size)
    infoDetail.appendChild(color)


    productInfoWrapper.appendChild(image)
    productInfoWrapper.appendChild(infoDetail)
    const starWrapper = document.createElement('div');
    starWrapper.className = 'star-wrapper';
    const starLabel = document.createElement('div')
    starLabel.textContent = 'Chất lượng sản phẩm'
    starWrapper.appendChild(starLabel)
    for (let i = 0; i < 5; i++) {
        const stars = document.createElement('div')
        stars.className = 'stars'
        for (let j = 0; j <= i; j++) {
            const star = document.createElement('svg')
            star.className = 'star'
            star.innerHTML = starSvg;
            stars.appendChild(star)
        }
        stars.onclick = () => {
            clearFill()
            const gs = stars.querySelectorAll('svg g g')
            star = i+1;
            console.log(i+1)
            gs.forEach(g => {
                g.style.fill = 'red'
            })
        }
        if(i ===4){
            stars.click();
        }
        starWrapper.appendChild(stars)
    }

    function clearFill() {
        const listStars = starWrapper.querySelectorAll('.stars')
        listStars.forEach(stars => {
            const gTags = stars.querySelectorAll('svg g g')
            gTags.forEach(gTags => {
                gTags.style.fill = '#000000'
            })
        })
    }

    const yourComment = document.createElement('textarea')
    yourComment.placeholder = 'Hãy chia sẽ những điều bạn thích với người mua khác';
    yourComment.className = 'comment-input'

    const btnWrapper = document.createElement('div')
    btnWrapper.className = 'btn-comment-wrapper';

    const cancel = document.createElement('span')
    cancel.textContent = 'Trở lại';
    cancel.className = 'cancel';
    cancel.onclick = ()=>{
        document.body.removeChild(preventBackground)
    }
    const submit = document.createElement('span')
    submit.className = 'submit';
    submit.innerHTML = 'Hoàn thành';
    submit.onclick = ()=>{
     
        
        fetch('/api/v1/comments/rating',{
            method:'POST',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify({
                star: star,
                purchaseHistoryDetailId: product['orderDetailId'],
                comment: yourComment.value,
            })
        })
        .then(async response =>{
            if(response.ok){
                cancel.click();
                btnWriteComment.onclick = null;
                btnWriteComment.textContent = 'Mua lại';
            }
            else{
                Toast("Thất bại",await response.text())
            }
        })
        .catch(error=>{
            console.log(error);
            Toast('Thành công', "Vui lòng load lại trang");
        })
    }

    btnWrapper.appendChild(cancel)
    btnWrapper.appendChild(submit)

    rating.appendChild(ratingLabel)
    rating.appendChild(productInfoWrapper)
    rating.appendChild(starWrapper)
    rating.appendChild(yourComment)
    rating.appendChild(btnWrapper)
    preventBackground.appendChild(rating);
    return preventBackground;
}