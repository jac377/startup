class DrinkingLog {
    userObj;
    
    constructor() {
        const playerNameEl = document.querySelector(".fullName");
        playerNameEl.textContent = this.getPersonName();
        this.loadData();
    }

    getPersonName() {
        const userList = JSON.parse(localStorage.getItem("userList"));
        const currentUser = localStorage.getItem("userName");

        for (let i = 0; i < userList.length; i++) {
            if(userList[i].username === currentUser) {
                return userList[i].firstName + " " + userList[i].lastName;
            }
        }
        return "Mystery Name";
    }

    addCup() {
        const inputAmount = parseInt(document.querySelector('#numOfCups').value);
        const currentDate = new Date().toLocaleDateString();

        const dateEntry = JSON.parse(localStorage.getItem("dayEntry"));

        let arrayEntry = dateEntry.entries;
        let newTotalAmount = dateEntry.totalCups;

        arrayEntry.push(inputAmount);

        newTotalAmount = newTotalAmount + inputAmount;

        dateEntry.entries = arrayEntry;
        dateEntry.totalCups = newTotalAmount;

        localStorage.setItem('dayEntry', JSON.stringify(dateEntry));
        const test = JSON.parse(localStorage.getItem("dayEntry"));
        this.fillUpBottle();
        this.updateUserList();
    }

    fillUpBottle() {
        const dateEntry = JSON.parse(localStorage.getItem("dayEntry"));
        let waterLevel = dateEntry.totalCups;

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

    loadData(){
        const userList = JSON.parse(localStorage.getItem("userList"));
        const username = localStorage.getItem('userName');
        const currentDate = new Date().toLocaleDateString();

        for (let i = 0; i < userList.length; i++) {
            if (userList[i].username === username){
                this.userObj = userList[i];
                break;
            }
        }

        let dataList = this.userObj.dateEntries;

        if (dataList[dataList.length - 1].date !== currentDate) {
            this.createNewDateLog(currentDate);
        }
        else {
            localStorage.setItem("dayEntry", JSON.stringify(dataList));
            this.fillUpBottle();
        }

    }

    updateUserList() {
        const updatedDateLog = JSON.parse(localStorage.getItem("dayEntry"));
        let newUserList = JSON.parse(localStorage.getItem("userList"));
        const username = localStorage.getItem('userName');

        for (let i = 0; i < newUserList.length; i++) {
            if (newUserList[i].username === username) {
                newUserList[i].dataEntries.push(updatedDateLog);
            }
        }
        localStorage.setItem("userList", JSON.stringify(newUserList));

        const udpatedList = JSON.parse(localStorage.getItem("userList"));
        console.log('This is the new data saved internally');

    }

    createNewEntry(currentDate) {

    }

    createNewDateLog(currentDate) {
        const newEntryObj = {
            date : currentDate,
            totalCups: 0,
            entries : [],
        };
        localStorage.setItem('dayEntry', JSON.stringify(newEntryObj));
    }
}

const drinkingLog = new DrinkingLog();