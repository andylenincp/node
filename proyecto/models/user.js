var mongoose = require("mongoose");
var Schema = mongoose.Schema;

mongoose.connect("mongodb://localhost/fotos", { useUnifiedTopology: true, useNewUrlParser: true });

var valores_sex = ["M", "F"];

var email_match = [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3,4})+$/, "Ingrese un email válido"];

var user_schema = new Schema({
    name: String,
    last_name: String,
    username: {
        type: String,
        required: true,
        maxlength: [50, "Nombre de usuario muy grande"]
    },
    password: {
        type: String,
        required: true,
        minlength: [8, "La contraseña es muy corta"]
    },
    age: {
        type: Number, 
        min: [5, "La edad no puede ser menor a 5"], 
        max: [100, "La edad no puede ser mayor a 100"]
    },
    email: {
        type: String, 
        required: "El correo es obligatorio",
        match: email_match
    },
    date_of_birth: Date,
    sex: {
        type: String,
        enum: {
            values: valores_sex,
            message: "Opción no válida"
        }
    }
});

user_schema.virtual("password_confirmation").get(function() {
    return this.password_c;
}).set(function(password) {
    this.password_c = password;
});

var User = mongoose.model("User", user_schema);

module.exports.User = User;

/*
DATA TYPES
String
Number
Date
Buffer
Boolean
Mixed
Objectid
Array
*/