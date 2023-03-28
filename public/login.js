(async () => {
    let authenticated = false;
    const username = localStorage.getItem('username');

    if (username) {
        const nameEl = document.querySelector('#username');
        nameEl.value = username;
        const user = await getUser(username);
        authenticated = user?.authenticated;
    }

    hideMenuItems();
})();

async function login() {
    const username = document.querySelector("#username").value;
    const password = document.querySelector("#password").value;
    const remember = document.querySelector("#rememberMeBox").checked;

    const response = await fetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ username: username, password: password }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    })

    const body = await response.json();

    if (response?.status === 200) {
        localStorage.setItem('rememberMe', remember);
        localStorage.setItem('username', username);
        window.location.href='main.html';
    }
    else {
        alert(body.msg);
    }
}

function logout(){
    console.log(localStorage.getItem('rememberMe'));
    if (localStorage.getItem('rememberMe') === 'false'){
        localStorage.removeItem('username');
    }
    fetch('/api/auth/logout', {
        method: 'delete',
    }).then(() => (window.location.href = '/'));
}

function hideMenuItems(){
   const linksButton = document.querySelectorAll("#menuLink");

   linksButton.forEach((item) => {
    item.style.display = 'none';
   })
}

function showMenuItems() {
    const linksButton = document.querySelectorAll("#menuLink");
    document.querySelector("#logOutBtn").style.visibility = 'visible';
    linksButton.forEach((item) => {
        item.style.display = 'show';
    })
}

async function getUser(username){
    const response = await fetch(`/api/user/${username}`);
    if (response.status === 200){
        return response.json();
    }

    return null;
}