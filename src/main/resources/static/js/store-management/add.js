import { Menu } from "./menu.js";
async function BasicInfo(){
    const basicInfo = document.createElement('div')
    basicInfo.className = 'basic-info'

    const basicInfoText = document.createElement('h3');
    basicInfoText.textContent = 'Thông tin sản phẩm';

    const coverImageWrapper = document.createElement('div')
    coverImageWrapper.classList.add('basic-item')

    const coverImageContainer = document.createElement('div')
    coverImageContainer.className = 'container';

    const coverImageLabel = document.createElement('p')
    coverImageLabel.textContent = 'Cover Photo'
    coverImageLabel.className = 'label'

    const coverImageInputWrapper = document.createElement('div')
    coverImageInputWrapper.className = 'cover-input-wrapper'

    const addImageLabel = document.createElement('span')
    addImageLabel.className = 'cover-input-label'
    addImageLabel.textContent = 'Add Photo'

    const coverImage = document.createElement('img')
    coverImage.className = 'cover-image'

    const imageInput = document.createElement('input')
    imageInput.id = 'cover-image';
    imageInput.onchange = ()=>{
        const file = imageInput.files[0]
        imageInput.name = file.name
        const reader = new FileReader()
        reader.onload = function(e){
            const src = e.target.result;
            coverImage.src = src;
        }
        reader.readAsDataURL(file)

    }
    imageInput.type = 'file'
    imageInput.accept = 'image/*'
    imageInput.style.display ='none'
    
    coverImageInputWrapper.onclick = ()=>{
       imageInput.click();
    }

    coverImageInputWrapper.append(addImageLabel)
    coverImageInputWrapper.innerHTML +=
    `<svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14.2647 15.9377L12.5473 14.2346C11.758 13.4519 11.3633 13.0605 10.9089 12.9137C10.5092 12.7845 10.079 12.7845 9.67922 12.9137C9.22485 13.0605 8.83017 13.4519 8.04082 14.2346L4.04193 18.2622M14.2647 15.9377L14.606 15.5991C15.412 14.7999 15.8149 14.4003 16.2773 14.2545C16.6839 14.1262 17.1208 14.1312 17.5244 14.2688C17.9832 14.4253 18.3769 14.834 19.1642 15.6515L20 16.5001M14.2647 15.9377L18.22 19.9628M18.22 19.9628C17.8703 20 17.4213 20 16.8 20H7.2C6.07989 20 5.51984 20 5.09202 19.782C4.7157 19.5903 4.40973 19.2843 4.21799 18.908C4.12583 18.7271 4.07264 18.5226 4.04193 18.2622M18.22 19.9628C18.5007 19.9329 18.7175 19.8791 18.908 19.782C19.2843 19.5903 19.5903 19.2843 19.782 18.908C20 18.4802 20 17.9201 20 16.8V13M11 4H7.2C6.07989 4 5.51984 4 5.09202 4.21799C4.7157 4.40973 4.40973 4.71569 4.21799 5.09202C4 5.51984 4 6.0799 4 7.2V16.8C4 17.4466 4 17.9066 4.04193 18.2622M18 9V6M18 6V3M18 6H21M18 6H15" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`
    coverImageInputWrapper.appendChild(imageInput)
    coverImageInputWrapper.appendChild(coverImage)
    


    const coverImageFieldError = document.createElement('span');
    coverImageFieldError.textContent = 'Vui lòng chọn ảnh sản phẩm';
    coverImageFieldError.id = 'cover-image-error-message';
    coverImageFieldError.className = 'field-error-message';

    coverImageContainer.appendChild(coverImageInputWrapper)
    coverImageContainer.appendChild(coverImageFieldError)
    
    coverImageWrapper.appendChild(coverImageLabel)
    coverImageWrapper.appendChild(coverImageContainer)

    const nameWrapper = document.createElement('div')
    nameWrapper.classList.add('basic-item')
    const nameLabel = document.createElement('p')
    nameLabel.className = 'label'
    nameLabel.textContent = 'Product Name'
    const nameContainer = document.createElement('div');
    nameContainer.className = 'container';
    const nameInput = document.createElement('input')
    nameInput.className = 'basic-input'
    nameInput.id = 'product-name'
    
    const nameFieldError = document.createElement('span')   
    nameFieldError.className = 'field-error-message';
    nameFieldError.id = 'name-error-message';
    nameFieldError.textContent = 'Vui lòng nhập tên sản phẩm';
    

    nameContainer.appendChild(nameInput);
    nameContainer.appendChild(nameFieldError);

    nameWrapper.appendChild(nameLabel);
    nameWrapper.appendChild(nameContainer);


    const descriptionWrapper = document.createElement('div')
    descriptionWrapper.className = 'basic-item'

    const descriptionLabel = document.createElement('p')
    descriptionLabel.className = 'label'
    descriptionLabel.textContent ='Description'
    
    const descriptionContainer = document.createElement('div');
    descriptionContainer.className = 'container';

    const descriptionInput = document.createElement('textarea');
    descriptionInput.className = 'basic-input';
    descriptionInput.placeholder = 'Description';
    descriptionInput.id = 'product-description';
    
    const descriptionFieldError = document.createElement('span');
    descriptionFieldError.id = 'description-error-message';
    descriptionFieldError.textContent = 'Vui lòng nhập mô tả sản phẩm';
    descriptionFieldError.className = 'field-error-message'

    descriptionContainer.appendChild(descriptionInput);
    descriptionContainer.appendChild(descriptionFieldError);

    descriptionWrapper.appendChild(descriptionLabel)
    descriptionWrapper.appendChild(descriptionContainer)


    const categoryWrapper = document.createElement('div')
    categoryWrapper.className = 'basic-item'

    const categoryLabel = document.createElement('p')
    categoryLabel.textContent = 'Category'
    categoryLabel.className = 'label'

    const categoriesResponse = fetch('/api/v1/categories/all')
    .then(response=>response.json())

    const categories = await categoriesResponse;
    console.log(categories)

    const mainCategories = document.createElement('div')
    mainCategories.className = 'main-categories'

    const subCategories = document.createElement('div')
    subCategories.className = 'sub-categories'

    function genderSubcategories(listCategories){
        subCategories.innerHTML = ''
        listCategories.forEach(item=>{
            const category = document.createElement('span')
            category.textContent = item['name'];
            category.setAttribute('subCategory-id',item['id'])
            category.onclick = ()=>{
                const checkedCategory = document.querySelector('.sub-categories span[checked="true"]');
                console.log(checkedCategory)
                if(checkedCategory!=null){
                    checkedCategory.style.backgroundColor = 'white'
                    checkedCategory.style.color = 'black'
                    checkedCategory.setAttribute('checked',false);
                }
                category.style.backgroundColor = 'black'
                category.style.color = 'white';
                category.setAttribute('checked',true);
            }
            category.setAttribute('checked',false);
            subCategories.appendChild(category)
        })
    }
    categories.forEach(item=>{

        const category = document.createElement('span')
        category.textContent = item['name'];
        category.setAttribute('category-id', item['id']);
        category.setAttribute('checked', false);
        
        category.onclick = ()=>{
            genderSubcategories(item['subCategories'])
            
            const checkedCategory = document.querySelector('.main-categories span[checked="true"]');
            if(checkedCategory !=null){
                checkedCategory.style.backgroundColor = 'white';
                checkedCategory.style.color = 'black';
                checkedCategory.setAttribute('checked',false);
            }
            category.style.backgroundColor = 'black'
            category.style.color = 'white'
            category.setAttribute('checked',true);
        }

        mainCategories.appendChild(category)
    })

    

   
    const categoriesContainer = document.createElement('div')
    categoriesContainer.className = 'container';

    const categoryFiledError = document.createElement('span');
    categoryFiledError.className = 'field-error-message';
    categoryFiledError.textContent = 'Vui lòng chọn loại sản phẩm';
    categoryFiledError.id = 'categories-error-message';

    const tempWrapper = document.createElement('div')
    tempWrapper.appendChild(mainCategories);
    tempWrapper.appendChild(subCategories);
    tempWrapper.style.display = 'flex';

    categoriesContainer.appendChild(tempWrapper);
    categoriesContainer.appendChild(categoryFiledError);

    categoryWrapper.appendChild(categoryLabel);
    categoryWrapper.appendChild(categoriesContainer);

    basicInfo.appendChild(coverImageWrapper)
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
        colorInput.classList.add('color')
        const imageWrapper = document.createElement('div')
        const image =document.createElement('svg') 
        image.innerHTML = imageSvg;
        
        const imageInput = document.createElement('input')
        imageInput.className = 'color-image'
        imageInput.type = 'file'
        imageInput.accept = 'image/*'
        imageInput.style.display = 'none'
 

        imageWrapper.appendChild(image)
        imageWrapper.appendChild(imageInput)

        const input = document.createElement('input')
        input.className = 'color-name'
        input.placeholder = 'Color'
        input.oninput = ()=>{
            genderProductVariantsTable()
        }

        const inputFieldError = document.createElement('span')
        inputFieldError.className = 'field-error-message';
        inputFieldError.textContent = 'Vui lòng nhập màu sắc';

        const container = document.createElement('div');
        container.style.display = 'flex';
        container.style.flexDirection = 'column';

        container.appendChild(input);
        container.appendChild(inputFieldError);
        
        const trash = document.createElement('svg')
        trash.innerHTML = trashSvg;

               
        
        colorInput.appendChild(imageWrapper)
        colorInput.appendChild(container)
        colorInput.appendChild(trash)

        colorInputs.appendChild(colorInput)
        imageWrapper.onclick = ()=>{
            imageInput.click()
        }
        trash.onclick = ()=>{
            colorsData = colorsData.filter(data=> data['text'] != input)
            genderProductVariantsTable()
            colorInputs.removeChild(colorInput)
        }
        colorsData.push({
            text: input,
            file: imageInput
        })
        genderProductVariantsTable()
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
        sizeInput.className = 'input';
        sizeInput.classList.add('size');
        const input = document.createElement('input');
        input.placeholder = 'Size';
        
        input.oninput = genderProductVariantsTable;
        
        const trash = document.createElement('svg')
        trash.innerHTML = trashSvg;
        
        const container  = document.createElement('div');
        container.style.display = 'flex';
        container.style.flexDirection = 'column';

        const sizeFieldError = document.createElement('span');
        sizeFieldError.textContent = 'Vui lòng nhập kích thước';
        sizeFieldError.className = 'field-error-message';

        container.appendChild(input);
        container.appendChild(sizeFieldError);

        sizeInput.appendChild(container);
        sizeInput.appendChild(trash);
        
        sizeInputs.appendChild(sizeInput)
        trash.onclick = ()=>{
            sizesData = sizesData.filter(data=>data!=input)
            genderProductVariantsTable()
            sizeInputs.removeChild(sizeInput)
        }
        sizesData.push(input)
        genderProductVariantsTable()
    }

    sizes.appendChild(sizesLabel)
    sizes.appendChild(btnAddSize)
    sizes.appendChild(sizeInputs)


    const table = document.createElement('table')
    table.className = 'product-variants'
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
    function genderProductVariantsTable(){
        clearTable(table)
        colorsData.forEach(color=>{
            sizesData.forEach(size=>{
                const tr = document.createElement('tr')
                const colorLabel = document.createElement('td')
                colorLabel.textContent = color['text'].value;

                const sizeLabel = document.createElement('td')
                sizeLabel.textContent = size.value;

                const container1 = document.createElement('div');
                container1.style.display = 'flex';
                container1.style.flexDirection = 'column';


                const inputPriceTd = document.createElement('td')
                const inputPrice = document.createElement('input')
                inputPrice.className = 'row-input'
                inputPrice.type = 'number'

                const inputPriceError = document.createElement('span');
                inputPriceError.textContent = '';
                inputPriceError.className = 'field-error-message';
                
                container1.appendChild(inputPrice);
                container1.appendChild(inputPriceError);

                inputPriceTd.appendChild(container1);
                

                const container2 = document.createElement('div');
                container2.style.display = 'flex'
                container2.style.flexDirection = 'column'

                const inputQuantityTd = document.createElement('td')
                const inputQuantity = document.createElement('input')
                inputQuantity.className = 'row-input'
                inputQuantity.type = 'number'
                
                const quantityError = document.createElement('span');
                quantityError.className = 'field-error-message';
                container2.appendChild(inputQuantity);
                container2.appendChild(quantityError);

                inputQuantityTd.appendChild(container2)

                tr.appendChild(sizeLabel)
                tr.appendChild(colorLabel)
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

function renameFile(originalFile, newName) {
    return new File([originalFile], newName, {
        type: originalFile.type,
        lastModified: originalFile.lastModified,
    });
}
function ButtonWrapper(){
    async function saveProduct() {
        const data = new FormData()
        const product = {
            name: '',
            description: '',
            mainCategory: null,
            subCategory: null,
            sizes: [],
            colors: [

            ],
            productVariants: [

            ]
        }
        const coverImage = document.querySelector('#cover-image')

        const name = document.querySelector('#product-name').value
        
        const description = document.querySelector('#product-description').value

        const mainCategoryId = document.querySelector('.main-categories span[checked="true"]')
        
        const subCategoryId = document.querySelector('.sub-categories span[checked="true"]')
        let allowedToAdd = true;
        if(coverImage.files[0] == null){
            const coverImageFieldError = document.querySelector('#cover-image-error-message');
            coverImageFieldError.style.display = 'inline-flex';
            allowedToAdd = false;
        }
        else{
            const coverImageFieldError = document.querySelector('#cover-image-error-message');
            coverImageFieldError.style.display = 'none';
        }

        if(name == ''){
            const nameFieldError = document.querySelector('#name-error-message');
            nameFieldError.style.display = 'inline-flex';
            allowedToAdd = false;
        }
        else{
            const nameFieldError = document.querySelector('#name-error-message');
            nameFieldError.style.display = 'none';    
        }

        if(name == ''){
            const descriptionFieldError = document.querySelector('#description-error-message');
            descriptionFieldError.style.display = 'inline-flex';
            allowedToAdd = false;
        }
        else{
            const descriptionFieldError = document.querySelector('#description-error-message');
            descriptionFieldError.style.display = 'none';
        }
        if(mainCategoryId == null||subCategoryId == null){
            const mainCategoriesFiledError = document.querySelector('#categories-error-message');
            mainCategoriesFiledError.style.display = 'inline-flex';
            allowedToAdd = false;
        }
        else{
            const mainCategoriesFiledError = document.querySelector('#categories-error-message');
            mainCategoriesFiledError.style.display = 'none';
        }
        
        const sizes = document.querySelectorAll('.size');
        sizes.forEach(size=>{
            const sizeName = size.querySelector('input').value;
            if(sizeName == ''){
                size.querySelector('.field-error-message').style.display = 'inline-flex';
                allowedToAdd =false;
            }
            else{
                size.querySelector('.field-error-message').style.display = 'none';
                product.sizes.push(sizeName);
            }
        })
        
        const colors = document.querySelectorAll('.color');
        if(colors!=null){
            let i = 0;
            colors.forEach(color =>{
                const colorName = color.querySelector('.color-name').value;
                const errorMessage =color.querySelector('.field-error-message');
                errorMessage.textContent = 'Vui lòng nhập màu sắc';
                if(colorName == ''){
                    errorMessage.style.display = 'inline-flex';
                    allowedToAdd =false;
                }
                else{
                    errorMessage.style.display = 'inline-flex';
                    product.colors.push({
                        name:colorName,
                        imageName: `color${i}.jpg`,
                    })
                }
                const colorImage = color.querySelector('.color-image');
                if(colorImage.files[0] ==null){
                    errorMessage.textContent = 'Vui lòng chọn ảnh';
                    errorMessage.style.display = 'inline-flex';
                    allowedToAdd = false;
                } 
                else{
                    const renamedColorImage  = renameFile(colorImage.files[0],`color${i}.jpg`);
                    data.append('colors', renamedColorImage);
                    i++;
                }
            })
        }
        
        const productVariants = document.querySelectorAll('.product-variants tr')
        for(let i = 1;i < productVariants.length ; i++){
            const tds = productVariants[i].querySelectorAll('td')
                const size = tds[0].textContent;
                const color = tds[1].textContent;
                const price = tds[2].querySelector('input').value;
                const quantity = tds[3].querySelector('input').value;
                const errorPriceMessage = tds[2].querySelector('.field-error-message');
                const errorQuantityMessage = tds[3].querySelector('.field-error-message');
                if(price == ''){
                    errorPriceMessage.textContent = 'Vui lòng giá tiền';
                    errorPriceMessage.style.display = 'inline-flex';
                    allowedToAdd =false;
                }
                else{
                    errorPriceMessage.style.display = 'none';
                }
                if(quantity == ''){
                    errorQuantityMessage.textContent = 'Vui lòng nhập số lượng';
                    errorQuantityMessage.style.display = 'inline-flex';
                    allowedToAdd =false;
                }
                else{
                    errorQuantityMessage.style.display = 'none';
                }
                product.productVariants.push({
                    size: size,
                    color: color,
                    price: parseFloat(price),
                    quantity: parseInt(quantity)
                }
            )
        }
        
        if(allowedToAdd==false) return;

        product.mainCategory = parseInt(mainCategoryId.getAttribute('category-id'))
        product.subCategory = parseInt(subCategoryId.getAttribute('subcategory-id'))

        product.name = name;
        product.description = description;

        data.append('coverImage',coverImage.files[0])
        // data.append('product',product)
        data.append('product',JSON.stringify(product))
        const send = fetch('/api/v1/products/add',{
            method:"POST",
            // headers:{
            //     "Content-type":"application/json"
            // },
            body:data
        })
        .then(response =>response.json())
        const response = await send;
        if(response['error'] == false){
            window.location.href = '/admin/products';
        }
        else{
            alert(response['message']);
        }

    }
    const btnWrapper = document.createElement('div')
    btnWrapper.className = 'btn-wrapper'
    
    const btnCancel = document.createElement('span')
    btnCancel.textContent = 'Cancel'
    const btnSave = document.createElement('span')
    btnSave.textContent = 'Save'
    btnSave.onclick = saveProduct;
    btnWrapper.appendChild(btnCancel)
    btnWrapper.appendChild(btnSave)

    return btnWrapper;
}

function Title(){
    const title = document.createElement('div')
    const titleTag = document.createElement('h2')
    titleTag.innerHTML = 'Thêm sản phẩm';
    title.className = 'title'
    title.appendChild(titleTag);
    return title; 
}

async function init(){
    const managementWrapper = document.querySelector('.management-wrapper');
    const menu = Menu();
    const addWrapper = document.createElement('div');
    addWrapper.className = 'add-wrapper'
    const title = Title();
    const basic = await BasicInfo();
    const productOptions = ProductOptions();
    const buttonWrapper =ButtonWrapper();
    addWrapper.appendChild(title);
    addWrapper.appendChild(basic);
    addWrapper.appendChild(productOptions);
    addWrapper.appendChild(buttonWrapper);

    managementWrapper.appendChild(menu);
    managementWrapper.appendChild(addWrapper)

}

init()