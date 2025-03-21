var http = require ("http");
http.createServer(function(req,res){
    res.write("Hello, Welcome to Here");
    res.end();
}).listen(8080);