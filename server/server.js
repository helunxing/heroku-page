const express = require('express')
const request = require("request")
const path = require('path')

const PORT = process.env.PORT || 5001
const POSTCODE_URL = process.env.POSTCODE_URL || 'http://localhost:8002/'
const SECRET_KEY = process.env.SECRET_KEY || 'default_key'

const {auth} = require('express-openid-connect');

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: 'a long, randomly-generated string stored in env',
    baseURL: 'http://localhost:5001',
    clientID: 'lRg2odM7Fy0gndvGM4nVELslbfnqyEw1',
    issuerBaseURL: 'https://hlx.uk.auth0.com'
};

app = express()

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// req.isAuthenticated is provided from the auth router
app.get('/status', (req, res) => {
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
    console.log(req.oidc)
});

const {requiresAuth} = require('express-openid-connect');
app.get('/profile', requiresAuth(), (req, res) => {
    res.send(JSON.stringify(req.oidc.user));
});

app.get("/postcode/:queryCode", async (req, response) => {

    // console.log(POSTCODE_URL + req.params.queryCode)
    await request.get({
        url: POSTCODE_URL + req.params.queryCode,
        json: true,
        // headers: {'User-Agent': 'request'}
    }, (err, res, data) => {
        if (err) {
            console.log('Error:', err);
        } else if (res.statusCode !== 200) {
            console.log('Status:', res.statusCode);
        } else {
            response.json(data);
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
