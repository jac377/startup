
function login() {
    if (localStorage.getItem('userList') === null){
        alert("No Data Base");
        return false;
    };

    let userList = JSON.parse(localStorage.getItem("userList"));

    const username = document.querySelector("#username").value;
    const password = document.querySelector("#password").value;
    const remember = document.querySelector("#rememberMeBox").checked;
    localStorage.setItem("userName", username);
    localStorage.setItem("password", password);
    localStorage.setItem("rememberMe", remember);

    if (username.toLowerCase() === "///cleardatabase\\\\\\") {
        clearData();
        return false;
    }

    if (username.toLowerCase() === "" || password === "") {
        return false;
    }
    
    if (verifyUser(username.toLowerCase(), password, userList)){
        localStorage.setItem("isLoged", true);
        return true;
    }
    else {
        alert('Wrong username or password');
        return false;
    }
}


function verifyUser(usernameIn, passwordIn, userList){
    for (let i = 0; i < userList.length; i++) {
        if (userList[i].username === usernameIn) {
            if (userList[i].password === passwordIn) {
                return true;
            }
            else {
                return false;
            }
        }
    }

    return false;
}

function getIsLogedIn(){
    console.log("Is it logged in? " + localStorage.getItem("isLoged"));
    if( localStorage.getItem("isLoged") === "true") {
        document.querySelector("#logOutBtn").style.visibility = 'visible';
        showMenuItems();
    }
    else {
        hideMenuItems();
        document.querySelector("#logOutBtn").style.visibility = 'hidden';
    }
}

function logOut(){
    localStorage.setItem("isLoged", false);
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

function clearData() {
    localStorage.clear();
    alert('Data deteled');
}