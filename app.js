var app = require('express').createServer();
app.get('/', function(req, res) {
    res.send('Testing 04');
});
app.listen(process.env.VCAP_APP_PORT || 3000);
