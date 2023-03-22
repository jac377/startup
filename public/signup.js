class User {
   
    constructor(username, password, firstName, lastName, currentDate) {
        this.username = username;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.dateEntries = [{
            date : currentDate,
            totalCups: 0,
            entries : [],
        }];
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
        alert('Passwords don\'t match');
        return false;
    }

    const currentDate = new Date().toLocaleDateString();
    createUser(userName.toLowerCase(), passCode, firstName, lastName, currentDate);
    return true;
}

function createUser(username, password, firstName, lastName, currentDate) {
    const newUser = new User(username, password, firstName, lastName, currentDate);
    let userUpdatedList = JSON.parse(localStorage.getItem("userList"));
    userUpdatedList.push(newUser);
    localStorage.setItem("userList", JSON.stringify(userUpdatedList));
}

function verifyIfUserExit(usernameIn){
    let userListCheck = JSON.parse(localStorage.getItem("userList"));

    for (let i = 0; i < userListCheck.length; i ++) {
        if (userListCheck[i].username === usernameIn){
            return true;
        }
    }
    return false;
}