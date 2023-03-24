const {MongoClient} = require('mongodb');

const userName = process.env.MONGOUSER;
const password = process.env.MONGOPASSWORD;
const hostname = process.env.MONGOHOSTNAME;

if (!userName) {
    throw Error('Database not configured. Set environment variables');
}

const url = `mongodb+srv://${userName}:${password}@${hostname}`;

const client = new MongoClient(url);
const testCollection = client.db('mindlyDriking').collection('testing');

function addUser(data) {
    testCollection.insertOne(data);
}

function getUserList() {
    const list = testCollection.find();
    return list;
}

module.exports = {addUser, getUserList};