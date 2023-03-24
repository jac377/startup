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

async function createUser(username, password, firstName, lastName, currentDate) {
    const newUser = new User(username, password, firstName, lastName, currentDate);

    try{
        const response = await fetch('api/signup', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(newUser),
        });
        const userName = await response.json();
        return userName;
    }
    catch {
        console.log('Error in createUser')
    }
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