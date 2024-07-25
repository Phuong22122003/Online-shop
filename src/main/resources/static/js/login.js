// // import { getCookie,setCookie } from "./cookie"
// const form = document.querySelector('form')
// form.addEventListener('submit', async (event)=>{
//     event.preventDefault()
//     const inputs = document.querySelectorAll('input')
//     inputs.forEach(input=>{
//         if(input.value.trim().length ==0)
//         {
//             input.focus()
//             return;
//         }
//     })
//     const username = inputs[0].value
//     const password = inputs[1].value
//     const data = {
//         username:username,
//         password:password
//     }
//     console.log(JSON.stringify(data))
//     try{
//         const respone = await fetch('/api/authenticate',{
//             method:"POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify(data)
//         })
//         if(respone.status == 401)
//         {
//             const message = document.querySelector('.message')
//             message.style.display = "inline-flex";
//             message.innerHTML = 'Sai mật khẩu hoặc tên đăng nhập'
//         }
//         if(respone.ok){
//             const token = await respone.text()
//             console.log(token)
//             setCookie('token','Bearer ' +token,7);
//         }
//         console.log(getCookie('token'))
//     }
//     catch(error){
//         console.log(error)
//     }
// })