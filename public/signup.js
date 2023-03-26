class User {
   
    constructor(username, password, firstName, lastName) {
        this.username = username;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        /* I will use this code to create a different collection, instead of having everything in one collection
        this.dateEntries = [{
            date : currentDate,
            totalCups: 0,
            entries : [],
        }];*/
    }

}

async function createNewLogIn() {

    const firstName = document.querySelector("#firstNameS").value;
    const lastName = document.querySelector("#lastNameS").value;
    const userName = document.querySelector("#userSignIn").value.toLowerCase();
    const passCode = document.querySelector("#passSignIn").value;
    const passConfirm = document.querySelector("#passConfirm").value;

    if (passCode !== passConfirm) {
        alert('Passwords don\'t match');
        return;
    }

    //const currentDate = new Date().toLocaleDateString();
    const response = await fetch('/api/auth/newuser', {
        method: 'post',
        body: JSON.stringify({
            username: userName,
            password: passCode,
            firstName: firstName,
            lastName: lastName,
        }),
        headers: { 
            'Content-type': 'application/json; charset=UTF-8',
        },
    });
    const body = await response.json();

    if (response?.status === 200) {
        localStorage.setItem('username', userName);
        window.location.href = 'index.html';
    }
    else {
        alert(body.msg);
        return;
    }
}