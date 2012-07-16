var connect = require('connect'), 
fs = require('fs');

var serve_html = function(root) {
    return function(req,res,next) {
        var path = root + req.url + '.html';
        fs.stat(path,function(err,stat) {
            if (!err && !stat.isDirectory()) {
                res.statusCode = 301;
                res.setHeader('Location', req.url + '.html');
                res.end('Redirecting to ' + req.url + '.html');
                return;
            }
            next();
        });
    }
};

var port = process.env.VCAP_APP_PORT || 3000;
var app = connect()
.use(connect.logger('dev'))
.use(connect.static('_site'))
.use(serve_html('_site'))
.use(function(req, res){
res.statusCode = 404;
res.end('Not found\n');
})
.listen(port);
console.log("Listening on %s",port);
