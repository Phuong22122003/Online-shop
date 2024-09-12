function createFooter(){
    const footer = document.querySelector('.footer')
    // console.log(footer)
    const firstColumn = document.createElement('div')

    const webName = document.createElement('h2')
    webName.textContent = 'Shopping'
    const phoneNumber = document.createElement('p')
    phoneNumber.innerHTML = '111-111-111'
    const email = document.createElement('p')
    email.textContent = 'hnguyenphuong09@gmail.com'
    const address = document.createElement('p')
    address.textContent = 'Quận 9'
    firstColumn.appendChild(webName)
    firstColumn.appendChild(phoneNumber)
    firstColumn.appendChild(email)
    firstColumn.appendChild(address)

    const secondColumn = document.createElement('div')
    
    const information = document.createElement('h3')
    information.textContent = 'Information'
    const introduce = document.createElement('p')
    introduce.textContent = 'About us' 
    const helpCenter = document.createElement('p')
    helpCenter.textContent = 'Help Center'
    const privacyPolicy = document.createElement('p')
    privacyPolicy.textContent = 'Privacy Policy'
    const termsAndconditions = document.createElement('p')
    termsAndconditions.textContent = 'Terms and conditions'

    secondColumn.appendChild(information)
    secondColumn.appendChild(introduce)
    secondColumn.appendChild(helpCenter)
    secondColumn.appendChild(privacyPolicy)
    
    const thirdColumn = document.createElement('div')

    const followOn = document.createElement('h3')
    followOn.textContent = 'Follow us on'
    const facebook = document.createElement('p')
    facebook.textContent = 'Facebook'
    const instagram  = document.createElement('p')
    instagram.textContent = 'Instagram'
    const linkedIn = document.createElement('p')
    linkedIn.textContent = 'LinkedIn'
    thirdColumn.appendChild(followOn)
    thirdColumn.appendChild(facebook)
    thirdColumn.appendChild(instagram)
    thirdColumn.appendChild(linkedIn)

    footer.appendChild(firstColumn)
    footer.appendChild(secondColumn)
    footer.appendChild(thirdColumn)
}   
createFooter()