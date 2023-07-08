import request from "request";

export const getPostcode = async (req, res) => {

    await request.get({
        url: POSTCODE_URL + '/' + req.params.queryCode,
    }, (err, backendRes, data) => {
        if (err) {
            res.statusCode = 500
            console.log(err)
            res.body = err
            res.send()
        } else {
            res.statusCode = backendRes.statusCode
            res.headers = backendRes.headers
            res.json(JSON.parse(data))
        }
    });
}
