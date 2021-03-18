var http = require("http");
	fs = require("fs");
    parser = require("./params_parser.js");

var p = parser.parse;

http.createServer(function(req,res){

    if (req.url.indexOf("favicon.ico") > 0){ return; }

	fs.readFile("./index.html", function(err,html){
        var html_string = html.toString();
        var variables = html_string.match(/[^\{\}]+(?=\})/g);
        var nombre = "";

        var params = p(req);

        for (var i = variables.length - 1; i >= 0; i--) {
            var variable = variables[i];
            html_string = html_string.replace("{"+variables[i]+"}",params[variable]);
        };
		res.writeHead(200,{"Content-Type":"text/html"});
		res.write(html_string);
		res.end();
	});
}).listen(8080);