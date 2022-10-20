const PROXY_CONFIG = [
    {
        context: ['/api'],
        target: 'http://localhost:8000/',
        secure: false, //https = true
        logLevel: 'debug',
        pathRewrite: { '^/api': '' } //api legada
    }
];

module.exports = PROXY_CONFIG;