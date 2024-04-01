const exp = require('constants');
const express = require('express');
const path = require('path');
const fs = require('fs');
const Modelo = require('./modelo.js');
const Sec = require('./seguridad.js');

const app = express();

//app.use(bodyParser.json());

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use("/images", express.static(path.join(__dirname, "/public/images")));

/* administra los errores por json mal formado en la consulta */
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
      res.status(400).send('JSON mal formado');
    } else {
      next();
    }
  });

const Handlebars = require("handlebars");

const template = Handlebars.compile("test: {{name}}");
console.log(template({ name: "handlebars" }));

var estaUrl = path.join(__dirname);

var _url = "";
if(estaUrl[0] == "C" && estaUrl[1] == ":"){
    _url = "http://localhost:3000";
}else{
    _url = "https://railway2-production-725e.up.railway.app";
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

// En operación
app.post('/',(req, res)=>{
    var objeto = {user : req.body.user,
        pass: req.body.pass,
        url : _url};
 
    Sec.getContenedor(objeto)
        .then((data)=>res.send(data));
})

/*
app.post('/xxx', (req, res) => {
    var objeto1 = {user : req.body.user,
                    pass: req.body.pass,
                    //rol: "administrador",
                    //submit : req.body.submit,
                    //url : _url,
                    //permiso1 :true,
                    //permiso2 : true
                };
    Sec.validar(objeto1).then((data)=>{
        if(data){
            Sec.dameUsuario(objeto1).then((usua)=>{
            var archivo = fs.readFileSync('paginas/contenedor.hbs','utf-8',(err,data)=>{
                if(err){
                    console.log(err);         
                }else{
                    console.log("archivo leído");
                }
            });

            valPer1 = false; valPer2 = false; valPer3 = false; valPer4 = false; valPer5 = false;
            if(usua.rol == "administrador"){valPer1 = true};
            if(usua.rol == "administrador" || usua.rol == "capataz" || usua.rol == "mecánico" || usua.rol == "invitado"){valPer2 = true};
            if(usua.rol == "administrador" || usua.rol == "mecánico"){valPer3 = true };


            var objeto2 = {user : usua.user,
                            rol : usua.rol,
                            url : _url,
                            permiso1 : valPer1,
                            permiso2 : valPer2,
                            permiso3 : valPer3}
            var template = Handlebars.compile(archivo);
            var salida = template(objeto2);
            res.send(salida);})            
        }else{
            res.send("<p>...ops!!</p>");
        }
    })
});
 */

//--- get ----------------------------------------------------

app.get('/dameMaquinariasx',(req,res)=>{
    console.log("--/dameMaquinarias-->[server.js]");
    //var maquinarias = [{"disponible":true,"agenda":[],"id":"170f489d-4a41-4c27-870d-bf1335c12ff6","nombre":"Desmalezadora Steel"},{"disponible":true,"nombre":"Podadora Cerco Eléctrica","id":"c39e2a99-debf-4aca-bc38-6af877075d13","agenda":[]},{"id":"85e4c45d-89be-427c-adfa-00a5c2e475d1","nombre":"Motosierra Steel","agenda":[],"disponible":true},{"nombre":"test Maquinaria","id":"9ac5ae10-5298-48f5-9c4d-7c36773cd3be","disponible":true,"agenda":[]},{"disponible":false,"nombre":"Cortadora Césped Steel","agenda":[],"id":"cf85ea92-a99d-4227-8d5f-681971e62fa9"}];
    
    Sec.dameMaquinarias(req.body).
    then((maq)=>res.status(200).send(maq));
});

app.post('/dameMaquinarias',(req,res)=>{
    console.log("--(post)/dameMaquinarias-->[server.js]");
    //var maquinarias = [{"disponible":true,"agenda":[],"id":"170f489d-4a41-4c27-870d-bf1335c12ff6","nombre":"Desmalezadora Steel"},{"disponible":true,"nombre":"Podadora Cerco Eléctrica","id":"c39e2a99-debf-4aca-bc38-6af877075d13","agenda":[]},{"id":"85e4c45d-89be-427c-adfa-00a5c2e475d1","nombre":"Motosierra Steel","agenda":[],"disponible":true},{"nombre":"test Maquinaria","id":"9ac5ae10-5298-48f5-9c4d-7c36773cd3be","disponible":true,"agenda":[]},{"disponible":false,"nombre":"Cortadora Césped Steel","agenda":[],"id":"cf85ea92-a99d-4227-8d5f-681971e62fa9"}];
    
    Sec.dameMaquinarias(req.body).
    then((maq)=>res.status(200).send(maq));
});


/*  Nexo 25 02 
    app.get('/dameUsuariosx',(req, res)=>{
        console.log("--/dameUsuarios-->[server.js]");
        Modelo.dameUsuarios().
        then((usu)=>res.status(200).send(usu));
    });
*/


// Nexo 13-02 Security
app.post('/dameUsuarios',(req, res)=>{
    console.log("--(Post)/dameUsuarios-->[server.js]");
    //Modelo.dameUsuarios().
    console.log(JSON.stringify(req.body));
    Sec.dameUsuarios(req.body).
    then((usu)=>res.status(200).send(usu));
});

/* 
    app.get('/dameTodox',(req, res)=>{
        console.log("--/dameTodo-->[server.js]")
        Sec.dameTodo()
        //.then((todo)=>console.log(todo));
        .then((todo)=>res.status(200).send(todo));
    })
*/

app.post('/dameTodo',(req, res)=>{
    console.log("--(post)/dameTodo-->[server.js]")
    Sec.dameTodo(req.body)
    .then((todo)=>res.status(200).send(todo));
})

//--- post ---------------------------------------------------------

// Nexo 27 01 
app.post('/agregarTarea',(req, res)=>{
    try{
        console.log(req.body);
        //Modelo.agregarTarea(req.body.nombre);
        Sec.agregarTarea(req.body);
        res.status(200).send(req.body);        
    }catch(error){
        res.status(200).send("<p>Error...!</p>");
    }

})

app.post('/agregarMaquinaria',(req,res)=>{
    console.log("--post('/agregarMaquinaria'-->[server.js]")
    console.log(req.body);
    Sec.agregarMaquinaria(req.body)
    .then(res.status(200).send(req.body));
});
// Nexo 1103
app.post('/agregarUsuario',(req, res)=>{
    console.log("--/agregarUsuario-->[server.js]");
    console.log(req.body);
    Sec.agregarUsuario(req.body);
    res.status(200).send(req.body);
})

// Nexo 26 01 eliminar usuario
app.post('/eliminar',(req,res)=>{
    console.log("--post('/eliminar'-->[server.js]");
    console.log(req.body);
    Sec.eliminar(req.body)
    .then(res.status(200).send("Retorno eliminado"));
});

// Nexo 31 01
app.post('/agregarIntervencion',(req, res)=>{
    console.log(req.body);
    Modelo.agregarIntervencion(req.body);
})

function eliminarIdCol(coleccion,id_eliminar){
var nuevaColeccion = coleccion.filter(x=>x.id != id_eliminar)
return nuevaColeccion
}
  
  //-------------------------------------------
  //function modificarObjetos(col_obj,objetos){
    // Nexo 28 01 
app.post('/modificarObjetos',(req, res)=>{
    Modelo.modificar(req.body.objeto, req.body.coleccion)
    .then(res.status(200).send("ok"));
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