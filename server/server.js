const express = require('express')
const request = require("request")
const path = require('path')

const PORT = process.env.PORT || 5001
const SECRET_KEY = process.env.SECRET_KEY || 'default_key'
const BASE_URL = process.env.BASE_URL || 'http://localhost'
const AUTH_BASE_URL = process.env.BASE_URL || (BASE_URL + ':5001')
const EVENT_URL = process.env.EVENT_URL || (BASE_URL + ':8000')
const POSTCODE_URL = process.env.POSTCODE_URL || (BASE_URL + ':8020')
const USER_URL = process.env.USER_URL || (BASE_URL + ':8100')

const {auth} = require('express-openid-connect')
const {json} = require("express")
const {getAllEvent, postEvent, getSingleEvent, putEvent, deleteEvent, getStatus} = require("./event")
const {getPostcode} = require("./postcode")

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
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
})

app.get("/api/event", express.json(), getAllEvent)

app.post("/api/event", express.json(), postEvent)

app.get("/api/event/:eventsId", getSingleEvent)

app.put("/api/event/:eventsId", express.json(), putEvent)

app.delete("/api/event/:eventsId", deleteEvent)

app.get('/api/status', getStatus)

app.get("/api/postcode/:queryCode", getPostcode)

app.use(express.static(path.resolve(__dirname, '../client/build')))

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'))
})

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}, secret key is ${SECRET_KEY}`)
})
