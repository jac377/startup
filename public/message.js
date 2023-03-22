class Messages {
    constructor(){
        loadMessages();
    }
}

function sendMessage(){
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
        let oldMsgList = JSON.parse(localStorage.getItem("messagesList"));
        oldMsgList.push(messageObj);
        localStorage.setItem('messagesList', JSON.stringify(oldMsgList));
    }

function loadMessages() {
    if (localStorage.getItem('messagesList') === null){
        localStorage.setItem('messagesList', JSON.stringify([]));
    }

    const messagesData = JSON.parse(localStorage.getItem("messagesList"));
    
    const tableEl = document.querySelector("#messageTable");

    if (messagesData.length > 0){
        for (let i = messagesData.length - 1; i >= 0; i--) {
            const senderEl = document.createElement('td');
            const dateEl = document.createElement('td');
            const messageEl = document.createElement('td');

            const username = messagesData[i].username;
            const date = messagesData[i].date;
            const message = messagesData[i].message;

            senderEl.textContent = username;
            dateEl.textContent = date;
            messageEl.textContent = message;

            const rowEl = document.createElement('tr');
                rowEl.appendChild(senderEl);
                rowEl.appendChild(dateEl);
                rowEl.appendChild(messageEl);

            tableEl.appendChild(rowEl);
        }
    }
}

const messages = new Messages();