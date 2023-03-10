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
        this.fillUpBottle();
        this.updateUserList();
        this.fillUpTable();
    }

    fillUpTable() {
        const dayLogInfo = JSON.parse(localStorage.getItem("dayEntry"));
        const logDate = dayLogInfo.date;
        const totalEntriesArray = dayLogInfo.entries;

        const tableEl = document.querySelector("#drnkngLogTable");
        
        if (totalEntriesArray.length > 0){
            for (let i = 0; i < totalEntriesArray.length; i++) {
                const positionTdEl = document.createElement("td");
                const amountTdEl = document.createElement('td');
                const dateTdEl = document.createElement('td');
                const actionEl = document.createElement('td');
    
                positionTdEl.textContent = i + 1;
                amountTdEl.textContent = totalEntriesArray[i];
                dateTdEl.textContent = logDate;
                actionEl.textContent = "Test";
    
                const rowEl = document.createElement('tr');
                    rowEl.appendChild(positionTdEl);
                    rowEl.appendChild(amountTdEl);
                    rowEl.appendChild(dateTdEl);
                    rowEl.appendChild(actionEl);
    
                    tableEl.appendChild(rowEl);
            } 
        }
        else {
            tableEl.innerHTML = '<tr><td colSpan=4>No entries found</td></tr>';
        }
        

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

        let dataList = this.userObj.dateEntries[this.userObj.dateEntries.length - 1];

        if (dataList.date !== currentDate) {
            this.createNewDateLog(currentDate);
        }
        else {
            localStorage.setItem("dayEntry", JSON.stringify(dataList));
            this.fillUpBottle();
            this.fillUpTable();
        }

    }

    updateUserList() {
        const updatedDateLog = JSON.parse(localStorage.getItem("dayEntry"));
        let newUserList = JSON.parse(localStorage.getItem("userList"));
        const username = localStorage.getItem('userName');
        const currentDate = new Date().toLocaleDateString();

        for (let i = 0; i < newUserList.length; i++) {
            if (newUserList[i].username === username) {
                let newEntries = newUserList[i].dateEntries;
                const firstElement = newEntries[newEntries.length - 1];
                const dateToCompare = firstElement.date;
                if (dateToCompare === currentDate){
                    newEntries[newEntries.length - 1] = updatedDateLog;
                }
                else{
                    newEntries.push(updatedDateLog);
                }
            }
        }
        localStorage.setItem("userList", JSON.stringify(newUserList));
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