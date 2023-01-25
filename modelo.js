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
    console.log(unaDb);
    var str_db = JSON.stringify(unaDb);
    fs.writeFileSync(path, str_db);
}

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

async function agregarMaquinaria(nomMaq){
var miMaq = new Clases.Maquinaria(nomMaq);
    console.log("--agregarMaquinarias()-->[modelo.js]");
    try {
        var db = JSON.parse(fs.readFileSync(path, 'utf-8'));
        db.maquinaria.push(miMaq);
        var str_db = JSON.stringify(db);
        fs.writeFileSync(path, str_db);
    
    } catch (err) {
        console.error(err);
    }

}

module.exports = {reply, dameMaquinarias, agregarMaquinaria, eliminarMaquinaria};