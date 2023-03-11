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

        let clearField = document.querySelector('#numOfCups');
        clearField.textContent = "";

        return true;
    }

    fillUpTable() {
        this.clearTable();
        const dayLogInfo = JSON.parse(localStorage.getItem("dayEntry"));
        const logDate = dayLogInfo.date;
        const totalEntriesArray = dayLogInfo.entries;

        const tableEl = document.querySelector("#drnkngLogTable");
        
        if (totalEntriesArray.length > 0){
            for (let i = totalEntriesArray.length - 1; i >= 0; i--) {
                const positionTdEl = document.createElement("td");
                const amountTdEl = document.createElement('td');
                const dateTdEl = document.createElement('td');
                const actionEl = document.createElement('td');

                positionTdEl.textContent = i + 1;
                amountTdEl.textContent = totalEntriesArray[i];
                dateTdEl.textContent = logDate;

                actionEl.innerHTML = '<button type="button" class="btn btn-danger"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/><path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/></svg></button>';

                const rowEl = document.createElement('tr');
                const rowId = `row${i + 1}`;
                    rowEl.setAttribute('id', rowId);
                    rowEl.setAttribute('onclick', 'drinkingLog.deleteEntry(this)');
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
        this.resetBottle();
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

    deleteEntry(row){
        const rowId = row.id;
        const index = parseInt(rowId.match(/(\d+)/)[0]) - 1;
        let newCupCount;

        let currentLog = JSON.parse(localStorage.getItem("dayEntry"));
        let entriesArray = currentLog.entries;
        let newArray = entriesArray.splice(index,1);
        if (entriesArray.length === 0){
            currentLog.totalCups = 0;
        }
        else{
            newCupCount = entriesArray.reduce((entriesArray, c) => entriesArray + c);
            currentLog.totalCups = newCupCount;
        }

        console.log("This is the new Cup count " + newCupCount);

        currentLog.entries = entriesArray;
        localStorage.setItem('dayEntry', JSON.stringify(currentLog));
        
        this.updateUserList();
        this.fillUpTable();
        this.fillUpBottle();
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

    createNewDateLog(currentDate) {
        const newEntryObj = {
            date : currentDate,
            totalCups: 0,
            entries : [],
        };
        localStorage.setItem('dayEntry', JSON.stringify(newEntryObj));
    }

    clearTable() {
        let tableEl = document.querySelector("#drnkngLogTable");
        tableEl.innerHTML = "";
    }

    resetBottle(){
        let waterLevel = 8;

        for (let i = 1; i <= waterLevel; i++) {
            let idElement = `${i}Layer`;
            let layerEl = document.getElementById(idElement);
            layerEl.style.background = 'rgb(255, 255, 255, 1.0)';
        }

    }
}

const drinkingLog = new DrinkingLog();