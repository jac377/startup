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

        if (localStorage.getItem('totalCups') === null) {
            localStorage.setItem('totalCups', inputAmount);
        }
        else {
            let newNum = parseInt(localStorage.getItem('totalCups'));
            newNum = newNum + inputAmount;
            localStorage.setItem('totalCups', newNum);
        }
        
        this.fillUpBottle();
    }

    fillUpBottle() {
        let waterLevel = parseInt(localStorage.getItem('totalCups'));

        if (waterLevel > 8){
            waterLevel = 8;
        }

        for (let i = 1; i <= waterLevel; i++) {
            let idElement = `${i}Layer`;
            let layerEl = document.getElementById(idElement);
            layerEl.style.background = 'rgb(95, 144, 211, 1.0)';
            if(i < 8) {
                layerEl.style.borderTop = 'solid black 3px;';
            }
        }

    }
}

const drinkingLog = new DrinkingLog();