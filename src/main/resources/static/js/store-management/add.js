function BasicInfo(){
    const basicInfo = document.createElement('div')
    basicInfo.className = 'basic-info'
    const basicInfoText = document.createElement('h3')
    basicInfoText.textContent = 'Bacsic Information'

    const coverPhotoWrapper = document.createElement('div')
    coverPhotoWrapper.classList.add('cover-photo-wrapper')
    coverPhotoWrapper.classList.add('basic-item')

    const coverPhotoLabel = document.createElement('p')
    coverPhotoLabel.textContent = 'Cover Photo'
    coverPhotoLabel.className = 'label'

    const coverPhotoInputWrapper = document.createElement('div')
    coverPhotoInputWrapper.className = 'cover-input-wrapper'

    const addPhotoLabel = document.createElement('p')
    addPhotoLabel.className = 'cover-input-label'
    addPhotoLabel.textContent = 'Add Photo'

    const photoInput = document.createElement('input')
    photoInput.type = 'file'
    photoInput.accept = 'image/*'
    photoInput.style.display ='none'
    
    coverPhotoInputWrapper.onclick = ()=>{
        photoInput.click()
    }

    coverPhotoInputWrapper.append(addPhotoLabel)
    coverPhotoInputWrapper.appendChild(photoInput)
    coverPhotoInputWrapper.innerHTML +=
        `<svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.2647 15.9377L12.5473 14.2346C11.758 13.4519 11.3633 13.0605 10.9089 12.9137C10.5092 12.7845 10.079 12.7845 9.67922 12.9137C9.22485 13.0605 8.83017 13.4519 8.04082 14.2346L4.04193 18.2622M14.2647 15.9377L14.606 15.5991C15.412 14.7999 15.8149 14.4003 16.2773 14.2545C16.6839 14.1262 17.1208 14.1312 17.5244 14.2688C17.9832 14.4253 18.3769 14.834 19.1642 15.6515L20 16.5001M14.2647 15.9377L18.22 19.9628M18.22 19.9628C17.8703 20 17.4213 20 16.8 20H7.2C6.07989 20 5.51984 20 5.09202 19.782C4.7157 19.5903 4.40973 19.2843 4.21799 18.908C4.12583 18.7271 4.07264 18.5226 4.04193 18.2622M18.22 19.9628C18.5007 19.9329 18.7175 19.8791 18.908 19.782C19.2843 19.5903 19.5903 19.2843 19.782 18.908C20 18.4802 20 17.9201 20 16.8V13M11 4H7.2C6.07989 4 5.51984 4 5.09202 4.21799C4.7157 4.40973 4.40973 4.71569 4.21799 5.09202C4 5.51984 4 6.0799 4 7.2V16.8C4 17.4466 4 17.9066 4.04193 18.2622M18 9V6M18 6V3M18 6H21M18 6H15" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`

    coverPhotoWrapper.appendChild(coverPhotoLabel)
    coverPhotoWrapper.appendChild(coverPhotoInputWrapper)


    const nameWrapper = document.createElement('div')
    nameWrapper.classList.add('basic-item')
    const nameLabel = document.createElement('p')
    nameLabel.className = 'label'
    nameLabel.textContent = 'Product Name'
    
    const nameInput = document.createElement('input')
    nameInput.className = 'basic-input'

    nameWrapper.appendChild(nameLabel)
    nameWrapper.appendChild(nameInput)


    const descriptionWrapper = document.createElement('div')
    descriptionWrapper.className = 'basic-item'

    const descriptionLabel = document.createElement('p')
    descriptionLabel.className = 'label'
    descriptionLabel.textContent ='Description'

    const descriptionInput = document.createElement('textarea')
    descriptionInput.className = 'basic-input'
    descriptionInput.placeholder = 'Description'

    descriptionWrapper.appendChild(descriptionLabel)
    descriptionWrapper.appendChild(descriptionInput)


    const categoryWrapper = document.createElement('div')
    categoryWrapper.className = 'basic-item'

    const categoryLabel = document.createElement('p')
    categoryLabel.textContent = 'Category'
    categoryLabel.className = 'label'

    const categories = {
        clothes: [
            'TShirt',
            'Shorts',
            'Pants',
            'Trousers'
        ],
        hat: [
            'Round Hat',
            'Normal Hat',
        ],
        shoes: [
            'Sneakers',
            'Boots',
            'Sandals'
        ],
        accessories: [
            'Belt',
            'Sunglasses',
            'Watch'
        ],
        a:[
            'a',
            'a',
            'a',
            'a',
            'a',
            'a',
            'a',
            'a',
            'a',
            'a',
            'a',
            'a',
            'a',
            'a',
            'a',
            'a',
            'a',
            'a',
            'a',
            'a',
            'a',
            'a',
            'a',
            'a',
            'a',
            'a',
            'a',
        ]
    };
    const mainCategories = document.createElement('div')
    mainCategories.className = 'main-categories'
    const subCategories = document.createElement('div')
    subCategories.className = 'sub-categories'

    function genderSubcategories(listCategories){
        function changeSubCategoryColor(){
            const categories = document.querySelectorAll('.sub-categories span')
            categories.forEach(category=>{
                category.style.backgroundColor = 'white'
                category.style.color = 'black'
            })
        }
        subCategories.innerHTML = ''
        listCategories.forEach(item=>{
            const category = document.createElement('span')
            category.textContent = item;
            category.onclick = ()=>{
                changeSubCategoryColor()
                category.style.backgroundColor = 'black'
                category.style.color = 'white'
            }
            subCategories.appendChild(category)
        })
    }
    Object.keys(categories).forEach(key=>{
        function changeMainCategoryColor(){
            const categories = document.querySelectorAll('.main-categories span')
            categories.forEach(category=>{
                category.style.backgroundColor = 'white'
                category.style.color = 'black'
            })
        }
        const category = document.createElement('span')
        category.textContent = key;
        category.onclick = ()=>{
            genderSubcategories(categories[key])
            changeMainCategoryColor()
            category.style.backgroundColor = 'black'
            category.style.color = 'white'
        }
        mainCategories.appendChild(category)
    })

    
    categoryWrapper.appendChild(categoryLabel)
    categoryWrapper.appendChild(mainCategories)
    categoryWrapper.appendChild(subCategories)

    basicInfo.appendChild(coverPhotoWrapper)
    basicInfo.appendChild(nameWrapper)
    basicInfo.appendChild(descriptionWrapper)
    basicInfo.appendChild(categoryWrapper)



    
    return basicInfo;
}
function ProductOptions(){
    const plusSVG = 
        `<svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 12H20M12 4V20" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`
    const imageSvg =
        `<svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.2647 15.9377L12.5473 14.2346C11.758 13.4519 11.3633 13.0605 10.9089 12.9137C10.5092 12.7845 10.079 12.7845 9.67922 12.9137C9.22485 13.0605 8.83017 13.4519 8.04082 14.2346L4.04193 18.2622M14.2647 15.9377L14.606 15.5991C15.412 14.7999 15.8149 14.4003 16.2773 14.2545C16.6839 14.1262 17.1208 14.1312 17.5244 14.2688C17.9832 14.4253 18.3769 14.834 19.1642 15.6515L20 16.5001M14.2647 15.9377L18.22 19.9628M18.22 19.9628C17.8703 20 17.4213 20 16.8 20H7.2C6.07989 20 5.51984 20 5.09202 19.782C4.7157 19.5903 4.40973 19.2843 4.21799 18.908C4.12583 18.7271 4.07264 18.5226 4.04193 18.2622M18.22 19.9628C18.5007 19.9329 18.7175 19.8791 18.908 19.782C19.2843 19.5903 19.5903 19.2843 19.782 18.908C20 18.4802 20 17.9201 20 16.8V13M11 4H7.2C6.07989 4 5.51984 4 5.09202 4.21799C4.7157 4.40973 4.40973 4.71569 4.21799 5.09202C4 5.51984 4 6.0799 4 7.2V16.8C4 17.4466 4 17.9066 4.04193 18.2622M18 9V6M18 6V3M18 6H21M18 6H15" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`
    const trashSvg = 
        `<svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L17.1991 18.0129C17.129 19.065 17.0939 19.5911 16.8667 19.99C16.6666 20.3412 16.3648 20.6235 16.0011 20.7998C15.588 21 15.0607 21 14.0062 21H9.99377C8.93927 21 8.41202 21 7.99889 20.7998C7.63517 20.6235 7.33339 20.3412 7.13332 19.99C6.90607 19.5911 6.871 19.065 6.80086 18.0129L6 6M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M14 10V17M10 10V17" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`

    const productOptions = document.createElement('div')
    productOptions.className = 'product-options'

    // ==============================
    const colors = document.createElement('div')
    colors.className = 'classification'

    const colorsLabel = document.createElement('h4')
    colorsLabel.textContent = 'Colors'

    const colorInputs = document.createElement('div')
    colorInputs.className = 'inputs'
    
    const btnAddColor = document.createElement('div')
    btnAddColor.className = 'btn-add'
    btnAddColor.innerHTML += plusSVG;
    
    const btnAddColorLabel = document.createElement('span')
    btnAddColorLabel.textContent = 'Add color'
    
    btnAddColor.appendChild(btnAddColorLabel)
    let colorsData = []

    btnAddColor.onclick = ()=>{
        const colorInput = document.createElement('div')
        colorInput.className = 'input'
        const imageWrapper = document.createElement('div')
        const image =document.createElement('svg') 
        image.innerHTML = imageSvg;
        
        const imageInput = document.createElement('input')
        imageInput.type = 'file'
        imageInput.accept = 'image/*'
        imageInput.style.display = 'none'
        
        imageWrapper.appendChild(image)
        imageWrapper.appendChild(imageInput)

        const input = document.createElement('input')
        input.placeholder = 'Color'
        input.oninput = ()=>{
            updateTable()
        }

        const trash = document.createElement('svg')
        trash.innerHTML = trashSvg;

        colorInput.appendChild(imageWrapper)
        colorInput.appendChild(input)
        colorInput.appendChild(trash)

        colorInputs.appendChild(colorInput)
        imageWrapper.onclick = ()=>{
            imageInput.click()
        }
        trash.onclick = ()=>{
            colorsData = colorsData.filter(data=> data['text'] != input)
            updateTable()
            colorInputs.removeChild(colorInput)
        }
        colorsData.push({
            text: input,
            file: imageInput
        })
    }

    colors.appendChild(colorsLabel)
    colors.appendChild(btnAddColor)
    colors.appendChild(colorInputs)

    // =================================
    const sizes = document.createElement('div')
    sizes.className = 'classification'

    const sizesLabel = document.createElement('h4')
    sizesLabel.textContent = 'Sizes'
    const sizeInputs = document.createElement('div')
    sizeInputs.className = 'inputs'
    
    const btnAddSize = document.createElement('div')
    btnAddSize.className = 'btn-add'
    
    btnAddSize.innerHTML += plusSVG;
    
    const btnAddSizeLabel = document.createElement('span')
    btnAddSizeLabel.textContent = 'Add size'
    
    btnAddSize.appendChild(btnAddSizeLabel)
    let sizesData = []
    btnAddSize.onclick = ()=>{
        const sizeInput = document.createElement('div')
        sizeInput.className = 'input'
        
        const input = document.createElement('input')
        input.placeholder = 'Size'
        
        input.oninput = updateTable
        
        const trash = document.createElement('svg')
        trash.innerHTML = trashSvg;
        
        sizeInput.appendChild(input)
        sizeInput.appendChild(trash)
        
        sizeInputs.appendChild(sizeInput)
        trash.onclick = ()=>{
            sizesData = sizesData.filter(data=>data!=input)
            updateTable()
            sizeInputs.removeChild(sizeInput)
        }
        sizesData.push(input)
    }

    sizes.appendChild(sizesLabel)
    sizes.appendChild(btnAddSize)
    sizes.appendChild(sizeInputs)


    // const priceAndQuantity = document.createElement('div')

    const table = document.createElement('table')
    const thTexts = ['Size','Color','Price','Quantity']
    const theader = document.createElement('tr')
    thTexts.forEach(text =>{
        const th =document.createElement('th')
        th.textContent = text;
        theader.appendChild(th)
    })

    table.appendChild(theader)
    function clearTable(table){
        table.innerHTML = ''
        const thTexts = ['Size','Color','Price','Quantity']
        const theader = document.createElement('tr')
        thTexts.forEach(text =>{
            const th =document.createElement('th')
            th.textContent = text;
            theader.appendChild(th)
        })
    
        table.appendChild(theader)
    }
    function updateTable(){
        console.log(colorsData)
        console.log(sizesData)
        clearTable(table)
        colorsData.forEach(color=>{
            sizesData.forEach(size=>{
                const tr = document.createElement('tr')
                const colorLabel = document.createElement('td')
                colorLabel.textContent = color['text'].value;

                const sizeLabel = document.createElement('td')
                sizeLabel.textContent = size.value;

                const inputPriceTd = document.createElement('td')
                const inputPrice = document.createElement('input')
                inputPrice.type = 'number'
                inputPriceTd.appendChild(inputPrice)

                const inputQuantityTd = document.createElement('td')
                const inputQuantity = document.createElement('input')
                inputQuantity.type = 'number'
                inputQuantityTd.appendChild(inputQuantity)

                tr.appendChild(colorLabel)
                tr.appendChild(sizeLabel)
                tr.appendChild(inputPriceTd)
                tr.appendChild(inputQuantityTd)
                table.appendChild(tr)
            })
        })
    }

    productOptions.appendChild(colors)
    productOptions.appendChild(sizes)
    productOptions.appendChild(table)
    return productOptions;

}

function ButtonWrapper(){
    const btnWrapper = document.createElement('div')
    btnWrapper.className = 'btn-wrapper'
    
    const btnCancel = document.createElement('span')
    btnCancel.textContent = 'Cancel'
    const btnSave = document.createElement('span')
    btnSave.textContent = 'Save'
    btnWrapper.appendChild(btnCancel)
    btnWrapper.appendChild(btnSave)

    return btnWrapper;
}

function init(){
    const addWrapper = document.querySelector('.add-wrapper')
    const basic = BasicInfo()
    const productOptions = ProductOptions()
    const buttonWrapper =ButtonWrapper()
    addWrapper.appendChild(basic)
    addWrapper.appendChild(productOptions)
    addWrapper.appendChild(buttonWrapper)

}
init()