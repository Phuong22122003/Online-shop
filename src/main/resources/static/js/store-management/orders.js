import { Menu } from "./menu.js"
import {Toast} from "../toast.js"
import { PopUp } from "../popup.js";
class Orders{
    constructor(){
        this.orderWrapper = document.createElement('div');
        this.orderWrapper.className = 'order-wrapper';
        this.statusTranslation =  {
            confirming:'Chờ xác nhận',
            cancelled: 'Đã hủy',
            preparing: 'Đang chuẩn bị',
            inprocess: 'Đang giao',
            delivered: 'Đã giao',
        }
        this.isLoading = document.createElement('h2');
        this.isLoading.textContent = 'Đang tải dữ liệu';
        this.isLoading.style.textAlign = 'Center';
        this.to = new Date();
        this.from = new Date();
        this.from.setMonth(this.from.getMonth()-1);
        this.init();
    }
    render(){
        return this.orderWrapper;
    }
    async init(){
        this.orderWrapper.appendChild(this.isLoading);
        this.data = await this.getOrdersData();
        this.orderWrapper.removeChild(this.isLoading);
        console.log(this.data);
        this.filter = this.createFilter();
        this.orderWrapper.appendChild(this.filter);
        
        if(this.data.error == true) return;
        this.table = this.createTable(this.data.data);
        
        this.orderWrapper.appendChild(this.table);
    }
    formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() +1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    getOrdersData(){
        const params = new URLSearchParams(window.location.search);
        let status = params.get("status");
        this.status = status;
        let url = '';
        if(status == null)
            url = `/api/v1/admin/orders/all`;
        else 
            url  = `/api/v1/admin/orders/${status}`;
        const response = fetch(url).then(response => response.json());

        return response;
    }
    getMagnifierSvg(){
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
    createFilter(){
        const filter = document.createElement('div');
        filter.className = 'filter';

        const dateWrapper = document.createElement('div');
        dateWrapper.className = 'date-wrapper';

        const fromTag = document.createElement('span');
        fromTag.textContent = 'Từ ngày:';
        
        const from = document.createElement('input');
        from.type = 'date';
        from.value = this.formatDate(this.from);
        from.onchange = ()=>{
            this.filterOrderByDate();
        }
        this.fromInput = from;

        const toTag = document.createElement('span');
        toTag.textContent = 'Đến ngày:';

        const to = document.createElement('input');
        to.type = 'date';
        to.value = this.formatDate(this.to);
        to.onchange = ()=>{
            console.log('chage');
            this.filterOrderByDate();
        }
        this.toInput = to;
        dateWrapper.appendChild(fromTag);
        dateWrapper.appendChild(from);
        dateWrapper.appendChild(toTag);
        dateWrapper.appendChild(to);

        const searchWrapper = document.createElement('div');
        searchWrapper.className = 'search-wrapper';

        const searchInput = document.createElement('input');
        searchInput.placeholder = 'Tìm theo mã đơn';
        searchInput.id = 'search-input';
        searchInput.addEventListener('keydown',(e)=>{
            if(e.key == 'Enter'){
                if(searchInput.value == '') return;
                this.filterOrderByKey(searchInput.value);
            }
        })
        const magnifier = document.createElement('span');
        magnifier.innerHTML = this.getMagnifierSvg();
        magnifier.onclick = ()=>{
            this.filterOrderByKey(searchInput.value);
        }
        searchWrapper.appendChild(searchInput);
        searchWrapper.appendChild(magnifier);
        
        filter.appendChild(dateWrapper);
        filter.appendChild(searchWrapper);

        return filter;
    }
    filterOrderByDate(){
        if(this.fromInput.value == ''|| this.toInput == '') {
            return;
        }
        const key = this.orderWrapper.querySelector('#search-input');
        key.value = '';
        const trs = this.table.querySelectorAll('tr');
        const from = new Date(this.fromInput.value);
        const to = new Date(this.toInput.value);
        for(let i=1;i<trs.length;i++){
            const order = trs[i];
            const purchasingDate = order.querySelector('.purchasing-date');
            const date = new Date(purchasingDate.textContent);
            if(date>=from&&date<=to) order.style.display = 'table-row';
            else order.style.display = 'none';
        }
        
    }
    filterOrderByKey(key){
        if(key == '')return;
        this.fromInput.value = '';
        this.toInput.value = '';
        const trs = this.table.querySelectorAll('tr');
        for(let i=1;i<trs.length;i++){
            const order = trs[i];
            const orderId = order.querySelector('.order-id').textContent;
            const names = order.querySelectorAll('.product-name');
            let has = false;
            for(let name of names){
                console.log(name.textContent.toLowerCase().includes(key.toLowerCase()))
                if(name.textContent.toLowerCase().includes(key.toLowerCase())) {
                    order.style.display = 'table-row';
                    has = true;
                    break;
                }
            }
            if(has == true) continue;
            if(orderId == key) order.style.display = 'table-row';
            else order.style.display = 'none';
        }
    }
    createTable(data){
        const table = document.createElement('table');
        table.className = 'orders';
        const listTableHeader = ['Mã đơn đặt','Sản phẩm','Doanh thu' , 'Người mua','Trạng thái','']
        const header = document.createElement('tr')
        listTableHeader.forEach(item=>{
            const th = document.createElement('th')
            th.textContent = item
            header.appendChild(th)
        })

        table.appendChild(header)

        data.forEach(item=>{
            const order = document.createElement('tr')
            order.className = 'order'
            if(this.toInput.value!=''&&this.fromInput.value!=''){
                const date = new Date(item['purchasingDate']);
                const from = new Date(this.fromInput.value);
                const to = new Date(this.toInput.value);
                if(date<from||date>to){
                    order.style.display = 'None';
                }
            }
            const orderId = document.createElement('td')
            orderId.className = 'order-id'
            orderId.textContent = item['orderId']

            const products = document.createElement('td');
            let priceTemp = 0;
            item['products'].forEach(product=>{

                priceTemp += parseFloat(product['quantity']) * parseFloat(product['unitPrice']);
                const productWrapper = document.createElement('div')
                productWrapper.className = 'product-wrapper'
        
                const productImage = document.createElement('img');
                productImage.src = product['imagePath']
                productImage.style.width = '50px';
                productImage.style.height = '50px';
        
                const productInfo = document.createElement('div')
                productInfo.className = 'product-info'
                
                const productName = document.createElement('span')
                productName.textContent = product['name']
                productName.className = 'product-name';
                productName.style.maxWidth = '120px';

                const size = document.createElement('span')
                size.textContent = product['size']
                size.className = 'size';

                const color = document.createElement('span');
                color.textContent = product['color'];
                color.className = 'color';

                const unitPrice = document.createElement('span');
                unitPrice.className = 'unit-price';
                unitPrice.textContent = product['unitPrice'];

                productInfo.appendChild(productName)
                productInfo.appendChild(size)
                productInfo.appendChild(color)
                productInfo.appendChild(unitPrice)

                const productQuantity = document.createElement('span')
                productQuantity.textContent = product['quantity']
                productQuantity.className = 'product-quantity'

        
                productWrapper.appendChild(productImage);
                productWrapper.appendChild(productInfo);
                productWrapper.appendChild(productQuantity);
                // productWrapper.appendChild(unitPrice);
        
                products.appendChild(productWrapper)
            })

            const total = document.createElement('td')
            const totalWrapper = document.createElement('div')
            totalWrapper.className = 'total-wrapper'

            const productPrice = document.createElement('span')
            productPrice.textContent = priceTemp;
            productPrice.className = 'product-price'
            
            const deliveryFee = document.createElement('span');
            deliveryFee.textContent = item['deliveryFee'];
            deliveryFee.className = 'delivery-fee'

            const grandTotal = document.createElement('span')
            grandTotal.textContent = priceTemp + item['deliveryFee']
            grandTotal.className = 'grand-total'

            totalWrapper.appendChild(productPrice)
            totalWrapper.appendChild(deliveryFee)
            totalWrapper.appendChild(grandTotal)

            total.appendChild(totalWrapper)

            const userInfo = document.createElement('td')
            userInfo.style.maxWidth = '200px';
            const userWrapper = document.createElement('div')
            userWrapper.className = 'user-info';

            const fullname = document.createElement('span');
            fullname.textContent = item['fullname'];
            fullname.className = 'fullname';

            const purchasingDate = document.createElement('span');
            purchasingDate.textContent = item['purchasingDate'];
            purchasingDate.className = 'purchasing-date';

            const phoneNumber = document.createElement('span');
            phoneNumber.textContent = item['phone'];
            phoneNumber.className = 'phone';

            const address = document.createElement('span');
            address.textContent = item['address'];
            address.className = 'address'

            userWrapper.appendChild(fullname);
            userWrapper.appendChild(phoneNumber);
            userWrapper.appendChild(address);
            userWrapper.appendChild(purchasingDate);

            userInfo.appendChild(userWrapper)

            const status = document.createElement('td')
            status.textContent = this.statusTranslation[item['status'].toLowerCase()]

            const schedulePickup = document.createElement('td');
            
            if(item['status'].includes('Confirming')){
                const btn = document.createElement('span');
                btn.className = 'btn-schedule';
                btn.textContent = 'Xác nhận đơn hàng';
                btn.onclick = ()=>{
                    this.rederPopUp(item,status,btn);
                    // this.confirmOrder(item,status,btn);
                }
                schedulePickup.appendChild(btn )
            }
            else if(item['deliveryOrderId']==null||item['deliveryOrderId']==''){
                const note = document.createElement('span')
                note.textContent = 'Đơn hàng chưa tạo trên GHN';
                schedulePickup.appendChild(note);
            }
            else{
                const btn = document.createElement('span');
                btn.className = 'btn-schedule';
                btn.textContent = 'Xem chi tiết';
                btn.onclick = ()=>{
                    this.viewDetail(item.deliveryOrderId);
                }
                schedulePickup.appendChild(btn )
            }


            order.appendChild(orderId)
            order.appendChild(products)
            order.appendChild(total)
            order.appendChild(userInfo)
            order.appendChild(status)
            order.appendChild(schedulePickup)
            table.appendChild(order)
        })
        return table;
    }
    viewDetail(deliveryOrderId){
        let url = `https://khachhang.ghn.vn/order/edit/${deliveryOrderId}`
        
        window.open(url, '_blank').focus();
    }
    getCloseSvg(){
        return`
        <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="24" height="24" fill="white"/>
            <path d="M7 17L16.8995 7.10051" stroke="#000000" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M7 7.00001L16.8995 16.8995" stroke="#000000" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`
    }

    rederPopUp(item,status,btn){
        console.log(item);
        const svg = this.getCloseSvg();
        const popupObject = new PopUp();
        const popup = popupObject.getPopUp();
        const head = document.createElement('h3');
        head.style.alignSelf = 'center';
        head.textContent = 'Xác nhận đơn hàng';

        const closeSvg = document.createElement('span');
        closeSvg.innerHTML = svg;
        closeSvg.style.alignSelf = 'flex-end';
        closeSvg.style.cursor = 'pointer';
        const note = document.createElement('textarea');
        note.style.flexGrow = '1';
        note.style.margin = '20px 5px';
        note.placeholder = 'Nhập chú thích';

        const orderId = document.createElement('span');
        orderId.textContent = 'Mã đơn hàng: '+item['orderId'];

        const customerName = document.createElement('span');
        customerName.textContent = 'Họ và tên: ' +item['fullname']; 

        const address = document.createElement('span');
        address.textContent = 'Địa chỉ: '+ item['address'];
        
        const numProducts = document.createElement('span');
        numProducts.textContent =  ` Số sản phẩm: ${item['products'].length}`;

        const btnConfirm = document.createElement('span');
        btnConfirm.textContent = 'Tạo đơn hàng';
        btnConfirm.className = 'btn-schedule';
        const btnCancel = document.createElement('span');
        btnCancel.textContent = 'Hủy đơn hàng';
        btnCancel.className = 'btn-schedule';
        btnCancel.style.backgroundColor = 'red';
        const btnWrapper = document.createElement('div');
        btnWrapper.style.display = 'flex';
        btnWrapper.style.justifyContent = 'space-around';
        btnWrapper.appendChild(btnCancel);
        btnWrapper.appendChild(btnConfirm);

        popup.appendChild(closeSvg);
        popup.appendChild(head);
        popup.appendChild(orderId);
        popup.appendChild(customerName);
        popup.appendChild(address);
        popup.appendChild(numProducts);
        popup.appendChild(note);
        popup.appendChild(btnWrapper);

        closeSvg.onclick = ()=>{
            popupObject.remove();
        }
        btnCancel.onclick = ()=>{
            this.cancelOrder(item,status,btn);
            popupObject.remove();
        }
        btnConfirm.onclick = ()=>{
            this.confirmOrder(item,status,btn);
            popupObject.remove();
        }
    }
    cancelOrder(item,status,btn){
        fetch('/api/v1/admin/cancel-order',{
            method:'POST',
            headers:{
                'content-type':'application/json'
            },
            body: JSON.stringify(item['orderId'])
        }).then(async response=>{
            const reponseData = await response.json()
            if(!response.ok){
                Toast('Thất bại',reponseData.message);
                return;
            }
            Toast('Thành công', 'Đơn hàng đã được xác nhận');
            if(this.status =='all'){
                btn.textContent = 'Xem chi tiết';
                status.textContent = 'Chờ lấy hàng';
                btn.onclick = ()=>{this.viewDetail(reponseData.data)}
            }
            else 
                this.removeOrder(item['orderId']);
            
        }).catch(error=>{
            console.log(error);
            Toast('Lỗi','Lỗi hệ thống');
        })
    }
    confirmOrder(item,status,btn){
        fetch('/api/v1/admin/confirm-order',{
            method:'POST',
            headers:{
                'content-type':'application/json'
            },
            body: JSON.stringify(item['orderId'])
        }).then(async response=>{
            const reponseData = await response.json()
            if(!response.ok){
                Toast('Thất bại',reponseData.message);
                return;
            }
            Toast('Thành công', 'Đơn hàng đã được xác nhận');
            if(this.status =='all'){
                btn.textContent = 'Xem chi tiết';
                status.textContent = 'Chờ lấy hàng';
                btn.onclick = ()=>{this.viewDetail(reponseData.data)}
            }
            else 
                this.removeOrder(item['orderId']);
            
        }).catch(error=>{
            console.log(error);
            Toast('Lỗi','Lỗi hệ thống');
        })
    }
    removeOrder(orderId){
        const orders = this.table.querySelectorAll('tr');
        console.log(orders.length)
        for(let i =1 ;i< orders.length;i++){
            const order = orders[i];
            const td = order.querySelector('.order-id');
            console.log(order)
            if(td.textContent == orderId){
                this.table.deleteRow(i);
                return;
            }
        }
    }
}

function init(){
    const managementWrapper = document.querySelector('.management-wrapper')
    const menu = Menu()
    const orders = new Orders()
    managementWrapper.appendChild(menu)
    managementWrapper.appendChild(orders.render())
}

init()