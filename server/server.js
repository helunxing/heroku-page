const express = require('express')
const cors = require('cors');
const path = require('path')
const {StatusCodes} = require('http-status-codes')

const {auth} = require('express-openid-connect')
const {getAllEvent, postEvent, getSingleEvent, putEvent, deleteEvent} = require("./event")
const {getPostcode} = require("./postcode")
const {getStatus, AUTH_BASE_URL, PORT, SECRET_KEY} = require("./util");

app = express()

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth({
    authRequired: false,
    auth0Logout: true,
    secret: 'a long, randomly-generated string stored in env',
    baseURL: AUTH_BASE_URL,
    clientID: 'lRg2odM7Fy0gndvGM4nVELslbfnqyEw1',
    issuerBaseURL: 'https://hlx.uk.auth0.com'
}))

// running in different ports
app.use(cors());

// Event API
app.get("/api/event", express.json(), getAllEvent)
app.post("/api/event", express.json(), postEvent)
app.get("/api/event/:eventsId", getSingleEvent)
app.put("/api/event/:eventsId", express.json(), putEvent)
app.delete("/api/event/:eventsId", deleteEvent)

// Join API
app.put("/api/join", express.json(), (req, res) => {
    console.log(req.body)
    res.statusCode = StatusCodes.OK
    res.send()
})

app.get('/api/status', getStatus)

app.get("/api/postcode/:queryCode", getPostcode)

app.use(express.static(path.resolve(__dirname, '../client/build')))

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'))
})

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}, secret key is ${SECRET_KEY}`)
})
