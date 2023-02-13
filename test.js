const Clases = require('./app/clases.js');
const Utilities = require('./app/helper.js');
const Modelo = require('./modelo.js');
const Sec = require('./seguridad.js');

const fs = require('fs');
const path = './db_test.txt';


console.log("--> test.js <--");


var creacion = false;
var archivos = false;
var testModelo = false;
var seguridad = true;
/* 
var miUuid = Utilities.getUuid();
console.log(miUuid);

*/
if(creacion){
    var miMaquinaria = new Clases.Maquinaria("testMaquinaria");
    console.log(miMaquinaria);
    miMaquinaria.disponible = false;
    console.log(miMaquinaria);


    var miUsuario = new Clases.User('testUser','1234','administrador');
    console.log(miUsuario);
    miUsuario.disabled = true;
    console.log(miUsuario);

    var miTarea = new Clases.Tarea('testTarea');
    console.log(miTarea);
    miTarea.realizado = true;
    console.log(miTarea);

    var miIntervencion = new Clases.Intervencion('testIntervención',new Date(), [miMaquinaria,miMaquinaria],miUsuario,[miTarea,miTarea]);
    console.log(miIntervencion);
}

if(archivos){
    const db = {usuarios : [], maquinaria : [], intervencion : [], tarea : []};
    db.usuarios.push(miUsuario);
    db.maquinaria.push(miMaquinaria);
    db.tarea.push(miTarea);
    db.intervencion.push(miIntervencion);

    var data = JSON.stringify(db);

    fs.writeFileSync(path, data, (err) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(`The file was saved at ${path}`);
    });

    /* -----------------------------*/
    try {
        const data2 = fs.readFileSync(path, 'utf8');
        console.log("ejecutando bloque try");
        console.log(data2);
        var data3 = JSON.parse(data2);
        console.log(data3);
    } catch (err) {
        console.error(err);
    }
}

if(testModelo){
    console.log("--------------------------------------------");
    console.log(Modelo.reply("Hola modelo!"));

    console.log("test --- Modelo.dameMaquinarias()-------------------")
    console.log(Modelo.dameMaquinarias()
        .then(result => {console.log(result)})
        .catch(error => {console.error(error)}));

    console.log("test --- agregarMaquinaria(maq)----------------------");
        Modelo.agregarMaquinaria(miMaquinaria);
}

if(seguridad){
    var str_user = '{"id":"4qqh7OaSQgRdEfl1p3RT","user":"L261058 test nuevo usuario","pass":"123","rol":"capataz","token":"","disabled":false}';
    var user = JSON.parse(str_user);

    Sec.validar(user).then((data)=>{
        if(data){
            console.log("usuario validado")
        }else{
            console.log("..ups!!")
        }
        });
 
}
