class DrinkingLog {
    userObj;
    username;
    
    constructor() {
        this.username = this.getPersonName();
        this.loadData();
    }

    getPersonName() {
        const currentUser = localStorage.getItem("username");

        if(currentUser) {
            return currentUser;
        }

        return "Mystery Name";
    }

    async loadData(){

        const username = localStorage.getItem('username');
        let currentDate = new Date().toLocaleDateString().toString();
        currentDate = currentDate.replaceAll(/\//g, '-');
        const response = await fetch(`/api/getLog/${username}/${currentDate}`);
    
        const body = await response.json();
    
        if (response?.status === 200){
            localStorage.setItem('logList', JSON.stringify(body.arrayLog));
            localStorage.setItem('totalAmount', JSON.stringify(body.totalAmount));
        }
        else{
            console.log(body.msg);
            localStorage.setItem('logList', JSON.stringify([]));
            localStorage.setItem('totalAmount', JSON.stringify(0));
        }

        this.fillUpBottle();
        this.fillUpTable();
     }

    async addCup() {
        const inputAmount = parseInt(document.querySelector('#numOfCups').value);
        let currentDate = new Date().toLocaleDateString();
        currentDate = currentDate.replaceAll(/\//g, '-');
        const response = await fetch('/api/addLog', {
            method: 'post',
            body: JSON.stringify({ 
                username: this.username,
                date: currentDate,
                amount: inputAmount,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });

        const body = await response.json();

        if (response?.status === 200){
            let updateLog = JSON.parse(localStorage.getItem('logList'));
            let updateAmount = JSON.parse(localStorage.getItem('totalAmount')); 
            updateLog.push(inputAmount);
            updateAmount = updateAmount + inputAmount;
            localStorage.setItem('totalAmount', JSON.stringify(updateAmount));
            localStorage.setItem('logList', JSON.stringify(updateLog));
        }
        else {
            alert(body.msg);
        }
        this.fillUpBottle();
        //this.updateUserList();
        this.fillUpTable();

        let clearField = document.querySelector('#numOfCups');
        clearField.textContent = "";

        return true;
    }

    fillUpTable() {
        this.clearTable();
        const logEntry = JSON.parse(localStorage.getItem("logList"));
        const logDate = new Date().toLocaleDateString();

        const tableEl = document.querySelector("#drnkngLogTable");
        
        if (logEntry.length > 0){
            for (let i = logEntry.length - 1; i >= 0; i--) {
                const positionTdEl = document.createElement("td");
                const amountTdEl = document.createElement('td');
                const dateTdEl = document.createElement('td');
                const actionEl = document.createElement('td');

                positionTdEl.textContent = i + 1;
                amountTdEl.textContent = logEntry[i];
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
        let waterLevel = JSON.parse(localStorage.getItem('totalAmount'));

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

    async deleteEntry(row){
        const rowId = row.id;
        const index = parseInt(rowId.match(/(\d+)/)[0]) - 1;

        let currentDate = new Date().toLocaleDateString();
        currentDate = currentDate.replaceAll(/\//g, '-');

        let newCupCount;

        const currentArray = JSON.parse(localStorage.getItem("logList"));
        currentArray.splice(index,1);

        if (currentArray.length === 0){
            newCupCount = 0;
        }
        else{
            newCupCount = currentArray.reduce((newArray, c) => newArray + c);
        }

        const response = await fetch('/api/updateLog', {
            method: 'post',
            body: JSON.stringify({
                username: this.username,
                date: currentDate,
                arrayLog: currentArray,
                amount: newCupCount,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });

        const body = await response.json();
        console.log(body);

        if (response?.status === 200){
            localStorage.setItem('logList', JSON.stringify(currentArray));
            localStorage.setItem('totalAmount', JSON.stringify(newCupCount));
        }
        else {
            alert(body.msg);
        }
        
        this.fillUpTable();
        this.fillUpBottle();
    }

    /*updateUserList() {
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
    }*/

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