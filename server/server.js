const express = require('express')
const request = require("request")
const path = require('path')

const PORT = process.env.PORT || 5001;
const SECRET_KEY = process.env.SECRET_KEY || 'default_key';
const BASE_URL = process.env.BASE_URL || 'http://localhost';
const AUTH_BASE_URL = process.env.BASE_URL || (BASE_URL + ':5001');
const POSTCODE_URL = process.env.POSTCODE_URL || (BASE_URL + ':8020');
const EVENT_URL = process.env.EVENT_URL || (BASE_URL + ':8000');

const {auth} = require('express-openid-connect');
const {json} = require("express");

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: 'a long, randomly-generated string stored in env',
    baseURL: AUTH_BASE_URL,
    clientID: 'lRg2odM7Fy0gndvGM4nVELslbfnqyEw1',
    issuerBaseURL: 'https://hlx.uk.auth0.com'
};

app = express()

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

app.get('/api/status', (req, res) => {
    res.send(JSON.stringify({
        'logged': req.oidc.isAuthenticated(),
        'name': `${req.oidc.isAuthenticated() ? req.oidc.user['nickname'] : ''}`,
        'sub': `${req.oidc.isAuthenticated() ? req.oidc.user['sub'] : ''}`
    }));
});

app.get("/dontwantshow", (req, res) => {
    res.redirect('/notfound')
});

app.get("/api/events", express.json(), async (req, res) => {
    await request.get({
        url: 'http://localhost:8000/events',
    }, (err, backendRes, data) => {
        if (err) {
            res.statusCode(500)
            res.body('BFF Error:', err);
        } else if (backendRes.statusCode !== 200) {
            res.statusCode(backendRes.statusCode)
            res.body('Status:', backendRes.body);
        } else {
            res.json(JSON.parse(data));
        }
    })
});

app.post("/api/event", express.json(), async (req, res) => {
    await request.post({
        url: EVENT_URL + '/event',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(req.body)
    }, (err, backendRes, data) => {
        if (err) {
            res.statusCode = 500
            console.log(err)
            res.body = err
        } else {
            res.statusCode = backendRes.statusCode
            res.headers = backendRes.headers
            const id = backendRes.headers.location.split('event/').pop()
            res.location('/api/event/' + id)
        }
        res.send()
    })
});

app.get("/api/events/:eventsId", async (req, res) => {
    res.redirect('/notfound')
});

app.put("/api/events/:eventsId", async (req, res) => {
    res.redirect('/notfound')
});

app.delete("/api/events/:eventsId", async (req, res) => {
    res.redirect('/notfound')
});

app.get("/api/postcode/:queryCode", async (req, res) => {

    await request.get({
        url: POSTCODE_URL + '/' + req.params.queryCode,
    }, (err, backendRes, data) => {
        if (err) {
            res.statusCode = 500
            console.log(err)
            res.body = err
            res.send()
        } else {
            res.statusCode = backendRes.statusCode
            res.headers = backendRes.headers
            res.json(JSON.parse(data))
        }
    });
});

app.use(express.static(path.resolve(__dirname, '../client/build')));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}, secret key is ${SECRET_KEY}`)
})
