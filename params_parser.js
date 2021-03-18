function parse(req) {

    var arreglo_params = [], params = {};

    if (req.url.indexOf("?") > 0){
        var url_data = req.url.split("?");
        var arreglo_params = url_data[1].split("&");
    }

    for (var i = arreglo_params.length - 1; i >= 0; i--) {
        var param = arreglo_params[i];   
        var param_data = param.split("=");
        params[param_data[0]] = param_data[1];
    }
    
    return params;
}

module.exports.parse = parse;