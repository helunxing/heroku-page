const express = require('express')
const path = require('path')
const request = require("request");
const PORT = process.env.PORT || 5001

app = express()

app.use(express.static(path.resolve(__dirname, '../client/build')));

app.get("/api", async (req, response) => {

    const HELLO_WORLD_URL = 'http://34.88.110.168:8080/hello-world-bean';

    let res_data = {message: "empty"};

    await request.get({
        url: HELLO_WORLD_URL,
        json: true,
        // headers: {'User-Agent': 'request'}
    }, (err, res, data) => {
        if (err) {
            console.log('Error:', err);
        } else if (res.statusCode !== 200) {
            console.log('Status:', res.statusCode);
        } else {
            res_data = data;
            response.json(res_data);
        }
        // console.log(res_data);
    });
    // console.log(res_data);
});

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`))

// console.log(`test_value is ${process.env.test_value}`)

