export function Toast(title, message) {
    var toastContainer = document.createElement('div');
    toastContainer.classList.add('toast-container');
    
    var toast = document.createElement('div');
    toast.classList.add('toast');

    var toastTitle = document.createElement('h3');
    toastTitle.classList.add('toast-title');
    toastTitle.textContent = title;

    var toastMessage = document.createElement('span');
    toastMessage.classList.add('toast-message');
    toastMessage.textContent = message;

    toast.appendChild(toastTitle);
    toast.appendChild(toastMessage);
    
    toastContainer.appendChild(toast);
    
    document.body.appendChild(toastContainer);
    
    toast.classList.add('show');
    setTimeout(function() {
        toast.classList.remove('show');
        document.body.removeChild(toastContainer);
    }, 3000); 
}