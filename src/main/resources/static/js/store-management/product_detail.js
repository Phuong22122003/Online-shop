import { Menu } from "./menu.js";

class BasicInfoComponent {
    constructor(product) {
        this.product = product;
        this.basicInfo = document.createElement('div');
        this.basicInfo.className = 'basic-info';//create div basic info
        //data
        this.coverImage = null;
        this.name = null;
        this.description = null;
        this.mainCategory = null;
        this.subCategory = null;

        this.init();// không đợi
    }

    // constructor không đợi hàm này
    async init() {
        const coverImageWrapper = this.createCoverImageSection();
        const nameWrapper = this.createNameSection();
        const descriptionWrapper = this.createDescriptionSection();
        //đợi trả về node nếu ko sẽ lỗi thêm null và bị mất thứ tự giao diện
        const categoryWrapper = await this.createCategorySection();
        this.basicInfo.appendChild(coverImageWrapper);
        this.basicInfo.appendChild(nameWrapper);
        this.basicInfo.appendChild(descriptionWrapper);
        this.basicInfo.appendChild(categoryWrapper);
    }

    createCoverImageSection() {
        const coverImageWrapper = document.createElement('div');
        coverImageWrapper.classList.add('basic-item');

        const coverImageContainer = document.createElement('div');
        coverImageContainer.className = 'container';

        const coverImageLabel = document.createElement('p');
        coverImageLabel.textContent = 'Cover Photo';
        coverImageLabel.className = 'label';

        const coverImageInputWrapper = document.createElement('div');
        coverImageInputWrapper.className = 'cover-input-wrapper';

        const addImageLabel = document.createElement('span');
        addImageLabel.className = 'cover-input-label';
        addImageLabel.textContent = 'Add Photo';

        const coverImage = document.createElement('img');
        coverImage.className = 'cover-image';
        coverImage.src = this.product['coverImagePath'];

        const imageInput = document.createElement('input');
        imageInput.id = 'cover-image';
        imageInput.type = 'file';
        imageInput.accept = 'image/*';
        imageInput.style.display = 'none';

        imageInput.onchange = () => {

            const file = imageInput.files[0];
            imageInput.name = file.name;
            const reader = new FileReader();
            this.coverImage = file;
            reader.onload = (e) => {
                coverImage.src = e.target.result;
            };
            reader.readAsDataURL(file);
        };

        coverImageInputWrapper.onclick = () => {
            imageInput.click();
        };

        coverImageInputWrapper.append(addImageLabel);
        coverImageInputWrapper.innerHTML += this.getSvgIcon();
        coverImageInputWrapper.appendChild(imageInput);
        coverImageInputWrapper.appendChild(coverImage);

        const coverImageFieldError = document.createElement('span');
        coverImageFieldError.textContent = 'Vui lòng chọn ảnh sản phẩm';
        coverImageFieldError.id = 'cover-image-error-message';
        coverImageFieldError.className = 'field-error-message';

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
        nameLabel.textContent = 'Product Name';

        const nameContainer = document.createElement('div');
        nameContainer.className = 'container';

        const nameInput = document.createElement('input');
        nameInput.className = 'basic-input';
        nameInput.id = 'product-name';
        nameInput.value = this.product['productName'];
        this.name = nameInput;

        const nameFieldError = document.createElement('span');
        nameFieldError.className = 'field-error-message';
        nameFieldError.id = 'name-error-message';
        nameFieldError.textContent = 'Vui lòng nhập tên sản phẩm';

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
        descriptionLabel.textContent = 'Description';

        const descriptionContainer = document.createElement('div');
        descriptionContainer.className = 'container';

        const descriptionInput = document.createElement('textarea');
        descriptionInput.className = 'basic-input';
        descriptionInput.placeholder = 'Description';
        descriptionInput.id = 'product-description';
        descriptionInput.value = this.product['description'];
        this.description = descriptionInput;

        const descriptionFieldError = document.createElement('span');
        descriptionFieldError.id = 'description-error-message';
        descriptionFieldError.textContent = 'Vui lòng nhập mô tả sản phẩm';
        descriptionFieldError.className = 'field-error-message';

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
        categoryLabel.textContent = 'Category';
        categoryLabel.className = 'label';

        const categories = await this.getCategoriesData()

        const mainCategories = document.createElement('div');
        mainCategories.className = 'main-categories';

        const subCategories = document.createElement('div');
        subCategories.className = 'sub-categories';

        const categoryContainer = document.createElement('div');
        categoryContainer.className = 'container';

        const tempWrapper = document.createElement('div');
        tempWrapper.style.display = 'flex';
        tempWrapper.appendChild(mainCategories);
        tempWrapper.appendChild(subCategories);

        categories.forEach(item => {
            const category = document.createElement('span');
            category.textContent = item['name'];

            category.setAttribute('main-category-id', item['id']);

            category.onclick = () => {
                this.selectCategory(category);
                this.renderSubcategories(item['subCategories'], subCategories);
            };

            if (item['id'] == this.product['mainCategoryId']) {
                this.mainCategory = category;
                category.style.backgroundColor = 'black';
                category.style.color = 'white';
                this.checkedSubCategory(item['subCategories'], subCategories, this.product['subCategoryId']);
            }
            mainCategories.appendChild(category);
        });

        categoryContainer.appendChild(tempWrapper);

        const categoryFieldError = document.createElement('span');
        categoryFieldError.className = 'field-error-message';
        categoryFieldError.id = 'categories-error-message';
        categoryFieldError.textContent = 'Vui lòng chọn loại sản phẩm';

        categoryContainer.appendChild(categoryFieldError);
        categoryWrapper.appendChild(categoryLabel);
        categoryWrapper.appendChild(categoryContainer);

        return categoryWrapper;
    }
    async getCategoriesData() {
        const response = fetch('/api/v1/categories/all').then(response => response.json())
        const categories = await response;
        return categories;
    }
    checkedSubCategory(listSubCategories, subCategoriesComponent, id) {
        subCategoriesComponent.innerHTML = '';
        listSubCategories.forEach(item => {
            const subCategory = document.createElement('span');
            subCategory.textContent = item['name'];
            subCategory.setAttribute('sub-category-id', item['id']);
            subCategory.onclick = () => {
                this.selectSubCategory(subCategory, subCategoriesComponent);
            };
            if (item['id'] == id) {
                subCategory.style.backgroundColor = 'black';
                subCategory.style.color = 'white';
                this.subCategory = subCategory;
            }
            subCategoriesComponent.appendChild(subCategory);
        });
    }
    renderSubcategories(listCategories, subCategories) {
        subCategories.innerHTML = '';
        listCategories.forEach(item => {
            const subCategory = document.createElement('span');
            subCategory.textContent = item['name'];
            subCategory.setAttribute('sub-category-id', item['id']);
            subCategory.onclick = () => {
                this.selectSubCategory(subCategory, subCategories);
            };
            subCategories.appendChild(subCategory);
        });
    }

    selectCategory(category) {
        const checkedCategory = this.mainCategory;
        if (checkedCategory) {
            checkedCategory.style.backgroundColor = 'white';
            checkedCategory.style.color = 'black';
        }
        category.style.backgroundColor = 'black';
        category.style.color = 'white';
        //Gán lại main category mới
        this.mainCategory = category;
        this.subCategory = null;
    }

    selectSubCategory(subCategory) {
        const checkedSubCategory = this.subCategory;
        if (checkedSubCategory) {
            checkedSubCategory.style.backgroundColor = 'white';
            checkedSubCategory.style.color = 'black';
        }
        subCategory.style.backgroundColor = 'black';
        subCategory.style.color = 'white';
        //gán lại subcategory mới
        this.subCategory = subCategory;
    }

    getSvgIcon() {
        return `
        <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.2647 15.9377L12.5473 14.2346C11.758 13.4519 11.3633 13.0605 10.9089 12.9137C10.5092 12.7845 10.079 12.7845 9.67922 12.9137C9.22485 13.0605 8.83017 13.4519 8.04082 14.2346L4.04193 18.2622M14.2647 15.9377L14.606 15.5991C15.412 14.7999 15.8149 14.4003 16.2773 14.2545C16.6839 14.1262 17.1208 14.1312 17.5244 14.2688C17.9832 14.4253 18.4316 14.8709 19.3283 15.762C20.4706 16.8981 21.0418 17.4661 21.1544 17.8901C21.2522 18.2621 21.2522 18.6569 21.1544 19.0288C21.0418 19.4529 20.4706 20.0209 19.3283 21.157L19.1991 21.2837C18.0412 22.432 17.4622 23.0062 16.8486 23.1464C16.3156 23.2666 15.7535 23.1477 15.3032 22.8126C14.8277 22.4573 14.5064 21.723 13.8639 20.2542L13.678 19.8235C13.1137 18.5067 12.8315 17.8483 12.4098 17.492C11.9756 17.1267 11.3816 17.0287 10.7077 17.0336C9.9954 17.0389 9.30696 17.1969 7.9301 17.513" stroke="#000000" stroke-width="1.5" stroke-linecap="round"/>
            <circle cx="9" cy="7" r="3" stroke="#000000" stroke-width="1.5" stroke-linecap="round"/>
        </svg>`;
    }

    getChange() {
        const nameFieldError = document.querySelector('#name-error-message');
        const descriptionFieldError = document.querySelector('#description-error-message');
        const categoryFieldError = document.querySelector('#categories-error-message');
        let status = 'Ok';
        if (this.name.value == null || this.name.value.length == 0) { nameFieldError.style.display = 'inline-flex'; status = 'Error'; }
        else nameFieldError.style.display = 'none';
        if (this.description.value == null || this.description.value.length == 0) { descriptionFieldError.style.display = 'inline-flex'; status = 'Error'; }
        else descriptionFieldError.style.display = 'none';
        if (this.subCategory == null) { categoryFieldError.style.display = 'inline-flex'; status = 'Error'; }
        else categoryFieldError.style.display = 'none';

        return {
            status:status,
            name: this.name.value,
            description: this.description.value,
            subCategoryId: this.subCategory != null ? this.subCategory.getAttribute('sub-category-id') : null,
            coverImage: this.coverImage,
        }

    }

    render() {
        return this.basicInfo;//return without wating init ->
    }
}
class ProductOptions {
    constructor(product) {
        this.product = product;
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

        // Tạo phần màu sắc
        this.createColorsSection();

        // Tạo phần kích thước
        this.createSizesSection();

        // Tạo bảng biến thể sản phẩm
        this.createVariantsTable();

        // Khởi tạo dữ liệu màu sắc và kích thước từ sản phẩm
        this.initializeData();
        // this.productOptions.onclick = () => {
        //     console.log(this.getChange())
        // }
        // return this.productOptions;
    }
    render(){
        return this.productOptions;
    }
    // Tạo phần màu sắc
    createColorsSection() {
        this.colors = document.createElement('div');
        this.colors.className = 'classification';

        const colorsLabel = document.createElement('h4');
        colorsLabel.textContent = 'Colors';

        // Nút thêm màu sắc
        this.btnAddColor = document.createElement('div');
        this.btnAddColor.className = 'btn-add';
        this.btnAddColor.innerHTML += this.plusSVG;

        const btnAddColorLabel = document.createElement('span');
        btnAddColorLabel.textContent = 'Add color';
        this.btnAddColor.appendChild(btnAddColorLabel);

        this.btnAddColor.addEventListener('click', () => this.createColorInput());

        // Container cho các màu sắc
        this.colorInputs = document.createElement('div');
        this.colorInputs.className = 'inputs';

        this.colors.appendChild(colorsLabel);
        this.colors.appendChild(this.btnAddColor);
        this.colors.appendChild(this.colorInputs);

        this.productOptions.appendChild(this.colors);
    }

    // Tạo phần kích thước
    createSizesSection() {
        this.sizes = document.createElement('div');
        this.sizes.className = 'classification';

        const sizesLabel = document.createElement('h4');
        sizesLabel.textContent = 'Sizes';

        // Nút thêm kích thước
        this.btnAddSize = document.createElement('div');
        this.btnAddSize.className = 'btn-add';
        this.btnAddSize.innerHTML += this.plusSVG;

        const btnAddSizeLabel = document.createElement('span');
        btnAddSizeLabel.textContent = 'Add size';
        this.btnAddSize.appendChild(btnAddSizeLabel);

        this.btnAddSize.addEventListener('click', () => this.createSizeInput());

        // Container cho các kích thước
        this.sizeInputs = document.createElement('div');
        this.sizeInputs.className = 'inputs';

        this.sizes.appendChild(sizesLabel);
        this.sizes.appendChild(this.btnAddSize);
        this.sizes.appendChild(this.sizeInputs);

        this.productOptions.appendChild(this.sizes);
    }

    // Tạo bảng biến thể sản phẩm
    createVariantsTable() {
        this.table = document.createElement('table');
        this.table.className = 'product-variants';
        const headers = '<tr><th>Size</th><th>Color</th><th>Price</th><th>Quantity</th></tr>';
        this.table.innerHTML = headers;
        this.productOptions.appendChild(this.table);
    }

    // Khởi tạo dữ liệu từ sản phẩm
    initializeData() {
        // Khởi tạo màu sắc
        if (this.product.colors && Array.isArray(this.product.colors)) {
            this.product.colors.forEach(color => this.createColorInput(color));
        }

        // Khởi tạo kích thước
        if (this.product.sizes && Array.isArray(this.product.sizes)) {
            this.product.sizes.forEach(size => this.createSizeInput(size));
        }
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

        // Icon thùng rác để xóa màu
        const trash = document.createElement('div');
        trash.innerHTML = this.trashSvg;
        trash.style.cursor = 'pointer';

        // Event khi nhấp vào thùng rác
        trash.addEventListener('click', () => {
            this.colorsData = this.colorsData.filter(data => data.text !== input);
            this.colorInputs.removeChild(colorInput);
            this.generateProductVariantsTable();
        });

        // Thêm các phần tử vào colorInput
        colorInput.appendChild(imageWrapper);
        colorInput.appendChild(container);
        colorInput.appendChild(trash);
        // Thêm colorInput vào container
        this.colorInputs.appendChild(colorInput);

        // Cập nhật dữ liệu màu sắc
        this.colorsData.push({
            id: colorData!=null? colorData.id : null,
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
            this.generateProductVariantsTable();
        });

        // Thêm các phần tử vào sizeInput
        sizeInput.appendChild(container);
        sizeInput.appendChild(trash);

        // Thêm sizeInput vào container
        this.sizeInputs.appendChild(sizeInput);

        // Cập nhật dữ liệu kích thước
        if (sizeData) {
            this.sizesData.push({
                id: sizeData.id,
                text: input
            });
        } else {
            this.sizesData.push({
                text: input
            });
        }

        // Cập nhật bảng biến thể
        this.generateProductVariantsTable();
    }

    // Tạo bảng biến thể sản phẩm dựa trên dữ liệu màu sắc và kích thước
    generateProductVariantsTable() {
        // Xóa nội dung bảng trừ tiêu đề
        const headers = '<tr><th>Size</th><th>Color</th><th>Price</th><th>Quantity</th></tr>';
        this.table.innerHTML = headers;
        this.variantsData = []

        // Lặp qua từng màu và kích thước để tạo các hàng trong bảng
        this.colorsData.forEach(color => {
            const colorValue = color.text.value.trim();
            const colorId = color.id;
            if (!colorValue) return; // Bỏ qua nếu không có giá trị màu

            this.sizesData.forEach(size => {
                const sizeValue = size.text.value.trim();
                if (!sizeValue) return; // Bỏ qua nếu không có giá trị kích thước
                const sizeId = size.id;

                const tr = document.createElement('tr');

                // Cột Size
                const sizeTd = document.createElement('td');
                sizeTd.textContent = sizeValue;
                tr.appendChild(sizeTd);

                // Cột Color
                const colorTd = document.createElement('td');
                colorTd.textContent = colorValue;
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
                const obj = this.getPriceAndQuantity(sizeId, colorId);
                if (obj != null) {
                    priceInput.value = obj.price;
                    quantityInput.value = obj.quantity;

                }
                this.variantsData.push({
                    id: obj!=null?obj.id : null,
                    size: sizeValue,
                    color: colorValue,
                    price: priceInput,
                    quantity: quantityInput
                })

                this.table.appendChild(tr);
            });
        });
    }

    getPriceAndQuantity(sizeId, colorId) {
        if (this.product.productVariants != null && Array.isArray(this.product.productVariants)) {
            for (let i = 0; i < this.product.productVariants.length; i++) {
                let variant = this.product.productVariants[i];
                if (variant.colorId === colorId && variant.sizeId === sizeId)
                    return {
                        id: variant.id,
                        price: variant.price,
                        quantity: variant.quantity
                    }
            }
        }
        return null;
    }

    // Phương thức để lấy dữ liệu hiện tại của sản phẩm
    getProductOptions() {
        // Lấy dữ liệu màu sắc
        const colors = this.colorsData.map(color => ({
            id: color.id || null,
            color: color.text.value.trim(),
            image: color.file ? color.file.files[0] : null
        })).filter(color => color.color !== '');

        // Lấy dữ liệu kích thước
        const sizes = this.sizesData.map(size => ({
            id: size.id || null,
            size: size.text.value.trim()
        })).filter(size => size.size !== '');

        // Lấy dữ liệu biến thể
        const variants = this.variantsData;
        return {
            colors,
            sizes,
            variants
        };
    }
    isError(){
        const colorMessageFields = document.querySelectorAll('.inputs .color');
        const sizeMessageFields = document.querySelectorAll('.inputs .size');
        const tableRows = document.querySelectorAll('table tr');
        let isError = false;
        for(let message of colorMessageFields){
            let input = message.querySelector('.color-name');
            let messageField = message.querySelector('.field-error-message');
            let img = message.querySelector('img');
            if(input.value ==null||input.value == ''){
                messageField.textContent = 'Vui lòng nhập màu sắc';
                messageField.style.display = 'inline-flex';
                isError = true;
            }
            else if(img.src == ''){
                messageField.textContent = 'Vui lòng tải ảnh lên';
                messageField.style.display = 'inline-flex';
                isError = true;    
            }
            else 
                messageField.style.display = 'none';
        }
        
        for(let message of sizeMessageFields){
            let input = message.querySelector('input')
            let messageField = message.querySelector('.field-error-message')
            if(input.value ==null||input.value == ''){
                messageField.style.display = 'inline-flex';
                isError = true;
            }
            else messageField.style.display = 'none'
        }

        for(let i = 1; i<tableRows.length;i++){
            let row = tableRows[i];
            let rowInputs = row.querySelectorAll('.row-input');
            let messageFields = row.querySelectorAll('.field-error-message');
            if(rowInputs[0].value =='') 
            {
                messageFields[0].style.display = 'inline-flex';
                isError = true;
            }
            else
                messageFields[0].style.display = 'none';
            if(rowInputs[1].value =='') 
            {
                messageFields[1].style.display = 'inline-flex';
                isError = true;
            }
            else
                messageFields[1].style.display = 'none';
            
        }
        
        return isError;

    }
    getChange() {
        let isError = this.isError();
        if(isError ==true)return {status:'Error'};
        const colors = []
        const sizes = []
        const variants = []
        let colorMap = new Map();
        let sizeMap = new Map();
        let VariantMap = new Map();
        for (let i = 0; i < this.colorsData.length; i++) {
            let changedColor = this.colorsData[i];
            if (changedColor.id != null)
                colorMap.set(changedColor.id, changedColor);
        }
        for (let i = 0; i < this.sizesData.length; i++) {
            let changedSize = this.sizesData[i];
            if (changedSize.id != null)
                sizeMap.set(changedSize.id, changedSize);
        }
        for (let i = 0; i < this.variantsData.length; i++) {
            let variant = this.variantsData[i];
            if (variant.id != null) {
                VariantMap.set(variant.id, variant);
            }
        }

        for (let i = 0; i < this.product.colors.length; i++) {
            let color = this.product.colors[i];
            let changedColor = colorMap.get(color.id);
            if (changedColor) {
                if (color.color != changedColor.text.value||changedColor.imageInput.files.length>0)
                    colors.push({
                        colorId: changedColor.id,
                        color: changedColor.text.value,
                        image: changedColor.imageInput.files[0],
                        status: 'CHANGED'
                    })
                colorMap.delete(color.id)
            }
            else
                colors.push({
                    colorId: color.id,
                    color: null,
                    status: 'DELETED'
                })
        }
        for (let i = 0; i < this.colorsData.length; i++) {
            let changedColor = this.colorsData[i];
            if (changedColor.id == null) {
                colors.push({
                    id: null,
                    color: changedColor.text.value,
                    image: changedColor.imageInput.files[0],
                    status: 'ADD'
                })
            }

        }

        for (let i = 0; i < this.product.sizes.length; i++) {
            let size = this.product.sizes[i];
            let changedSize = sizeMap.get(size.id);
            if (changedSize) {
                if (size.size != changedSize.text.value)
                    sizes.push({
                        sizeId: changedSize.id,
                        size: changedSize.text.value,
                        status: 'CHANGED'
                    })
                sizeMap.delete(size.id)
            }
            else
                sizes.push({
                    sizeId: size.id,
                    size: null,
                    status: 'DELETED'
                })
        }
        for (let i = 0; i < this.sizesData.length; i++) {
            let changedSize = this.sizesData[i];
            if (changedSize.id == null) {
                sizes.push({
                    id: null,
                    size: changedSize.text.value,
                    status: 'ADD'
                })
            }

        }
        for (let i = 0; i < this.product.productVariants.length; i++) {
            let variant = this.product.productVariants[i];
            let changedVariant = VariantMap.get(variant.id);
            if (changedVariant) {
                if (changedVariant.price.value != variant.price || changedVariant.quantity.value != variant.quantity) {
                    variants.push({
                        id: variant.id,
                        size:variant.size,
                        color:variant.color,
                        quantity: changedVariant.quantity.value,
                        price: changedVariant.price.value,
                        status: "CHANGED"
                    })
                }
                VariantMap.delete(variant.id)
            }
            else {
                variants.push({
                    id: variant.id,
                    size:variant.size,
                    color:variant.color,
                    quantity: null,
                    price: null,
                    status: "DELETE"
                })
            }
        }
        for (let i = 0; i < this.variantsData.length; i++) {
            let variant = this.variantsData[i];
            if (variant.id == null) {
                variants.push({
                    id: null,
                    size:variant.size,
                    color:variant.color,
                    quantity: variant.quantity.value,
                    price: variant.price.value,
                    status: "ADD"
                })
            }
        }
        return {
            status:'Ok',
            colors: colors,
            sizes: sizes,
            productVariants: variants
        }
    }
}


class ButtonWrapperComponent {
    
    constructor(basicInfoComponent, productOptions,product) {
        this.product = product;
        this.basicInfoComponent = basicInfoComponent;
        this.productOptions = productOptions;

        
        const btnWrapper = document.createElement('div')
        btnWrapper.className = 'btn-wrapper'

        const btnCancel = document.createElement('span')
        btnCancel.textContent = 'Cancel'
        const btnSave = document.createElement('span')
        btnSave.textContent = 'Save'
        btnSave.onclick = () => this.save();

        btnWrapper.appendChild(btnCancel)
        btnWrapper.appendChild(btnSave)

        return btnWrapper;
    }
    renameFile(originalFile, newName) {
        return new File([originalFile], newName, {
            type: originalFile.type,
            lastModified: originalFile.lastModified,
        });
    }
    
    async processingData() {
        const formData = new FormData();
        const data = {
            id:this.product.id,
            name: '',
            description: '',
            subCategoryId: '',
            newSizes: [],
            newColors: [],
            productVariants: []
        }
        const basicInfoData = this.basicInfoComponent.getChange()
        if(basicInfoData.status == 'Error') return;

        data.name = basicInfoData.name;
        data.description = basicInfoData.description;
        data.subCategoryId = basicInfoData.subCategoryId;

        if(basicInfoData.coverImage!=null){
            formData.append('coverImage',basicInfoData.coverImage);
        }

        const optionData = this.productOptions.getChange();
        if(optionData.status == 'Error') return;
        for(let i =0;i<optionData.colors.length;i++){
            let color = optionData.colors[i];
            if(color.colorId == null||color.image!=null){//add or set new image
                const renamedImage = this.renameFile(color.image,`color${i}.jpg`);
                formData.append('colorImages',renamedImage);
                color.imageName = `color${i}.jpg`;
            }
            data.newColors.push({
                colorId: color.colorId,
                color: color.color,
                imageName: color.imageName||null,
                status: color.status,
            });
        }
        data.newSizes = optionData.sizes;
        data.productVariants = optionData.productVariants;
        formData.append('product',JSON.stringify(data))
        return formData;
    }
    async save(){
        const formData = await this.processingData();
        if(formData==null)return;
        const response = fetch('/api/v1/products/update',{
            method:"POST",
            body:formData
        })
        
    }

}

function Title() {
    const title = document.createElement('div')
    const titleTag = document.createElement('h2')
    titleTag.innerHTML = 'Thêm sản phẩm';
    title.className = 'title'
    title.appendChild(titleTag);
    return title;
}

async function init() {

    const searchParams = new URLSearchParams(window.location.search);
    const id = searchParams.get("id");

    const response = fetch(`/api/v1/admin/product-detail?id=${id}`)
        .then(response => response.json())
    const productDetailData = await response;


    const managementWrapper = document.querySelector('.management-wrapper');
    const addWrapper = document.createElement('div');
    addWrapper.className = 'add-wrapper'

    const menu = Menu();
    const title = Title();
    const basicInfoComponent = new BasicInfoComponent(productDetailData);
    //lấy được bacsic info dù thẻ đó còn trống nhưng nó sẽ chiếm chỗ cho giao diện
    const basic = basicInfoComponent.render()
    const productOptionsComponent = new ProductOptions(productDetailData);
    const productOptions = productOptionsComponent.render();
    const buttonWrapper = new ButtonWrapperComponent(basicInfoComponent, productOptionsComponent,productDetailData);
    addWrapper.appendChild(title);
    addWrapper.appendChild(basic);
    addWrapper.appendChild(productOptions);
    addWrapper.appendChild(buttonWrapper);

    managementWrapper.appendChild(menu);
    managementWrapper.appendChild(addWrapper)

}

init()