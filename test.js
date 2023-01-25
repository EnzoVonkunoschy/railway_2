const Clases = require('./app/clases.js');
const Utilities = require('./app/helper.js');
const Modelo = require('./modelo.js');

console.log("--> test.js <--");

/* 
var miUuid = Utilities.getUuid();
console.log(miUuid);

*/
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

//--- Archivos -------------------------

const fs = require('fs');
const db = {usuarios : [], maquinaria : [], intervencion : [], tarea : []};
db.usuarios.push(miUsuario);
db.maquinaria.push(miMaquinaria);
db.tarea.push(miTarea);
db.intervencion.push(miIntervencion);

var data = JSON.stringify(db);

const path = './db.txt';

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

//---------------------------------
console.log("--------------------------------------------");
console.log(Modelo.reply("Hola modelo!"));

console.log("test --- Modelo.dameMaquinarias()-------------------")
console.log(Modelo.dameMaquinarias()
    .then(result => {console.log(result)})
    .catch(error => {console.error(error)}));

console.log("test --- agregarMaquinaria(maq)----------------------");
    Modelo.agregarMaquinaria(miMaquinaria);

console.log("test --- eliminarMaquinaria() ------------------------");
    var miM1 = new Clases.Maquinaria("miM1");
    var miM2 = new Clases.Maquinaria("miM2");
    Clases.Maquinaria.agregarMaquinaria(miM1);
    Clases.Maquinaria.agregarMaquinaria(miM2);
    console.log(Modelo.dameMaquinarias()
        .then(console.log(data)));

