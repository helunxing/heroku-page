import request from "request";

export const getStatus = async (req, res) => {
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
