export  function Info(data){
    data = {
        firstname:'Robert',
        lastname:'fox',
        phone: '(252) 555-0126',
        email: 'abc@gmail.com',
        age: 18,
        gender: 'female'
    }
    const infoPanel = document.createElement('div')
    
    const firstname = document.createElement('input')
    const lastname = document.createElement('input')
    const phone = document.createElement('input')
    const email = document.createElement('input')
    email.type = 'email'
    const age = document.createElement('input')
    const gender = document.createElement('input')

    infoPanel.appendChild(firstname)
    infoPanel.appendChild(lastname)
    infoPanel.appendChild(phone)
    infoPanel.appendChild(email)
    infoPanel.appendChild(age)
    infoPanel.appendChild(gender)

    return infoPanel;
}