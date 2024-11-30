export class PopUp{
    constructor(){
        this.popup = this._getPopUp();
        this.preventBackground = this.getPreventBackground();
        this.render();
    }
    render(){
        this.preventBackground.appendChild(this.popup);
        document.body.appendChild(this.preventBackground);
    }
    _getPopUp(){
        const popup = document.createElement('div');
        // Giả sử const popup đã được xác định là phần tử mà bạn muốn chỉnh style
        popup.style.position = 'relative';
        popup.style.left = '50%';
        popup.style.top = '50%';
        popup.style.transform = 'translate(-50%, -50%)';

        popup.style.display = 'flex';
        popup.style.flexDirection = 'column';
        popup.style.justifyContent = 'space-between';
        popup.style.backgroundColor = 'white';

        popup.style.width = '454px';
        popup.style.height = '504px';
        popup.style.padding = '24px';
        return popup;
    }
    getPreventBackground(){
        // Tạo phần tử div và thêm lớp .prevent-background vào
        const backgroundOverlay = document.createElement('div');
        backgroundOverlay.classList.add('prevent-background');

        // Thêm các thuộc tính CSS cho lớp .prevent-background
        backgroundOverlay.style.position = 'fixed';
        backgroundOverlay.style.top = '0';
        backgroundOverlay.style.left = '0';
        backgroundOverlay.style.width = '100vw';
        backgroundOverlay.style.height = '100vh';
        backgroundOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        backgroundOverlay.style.zIndex = '1000'; // Đảm bảo nó hiển thị phía trên các phần tử khác

        // Chèn phần tử vào trang
        return backgroundOverlay;

    }
    remove(){
        document.body.removeChild(this.preventBackground);
    }
    addPopUp(){
        document.body.appendChild(this.preventBackground);
    }
    getPopUp(){
        return this.popup;
    }

}