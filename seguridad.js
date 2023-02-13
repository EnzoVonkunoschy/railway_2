const Modelo = require('./modelo.js');
const fs = require('fs');
const Handlebars = require("handlebars");

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
                        url : load.url,
                        permiso1 : valPer1,
                        permiso2 : valPer2,
                        permiso3 : valPer3,
                        src : "/header_back.gif"}
        var template = Handlebars.compile(archivo);
        var salida = template(objeto2);
                    
  
        return salida;
    }else{
        return "sorry"
    }
    
}


module.exports = {getContenedor, dameUsuario, validar};