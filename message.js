class MessageList {
    message;

    constructor() {
        this.messageList = [];
        if (localStorage.getItem('messagesList') === null){
            localStorage.setItem('messagesList', JSON.stringify(this.messageList));
        }
    }
    sendMessage(){
        const messageInput = document.querySelector('#messageBox').value;
        const username = localStorage.getItem('userName');
        const dObj = new Date();
        let options = {
            year: "numeric",
            month: "short",
            day: "numeric" 
        };
        const messageDate = dObj.toLocaleDateString("en-US", options);

        const messageObj = {message: messageInput, date: messageDate, username: username};
        let oldMsgList = JSON.parse(localStorage.getItem("messageList"));
        oldMsgList.push(messageObj);
        localStorage.setItem('messageList', JSON.stringify(oldMsgList));

        let test = JSON.parse(localStorage.getItem("messageList"));
    }
}

const messages = new MessageList();