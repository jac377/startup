const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const express = require('express');
const app = express();
const DB = require('./database.js');

const authCookieName = 'testCookie';

const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());

app.use(cookieParser());

app.use(express.static('public'));

var apiRouter = express.Router();
app.use(`/api`, apiRouter);

apiRouter.post('/auth/newuser', async (req, res) => {
    if (await DB.getUser(req.body.username)) {
        res.status(409).send({ msg: 'User already exists' });
    }
    else {
        const user = await DB.createUser(req.body.firstName, req.body.lastName, req.body.username, req.body. password);

        setAuthCookie(res, user.token);

        res.send({
            id: user._id,
        });
    }
});

apiRouter.post('/signup', async (req, res) => {
    DB.addUser(req.body);
    const userData = await DB.getUserList();
    res.send(userData);
});

app.use((_req, res) => {
    res.sendFile('index.html', { root: 'public' });
});

function setAuthCookie(res, authToken) {
    res.cookie(authCookieName, authToken, {
        secure: true,
        httpOnly: true,
        sameSite: 'strict',
    });
}

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});