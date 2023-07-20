const {JOIN_INFO_URL} = require("./util")
const {StatusCodes} = require("http-status-codes")
const request = require("request")

exports.getJoinInfo = async (req, res) => {
    //     TODO: get join info from backend
}

exports.putJoinInfo = async (req, res) => {
    // TODO: block user change invalid join info (other event id and creator id) for security
    await request.put({
        url: JOIN_INFO_URL + '/joinInfo',
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
        }
        res.send()
    })
}
