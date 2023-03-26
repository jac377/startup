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
const userCollection = client.db('mindlyDriking').collection('userList');

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

module.exports = {
    createUser, 
    getUser
};