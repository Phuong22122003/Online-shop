import { Product } from "./filter-product-wrapper.js";
import { AssistantSvg, CloseSvg, NavigateSvg ,ReplySvg, SadSvg} from "../svg.js";
import { LikeSvg,DislikeSvg } from "../svg.js";
import { PopUp } from "../popup.js";
// import "../../css/shopping/filter-product-wrapper.css";
export class ChatComponent {
    constructor() {
        this.messageData = [];
        this.messageIconWrapper = document.createElement('div');
        this.messageIcon = document.createElement('img');

        this.messageIcon.src = '/assets/message.svg';
        this.messageIcon.onclick = () => { this.showChatBox() };
        this.messageIconWrapper.className = 'message-icon';

        this.messageIconWrapper.appendChild(this.messageIcon);
        document.body.appendChild(this.messageIconWrapper);
        toastr.options = {
            "closeButton": false, // Không hiện nút đóng
            "progressBar": true,  // Thanh tiến trình hiển thị thời gian tắt
            "positionClass": "toast-top-right", // Vị trí: góc phải trên
            "timeOut": "2000",    // Tự động đóng sau 3 giây
        };
    }
    showChatBox(){
        if(this.chatBox== null){
            this.creatChatBox();
        }
        else{
            this.chatBox.style.display = 'flex';
        }
    }
    creatChatBox() {
        if (this.chatBox == null) {
            this.chatBox = document.createElement('div');
            this.chatBox.className = 'chatbox';
            document.body.appendChild(this.chatBox);
        }

        this.header = document.createElement('div');
        this.header.className = 'chatbox-header';
        this.header.style.padding = '5px';
        const wrapper = document.createElement('div');
        wrapper.style.display = 'flex';
        wrapper.style.alignItems = 'center';
        wrapper.style.gap = '5px';
        this.chatBotSvg = AssistantSvg();

        this.chatBotTag = document.createElement('soan');
        this.chatBotTag.textContent = 'Hỗ trợ tư vấn sản phẩm';

        this.closeIcon = document.createElement('img')
        this.closeIcon.src = '/assets/close.svg';
        this.closeIcon.className = 'close-icon'
        this.closeIcon.onclick = () => { this.closeChatBox() };

        this.message = document.createElement('div');
        this.message.className = 'message';

        this.text = document.createElement('span')
        this.text.className = 'text';
        this.text.classList.add('chatbot-text')
        this.text.textContent = 'Xin chào tôi có thể tư vấn gì cho bạn';

        this.footer = document.createElement('div')
        this.footer.className = 'chatbox-footer'
        this.messageInput = document.createElement('textarea');
        this.messageInput.className = 'message-input';

        this.btnSend = document.createElement('img');
        this.btnSend.onclick = () => { this.addMessage() }
        this.btnSend.src = '/assets/send.svg';
        this.btnSend.className = 'btn-send';


        wrapper.appendChild(this.chatBotSvg);
        wrapper.appendChild(this.chatBotTag);
        this.header.appendChild(wrapper);
        this.header.appendChild(this.closeIcon);
        this.message.appendChild(this.text)
        this.footer.appendChild(this.messageInput);
        this.footer.appendChild(this.btnSend);

        this.chatBox.appendChild(this.header);
        this.chatBox.appendChild(this.message);
        this.chatBox.appendChild(this.footer);
    }
    navigate(des){
        window.location.href = `/search-by-des?des=${des}`;
    }
    //Không sử dụng nữa => chuyển sang chatbot
    response(des) {
        fetch(`/api/v1/products/search-by-des?des=${des}`)
        .then(async response => {
            const data = await response.json();
            console.log(data)
            const text = document.createElement('span');
            text.className = 'text';
            text.classList.add('chatbot-text');
            this.message.appendChild(text);

            if(data.products.length == 0){
                text.textContent = 'Không tìm thấy sản phẩm. Bạn có thể nhập chi tiết hơn';
                return;
            }

            text.textContent = `Hệ thống tìm được ${data.products.length} sản phẩm`;
            const navigate = document.createElement('span');
            navigate.className = 'search-navigate';
            navigate.innerHTML = NavigateSvg();
            navigate.title = 'tìm sản phẩm';
            navigate.onclick = ()=>{
                this.navigate(des);
            }
            text.appendChild(navigate);

            if(data.searchResponseDto.genders.length ==0){
                const addInfo = document.createElement('span');
                addInfo.className = 'text chatbot-text';
                addInfo.textContent = 'Bạn có thể cung cấp thêm giới tính. Tiếp tục tại đây';

                const reply = document.createElement('span');
                reply.innerHTML = ReplySvg();
                reply.style.cursor = 'pointer';
                reply.onclick = ()=>{
                    this.messageInput.value = '';
                    this.messageInput.value = data.searchResponseDto.message;
                }
                
                addInfo.appendChild(reply);
                this.message.appendChild(addInfo);
            }
            
        })
        .catch(error=>{
            console.log(error)
            const text = document.createElement('span');
            text.className = 'text';
            text.classList.add('chatbot-text');
            this.message.appendChild(text);
            text.textContent = 'Xin lỗi hệ thống đang gặp sự cố.';
        })
    }
    dislikeHandler(question,answer) {
        const data = {
            question:question,
            answer:answer,
            label: "" // Chỉ giữ một nhãn
        };
    
        const popupComponent = new PopUp();
        const popup = popupComponent.getPopUp();
        popup.style.width = '300px';
        popup.style.height = '180px';
        popup.style.display = 'flex';
        popup.style.flexDirection = 'column';
        popup.className = 'popup-dislike';
    
        // Close button
        const close = document.createElement('span');
        close.innerHTML = CloseSvg();
        close.style.alignSelf = 'flex-end';
        close.style.cursor = 'pointer';
        close.className = 'close';
        close.onclick = () => popupComponent.remove();
    
        // Title
        const title = document.createElement('h3');
        title.style.margin = '0';
        title.textContent = 'Lý do không phù hợp';
    
        // Radio Option 1: Off-Topic
        const offTopicWrapper = document.createElement('div');
        const offTopicRadio = document.createElement('input');
        offTopicRadio.type = 'radio';
        offTopicRadio.name = 'dislikeReason';
        offTopicRadio.id = 'off-topic';
        offTopicRadio.onclick = () => toggleLabel('Off-Topic');
    
        const offTopicLabel = document.createElement('label');
        offTopicLabel.textContent = 'Tư vấn sai chủ đề';
        offTopicLabel.htmlFor = 'off-topic';
    
        offTopicWrapper.appendChild(offTopicRadio);
        offTopicWrapper.appendChild(offTopicLabel);
    
        // Radio Option 2: Inaccurate
        const inaccurateWrapper = document.createElement('div');
        const inaccurateRadio = document.createElement('input');
        inaccurateRadio.type = 'radio';
        inaccurateRadio.name = 'dislikeReason';
        inaccurateRadio.id = 'inaccurate';
        inaccurateRadio.onclick = () => toggleLabel('Inaccurate');
    
        const inaccurateLabel = document.createElement('label');
        inaccurateLabel.textContent = 'Tư vấn không chính xác';
        inaccurateLabel.htmlFor = 'inaccurate';
    
        inaccurateWrapper.appendChild(inaccurateRadio);
        inaccurateWrapper.appendChild(inaccurateLabel);
    
        // Submit button
        const submitButton = document.createElement('button');
        submitButton.textContent = 'Gửi';
        submitButton.className = 'submit';
        submitButton.disabled = true; // Initially disabled
        submitButton.style.cursor = 'not-allowed';
        submitButton.onclick = () => {
            this.sendRating(data);
            popupComponent.remove();
        };
    
        const toggleLabel = (label) => {
            data.label = label;
    
            // Enable submit button
            submitButton.disabled = false;
            submitButton.style.cursor = 'pointer';
        };
    
        // Assemble popup
        const wrapper = document.createElement('div');
        wrapper.className = 'popup-dislike-wrapper';
        wrapper.style.flexGrow = '1';
        wrapper.style.display = 'flex';
        wrapper.style.flexDirection = 'column';
        wrapper.style.justifyContent = 'space-between';
        wrapper.appendChild(close);
        wrapper.appendChild(title);
        wrapper.appendChild(offTopicWrapper);
        wrapper.appendChild(inaccurateWrapper);
        wrapper.appendChild(submitButton);
    
        popup.appendChild(wrapper);
        popupComponent.addPopUp();
    }
    
    
    sendRating(rating){
        fetch('/api/v1/ai/save-message',{
            method:'POST',
            headers:{
                'content-type':'application/json',
            },
            body:JSON.stringify(rating)
        }).then(response =>{
            if(response.ok){
                toastr.success('Cảm ơn bạn đã đánh giá','Thành công');
            }
        })
    }
    sendMessage(message){
        this.btnSend.style.cursor = 'not-allowed';
        this.btnSend.onclick = () => {}
        fetch(`/api/v1/ai/conversation`,{
            method:'POST',
            headers:{
                'content-type':'application/json',
            },
            body: message
        })
        .then(async response => {
            const answer = await response.text();
            console.log(answer)
            const text = document.createElement('span');
            text.textContent = answer;
            text.className = 'text';
            text.classList.add('chatbot-text');
            const likeSvg = LikeSvg();
            likeSvg.onclick = ()=>{
                likeSvg.onclick = null;
                const path = likeSvg.querySelector('path');
                path.style.fill = 'red';
                dislikeSvg.onclick = null;
                this.sendRating({
                    question: message,
                    answer: answer,
                    label: 'Accurate',
                })
            }
            const dislikeSvg = DislikeSvg();
            const div = document.createElement('div');
            div.appendChild(likeSvg);
            div.appendChild(dislikeSvg);
            dislikeSvg.onclick = ()=>{
                likeSvg.onclick = null;
                dislikeSvg.onclick = null;
                const path = dislikeSvg.querySelector('path');
                path.style.fill = 'red';
                this.dislikeHandler(message,answer);
            }
            text.appendChild(div);
            this.message.appendChild(text);
            this.btnSend.onclick = () => { this.addMessage() }
            this.btnSend.style.cursor = 'pointer';
        })
        .catch(error=>{
            this.btnSend.onclick = () => { this.addMessage() }
            this.btnSend.style.cursor = 'pointer';

            console.log(error)
            const text = document.createElement('span');
            text.className = 'text';
            text.classList.add('chatbot-text');
            this.message.appendChild(text);
            text.textContent = 'Xin lỗi hệ thống đang gặp sự cố.';
        })
    }
    addMessage() {
        if (this.messageInput.value == '') return;
        console.log(this.messageInput.value)
        // this.response(this.messageInput.value);
        this.sendMessage(this.messageInput.value);
        const text = document.createElement('span');
        text.className = 'text';
        text.classList.add('user-text');
        text.textContent = this.messageInput.value;
        this.messageInput.value = '';
        this.message.appendChild(text);
    }
    closeChatBox() {
        // document.body.removeChild(this.chatBox);
        // this.chatBox = null;
        this.chatBox.style.display = 'none';
    }
    getMessageBox(){
        return this.message;
    }
}
// new ChatComponent()