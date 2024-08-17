const logo = document.querySelector('.logo')
logo.addEventListener('click',()=>{
    window.location.href = '/home'
})
const btnSearch = document.getElementById('btn-search')
const inputSearch = document.getElementById('input-search')
btnSearch.addEventListener(('click'),()=>{
    if(inputSearch.value === '') {
        inputSearch.focus()
        return;
    }
    window.location.href= '/search?keyword='+inputSearch.value; 
})

const profile = document.querySelector('.profile')
profile.addEventListener('click',()=>{
    window.location.href = "/profile"
})