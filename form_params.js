var http = require("http");
	fs = require("fs");

http.createServer(function(req,res){

    if (req.url.indexOf("favicon.ico") > 0){ return; }

	fs.readFile("./index.html", function(err,html){
        var html_string = html.toString();
        var arreglo_params = [], params = {};
        var variables = html_string.match(/[^\{\}]+(?=\})/g);
        var nombre = "";

        if (req.url.indexOf("?") > 0){
            var url_data = req.url.split("?");
            var arreglo_params = url_data[1].split("&");
        }

        for (var i = arreglo_params.length - 1; i >= 0; i--) {
            var param = arreglo_params[i];   
            var param_data = param.split("=");
            params[param_data[0]] = param_data[1];
        }

        for (var i = variables.length - 1; i >= 0; i--) {
            var variable = variables[i];
            html_string = html_string.replace("{"+variables[i]+"}",params[variable]);
        };
		res.writeHead(200,{"Content-Type":"text/html"});
		res.write(html_string);
		res.end();
	});
}).listen(8080);