import { Menu } from "./menu.js";
import {Toast} from "./../toast.js"

class BasicInfoComponent {
    constructor() {
        this.basicInfo = document.createElement('div');
        this.basicInfo.className = 'basic-info';
        this.coverImageFile = null;
        this.nameInput = null;
        this.descriptionInput = null;
        this.subCategoryDiv = null;
        this.mainCategoryDiv = null;
        this.brandSelect = null;
        this.nameFieldError = null;
        this.descriptionFieldError = null;
        this.coverImageFieldError = null;
        this.categoryFieldError = null;
        this.brandFieldError = null;
        this.init();
    }
    render(){
        return this.basicInfo;
    }
    async init() {
        this.basicInfo.appendChild(this.createCoverImageSection());
        this.basicInfo.appendChild(this.createNameSection());
        this.basicInfo.appendChild(this.createDescriptionSection());
        this.basicInfo.appendChild(await this.createCategorySection());
        this.basicInfo.appendChild(await this.createBrandSection());
        return this.basicInfo;
    }

    createCoverImageSection() {
        const coverImageWrapper = document.createElement('div');
        coverImageWrapper.classList.add('basic-item');

        const coverImageLabel = document.createElement('p');
        coverImageLabel.textContent = 'Ảnh sản phẩm';
        coverImageLabel.className = 'label';

        const coverImageContainer = document.createElement('div');
        coverImageContainer.className = 'container';

        const coverImageInputWrapper = document.createElement('div');
        coverImageInputWrapper.className = 'cover-input-wrapper';

        const addImageLabel = document.createElement('span');
        addImageLabel.className = 'cover-input-label';
        addImageLabel.textContent = 'Thêm ảnh';

        const coverImage = document.createElement('img');
        coverImage.className = 'cover-image';

        const imageInput = document.createElement('input');
        imageInput.id = 'cover-image';
        imageInput.type = 'file';
        imageInput.accept = 'image/*';
        imageInput.style.display = 'none';

        imageInput.onchange = () => {
            const file = imageInput.files[0];
            const reader = new FileReader();

            //Lấy file tại này
            this.coverImageFile = file;
            reader.onload = (e) => {
                coverImage.src = e.target.result;
            };
            reader.readAsDataURL(file);
        };

        coverImageInputWrapper.onclick = () => imageInput.click();

        coverImageInputWrapper.append(addImageLabel);
        coverImageInputWrapper.innerHTML +=
        `<svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14.2647 15.9377L12.5473 14.2346C11.758 13.4519 11.3633 13.0605 10.9089 12.9137C10.5092 12.7845 10.079 12.7845 9.67922 12.9137C9.22485 13.0605 8.83017 13.4519 8.04082 14.2346L4.04193 18.2622M14.2647 15.9377L14.606 15.5991C15.412 14.7999 15.8149 14.4003 16.2773 14.2545C16.6839 14.1262 17.1208 14.1312 17.5244 14.2688C17.9832 14.4253 18.3769 14.834 19.1642 15.6515L20 16.5001M14.2647 15.9377L18.22 19.9628M18.22 19.9628C17.8703 20 17.4213 20 16.8 20H7.2C6.07989 20 5.51984 20 5.09202 19.782C4.7157 19.5903 4.40973 19.2843 4.21799 18.908C4.12583 18.7271 4.07264 18.5226 4.04193 18.2622M18.22 19.9628C18.5007 19.9329 18.7175 19.8791 18.908 19.782C19.2843 19.5903 19.5903 19.2843 19.782 18.908C20 18.4802 20 17.9201 20 16.8V13M11 4H7.2C6.07989 4 5.51984 4 5.09202 4.21799C4.7157 4.40973 4.40973 4.71569 4.21799 5.09202C4 5.51984 4 6.0799 4 7.2V16.8C4 17.4466 4 17.9066 4.04193 18.2622M18 9V6M18 6V3M18 6H21M18 6H15" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`
        
        coverImageInputWrapper.appendChild(imageInput);
        coverImageInputWrapper.appendChild(coverImage);

        const coverImageFieldError = document.createElement('span');
        coverImageFieldError.textContent = 'Vui lòng chọn ảnh sản phẩm';
        coverImageFieldError.id = 'cover-image-error-message';
        coverImageFieldError.className = 'field-error-message';

        this.coverImageFieldError = coverImageFieldError;

        coverImageContainer.appendChild(coverImageInputWrapper);
        coverImageContainer.appendChild(coverImageFieldError);

        coverImageWrapper.appendChild(coverImageLabel);
        coverImageWrapper.appendChild(coverImageContainer);

        return coverImageWrapper;
    }

    createNameSection() {
        const nameWrapper = document.createElement('div');
        nameWrapper.classList.add('basic-item');

        const nameLabel = document.createElement('p');
        nameLabel.className = 'label';
        nameLabel.textContent = 'Tên sản phẩm';

        const nameContainer = document.createElement('div');
        nameContainer.className = 'container';

        const nameInput = document.createElement('input');
        nameInput.className = 'basic-input';
        nameInput.id = 'product-name';
        nameInput.placeholder = 'Nhập tên sản phẩm'

        //Gán name input tại đây
        this.nameInput = nameInput;

        const nameFieldError = document.createElement('span');
        nameFieldError.className = 'field-error-message';
        nameFieldError.id = 'name-error-message';
        nameFieldError.textContent = 'Vui lòng nhập tên sản phẩm';

        this.nameFieldError = nameFieldError;
    
        nameContainer.appendChild(nameInput);
        nameContainer.appendChild(nameFieldError);

        nameWrapper.appendChild(nameLabel);
        nameWrapper.appendChild(nameContainer);

        return nameWrapper;
    }

    createDescriptionSection() {
        const descriptionWrapper = document.createElement('div');
        descriptionWrapper.className = 'basic-item';

        const descriptionLabel = document.createElement('p');
        descriptionLabel.className = 'label';
        descriptionLabel.textContent = 'Mô tả sản phẩm';

        const descriptionContainer = document.createElement('div');
        descriptionContainer.className = 'container';

        const descriptionInput = document.createElement('textarea');
        descriptionInput.className = 'basic-input';
        descriptionInput.id = 'product-description';
        descriptionInput.placeholder = 'Nhập mô tả sản phẩm';

        //Lấy description tại đây
        this.descriptionInput = descriptionInput;

        const descriptionFieldError = document.createElement('span');
        descriptionFieldError.id = 'description-error-message';
        descriptionFieldError.textContent = 'Vui lòng nhập mô tả sản phẩm';
        descriptionFieldError.className = 'field-error-message';

        this.descriptionFieldError = descriptionFieldError;

        descriptionContainer.appendChild(descriptionInput);
        descriptionContainer.appendChild(descriptionFieldError);

        descriptionWrapper.appendChild(descriptionLabel);
        descriptionWrapper.appendChild(descriptionContainer);

        return descriptionWrapper;
    }

    async createCategorySection() {
        const categoryWrapper = document.createElement('div');
        categoryWrapper.className = 'basic-item';

        const categoryLabel = document.createElement('p');
        categoryLabel.className = 'label';
        categoryLabel.textContent = 'Phân loại ';

        const categories = await fetch('/api/v1/categories/all').then(response=>response.json());

        const mainCategories = document.createElement('div');
        mainCategories.className = 'main-categories';

        const subCategories = document.createElement('div');
        subCategories.className = 'sub-categories';

        categories.forEach(item => {
            const category = document.createElement('span');
            category.textContent = item.name;

            category.setAttribute('category-id', item.id);

            category.onclick = () => {
                this.selectCategory(category);
                this.renderSubcategories(item['subCategories'], subCategories);
            };

            mainCategories.appendChild(category);
        });

        const categoriesContainer = document.createElement('div');
        categoriesContainer.className = 'container';

        const categoryFieldError = document.createElement('span');
        categoryFieldError.className = 'field-error-message';
        categoryFieldError.textContent = 'Vui lòng chọn loại sản phẩm';
        categoryFieldError.id = 'categories-error-message';

        this.categoryFieldError = categoryFieldError;

        const tempWrapper = document.createElement('div');
        tempWrapper.style.display = 'flex';
        tempWrapper.appendChild(mainCategories);
        tempWrapper.appendChild(subCategories);

        categoriesContainer.appendChild(tempWrapper);
        categoriesContainer.appendChild(categoryFieldError);

        categoryWrapper.appendChild(categoryLabel);
        categoryWrapper.appendChild(categoriesContainer);

        return categoryWrapper;
    }
    renderSubcategories(listCategories, subCategories) {
        subCategories.innerHTML = '';
        listCategories.forEach(item => {
            const subCategory = document.createElement('span');
            subCategory.textContent = item['name'];
            subCategory.setAttribute('subcategory-id', item['id']);
            subCategory.onclick = () => {
                this.selectSubCategory(subCategory, subCategories);
            };
            subCategories.appendChild(subCategory);
        });
    }

    selectCategory(category) {
        const checkedCategory = this.mainCategoryDiv;
        if (checkedCategory) {
            checkedCategory.style.backgroundColor = 'white';
            checkedCategory.style.color = 'black';
        }
        category.style.backgroundColor = 'black';
        category.style.color = 'white';
        //Gán lại main category mới
        this.mainCategoryDiv = category;
        this.subCategoryDiv = null;
    }
    selectSubCategory(subCategory) {
        const checkedSubCategory = this.subCategoryDiv;
        if (checkedSubCategory) {
            checkedSubCategory.style.backgroundColor = 'white';
            checkedSubCategory.style.color = 'black';
        }
        subCategory.style.backgroundColor = 'black';
        subCategory.style.color = 'white';
        //gán lại subcategory mới
        this.subCategoryDiv = subCategory;
    }
    async createBrandSection() {
        const brandWrapper = document.createElement('div');
        brandWrapper.className = 'basic-item';

        const brandLabel = document.createElement('p');
        brandLabel.className = 'label';
        brandLabel.textContent = 'Nhãn hiệu';

        const brands = document.createElement('select');
        brands.className = 'brands';
        // brand tại đây;
        this.brandSelect= brands;

        const brandData = await fetch('/api/v1/brand/all').then(response => response.json());
        let i = 0;
        brandData.forEach(item => {
            const brand = document.createElement('option');
            brand.value = item.id;
            brand.text = item.name;
            if(i==0){
                brand.selected = true;
            }
            brands.appendChild(brand);
        });
        
        brandWrapper.appendChild(brandLabel);
        brandWrapper.appendChild(brands);

        return brandWrapper;
    }

    //Khi nào cần thì làm
    // getData(){
    //     const name = this.nameInput.value;
    //     const description = this.descriptionInput.value;
    //     this.subCategoryDiv
    // }
}
class ProductOptionComponent{
    constructor() {
        this.colorsData = [];
        this.sizesData = [];
        this.variantsData = []
        // SVG Icons
        this.plusSVG = `
            <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 12H20M12 4V20" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>`;

        this.imageSvg = `
            <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.2647 15.9377L12.5473 14.2346C11.758 13.4519 11.3633 13.0605 10.9089 12.9137C10.5092 12.7845 10.079 12.7845 9.67922 12.9137C9.22485 13.0605 8.83017 13.4519 8.04082 14.2346L4.04193 18.2622M14.2647 15.9377L14.606 15.5991C15.412 14.7999 15.8149 14.4003 16.2773 14.2545C16.6839 14.1262 17.1208 14.1312 17.5244 14.2688C17.9832 14.4253 18.3769 14.834 19.1642 15.6515L20 16.5001M14.2647 15.9377L18.22 19.9628M18.22 19.9628C17.8703 20 17.4213 20 16.8 20H7.2C6.07989 20 5.51984 20 5.09202 19.782C4.7157 19.5903 4.40973 19.2843 4.21799 18.908C4.12583 18.7271 4.07264 18.5226 4.04193 18.2622M18.22 19.9628C18.5007 19.9329 18.7175 19.8791 18.908 19.782C19.2843 19.5903 19.5903 19.2843 19.782 18.908C20 18.4802 20 17.9201 20 16.8V13M11 4H7.2C6.07989 4 5.51984 4 5.09202 4.21799C4.7157 4.40973 4.40973 4.71569 4.21799 5.09202C4 5.51984 4 6.0799 4 7.2V16.8C4 17.4466 4 17.9066 4.04193 18.2622M18 9V6M18 6V3M18 6H21M18 6H15" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>`;

        this.trashSvg = `
            <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L17.1991 18.0129C17.129 19.065 17.0939 19.5911 16.8667 19.99C16.6666 20.3412 16.3648 20.6235 16.0011 20.7998C15.588 21 15.0607 21 14.0062 21H9.99377C8.93927 21 8.41202 21 7.99889 20.7998C7.63517 20.6235 7.33339 20.3412 7.13332 19.99C6.90607 19.5911 6.871 19.065 6.80086 18.0129L6 6M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M14 10V17M10 10V17" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>`;

        // Tạo phần tử gốc
        this.productOptions = document.createElement('div');
        this.productOptions.className = 'product-options';
        this.init();
    }
    
    async init(){
        this.sizeOptions = await this.getSizeOptions();
        this.colorOptions = await this.getColorOptions();
        // Tạo phần màu sắc
        this.createColorsSection();
    
        // Tạo phần kích thước
        this.createSizesSection();
    
        // Tạo bảng biến thể sản phẩm
        this.createVariantsTable();
    }
    render(){
        return this.productOptions;
    }
    async getColorOptions(){
        const colorOptions = await fetch('/api/v1/color-option/all').then(response=>response.json());
        return colorOptions;
    }
    async getSizeOptions(){
        const sizeOptionData = await fetch('/api/v1/size-option/all').then(response=>response.json());
        return sizeOptionData;
    }
    // Tạo phần màu sắc
    createColorsSection() {
        this.colors = document.createElement('div');
        this.colors.className = 'classification';

        const colorsLabel = document.createElement('h4');
        colorsLabel.textContent = 'Màu sắc';

        // Nút thêm màu sắc
        this.btnAddColor = document.createElement('div');
        this.btnAddColor.className = 'btn-add';
        this.btnAddColor.innerHTML += this.plusSVG;

        const btnAddColorLabel = document.createElement('span');
        btnAddColorLabel.textContent = 'Thêm màu sắc';
        this.btnAddColor.appendChild(btnAddColorLabel);

        this.btnAddColor.addEventListener('click', () => this.createColorInput());

        // Container cho các màu sắc
        this.colorInputs = document.createElement('div');
        this.colorInputs.className = 'inputs';

        const colorErrorField = document.createElement('span');
        colorErrorField.textContent = 'Màu sắc trống';
        colorErrorField.className = 'field-error-message';
        colorErrorField.id = 'empty-color-field';
        this.colors.appendChild(colorsLabel);
        this.colors.appendChild(this.btnAddColor);
        this.colors.appendChild(this.colorInputs);
        this.colors.appendChild(colorErrorField);

        this.productOptions.appendChild(this.colors);
    }

    // Tạo phần kích thước
    createSizesSection() {
        this.sizes = document.createElement('div');
        this.sizes.className = 'classification';

        const sizesLabel = document.createElement('h4');
        sizesLabel.textContent = 'Kích thước';

        // Nút thêm kích thước
        this.btnAddSize = document.createElement('div');
        this.btnAddSize.className = 'btn-add';
        this.btnAddSize.innerHTML += this.plusSVG;

        const btnAddSizeLabel = document.createElement('span');
        btnAddSizeLabel.textContent = 'Thêm kích thước';
        this.btnAddSize.appendChild(btnAddSizeLabel);

        this.btnAddSize.addEventListener('click', () => this.createSizeInput());

        // Container cho các kích thước
        this.sizeInputs = document.createElement('div');
        this.sizeInputs.className = 'inputs';

        const sizeErrorField = document.createElement('span');
        sizeErrorField.textContent = 'Màu sắc trống';
        sizeErrorField.className = 'field-error-message';
        sizeErrorField.id = 'empty-size-field';
        this.sizes.appendChild(sizesLabel);
        this.sizes.appendChild(this.btnAddSize);
        this.sizes.appendChild(this.sizeInputs);
        this.sizes.appendChild(sizeErrorField);

        this.productOptions.appendChild(this.sizes);
    }

    // Tạo bảng biến thể sản phẩm
    createVariantsTable() {
        this.table = document.createElement('table');
        this.table.className = 'product-variants';
        const headers = '<tr><th>Kích thước</th><th>Màu sắc</th><th>Đơn giá</th><th>Số lượng tồn kho</th></tr>';
        this.table.innerHTML = headers;
        this.productOptions.appendChild(this.table);
    }

    // Tạo một input màu sắc
    createColorInput(colorData = null) {
        const colorInput = document.createElement('div');
        colorInput.className = 'input color';
        if (colorData && colorData.id) {
            colorInput.setAttribute('data-colorId', colorData.id);
        }

        // Wrapper cho hình ảnh
        const imageWrapper = document.createElement('div');
        imageWrapper.style.position = 'relative';
        const img = document.createElement('img')
        img.className = 'color-image'
        if (colorData != null)
            img.src = colorData['imagePath']
        imageWrapper.appendChild(img)
        // SVG hình ảnh
        const image = document.createElement('div');
        image.innerHTML = this.imageSvg;
        image.style.cursor = 'pointer';
        imageWrapper.appendChild(image);

        // Input file hình ảnh
        const imageInput = document.createElement('input');
        imageInput.className = 'color-image';
        imageInput.classList.add('image-input')
        imageInput.type = 'file';
        imageInput.accept = 'image/*';
        imageInput.style.display = 'none';

        // Xử lý khi chọn file ảnh
        imageInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader()
                reader.onload = function (e) {
                    const src = e.target.result;
                    img.src = src;
                }
                reader.readAsDataURL(file)
                // Bạn có thể xử lý file ảnh tại đây (ví dụ: hiển thị trước khi tải lên)
            }
        });

        imageWrapper.appendChild(imageInput);

        // Event khi nhấp vào hình ảnh
        imageWrapper.addEventListener('click', () => {
            imageInput.click();
        });

        // Input tên màu
        const input = document.createElement('input');
        input.className = 'color-name';
        input.placeholder = 'Color';
        if (colorData && colorData.color) {
            input.value = colorData.color;
        }

        // Xử lý khi thay đổi input
        input.addEventListener('input', () => this.generateProductVariantsTable());

        // Thông báo lỗi
        const inputFieldError = document.createElement('span');
        inputFieldError.className = 'field-error-message';
        inputFieldError.textContent = 'Vui lòng nhập màu sắc';

        // Container cho input và lỗi
        const container = document.createElement('div');
        container.style.display = 'flex';
        container.style.flexDirection = 'column';
        container.appendChild(input);
        container.appendChild(inputFieldError);

                
        const colorOptionDropdown = document.createElement('select');
        for(let i = 0;i< this.colorOptions.length;i++){
            const colorOption = document.createElement('option');
            colorOption.value = this.colorOptions[i].id;
            colorOption.text = this.colorOptions[i].name;
            colorOptionDropdown.appendChild(colorOption);
        }

        // Icon thùng rác để xóa màu
        const trash = document.createElement('div');
        trash.innerHTML = this.trashSvg;
        trash.style.cursor = 'pointer';

        // Event khi nhấp vào thùng rác
        trash.addEventListener('click', () => {
            this.colorsData = this.colorsData.filter(data => data.text !== input);
            this.colorInputs.removeChild(colorInput);
            this.removeProductVariantRow({
                type:'color',
                colorInput:input
            });
        });

        // Thêm các phần tử vào colorInput
        colorInput.appendChild(imageWrapper);
        colorInput.appendChild(container);
        colorInput.appendChild(colorOptionDropdown);
        colorInput.appendChild(trash);
        // Thêm colorInput vào container
        this.colorInputs.appendChild(colorInput);

        // Cập nhật dữ liệu màu sắc
        this.colorsData.push({
            text: input,
            imageInput:imageInput
        });

        // Cập nhật bảng biến thể
        this.generateProductVariantsTable();
    }

    // Tạo một input kích thước
    createSizeInput(sizeData = null) {
        const sizeInput = document.createElement('div');
        sizeInput.className = 'input size';
        if (sizeData && sizeData.id) {
            sizeInput.setAttribute('data-sizeId', sizeData.id);
        }

        // Input tên kích thước
        const input = document.createElement('input');
        input.className = 'size-name';
        input.placeholder = 'Size';
        if (sizeData && sizeData.size) {
            input.value = sizeData.size;
        }

        // Xử lý khi thay đổi input
        input.addEventListener('input', () => this.generateProductVariantsTable());

        const sizeOptionDropdown = document.createElement('select');
        for(let i = 0;i< this.sizeOptions.length;i++){
            const sizeOption = document.createElement('option');
            sizeOption.value = this.sizeOptions[i].id;
            sizeOption.text = this.sizeOptions[i].name;
            sizeOptionDropdown.appendChild(sizeOption);
        }

        // Thông báo lỗi
        const sizeFieldError = document.createElement('span');
        sizeFieldError.className = 'field-error-message';
        sizeFieldError.textContent = 'Vui lòng nhập kích thước';

        // Container cho input và lỗi
        const container = document.createElement('div');
        container.style.display = 'flex';
        container.style.flexDirection = 'column';
        container.appendChild(input);
        container.appendChild(sizeFieldError);

        // Icon thùng rác để xóa kích thước
        const trash = document.createElement('div');
        trash.innerHTML = this.trashSvg;
        trash.style.cursor = 'pointer';

        // Event khi nhấp vào thùng rác
        trash.addEventListener('click', () => {
            this.sizesData = this.sizesData.filter(data => data.text !== input);
            this.sizeInputs.removeChild(sizeInput);
            this.removeProductVariantRow({
                type:'size',
                sizeInput:input
            });
        });

        // Thêm các phần tử vào sizeInput
        sizeInput.appendChild(container);
        sizeInput.appendChild(sizeOptionDropdown);
        sizeInput.appendChild(trash);

        // Thêm sizeInput vào container
        this.sizeInputs.appendChild(sizeInput);

        // Cập nhật dữ liệu kích thước
        this.sizesData.push({
            text: input
        });

        // Cập nhật bảng biến thể
        this.generateProductVariantsTable();
    }
    
    checkRowInTable(colorInput,sizeInput){
        for(let i =0;i<this.variantsData.length ;i++){
            let variant = this.variantsData[i];
            
            let savedColorInput = variant.colorInput;
            let savedSizeInput = variant.sizeInput;
            let tr = variant.tableRow;
           if(colorInput == savedColorInput&& sizeInput == savedSizeInput){
            return tr;
           }
        }
        return null;
    }
    removeProductVariantRow(input){
        for(let i =this.variantsData.length-1;i>=0 ;i--){
            let variant = this.variantsData[i];
            let savedColorInput = variant.colorInput;
            let savedSizeInput = variant.sizeInput;
            let tr = variant.tableRow;
            if(input.type == 'color'){
                if(savedColorInput == input.colorInput){
                    this.variantsData.splice(i,1);
                    this.table.removeChild(tr);
                }
                continue;
            }
            if(savedSizeInput == input.sizeInput){
                this.variantsData.splice(i,1);
                this.table.removeChild(tr);
            }
        }

    }
    // Tạo bảng biến thể sản phẩm dựa trên dữ liệu màu sắc và kích thước
    generateProductVariantsTable() {
        // Lặp qua từng màu và kích thước để tạo các hàng trong bảng
        this.colorsData.forEach(color => {
            const colorInput = color.text;
            for(let size of this.sizesData){
                const sizeInput = size.text;
                let savedTr = this.checkRowInTable(colorInput,sizeInput);
                if(savedTr!=null){
                    const tds = savedTr.querySelectorAll('td');
                    tds[0].textContent = sizeInput.value;
                    tds[1].textContent = colorInput.value;
                    continue;
                }
                const tr = document.createElement('tr');
               
                this.variantsData.push({
                    colorInput:colorInput,
                    sizeInput:sizeInput,
                    tableRow: tr
                })
               
                // Cột Size
                const sizeTd = document.createElement('td');
                sizeTd.textContent = size.text.value;
                tr.appendChild(sizeTd);

                // Cột Color
                const colorTd = document.createElement('td');
                colorTd.textContent = color.text.value;
                tr.appendChild(colorTd);

                // Cột Price
                const priceTd = document.createElement('td');
                const priceInput = document.createElement('input');
                priceInput.className = 'row-input';
                priceInput.type = 'number';
                priceInput.placeholder = 'Price';
                priceInput.min = '0';

                const priceError = document.createElement('span');
                priceError.className = 'field-error-message';
                priceError.textContent = 'Vui lòng nhập giá';

                const priceContainer = document.createElement('div');
                priceContainer.style.display = 'flex';
                priceContainer.style.flexDirection = 'column';
                priceContainer.appendChild(priceInput);
                priceContainer.appendChild(priceError);

                priceTd.appendChild(priceContainer);
                tr.appendChild(priceTd);

                // Cột Quantity
                const quantityTd = document.createElement('td');
                const quantityInput = document.createElement('input');
                quantityInput.className = 'row-input';
                quantityInput.type = 'number';
                quantityInput.placeholder = 'Quantity';
                quantityInput.min = '0';

                const quantityError = document.createElement('span');
                quantityError.className = 'field-error-message';
                quantityError.textContent = 'Vui lòng nhập số lượng';

                const quantityContainer = document.createElement('div');
                quantityContainer.style.display = 'flex';
                quantityContainer.style.flexDirection = 'column';
                quantityContainer.appendChild(quantityInput);
                quantityContainer.appendChild(quantityError);

                quantityTd.appendChild(quantityContainer);
                tr.appendChild(quantityTd);
                this.table.appendChild(tr);
            }
        });
    }

    
}

class ButtonWrapperComponent {
    constructor() {
        this.product = {
            name: '',
            description: '',
            mainCategory: null,
            subCategory: null,
            brandId:null,
            sizes: [],
            colors: [],
            productVariants: []
        };
        this.data = new FormData();
        this.btnSave = null;
        this.initializeButtons();

    }
    
    initializeButtons() {
        const btnWrapper = document.createElement('div');
        btnWrapper.className = 'btn-wrapper';
        
        const btnCancel = document.createElement('a');
        btnCancel.href = '/admin/products'
        btnCancel.textContent = 'Hủy';
        btnCancel.className = 'btn'

        const btnSave = document.createElement('span');
        btnSave.textContent = 'Lưu';
        btnSave.className = 'btn';
        this.btnSave = btnSave;
        btnSave.onclick = () => {
            this.saveProduct();
        }

        btnWrapper.appendChild(btnCancel);
        btnWrapper.appendChild(btnSave);

        return btnWrapper;
    }
    renameFile(originalFile, newName) {
        return new File([originalFile], newName, {
            type: originalFile.type,
            lastModified: originalFile.lastModified,
        });
    }
    saveProduct() {

        this.collectProductData();
        
        const allowedToAdd = this.validateFields();
        console.log(allowedToAdd)

        if (!allowedToAdd) {
            return;
        }

        this.appendDataToForm();
        
        this.sendData();
    }

    collectProductData() {
        this.coverImage = document.getElementById('cover-image');

        this.product.name = document.querySelector('#product-name').value;
        this.product.description = document.querySelector('#product-description').value;

        const mainCategoryId = document.querySelector('.main-categories span[style*="background-color: black"]');
        const subCategoryId = document.querySelector('.sub-categories span[style*="background-color: black"]');
        
        this.product.mainCategory = mainCategoryId ? parseInt(mainCategoryId.getAttribute('category-id')) : null;
        this.product.subCategory = subCategoryId ? parseInt(subCategoryId.getAttribute('subcategory-id')) : null;

        this.brands = document.querySelector('.brands')
        this.product.brandId = this.brands.value;
        this.product.sizes = this.collectSizes();
        this.product.colors = this.collectColors();
        this.product.productVariants = this.collectProductVariants();
    }

    collectSizes() {
        const sizes = [];
        const sizeElements = document.querySelectorAll('.size');

        sizeElements.forEach(size => {
            const sizeName = size.querySelector('input').value;
            if (sizeName) sizes.push(sizeName);
        });

        return sizes;
    }

    collectColors() {
        const colors = [];
        const colorElements = document.querySelectorAll('.color');

        colorElements.forEach((color, i) => {
            const colorName = color.querySelector('.color-name').value;
            const colorImage = color.querySelector('.image-input');

            if (colorName) {
                colors.push({
                    name: colorName,
                    imageName: `color${i}.jpg`,
                });

                if (colorImage.files[0]) {
                    const renamedColorImage = this.renameFile(colorImage.files[0], `color${i}.jpg`);
                    this.data.append('colors', renamedColorImage);
                }
            }
        });

        return colors;
    }

    collectProductVariants() {
        const productVariants = [];
        const variantRows = document.querySelectorAll('.product-variants tr');

        for (let i = 1; i < variantRows.length; i++) {
            const tds = variantRows[i].querySelectorAll('td');
            const size = tds[0].textContent;
            const color = tds[1].textContent;
            const price = tds[2].querySelector('input').value;
            const quantity = tds[3].querySelector('input').value;

            productVariants.push({
                size: size,
                color: color,
                price: parseFloat(price),
                quantity: parseInt(quantity)
            });
        }

        return productVariants;
    }

    validateFields() {
        let allowedToAdd = true;

        // Validate cover image
        if (!this.coverImage.files[0]) {
            this.displayError('#cover-image-error-message', 'Vui lòng chọn ảnh');
            allowedToAdd = false;
        } else {
            this.hideError('#cover-image-error-message');
        }

        // Validate name
        if (this.product.name === '') {
            this.displayError('#name-error-message', 'Vui lòng nhập tên');
            allowedToAdd = false;
        } else {
            this.hideError('#name-error-message');
        }

        // Validate description
        if (this.product.description === '') {
            this.displayError('#description-error-message', 'Vui lòng nhập mô tả');
            allowedToAdd = false;
        } else {
            this.hideError('#description-error-message');
        }

        // Validate categories
        if (this.product.mainCategory === null || this.product.subCategory === null) {
            this.displayError('#categories-error-message', 'Vui lòng chọn phân loại ');
            allowedToAdd = false;
        } else {
            this.hideError('#categories-error-message');
        }

        // Validate sizes and colors
        allowedToAdd = this.validateSizesAndColors(allowedToAdd);
        allowedToAdd = this.validateProductVariants(allowedToAdd);

        return allowedToAdd;
    }

    validateSizesAndColors(isAllowed) {
        const sizes = document.querySelectorAll('.size');
        if(sizes.length == 0){
            this.displayError('#empty-size-field','Kích thước trống');
            isAllowed =false;
        }
        else{
            this.hideError('#empty-size-field');
            sizes.forEach(size => {
                const sizeName = size.querySelector('input').value;
                const errorMessage = size.querySelector('.field-error-message');
                if (sizeName === '') {
                    errorMessage.textContent = 'Vui lòng nhập kích thước';
                    errorMessage.style.display = 'inline-flex';
                    isAllowed = false;
                } else {
                    errorMessage.style.display = 'none';
                }
            });
        } 

        const colors = document.querySelectorAll('.color');
        if(colors.length == 0){
            this.displayError('#empty-color-field','Màu sắc trống');
            isAllowed = false;
        }
        else{
            colors.forEach(color => {
                this.hideError('#empty-color-field');
                const colorName = color.querySelector('.color-name').value;
                const errorMessage = color.querySelector('.field-error-message');
    
                if (colorName === '') {
                    errorMessage.textContent = 'Vui lòng nhập màu sắc';
                    errorMessage.style.display = 'inline-flex';
                    isAllowed = false;
    
                } else {
                    errorMessage.style.display = 'none';
                }
    
                const colorImage = color.querySelector('.image-input');
                if (!colorImage.files[0]) {
                    errorMessage.textContent = 'Vui lòng chọn ảnh';
                    errorMessage.style.display = 'inline-flex';
                    isAllowed = false;
    
                }
            });
        }
        return isAllowed;
    }
    validateProductVariants(isAllowed){
        const productVariants = document.querySelectorAll('.product-variants tr')
        for(let i = 1;i < productVariants.length ; i++){
            const tds = productVariants[i].querySelectorAll('td')
            const price = tds[2].querySelector('input').value;
            const quantity = tds[3].querySelector('input').value;
            const errorPriceMessage = tds[2].querySelector('.field-error-message');
            const errorQuantityMessage = tds[3].querySelector('.field-error-message');
            if(price == ''){
                errorPriceMessage.textContent = 'Vui lòng giá tiền';
                errorPriceMessage.style.display = 'inline-flex';
                isAllowed =false;
            }
            else{
                errorPriceMessage.style.display = 'none';
            }
            if(quantity == ''){
                errorQuantityMessage.textContent = 'Vui lòng nhập số lượng';
                errorQuantityMessage.style.display = 'inline-flex';
                isAllowed =false;
                
            }
            else{
                errorQuantityMessage.style.display = 'none';
            }
        }
        return isAllowed;
    }
    displayError(selector, message) {
        const errorField = document.querySelector(selector);
        errorField.textContent = message;
        errorField.style.display = 'inline-flex';
    }

    hideError(selector) {
        const errorField = document.querySelector(selector);
        errorField.style.display = 'none';
    }

    appendDataToForm() {
        this.data.append('coverImage', this.coverImage.files[0]);
        this.data.append('product', JSON.stringify(this.product));
    }

    async sendData() {
        const response = await fetch('/api/v1/products/add', {
            method: "POST",
            body: this.data
        });
        const responseDto = await response.json();
        const title = responseDto.error==true?"Thất bại":"Thành công";
        Toast(title,responseDto.message);
        this.btnSave.textContent = 'Xem tất cả sản phẩm';
        this.btnSave.onclick = ()=>{
            window.location.href = '/admin/products';
        }
    }

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
    const basicInfoComponent = new BasicInfoComponent();
    const basic = basicInfoComponent.render();
    const productOptionsComponent = new ProductOptionComponent();
    const productOptions = productOptionsComponent.render();
    const buttonWrapperComponent = new ButtonWrapperComponent()
    
    const buttonWrapper = buttonWrapperComponent.initializeButtons();
    addWrapper.appendChild(title);
    addWrapper.appendChild(basic);
    addWrapper.appendChild(productOptions);
    addWrapper.appendChild(buttonWrapper);

    managementWrapper.appendChild(menu);
    managementWrapper.appendChild(addWrapper)

}

init()