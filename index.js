const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const express = require('express');
const app = express();
const DB = require('./database.js');
const { PeerProxy } = require('./peerProxy.js');

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

apiRouter.post('/auth/login', async (req, res) => {
    const user = await DB.getUser(req.body.username);
    if (user) {
        if (await bcrypt.compare(req.body.password, user.password)) {
            setAuthCookie(res, user.token);
            res.send({ id: user._id });
            return;
        }
    }
    res.status(401).send({ msg: 'Unauthorized access. Please, try again.'});
});

apiRouter.post('/addLog', async (req, res) => {
    const response = await DB.addEntry(req.body);
    if (response.acknowledged === true){
        res.status(200).send(response);
    }
    else{
        res.status(400).send({ msg: "Error in server when adding entry" });
    }
});

apiRouter.post('/updateLog', async (req, res) => {
    const response = await DB.updateEntry(req.body);
    if (response.acknowledged === true){
        res.status(200).send(response);
    }
    else{
        res.status(400).send({ msg: "Error in server when deleting entry" });
    }
});

apiRouter.get('/user/:username', async (req, res) => {
    const user = await DB.getUser(req.params.username);
    if (user) {
        const token = req?.cookies.token;
        res.send({ username: user.username, authenticated: token === user.token });
        return;
    }
    res.status(404).send({ msg: 'Uknown' });
});

apiRouter.get('/getLog/:username/:date', async (req, res) => {
    const log = await DB.getUserLog(req.params.username, req.params.date);
    if (log){
        res.status(200).send(log);
        return;
    }
    res.status(404).send({ msg: 'No array found'});
});

apiRouter.delete('/auth/logout', (_req, res) => {
    res.clearCookie(authCookieName);
    res.status(204).end();
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

const httpService = app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

new PeerProxy(httpService);