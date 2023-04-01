const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
const socket = new WebSocket(`${protocol}://${window.location.host}/ws`);

socket.onopen = (event) => {
    addMsg('system', 'Chat', 'Connected. Ready to start chatting');
};

socket.onmessage = async (event) => {
    const chat = JSON.parse(await event.data.text());
    addMsg('friend', chat.name, chat.msg, chat.date);
};

socket.onclose = (event) => {
    addMsg('system', 'Chat', 'disconnected');
    document.querySelector('#msgBtn').disabled = true;
};

function addMsg (cls, from, msg, date = '') {
    const chatText = document.querySelector('#chat-text');
    chatText.innerHTML = 
    `<div><span class="${cls}">${date} - ${from}</span>: ${msg}</div>` + 
    chatText.innerHTML;
}

function sendMessage(){
    const msgEl = document.querySelector('#messageBox');
    const msg = msgEl.value;
    const username = localStorage.getItem('username');
    const dObj = new Date();
    let options = {
        year: "numeric",
        month: "numeric",
        day: "numeric" 
    };
    const date = dObj.toLocaleDateString("en-US", options);

    if (!!msg) {
        addMsg('Me', 'Me', msg);
        socket.send(`{"name":"${username}", "msg":"${msg}", "date": "${date}"}`);
        msgEl.value = '';
    }
}

const input = document.querySelector('#messageBox');
input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
        msgEl.value = '';
    }
});