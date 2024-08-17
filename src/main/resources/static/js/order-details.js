function GetData(){
    fetch('/api/selling-detail/order-details')
    .then(async response =>{
        if(response.ok){
            let data = await response.json();
            TableBody(data)
        }
    })
}
function TableBody(data){   
    const tableBody = document.querySelector('.table-body')
    data.forEach(element => {
        let tr = document.createElement('tr');
        let clientId = document.createElement('td');
        let productId = document.createElement('td');
        let productName = document.createElement('td');
        let purchasingDate = document.createElement('td');
        let unitPrice = document.createElement('td');
        let quantity = document.createElement('td');
        let total = document.createElement('td');
        let status = document.createElement('td');

        status.className = 'status'

        clientId.textContent = element['clientId']
        productId.textContent = element['productId']
        productName.textContent = element['productName']
        purchasingDate.textContent = element['purchasingDate']
        unitPrice.textContent = element['unitPrice']
        quantity.textContent = element['quantity']
        total.textContent = element['total']
        if(element['status'] === 'SUCCESS')
            status.textContent = 'Đã giao'
        else if(element['status'] === 'PREPARATION')
            status.textContent = 'Đang chuẩn bị';
        else if(element['status'] === 'IN TRANSIT')
            status.textContent = 'Đang giao'
        else status.textContent = 'Đã hủy'

        tr.appendChild(clientId)
        tr.appendChild(productId)
        tr.appendChild(productName)
        tr.appendChild(purchasingDate)
        tr.appendChild(unitPrice)
        tr.appendChild(quantity)
        tr.appendChild(total)
        tr.appendChild(status)
        tableBody.appendChild(tr);

    });
}

GetData();

success.addEventListener('click',()=>{
    cancel.style.borderBottom = '';
    all.style.borderBottom = '';
    success.style.borderBottom = 'solid 2px black';
    preparation.style.borderBottom = '';
    inTransit.style.borderBottom = '';
    const trs = document.querySelectorAll('.table-body tr')
    trs.forEach(item=>{
        if(item.querySelector('.status').textContent !== 'Đã giao') item.style.display = 'none'
        else item.style.display = 'table-row'
    })
})
inTransit.addEventListener('click',()=>{
    cancel.style.borderBottom = '';
    all.style.borderBottom = '';
    success.style.borderBottom = '';
    preparation.style.borderBottom = '';
    inTransit.style.borderBottom = 'solid 2px black';
    const trs = document.querySelectorAll('.table-body tr')
    trs.forEach(item=>{
        if(item.querySelector('.status').textContent !== 'Đang giao') item.style.display = 'none'
        else item.style.display = 'table-row'
    })
})
preparation.addEventListener('click',()=>{
    cancel.style.borderBottom = '';
    all.style.borderBottom = '';
    success.style.borderBottom = '';
    preparation.style.borderBottom = 'solid 2px black';
    inTransit.style.borderBottom = '';
    const trs = document.querySelectorAll('.table-body tr')
    trs.forEach(item=>{
        if(item.querySelector('.status').textContent !== 'Đang chuẩn bị') item.style.display = 'none'
        else item.style.display = 'table-row'

    })
})
cancel.addEventListener('click',()=>{
    cancel.style.borderBottom = 'solid 2px black';
    all.style.borderBottom = '';
    success.style.borderBottom = '';
    preparation.style.borderBottom = '';
    inTransit.style.borderBottom = '';
    
    const trs = document.querySelectorAll('.table-body tr')
    trs.forEach(item=>{
        if(item.querySelector('.status').textContent !== 'Đang chuẩn bị') item.style.display = 'none'
        else item.style.display = 'table-row'
    })
})
all.style.borderBottom = 'solid 2px black';
all.addEventListener('click',()=>{
    all.style.borderBottom = 'solid 2px black';
    cancel.style.borderBottom = '';
    success.style.borderBottom = '';
    preparation.style.borderBottom = '';
    inTransit.style.borderBottom = '';
    const trs = document.querySelectorAll('.table-body tr')
  
    trs.forEach(item=>{
        item.style.display = 'table-row'
    })
})

