const exp = require('constants');
const express = require('express');
const path = require('path');
const fs = require('fs');
const Modelo = require('./modelo.js');

const app = express();

//app.use(bodyParser.json());

app.use(express.json());
app.use(express.urlencoded({extended:false}));

const Handlebars = require("handlebars");

const template = Handlebars.compile("test: {{name}}");
console.log(template({ name: "handlebars" }));

var estaUrl = path.join(__dirname);

var _url = "";
if(estaUrl[0] == "C" && estaUrl[1] == ":"){
    _url = "http://localhost:3000";
}else{
    _url = "https://railway2-production-725e.up.railway.app/"
}

//------ Páginas de sistema ------------------

/* 
app.get('/', (req, res) => {
    
    res.sendFile(path.join(__dirname,'/paginas/index.html'));
});
*/ 
 

app.get('/', (req, res) => {

    var objeto = {url : _url};

     var archivo = fs.readFileSync('paginas/index.hbs','utf-8',(err,data)=>{
        if(err){
            console.log(err);         
        }else{
            console.log("archivo leído");
        }
    });
    var template = Handlebars.compile(archivo);
    var salida = template(objeto);
    res.send(salida);
});

app.post('/', (req, res) => {
    var objeto = {user : req.body.user,
                    pass: req.body.pass,
                    rol: "administrador",
                    submit : req.body.submit,
                    url : _url};
     var archivo = fs.readFileSync('paginas/contenedor.hbs','utf-8',(err,data)=>{
        if(err){
            console.log(err);         
        }else{
            console.log("archivo leído");
        }
    });
    var template = Handlebars.compile(archivo);
    var salida = template(objeto);
    res.send(salida);
});


//--- Api ----------------------------------------------------

app.get('/dameMaquinarias',(req,res)=>{
    console.log("--/dameMaquinarias-->[server.js]");
    //var maquinarias = [{"disponible":true,"agenda":[],"id":"170f489d-4a41-4c27-870d-bf1335c12ff6","nombre":"Desmalezadora Steel"},{"disponible":true,"nombre":"Podadora Cerco Eléctrica","id":"c39e2a99-debf-4aca-bc38-6af877075d13","agenda":[]},{"id":"85e4c45d-89be-427c-adfa-00a5c2e475d1","nombre":"Motosierra Steel","agenda":[],"disponible":true},{"nombre":"test Maquinaria","id":"9ac5ae10-5298-48f5-9c4d-7c36773cd3be","disponible":true,"agenda":[]},{"disponible":false,"nombre":"Cortadora Césped Steel","agenda":[],"id":"cf85ea92-a99d-4227-8d5f-681971e62fa9"}];
    
    Modelo.dameMaquinarias().
    then((maq)=>res.status(200).send(maq));
});

app.post('/agregarMaquinaria',(req,res)=>{
   
    console.log(req.body);
    Modelo.agregarMaquinaria(req.body.nombre);
    res.status(200).send(req.body);
});

app.post('/eliminar',(req,res)=>{
    console.log(req.body);
    Modelo.eliminarMaquinaria(req.body);
});




// Inicie el servidor en el puerto especificado
app.listen(3000, () => {
    console.log('Servidor arrancó en puerto 3000');
});

Handlebars.registerHelper('ifeq', function(a, b, options) {
    if (a == b) {
        return options.fn(this);
    }
        return options.inverse(this);
});