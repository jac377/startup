const username1 = "jac1542";
const password1 = "1234";

function login() {
    let username = document.querySelector("#username").value;
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
            window.location.href = "main.html";
            return true;
        }
        else{
            alert("Wrong username or password");
            return false;
        }
    }
    else {
        alert('Wrong username or password');
        return false;
    }
}