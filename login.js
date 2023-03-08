const username1 = "jac1542";
const password1 = "1234";

function login() {
    const username = document.querySelector("#username").value;
    const password = document.querySelector("#password").value;
    const remember = document.querySelector("#rememberMeBox").checked;
    localStorage.setItem("userName", username);
    localStorage.setItem("password", password);
    localStorage.setItem("rememberMe", remember);

    if (username.toLowerCase() === "" || password === "") {
        return false;
    }
    
    if (username.toLowerCase() === username1){
        if(password === password1){
            localStorage.setItem("isLoged", true);
            return true;
        }
        else{
            localStorage.setItem("isLoged", false);
            alert("Wrong username or password");
            return false;
        }
    }
    else {
        alert('Wrong username or password');
        return false;
    }
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
    // --------------- Make sure to delete this line, otherwise, every time we log in, it will delete data ------------ //
    localStorage.clear();
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