const {MongoClient} = require('mongodb');
const bcrypt = require('bcrypt');
const uuid = require('uuid');

const userName = process.env.MONGOUSER;
const password = process.env.MONGOPASSWORD;
const hostname = process.env.MONGOHOSTNAME;

if (!userName) {
    throw Error('Database not configured. Set environment variables');
}

const url = `mongodb+srv://${userName}:${password}@${hostname}`;

const client = new MongoClient(url);
const userCollection = client.db('mindlyDrinking').collection('userList');
const logCollection = client.db('mindlyDrinking').collection('dailyLogs');

function getUser(username) {
    return userCollection.findOne({ username: username });
}

async function createUser(firstName, lastName, username, password){
    const hashPassword = await bcrypt.hash(password, 8);

    const user = {
        username: username,
        password: hashPassword,
        firstName: firstName,
        lastName: lastName,
        token: uuid.v4(),
    };

    await userCollection.insertOne(user);

    return user;
}

async function addEntry(entry) {
    const query = { username: entry.username, date: entry.date };
    let update = { 
        $set: {}, 
        $inc: {},
    };
    const findEntry = await logCollection.findOne(query);

    if (findEntry === null){
        let newEntryArray = [];
        newEntryArray.push(entry.amount);
        const objAdded = {
            username: entry.username, 
            date: entry.date,
            arrayLog: newEntryArray,
            totalAmount: entry.amount,
        };
        await logCollection.insertOne(objAdded);
    }
    else{
        let newArray = findEntry.arrayLog;
        newArray.push(entry.amount);
    
        update = { 
            $set: { arrayLog: newArray }, 
            $inc: { totalAmount: entry.amount },
        };
    }
    const response = await client.db('mindlyDrinking').collection('dailyLogs').updateOne(query, update);
    return response;
}

async function getUserLog(username, date){
    return logCollection.findOne({ username: username, date: date });
}

module.exports = {
    createUser, 
    getUser,
    getUserLog,
    addEntry,
};