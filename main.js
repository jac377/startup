class DrinkingLog {

    constructor() {
        const playerNameEl = document.querySelector(".fullName");
        playerNameEl.textContent = this.getPersonName();
        console.log("This is the name of the person " + this.getPersonName());
    }

    getPersonName() {
        const userList = JSON.parse(localStorage.getItem("userList"));
        const currentUser = localStorage.getItem("userName");

        for (let i = 0; i < userList.length; i++) {
            if(userList[i].username === currentUser) {
                console.log("This is the full name " + userList[i].firstName + " " + userList[i].lastName);
                return userList[i].firstName + " " + userList[i].lastName;
            }
        }
        return "Mystery Name";
    }

    addCup() {
        const inputAmount = parseInt(document.querySelector('#numOfCups').value);

        if (localStorage.getItem('totalCups') === null && inputAmount <= 8) {
            localStorage.setItem('totalCups', inputAmount);
            console.log('This is the first cup! ' + inputAmount);
        }
        else if (inputAmount > 8){
            alert("Please, enter 8 or less");
            return;
        }

        else {
            let newNum = parseInt(localStorage.getItem('totalCups'));
            if (newNum <= 8){
                newNum = newNum + inputAmount;
                localStorage.setItem('totalCups', newNum);
            }
        }

        console.log("Current amout of water saved: " + localStorage.getItem('totalCups'));
    }

}

const drinkingLog = new DrinkingLog();