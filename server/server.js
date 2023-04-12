const express = require('express')
const request = require("request")
const path = require('path')

const PORT = process.env.PORT || 5001;
const SECRET_KEY = process.env.SECRET_KEY || 'default_key';
const BASE_URL = process.env.BASE_URL || 'http://localhost';
const AUTH_BASE_URL = process.env.BASE_URL || (BASE_URL + ':5001');
const POSTCODE_URL = process.env.POSTCODE_URL || (BASE_URL + ':8002');

const {auth} = require('express-openid-connect');

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
app.get('/api/status', auth(config), (req, res) => {
    // res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
    res.send(JSON.stringify({
        'logged': req.oidc.isAuthenticated(),
        'name': `${req.oidc.isAuthenticated() ? req.oidc.user['nickname'] : ''}`
    }));
});

app.get("/dontwantshow", (req, res) => {
    res.redirect('/notfound')
    // return
});

app.get("/api/events", (req, res) => {
    const data = [
        {id: 1, date: 'today'},
        {id: 2, date: 'tomorrow'}]
    res.json(data);
});

app.post("/api/event", express.json(), async (req, res) => {

    req.body['timeOptions'] = req.body['timeOptions'].map((option) => {
        return option['startTime'] + '_' + option['endTime']
    }).join(',')

    // console.log(Object.keys(req.body))

    await request.post({
        url: 'http://localhost:8000/rows',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(req.body)
    }, (err, backendRes, data) => {
        if (err) {
            console.log('Error:', err);
        } else if (backendRes.statusCode !== 200) {
            console.log('Status:', backendRes.statusCode);
        } else {
            console.log(backendRes);
        }
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
        json: true,
        // headers: {'User-Agent': 'request'}
    }, (err, backendRes, data) => {
        if (err) {
            console.log('Error:', err);
        } else if (backendRes.statusCode !== 200) {
            console.log('Status:', backendRes.statusCode);
        } else {
            res.json(data);
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
