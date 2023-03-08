class User {
   
    constructor(username, password, firstName, lastName) {
        this.username = username;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
    }

}

function newSignIn() {

    const firstName = document.querySelector("#firstNameS").value;
    const lastName = document.querySelector("#lastNameS").value;
    const userName = document.querySelector("#userSignIn").value;
    const passCode = document.querySelector("#passSignIn").value;
    const passConfirm = document.querySelector("#passConfirm").value;

    if (localStorage.getItem("userList") === null) {
        let userList = [];
        localStorage.setItem("userList", JSON.stringify(userList));
    }

    if (verifyIfUserExit(userName)){
        alert('Username already exists. Please, choose another one');
        return false;
    }

    if (passCode !== passConfirm) {
        alert('Passwords don\' match');
        return false;
    }

    createUser(userName.toLowerCase(), passCode, firstName, lastName);

    return true;
}

function createUser(username, password, firstName, lastName) {
    const newUser = new User(username, password, firstName, lastName);
    let userUpdatedList = JSON.parse(localStorage.getItem("userList"));
    userUpdatedList.push(newUser);
    localStorage.setItem("userList", JSON.stringify(userUpdatedList));
}

function verifyIfUserExit(usernameIn){
    let userListCheck = JSON.parse(localStorage.getItem("userList"));

    console.log("In Verify. Length of list: " + userListCheck.length);

    for (let i = 0; i < userListCheck.length; i ++) {
        if (userListCheck[i].username === usernameIn){
            return true;
        }
    }
    return false;
}