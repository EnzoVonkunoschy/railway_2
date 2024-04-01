const Modelo = require('./modelo.js');
const fs = require('fs');
const Handlebars = require("handlebars");
const Utilities = require('./app/helper');

async function dameUsuarios(data){
    if(data.ftoken == "CIAQfRvDRUn4Kg4P7dwV"){
        var usuariosTodos = await Modelo.dameUsuarios();
        usuariosTodos.forEach((x)=>x.pass = "");
        return usuariosTodos;
    }else{
        return "<p>...sin token...???";
    }
}

async function dameTodo(data){

    if (typeof data !== "undefined") {
        if( data.ftoken== "CIAQfRvDRUn4Kg4P7dwV"){
            var todoTodo = await Modelo.dameTodo();
            for(var i=0 ; i<todoTodo.usuarios.length ; i++){
                todoTodo.usuarios[i].pass = "";
            }
            for(var i=0 ; i<todoTodo.intervencion.length ; i++){
                todoTodo.intervencion[i].capataz.pass = "";
            }
            return todoTodo;
        }else{
            return JSON.stringify({valor: "no token alowed."})
        }
    } else {
        return JSON.stringify({valor: "no token alowed."})
    }

}

async function validar(load){
    console.log("--validar(load)-->[seguridad.js]");
    
    var valUsu = await Modelo.dameUsuarios();
    // devuelve true si el usuario y contraseña coinciden son únicos.
    return ((valUsu.map(x=>x.user == load.user && x.pass == load.pass).filter(x=>x == true).length)==1)

}

async function dameUsuario(load){
    console.log("--dameUsuario(load)-->[seguridad.js]");
    
    var valUsu = await Modelo.dameUsuarios();

    var usuario = valUsu.filter(x=>x.user == load.user && x.pass == load.pass);
    //console.log(usuario);
    usuario[0].pass = "";
    //console.log(usuario);
    return usuario[0];
}


async function getContenedor(load){
    console.log("--getContenedor(load)-->[seguridad]");
    console.log(load);
    var validado = await validar(load);
    
    if(validado){
        var usua = await dameUsuario(load);
        var archivo = fs.readFileSync('paginas/contenedor.hbs','utf-8',(err,data)=>{
            if(err){console.log(err);}else{console.log("archivo leído");}});

        valPer1 = false; valPer2 = false; valPer3 = false; valPer4 = false; valPer5 = false;
        if(usua.rol == "administrador"){valPer1 = true};
        if(usua.rol == "administrador" || usua.rol == "capataz" || usua.rol == "mecánico" || usua.rol == "invitado"){valPer2 = true};
        if(usua.rol == "administrador" || usua.rol == "mecánico"){valPer3 = true };

        var newToken = "CIAQfRvDRUn4Kg4P7dwV";//var newToken = Utilities.getUuid();
        colTokens.push(newToken);

        var objeto2 = {user : usua.user,          rol : usua.rol,
                        url : load.url,
                        permiso1 : valPer1,  permiso2 : valPer2,
                        permiso3 : valPer3,
                        token : newToken}
        var template = Handlebars.compile(archivo);
        var salida = template(objeto2);
        return salida;
    }else{
        return "sorry"
    }
    
}

async function agregarTarea(load){
    console.log("--agregarTarea(load)-->[seguridad.js]");

    if(typeof load !== "undefined"){
        if(load.token == "CIAQfRvDRUn4Kg4P7dwV"){
            var retorno = await Modelo.agregarTarea(load.util);
            return retorno;
        }else{
            return "<p>Error</p>";
        }
    }else{
        return "<p>Error</p>";
    }        

}

async function dameMaquinarias(load){
    console.log("--dameMaquinarias(load)-->[seguridad.js]")
    console.log(JSON.stringify(load));
    if(load.token == "CIAQfRvDRUn4Kg4P7dwV"){
        var retorno = await Modelo.dameMaquinarias();
        return retorno;
    }else{
        return "Error desde dameMaquinarias(load)[seguridad.js]";
    }
 
}

async function agregarMaquinaria(load){
    console.log("--agregarMaquinaria(load)-->[seguridad.js]");

    if(typeof load !== "undefined"){
        if(load.token == "CIAQfRvDRUn4Kg4P7dwV"){
            var retorno = await Modelo.agregarMaquinaria(load.nombre);
            return retorno;
        }else{
            return "<p>Error no token</p>";
        }
    }else{
        return "<p>Error undefined</p>";
    }        

}

async function agregarUsuario(load){
    console.log("--agregarUsuario(load)-->[seguridad.js]");

    if(typeof load !== "undefined"){
        if(load.token == "CIAQfRvDRUn4Kg4P7dwV"){
            var retorno = await Modelo.agregarUsuario(load);
            return retorno;
        }else{
            return "<p>Error no token</p>";
        }
    }else{
        return "<p>Error undefined</p>";
    }     
}

async function eliminar(load){
    console.log("--eliminar(load)-->[seguridad.js]");
    console.log(load);
    if(typeof load !== "undefined"){
        if(load.token == "CIAQfRvDRUn4Kg4P7dwV"){
            console.log("token válido");
            var retorno = await Modelo.eliminar(load.util);
            return retorno;
        }else{
            return "<p>Error no token</p>";
        }
    }else{
        return "<p>Error undefined</p>";
    }   
}

var colTokens = [];

module.exports = {eliminar, agregarUsuario, agregarMaquinaria, dameMaquinarias, agregarTarea, dameTodo, dameUsuarios, getContenedor, dameUsuario, validar};