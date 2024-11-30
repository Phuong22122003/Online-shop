import { Menu } from "./menu.js"
import { FormatCurrency } from "../common.js";
import {Toast} from "../toast.js"
import { TrashSvg } from "../svg.js";
import {h} from "../jsx.js"
class Cart {
    constructor(data) {
        this.data = data;

        this.totalTag = null;

        this.updateQuantityFn = this.debounce(this.updateQuantity,1000);

        this.trashSvg = TrashSvg();

        this.table = null;
    }

    debounce(callback, delay) {
        let timer
        return function(...args) {
          clearTimeout(timer)
          timer = setTimeout(() => {
            callback(...args);
          }, delay)
        }
    }

    createCartWrapper() {
        const cartWrapper = document.createElement('div');

        cartWrapper.className = 'cart-wrapper';

        const table = this.createTable();
        cartWrapper.appendChild(table);

        const totalPanel = this.createTotalPanel();
        cartWrapper.appendChild(totalPanel);

        return cartWrapper;
    }

    createTable() {

        const table = document.createElement('table');

        this.table =table;

        const header = this.createTableHeader();

        table.appendChild(header);

        if(this.data.length ==0){
            const emptCart = document.createElement('div');

            emptCart.appendChild(table);

            emptCart.style.flexGrow = '1';
            emptCart.style.display = 'flex';
            emptCart.style.flexDirection = 'column';
            
            const text = document.createElement('h4');

            text.textContent = "Giỏ hàng trống";

            text.style.textAlign = 'center';

            emptCart.appendChild(text);

            return emptCart;
        }
        this.data.forEach(row => {
            const tableRow = this.createTableRow(row);
            table.appendChild(tableRow);
        });

        return table;
    }

    createTableHeader() {
        const header = document.createElement('tr');
        const headers = ['', 'Sản phẩm', 'Giá', 'Số lượng', 'Tổng','Xóa'];
        
        headers.forEach(text => {
            const th = document.createElement('th');
            th.textContent = text;
            header.appendChild(th);
        });
        
        return header;
    }

    createTableRow(row) {
        const tableRow = document.createElement('tr');
        const checkboxCell = this.createCheckboxCell(tableRow);
        const productCell = this.createProductCell(row);
        const priceCell = this.createPriceCell(row);
        const quantityCell = this.createQuantityCell(row,tableRow);
        const subtotalCell = this.createSubtotalCell(row);
        const trashCell = this.createTrashCell(row,tableRow);

        tableRow.append(checkboxCell, productCell, priceCell, quantityCell, subtotalCell,trashCell);
        return tableRow;
    }

    createCheckboxCell(tableRow) {
        const td = document.createElement('td');
        const checkbox = document.createElement('input');
        checkbox.className = 'checkbox';
        checkbox.type = 'checkbox';

        checkbox.onchange = () => {
            this.updateTotal(checkbox,tableRow);
        };

        td.appendChild(checkbox);
        return td;
    }

    updateTotal(checkbox,tableRow) {
        const subtotalTag = tableRow.querySelector('.subtotal');

        const subtotal = parseFloat(subtotalTag.getAttribute('subtotal'));

        if (checkbox.checked) {

            this.totalTag.setAttribute('total',parseFloat(this.totalTag.getAttribute('total')) + parseFloat(subtotal));

            this.totalTag.textContent = FormatCurrency(this.totalTag.getAttribute('total'));

        } else {
            this.totalTag.setAttribute('total',parseFloat(this.totalTag.getAttribute('total')) - parseFloat(subtotal));

            this.totalTag.textContent = FormatCurrency(this.totalTag.getAttribute('total'));
        }
    }

    createProductCell(row) {
        const td = document.createElement('td');
        td.className = 'product';
        td.setAttribute("productVariantId", row['productVariantId']);

        const image = document.createElement('img');
        image.className = 'image';
        image.src = row['imagePath'];

        const nameAndSizeAnColor = h(
            'div',
            null,
            h('h4',{textContent: row['name']}),
            h('p',{textContent:`Size: ${row['size']}`}),
            h('p',{textContent:`Color: ${row['color']}`}),
        )
        nameAndSizeAnColor.style.display = 'flex';
        nameAndSizeAnColor.style.flexDirection = 'column';
        nameAndSizeAnColor.style.justifyContent = 'space-around';
        
        td.append(image, nameAndSizeAnColor);
        return td;
    }

    createPriceCell(row) {
        const td = document.createElement('td');
        td.textContent = FormatCurrency(row['price']);
        return td;
    }

    createQuantityCell(row,tableRow) {
        const td = document.createElement('td');
        const quantityWrapper = document.createElement('div');
        quantityWrapper.className = 'quantity-wrapper';

        const quantityTag = document.createElement('p');
        quantityTag.textContent = row['quantity'];


        const btnUp = this.createQuantityButton('+', quantityTag, row,tableRow);
        const btnDown = this.createQuantityButton('-', quantityTag, row,tableRow);

        quantityWrapper.append(btnUp, quantityTag, btnDown);
        td.appendChild(quantityWrapper);
        return td;
    }

    createQuantityButton(sign, quantityTag, row,tableRow) {
        const button = document.createElement('h2');
        button.className = 'btn-adjustment';
        button.textContent = sign;
        button.onclick = async () => {
            const subtotalTag = tableRow.querySelector('.subtotal');
            const checkbox = tableRow.querySelector('.checkbox');
            const quantity = parseFloat(quantityTag.textContent);
            if (sign == '+' && quantity < row['leftQuantity']) {
                quantityTag.textContent = quantity + 1;
            } else if (sign === '-' && quantity > 1) {
                quantityTag.textContent = quantity - 1;
            }

            const oldSubtotal = parseFloat(subtotalTag.getAttribute('subtotal'));
            subtotalTag.setAttribute('subtotal',parseFloat(quantityTag.textContent) * parseFloat(row['price']))
            subtotalTag.textContent = FormatCurrency(parseFloat(quantityTag.textContent) * parseFloat(row['price']))
            if(checkbox.checked){
                
                this.totalTag.setAttribute('total',parseFloat(this.totalTag.getAttribute('total')) - oldSubtotal + parseFloat(subtotalTag.getAttribute('subtotal')));
                this.totalTag.textContent = FormatCurrency(this.totalTag.getAttribute('total'));
            }
            
            this.updateQuantityFn(row['productVariantId'],quantityTag.textContent);

        };

        return button;
    }

    updateQuantity(productVariantId,quantity){
        return fetch('/api/v1/user/update-cart-quantity',{
            method:'POST',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify({
                productVariantId:productVariantId,
                quantity:quantity,
            })
        })
    }

    createSubtotalCell(row) {
        const td = document.createElement('td');
        td.className = 'subtotal';
        td.textContent = FormatCurrency(parseFloat(row['total']));
        td.setAttribute('subtotal',row['total']);
        return td;
    }
    createTrashCell(row,tableRow){
        const trashCell = document.createElement('td');
        const trashSvg = document.createElement('span');
        trashSvg.className = 'trash-svg'
        trashSvg.innerHTML = this.trashSvg;
        trashCell.appendChild(trashSvg);
        trashSvg.onclick = async()=>{
            const checkbox = tableRow.querySelector('.checkbox');
            const isDeleted =  await this.deleteCart(row['productVariantId']);
            if(isDeleted==false) return;
            this.table.removeChild(tableRow);
            if(checkbox.checked == true){
                const subtotal = tableRow.querySelector('.subtotal');

                this.totalTag.setAttribute('total',parseFloat(this.totalTag.getAttribute('total')) - parseFloat(subtotal));

                this.totalTag.textContent = FormatCurrency(this.totalTag.getAttribute('total'));
            }
        }
        return trashCell;
    }

    async deleteCart(productVariantId){
        const response = await fetch('/api/v1/user/cart/delete', {
            method: "DELETE",
            headers:{
                'content-type':'application/json'
            },
            body: JSON.stringify(productVariantId),
        }).then(async re =>{
            if(!re.ok) return false;
            const data= await re.json();
            return !data.error;
        });
        return response;
    }
    createTotalPanel() {
        const totalPanel = document.createElement('div');
        totalPanel.className = 'total-panel';

        const totalWrapper = document.createElement('div');
        totalWrapper.className = 'total-tag';

        const totalTag = document.createElement('h3');
        totalTag.textContent = 'Tổng đơn hàng:';
        
        const total = document.createElement('h3');
        total.id = 'total';
        total.textContent = FormatCurrency('0');
        total.setAttribute('total',0);

        this.totalTag = total;

        totalWrapper.append(totalTag, total);

        const btnBuy = this.createBuyButton();

        totalPanel.append(totalWrapper, btnBuy);
        return totalPanel;
    }

    createBuyButton() {
        const btnBuy = document.createElement('span');
        btnBuy.className = 'btn-buy';
        btnBuy.textContent = 'Mua';
        
        btnBuy.onclick = async () => {
            const buyList = Array.from(document.querySelectorAll('tr')).slice(1)
                .filter(row => row.querySelector('.checkbox').checked)
                .map(row => ({
                    productVariantId: row.querySelector('.product').getAttribute('productVariantId'),
                    quantity: row.querySelector('.quantity-wrapper p').textContent
                }));
            if(buyList.length == 0){
                Toast('Chưa chọn sản phẩm', 'Vui lòng chọn sản phẩm');
                return;
            }
            const response = await fetch('/api/v1/user/add-orders-to-session', {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify(buyList)
            });
            
            if (response.ok) {
                window.location.href = `/order-summary`;
            }
        };
        
        return btnBuy;
    }
}

async function init() {
    async function getCartData() {
        const response = await fetch('/api/v1/user/cart');
        return response.json();
    }

    const data = await getCartData();
    const menu = Menu('cart');
    const cart = new Cart(data);
    const cartWrapper = cart.createCartWrapper();

    const profileWrapper = document.querySelector('.profile-wrapper');
    profileWrapper.append(menu, cartWrapper);
}

init();
