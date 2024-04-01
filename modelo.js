const Clases = require('./app/clases.js');
const Utilities = require('./app/helper.js');
const fs = require('fs');
const path = './db.txt';

console.log("--> modelo.js <--");

function reply(A){
    return ("Rebote desde modelo ..."+A)
}

async function dameMaquinarias(){
    //console.log("--dameMaquinarias()-->[modelo.js]");
    try {
        var respuesta;
        respuesta = JSON.parse(fs.readFileSync(path, 'utf-8'));
        return respuesta.maquinaria;
    
    } catch (err) {
        console.error(err);
    }
}

// Nexo 25 02
async function dameUsuarios(){
    console.log("--dameUsuarios()-->[modelo.js]");
    try {
        var respuesta;
        respuesta = JSON.parse(fs.readFileSync(path, 'utf-8'));
        //console.log(respuesta.usuarios);
        console.log("<---------------[modelo.js]");
        return respuesta.usuarios;

    } catch (err) {
        console.error(err);
    }    
}

//------------------------------------------
async function dameTodo(){
    console.log("--dameTodo()-->[modelo.js]");
    try {
        var respuesta;
        respuesta = JSON.parse(fs.readFileSync(path, 'utf-8'));
        return respuesta;
    } catch (err) {
        console.error(err);
    }
}

async function guardarTodo(unaDb){
    console.log("--guardarTodo(unaDb)-->[modelo.js]");
    //console.log(unaDb);
    var str_db = JSON.stringify(unaDb);
    fs.writeFileSync(path, str_db);
}
//---------------------------------------------

async function eliminarMaquinaria(colMaq){
    console.log("--eliminarMaquinaria(colMaq)-->[modelo.js]");
    console.log(colMaq);
    dameTodo()
    .then((todo)=>{
        for(var i=0 ; i<colMaq.length ; i++){
            console.log("entre al bucle: "+colMaq[i].id);
            todo.maquinaria = todo.maquinaria.filter(x=>x.id != colMaq[i].id);
        }
        return todo;
    }).then((todo)=>guardarTodo(todo));
}

async function eliminar(colUsu){
    console.log("--eliminar(colUsu)-->[modelo.js]");
    console.log(colUsu);
    dameTodo()
    .then((todo)=>{
        for(var i=0 ; i<colUsu.length ; i++){
            todo.usuarios = todo.usuarios.filter(x=>x.id != colUsu[i].id);
            todo.maquinaria = todo.maquinaria.filter(x=>x.id != colUsu[i].id);
            todo.tarea = todo.tarea.filter(x=>x.id != colUsu[i].id);
            todo.intervencion = todo.intervencion.filter(x=>x.id != colUsu[i].id);

            // poner todas las colecciones aquí...
        }
        return todo;
    }).then((todo)=>guardarTodo(todo));
}

// Nexo 28 01
async function modificar(elemento, arg_coleccion){
    dameTodo()
    .then((data)=>{
        var nuevaColeccion = data[arg_coleccion];
        for(var i=0 ; i<elemento.length ; i++){
            nuevaColeccion = nuevaColeccion.filter(x=> x.id != elemento[i].id);
            nuevaColeccion.push(elemento[i]);
        }
        data[arg_coleccion] = nuevaColeccion;
        guardarTodo(data);
    })

}

async function agregarMaquinaria(nomMaq){
    console.log("--agregarMaquinarias()-->[modelo.js]");

    var tmp_nomMaq = nomMaq; // Salvo el valor antes de comparar
    var tmpMaq = await dameMaquinarias();
    var repeti = tmpMaq.map(x=>x.nombre.trim().toLowerCase() == nomMaq.trim().toLowerCase());
    var repeti2 = repeti.reduce((a,b)=> a || b)

    if(!repeti2){
        nomMaq = tmp_nomMaq; // Recupero el valor para poder operar.
        var miMaq = new Clases.Maquinaria(nomMaq); // Nexo 0503        
        try {
            var db = JSON.parse(fs.readFileSync(path, 'utf-8'));
            db.maquinaria.push(miMaq);
            var str_db = JSON.stringify(db);
            fs.writeFileSync(path, str_db);
        } catch (err) {
            console.error(err);
        }
    }else{
        var rta = {};
        rta.respuesta = "La maquinaria ya existe";
        return rta;
    }
}


async function agregarUsuario(usu){
    console.log("--agregarUsuario(usu)-->[modelo.js]")

    var todosUsuarios = await dameUsuarios(); // Cargo todos los usuarios

    var repetido = todosUsuarios.map(x=>x.user.trim().toLowerCase() == usu.user.trim().toLowerCase());
    var repetido2 = repetido.reduce((a,b)=>a || b);

    if(!repetido2){
        var nuevoUsu = new Clases.User(usu.user, usu.pass, usu.rol);
        dameTodo()
        .then((data)=>{data.usuarios.push(nuevoUsu);
                        return data})
        .then((data)=>guardarTodo(data));        
    }
    return null; 
}

async function agregarTarea(nom){
    console.log("--agregarTarea(nom)-->[modelo.js]");
    console.log(nom);
 
    var nuevaTarea = new Clases.Tarea(nom);
    dameTodo()
    .then((data)=>{
        console.log(nom);
        console.log(nuevaTarea);
        //console.log(data.tarea.map(x=>x.));

        data.tarea.push(nuevaTarea);
        return data})
    .then((data)=>guardarTodo(data));
}

async function agregarIntervencion(inter){
    inter.id = Utilities.getUuid();
    dameTodo()
    .then((data)=>{
        data.intervencion.push(inter);
        return data})
    .then((data)=>guardarTodo(data));
    
}

module.exports = {agregarIntervencion, modificar, reply, dameMaquinarias, agregarMaquinaria, dameUsuarios, agregarUsuario, dameTodo, eliminar, agregarTarea};