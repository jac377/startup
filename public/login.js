(async () => {
    const username = localStorage.getItem('username');

    if (username) {
        const nameEl = document.querySelector('#username');
        const boxEl = document.querySelector("#rememberMeBox");
        if (nameEl.tagName.toLowerCase() === "input"){
            nameEl.value = username;
            boxEl.checked = true;
        }

        //need to add authentication, so it doesn't load any pages again once logged out
        else{
            nameEl.textContent = username;
        }
    }

    console.log(JSON.parse(localStorage.getItem('isLoggedIn')));

    if (JSON.parse(localStorage.getItem('isLoggedIn'))){
        showMenuItems();
    }
    else {
        hideMenuItems();
    }
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
        localStorage.setItem('isLoggedIn', JSON.stringify(true));
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
    localStorage.setItem('isLoggedIn', JSON.stringify(false));
}

function hideMenuItems(){
   const linksButton = document.querySelectorAll("#menuLink");
   linksButton.forEach((item) => {
    item.style.display = 'none';
   })
}

function showMenuItems() {
    const linksButton = document.querySelectorAll("#menuLink");
    document.querySelector("#logOutBtn").style.display = 'show';
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