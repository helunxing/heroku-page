const request = require("request");

exports.PORT = process.env.PORT || 5001
exports.SECRET_KEY = process.env.SECRET_KEY || 'default_key'
exports.BASE_URL = process.env.BASE_URL || 'http://localhost'
exports.AUTH_BASE_URL = process.env.BASE_URL || (exports.BASE_URL + ':5001')
exports.EVENT_URL = process.env.EVENT_URL || (exports.BASE_URL + ':8000')
exports.USER_URL = process.env.USER_URL || (exports.BASE_URL + ':8100')
exports.POSTCODE_URL = process.env.POSTCODE_URL || (exports.BASE_URL + ':8020')
exports.JOIN_INFO_URL= process.env.JOIN_INFO_URL || (exports.BASE_URL + ':8200')

exports.getStatus = async (req, res) => {
    if (!req.oidc.isAuthenticated()) {
        res.send(JSON.stringify({
            'logged': req.oidc.isAuthenticated(),
        }))
        return
    }

    await request.get({
        url: USER_URL + '/user/sub/' + req.params.sub,
    }, (err, backendRes, data) => {
        if (err) {
            console.log(`BFF Error ${err}`)
        } else {
            res.send(JSON.stringify({
                'logged': req.oidc.isAuthenticated(),
                'name': req.oidc.user['nickname'],
                'sub': req.oidc.user['sub'].replace('|', '_'),
                'id': Number(backendRes.headers.location.split('/').pop()),
            }))
        }
    })
}
