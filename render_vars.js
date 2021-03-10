var http = require("http");
	fs = require("fs");

http.createServer(function(req,res){
	fs.readFile("./index.html", function(err,html){
        var html_string = html.toString();
        //Expresión regular que busca en html donde haya llaves {x}
        var variables = html_string.match(/[^\{\}]+(?=\})/g);
        var nombre = "Andy Castillo";

        // variables ['nombre']
        for (var i = variables.length - 1; i >= 0; i--) {
            //Lo ejecutamos como código de js para obtener su valor
            var value = eval(variables[i]);
            //Se reemplaza el contenido con llaves por el valor correspondiente
            html_string = html_string.replace("{"+variables[0]+"}",value);
        };
		res.writeHead(200,{"Content-Type":"text/html"});
		res.write(html_string);
		res.end();
	});
}).listen(8080);