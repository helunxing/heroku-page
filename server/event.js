const request = require("request")
const {EVENT_URL} = require("./util")
const {StatusCodes} = require('http-status-codes')

exports.postEvent = async (req, res) => {
    await request.post({
        url: EVENT_URL + '/event',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(req.body)
    }, (err, backendRes, data) => {
        if (err) {
            res.statusCode = StatusCodes.INTERNAL_SERVER_ERROR
            console.log(err)
            res.body = err
        } else {
            res.statusCode = backendRes.statusCode
            res.headers = backendRes.headers
            const id = backendRes.headers.location.split('event/').pop()
            res.location('/join/' + id)
        }
        res.send()
    })
}

exports.getAllEvent = async (req, res) => {
    console.log(EVENT_URL + '/events')
    await request.get({
        url: EVENT_URL + '/events',
    }, (err, backendRes, data) => {
        if (err) {
            res.statusCode = StatusCodes.INTERNAL_SERVER_ERROR
            res.body = 'Error:' + err;
            console.log(err)
        } else if (backendRes.statusCode !== StatusCodes.OK) {
            res.statusCode = backendRes.statusCode
            res.body = 'Status:' + backendRes.body
            console.log(backendRes.statusCode)
            console.log(backendRes.body)
        } else {
            res.json(JSON.parse(data));
        }
        res.send()
    })
}

exports.getSingleEvent = async (req, res) => {
    await request.get({
        url: EVENT_URL + '/event/' + req.params.eventsId,
    }, (err, backendRes, data) => {
        if (err) {
            res.statusCode = StatusCodes.INTERNAL_SERVER_ERROR
            console.log(err)
            res.body = err
        } else {
            res.statusCode = backendRes.statusCode
            res.headers = backendRes.headers
            if (backendRes.statusCode === StatusCodes.NOT_FOUND) {
                res.statusCode = StatusCodes.OK
                data = '{}'
            }
            res.json(JSON.parse(data))
        }
    })
}

exports.putEvent = async (req, res) => {
    await request.put({
        url: EVENT_URL + '/event/' + req.params.eventsId,
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(req.body)
    }, (err, backendRes, data) => {
        if (err) {
            res.statusCode = statusCode.INTERNAL_SERVER_ERROR
            res.body = err
        } else {
            res.statusCode = backendRes.statusCode
            res.headers = backendRes.headers
        }
        res.send()
    })
}

exports.deleteEvent = async (req, res) => {
    await request.delete({
        url: EVENT_URL + '/event/' + req.params.eventsId,
    }, (err, backendRes, data) => {
        if (err) {
            res.statusCode = statusCode.INTERNAL_SERVER_ERROR
            res.body = err
        } else {
            res.statusCode = backendRes.statusCode
            res.headers = backendRes.headers
        }
        res.send()
    })
}
