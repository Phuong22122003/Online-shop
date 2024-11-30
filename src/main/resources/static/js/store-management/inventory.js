import { Menu } from "./menu.js"
import { Toast } from "./../toast.js"
import { h } from "../jsx.js"
class Products {
    constructor() {
        this.products = document.createElement('div');
        this.products.className = 'products';

        this.isLoading = document.createElement('h2');
        this.isLoading.textContent = 'Đang tải dữ liệu';
        this.isLoading.style.flexGrow = '1';
        this.isLoading.style.textAlign = 'center';

        this.products.appendChild(this.isLoading);
        this.init()
    }
    async init() {
        const data = await this.getData(1);
        this.products.removeChild(this.isLoading);
        this.createFilter();
        this.showProducts(data);
        this.createPage();
    }
    render() {
        return this.products;
    }
    getData(pageNumer) {
        const response = fetch(`/api/v1/admin/inventory?page=${pageNumer}`).then(response => response.json())
        return response;
    }
    getMagnifierSvg() {
        return `
        <svg width="20px" height="20px" viewBox="0 -0.5 17 17" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="si-glyph si-glyph-magnifier">
            <title>Search</title>
            <defs></defs>
            <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g transform="translate(1.000000, 0.000000)" fill="#434343">
                    <path d="M16,5.954 C16,2.665 13.317,0 10.009,0 C6.698,0 4.016,2.665 4.016,5.954 C4.016,9.241 6.699,11.906 10.009,11.906 C13.317,11.906 16,9.241 16,5.954 L16,5.954 Z M4.934,6.019 C4.934,3.213 7.213,0.943 10.026,0.943 C12.837,0.943 15.114,3.214 15.114,6.019 C15.114,8.823 12.837,11.094 10.026,11.094 C7.213,11.094 4.934,8.822 4.934,6.019 L4.934,6.019 Z" class="si-glyph-fill"></path>
                    <path d="M1.822,15.964 L0,14.142 L4.037,10.104 C4.037,10.104 4.133,10.869 4.617,11.351 C5.099,11.835 5.859,11.927 5.859,11.927 L1.822,15.964 L1.822,15.964 Z" class="si-glyph-fill">        </path>
                    <path d="M13.398,5.073 C13.398,5.645 13.838,5.429 13.838,4.634 C13.838,3.264 12.729,2.154 11.359,2.154 C10.562,2.154 10.347,2.593 10.92,2.593 C12.29,2.593 13.398,3.704 13.398,5.073 L13.398,5.073 Z" class="si-glyph-fill"></path>
                </g>
            </g>
        </svg>`
    }
    getPageNumber() {
        const response = fetch(`/api/v1/admin/inventory/page-number`).then(response => response.json())
        return response;
    }
    getSearchData(key) {
        const response = fetch(`/api/v1/admin/inventory/search?key=${key}`).then(response => response.json())
        return response;
    }
    createFilter() {
        const filter = document.createElement('div');
        filter.className = 'filter';
        const seachWrapper = document.createElement('div');
        seachWrapper.className = 'search-wrapper';
        const searchInput = document.createElement('input');
        searchInput.placeholder = 'Tìm mã sản phẩm hoặc tên';
        searchInput.addEventListener('keydown', (event) => {
            if (event.key == 'Enter') {
                this.search(searchInput.value);
            }
        })
        const magnifier = document.createElement('span');
        magnifier.innerHTML = this.getMagnifierSvg();
        magnifier.onclick = () => { this.search(searchInput.value) }
        seachWrapper.appendChild(searchInput);
        seachWrapper.appendChild(magnifier);
        const btnAdd = document.createElement('span')
        btnAdd.textContent = 'Thêm sản phẩm';
        btnAdd.className = 'btn-add';
        filter.appendChild(seachWrapper);
        filter.appendChild(btnAdd);
        this.products.appendChild(filter);
    }
    async search(key) {
        if (key.length == 0) return;
        const data = await this.getSearchData(key);
        this.clearProducts();
        if (data.length == 0) {
            this.notFound = document.createElement('h2');
            this.notFound.textContent = 'Không tìm thấy sản phẩm';
            this.notFound.style.textAlign = 'center';
            this.products.appendChild(this.notFound);
        }
        else
            this.showProducts(data);
        this.products.appendChild(this.pages);
    }
    showProducts(data) {
        console.log(data)
        data.forEach(item => {
            console.log(item)

            const product = document.createElement('div')
            product.className = 'product'
            
            const productHeader = h(
                'div',
                {className:'product-header'},
                h('h2',{textContent: `Mã sản phẩm: #${item['id']}`,className : 'product-id'})
            )

            const productInfoWrapper = h(
                'div',
                {className:'product-info-wrapper'},
                h(
                    'div',
                    {className: 'image-name'},
                    h('img',{className :'image',src:item['imagePath']}),
                    h(
                        'div',
                        null,
                        h('h4',{className :'name',textContent:item['name']}),
                        h('p',{textContent:`Danh mục: ${item['subCategoryName']}`})
                    )
                )
            )

            const quantityWrapper = h(
                'div',
                {className:'quantity-wrapper'},
                h('p',{className:'sold-quantity' ,textContent: `Đã bán: ${ item['soldQuantity']}` } ),
                h('p',{className:'remaining-quantity' ,textContent: `Còn lại: ${item['remainingQuantity']}` } ),
                h('p',{ textContent: `Đang chờ: ${item['confirmingQuantity']}` } ),
                h('p',{ textContent: `Đang chuẩn bị: ${item['preparingQuantity']}` } ),
                h( 'p',{ textContent: `Đang vận chuyển: ${item['inprocessQuantity']}` }),
                h('p',{ textContent: `Đã hủy: ${item['cancelledQuantity']}` }),
            )

            const btnWrapper = document.createElement('div')
            btnWrapper.className = 'btn-wrapper'

            const btnDetail = document.createElement('span')
            btnDetail.textContent = 'Chi tiết'
            btnDetail.className = 'btn-detail'
            btnDetail.onclick = () => {
                window.location.href = `/admin/product-detail?id=${item['id']}`
            }

            const btnPauseSaleOrOnSale = document.createElement('span')
            if (item.deletedFlat == true)
                btnPauseSaleOrOnSale.textContent = 'Mở bán';
            else
                btnPauseSaleOrOnSale.textContent = 'Ngừng kinh doanh';

            btnPauseSaleOrOnSale.className = 'btn-pause-sale'
            btnPauseSaleOrOnSale.setAttribute('deletedFlat', item['deletedFlat'])
            btnPauseSaleOrOnSale.onclick = () => {
                console.log(btnPauseSaleOrOnSale)
                this.pauseSaleOrOnSale(item.id, btnPauseSaleOrOnSale)
            }

            btnWrapper.appendChild(btnDetail)
            btnWrapper.appendChild(btnPauseSaleOrOnSale)

            
            product.appendChild(productHeader)
            product.appendChild(productInfoWrapper)
            product.appendChild(quantityWrapper)
            productInfoWrapper.appendChild(btnWrapper)

            this.products.appendChild(product)
        })

    }
    pauseSaleOrOnSale(productId, btnPauseSaleOrOnSale) {
        let flat = btnPauseSaleOrOnSale.getAttribute('deletedFlat');
        console.log(flat)
        flat = JSON.parse(flat);
        console.log(flat)
        flat = !flat;
        console.log(flat)
        fetch('/api/v1/admin/inventory/update-flat', {
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            }
            ,
            body: JSON.stringify({
                id: productId,
                deletedFlat: flat
            })
        })
            .then(async response => {
                const responseDto = await response.json();
                const status = responseDto.error == true ? "Thất bại" : "Thành công";
                Toast(status, responseDto.message);
                if (responseDto.error == true) return;
                console.log(responseDto)
                if (flat == true) {
                    btnPauseSaleOrOnSale.setAttribute('deletedFlat', true);
                    btnPauseSaleOrOnSale.textContent = 'Mở bán';
                }
                else {
                    btnPauseSaleOrOnSale.setAttribute('deletedFlat', false);
                    btnPauseSaleOrOnSale.textContent = 'Ngừng kinh doanh';
                }
            })
            .catch(error => {
                Toast('Lỗi', 'Lỗi hệ thống, vui lòng cập nhật sau');
            })
    }
    clearProducts() {
        const products = this.products.querySelectorAll('.product');
        if (this.notFound != null && this.products.contains(this.notFound))
            this.products.removeChild(this.notFound);
        if (this.products.contains(this.isLoading))
            this.products.removeChild(this.isLoading);
        if (this.pages != null && this.products.contains(this.pages))
            this.products.removeChild(this.pages);
        if (this.page != null) {
            this.page.style.backgroundColor = 'white';
            this.page.style.color = 'black';
        }
        for (let product of products) {
            this.products.removeChild(product);
        }
    }
    async createPage() {
        const numOfPage = await this.getPageNumber();

        this.pages = document.createElement('div');
        this.pages.className = 'pages';

        for (let i = 1; i <= numOfPage; i++) {
            const page = document.createElement('span');
            page.className = 'page';
            page.textContent = i;
            if (i == 1) {
                this.page = page;
                this.page.style.color = 'white';
                this.page.style.backgroundColor = 'black';
            }
            page.onclick = async () => {
                this.clearProducts();

                this.products.appendChild(this.isLoading);
                const data = await this.getData(i);
                this.products.removeChild(this.isLoading);
                this.showProducts(data);
                this.products.appendChild(this.pages);

                this.page = page;
                this.page.style.backgroundColor = 'black';
                this.page.style.color = 'white';
            }

            this.pages.appendChild(page);
        }
        this.products.appendChild(this.pages);
    }
}
function init() {
    const products = new Products()
    const managementWrapper = document.querySelector('.management-wrapper')
    const menu = Menu()

    managementWrapper.appendChild(menu)
    managementWrapper.appendChild(products.render());
}

init()