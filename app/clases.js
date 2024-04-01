const Utilities = require('./helper.js');

class Tarea{
    constructor(tar){
      this.id = Utilities.getUuid();
      this.nombre = tar;
      this.maquinaria = [];
      this.realizado = false;
    }
  
    setRealizado(rea){
      this.realizado = rea;
    }
  
    getRealizado(){
      return this.realizado;
    }
  
  
}
  
  //------------------------------------------------
  
class User{
    constructor(user, pass, rol){
      this.id = Utilities.getUuid();
      this.user = user;
      this.pass = pass;
      this.rol = rol;
      this.token = "";
      this.time;
      this.disabled = false;
    }
  
    setToken(tk){
      this.token = tk;
    }
    getToken(){
      return this.token;
    }
    setTime(tim){
      this.time = tim;
    }
    getTime(){
      return this.time;
    }
}
  
  
//-- Maquinaria ---------------------------------------
class Maquinaria{
  constructor(nom){
    this.id = Utilities.getUuid();
    this.nombre = nom;
    this.agenda = [];
    this.disponible = true;
  }

  agendar(fecha){
    this.agenda.push(fecha)
  }

  desAgendar(ind){
    this.agenda.splice(ind)
  }

  setBaja(){
    this.disponible = false;
  }

  setAlta(){
    this.disponible = true;
  }

  getAgenda(){
    return this.agenda;
  }
}
  
class Intervencion{
  constructor(nom, fec, colMaq = [],capa = "No designado",colTar = []){
    this.id = Utilities.getUuid();
    this.nombre = nom;
    this.fecha = fec;
    this.colMaq = colMaq;
    this.capataz = capa;
    this.colTar = colTar;
  }
}

/*  

  function testIntervencion(){
    var unCapataz = new Capataz("Test Capataz");
    var unaMaquinaria = new Maquinaria("Test seccionadora");
    var otraMaquinaria = new Maquinaria("Test motobomba");
    var unaIntervencion = new Intervencion("Paseo de los ciruelos",new Date(2022,11,28),[unaMaquinaria,otraMaquinaria],unCapataz);
    
    Logger.log(JSON.stringify(unaIntervencion));
  
    addObjCol(id_db,"intervencion",unaIntervencion);
  }
*/
  
  module.exports = {Maquinaria, User, Tarea, Intervencion};
  
  
  