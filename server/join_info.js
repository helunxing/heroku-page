const {JOIN_INFO_URL, EVENT_URL} = require("./util")
const {StatusCodes} = require("http-status-codes")
const request = require("request")

exports.getJoinInfo = async (req, res) => {
    // TODO: get join info from backend
}

exports.putJoinInfo = async (req, res) => {
    // TODO: block user change invalid join info (other event id and creator id) for security
    let voteSuccess = true
    let joinInfoSuccess = true
    const voteBody = {
        id: req.body['eventId'],
        timeOptions: req.body['selectedStr']
    }
    const info_updating = [
        request.put({
            url: JOIN_INFO_URL + '/joinInfo',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(req.body)
        }, (err, backendRes, data) => {
            if (err) {
                joinInfoSuccess = false
                console.log(err)
                res.body = err
            }
        }),
        request.put({
            url: EVENT_URL + '/vote/' + req.body['eventId'],
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(voteBody)
        }, (err, backendRes, data) => {
            if (err) {
                voteSuccess = false
                console.log(err)
                res.body = err
            }
        })]
    await Promise.all(info_updating)
    if (voteSuccess && joinInfoSuccess) {
        res.statusCode = StatusCodes.CREATED
    } else {
        res.statusCode = StatusCodes.INTERNAL_SERVER_ERROR
    }
    res.send()
}
