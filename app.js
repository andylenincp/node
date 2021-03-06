var express = require("express");
var User = require("./models/user").User;
var cookieSession = require("cookie-session");
var router_app = require("./routes_app");
var session_middleware = require("./middlewares/session");
var formidable = require("express-form-data");
var methodOverride = require("method-override");

var app = express();

app.use("/public", express.static('public'));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(methodOverride("_method"));
app.use(cookieSession({
    name: "session", 
    keys: ["llave-1","llave-2"]
}));

app.use(formidable.parse({ 
    keepExtensions: true
}));

app.set("view engine", "jade");

app.get("/", function(req,res) {
    console.log(req.session.user_id);
    res.render("index");
});

app.get("/signup", function(req,res) {
    User.find(function(err,doc) {
        console.log(doc);
        res.render("signup");
    });
});

app.get("/login", function(req,res) {
    res.render("login");
});

app.post("/users", function(req,res) {
    var user = new User({
        email: req.body.email, 
        password: req.body.password, 
        username: req.body.username,
        password_confirmation: req.body.password_confirmation
    });

    /*
    user.save(function(err) {
        if (err) {
            console.log(String(err));
        }
        res.send("Datos almacenados");
    });
    */

    user.save().then(function(us) {
        res.send("Usuario registrado correctamente");
    }, function(err) {
        if (err) {
            console.log(String(err));
            res.send("Ha ocurrido un error");
        }
    });
    
});

app.post("/sessions", function(req,res) {
    User.findOne({email:req.body.email,password:req.body.password}, function(err,user){
        req.session.user_id = user._id;
        res.redirect("/app");
    });
});

app.use("/app", session_middleware);
app.use("/app", router_app);

app.listen(8080);