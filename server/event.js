const request = require("request")
const {EVENT_URL} = require("./util")

exports.postEvent = async (req, res) => {
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
            res.location('/join/' + id)
        }
        res.send()
    })
}

exports.getAllEvent = async (req, res) => {
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
}

exports.getSingleEvent = async (req, res) => {
    await request.get({
        url: EVENT_URL + '/event/' + req.params.eventsId,
    }, (err, backendRes, data) => {
        if (err) {
            res.statusCode = 500
            console.log(err)
            res.body = err
        } else {
            res.statusCode = backendRes.statusCode
            res.headers = backendRes.headers
            if (backendRes.statusCode === 404) {
                res.statusCode = 200
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
            res.statusCode = 500
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
            res.statusCode = 500
            res.body = err
        } else {
            res.statusCode = backendRes.statusCode
            res.headers = backendRes.headers
        }
        res.send()
    })
}
