async function  saveProfile(event){
    event.preventDefault();
    function isDataValid(data) {
        for (const key in data) {
            if (data[key] === null || data[key].trim() === "") {
               window.alert(key+ ' bị trống');
               return false
            }
        }
        return true
    }
    const username = document.querySelector('#username')
    const firstname = document.querySelector('#firstname')
    const lastname = document.querySelector('#lastname')
    const email = document.querySelector('#email')
    const phoneNumber = document.querySelector('#phone-number')
    const data = {
        username:username.value,
        firstname:firstname.value,
        lastname:lastname.value,
        email:email.value,
        phoneNumber:phoneNumber.value
    }
    if(!isDataValid(data)) return;
    fetch('/api/client/v1/update/profile',
        {
            method:"POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        }
    )
    .then(async respone=>{
        if(respone.ok){
            window.alert("Cập nhật thành công")
            window.location.reload();
        }
        
        
        else if(respone.status === 400)
        {
            let text = await respone.text();
            window.alert(text);
        }    
        else if(respone.status === 401)
            window.alert("Không có quyền truy cập")

        else if(respone.status === 500)
            window.alert("Lỗi hệ thống! không thể cập nhật lúc này");
        console.log(respone.text())
    })
}

const btnSave = document.querySelector('.btn-save')
btnSave.addEventListener('click',(e)=>saveProfile(e))
console.log(btnSave)