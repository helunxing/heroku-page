const {createProxyMiddleware} = require('http-proxy-middleware');
const {BASE_URL} = require("./utils/constants");

const proxy_urls = ['/login', '/logout', '/api/*'];

const target = BASE_URL; // <--- Express server port

module.exports = function (app) {
    proxy_urls.forEach((url) => {
        app.use(url, createProxyMiddleware({target}));
    });
};
