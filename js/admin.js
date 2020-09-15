
const RegistrarRestauranteId = document.getElementById('registrorestaurantesId');
const RegistrarHorarioRestauranteId = document.getElementById('registrohorariorestaurantesId');
const listadeplatillos = document.getElementById('listadeplatillos');
const platilloeditar = document.getElementById('platilloeditar');
const menuconfiguracion = document.querySelectorAll('.menu-configuracion');
const menurestaurantes = document.querySelectorAll('.menu-restaurantes');

const listadeconfiguracion = document.getElementById('listadeconfiguracion');
const perfilesquina = document.getElementById('perfilesquina');
const listadeconfiguracionHorario = document.getElementById('listadeconfiguracionHorario');

const slistadeplatillos = document.getElementById('slistadeplatillos');
const servicioeditar = document.getElementById('servicioeditar');

const menupaquetesservicios= document.querySelectorAll('.menu-paquetes-servicios');
const menuservicios = document.querySelectorAll('.menu-servicios');
const menuarticulos = document.querySelectorAll('.menu-articulos');


const imagenDefault = "https://dam.cocinafacil.com.mx/wp-content/uploads/2019/08/comida-tailandesa.jpg";

window.onload =  Datos;
window.onload =  Servicios;

function MenuServicios(){
    menuservicios.forEach( item => item.style.display = 'block');
    menuarticulos.forEach( item => item.style.display = 'none');
    menupaquetesservicios.forEach( item => item.style.display = 'none');
}
function MenuArticulos(){
    menuservicios.forEach( item => item.style.display = 'none');
    menuarticulos.forEach( item => item.style.display = 'block');
    menupaquetesservicios.forEach( item => item.style.display = 'none');
}


//paquete servicos

function Datos(idservicio){ 
    var RestauranteId = db.collection('limboservicios');
    RestauranteId.doc(idservicio).collection('paquetes').onSnapshot(snapshot =>{
   obtienePlatillos(snapshot.docs);}, err => { alert('Error de sistema'); });
//Obtener el id
document.getElementById("idservicioid").innerHTML = idservicio;
document.getElementById("idservicioid").value = idservicio;
 //Obtengo PLatillos
  const obtienePlatillos = (data) =>{
    if (data.length){
    
        let html = '';
        data.forEach(doc =>{
            const menuplatillo = doc.data();
            const columna = `       
            <div style="padding-top: 20px;">
                <div class="card promoting-card" onClick="EditarPlatillo('${doc.id}')" >   
                <div class="card-body">
                <p class="card-text"><strong>Paquete servicio: </strong>${menuplatillo.servicio}</p>
                <p class="card-text"><strong>Costo único: </strong>${menuplatillo.costounico}</p>
                <p class="card-text"><strong>Costo por hora: </strong>${menuplatillo.costoxhora}</p>
            </div>
              <div class="btn" style="text-align:center;color: #A3A3A3; letter-spacing: 0.1em; background-color:#EEEEEE"><b> ${menuplatillo.estatus}</b></div>
            </div>
          </div>
            `;
            html += columna;   
        });
        listadeplatillos.innerHTML = html;
    }
    else{listadeplatillos.innerHTML='<p class="text-center"> No hay platillos aún</p>'}
  
  };
};
function RegistrarPlatillo(){
    var id = document.getElementById('idservicioid').value;
    var Restaurantes = db.collection('limboservicios');
    Restaurantes.doc(id).collection('paquetes').doc().set({
    servicio:  document.getElementById('idplatilloNombre').value,
    costounico:  document.getElementById('idplatilloPrecio').value,
    costoxhora:  document.getElementById('idplatilloDescripcion').value,
    estatus:  document.getElementById('inputGroupSelect01').value

    
}
).then(function() {
    alert("Platillo Agregado"+ id);
    }).catch(function(error) {
        console.error("Error adding document: ", error);
    });
  


};
function EliminarPlatillo(ideliminar){
  var ideliminar
  var idservicio = document.getElementById('idservicioid').value;
var PlatilloEliminar = db.collection('limboservicios')
PlatilloEliminar.doc(idservicio).collection('paquetes').doc(ideliminar).delete().then(function() {
  let html = '';
  platilloeditar.innerHTML = html;
  alert("Platillo Eliminado");
  }).catch(function(error) {
      alert("Error Al Eliminar PLatillo",error);
  });
};
function EditarPlatillo(id){ 
  let idPlatillo = id
var DatosPlatillo = db.collection('limboservicios')
var idservicio = document.getElementById('idservicioid').value;
    DatosPlatillo.doc(idservicio).collection('paquetes').doc(idPlatillo).get().then(function(doc) {
    if (doc.exists) {
      let html = '';
      const datoplatillo = doc.data();
      const columnaplatillo = `  
      <br> 
      <div class="input-group mb-2">
          <div class="input-group-prepend">
            <span class="input-group-text" id="inputGroup-sizing-default">Paquete servicio:</span>
          </div>
          <input type="text" class="form-control" id="idplatilloNombrem"  value="${datoplatillo.servicio}" aria-label="Default" aria-describedby="inputGroup-sizing-default" >
        </div>
        <div class="input-group mb-2">
          <div class="input-group-prepend">
            <span class="input-group-text" id="inputGroup-sizing-default">Costo Unico:</span>
          </div>
          <input type="text" class="form-control" id="idplatilloPreciom" value="${datoplatillo.costounico}"  aria-label="Default" aria-describedby="inputGroup-sizing-default">
        </div>
        <div class="input-group mb-2">
          <div class="input-group-prepend">
            <span class="input-group-text" id="inputGroup-sizing-default">Costo por hora:</span>
          </div>
          <input type="text" class="form-control" id="idplatilloDescripcionm" value="${datoplatillo.costoxhora}"  aria-label="Default" aria-describedby="inputGroup-sizing-default">
        </div>     
        <div class="input-group mb-2">
          <div class="input-group-prepend" >
            <label class="input-group-text form-control" for="inputGroupSelect01">Estatus:</label>
          </div>
          <select class="custom-select" id="inputGroupSelect01m" >
            <option selected>${datoplatillo.estatus} </option>
            <option value="Agotado">Agotado</option>
            <option value="Existencia">Existencia</option>
          </select>
        </div>
        <button class="btn btn-primary " type="button" onclick="EliminarPlatillo('${doc.id}')" style="width: 50%;">Eliminar paquete servicio</button>
         
        <button class="btn btn-primary" type="button" onclick="ModificarPlatillo('${doc.id}')" style="width: 48%;">Guardar cambios</button>
           `;
            html += columnaplatillo; 

            platilloeditar.innerHTML = html;
        console.log("Document data:", doc.data());
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}).catch(function(error) {
    console.log("Error getting document:", error);
});
    
}
function ModificarPlatillo(id){
  
  let idPlatillo = id
  var idservicio = document.getElementById('idservicioid').value;
  var DatosPlatillo = db.collection('limboservicios')
  DatosPlatillo.doc(idservicio).collection('paquetes').doc(idPlatillo).set({
    servicio: document.getElementById('idplatilloNombrem').value,
    costounico: document.getElementById('idplatilloPreciom').value,
    costoxhora: document.getElementById('idplatilloDescripcionm').value,
    estatus: document.getElementById('inputGroupSelect01m').value
}
).then(function() {
    alert("Platillo Modificado");
    }).catch(function(error) {
        console.error("Error adding document: ", error);
    });
 
}
 //Servicios
function RegistrarServicio(){
    var Restaurantes = db.collection('limboservicios');
    Restaurantes.doc().set({
    servicio:  document.getElementById('sidplatilloNombre').value,
    descripcion:  document.getElementById('sidplatilloDescripcion').value,
    estatus:  document.getElementById('sinputGroupSelect01').value, 
    imagen: imagenDefault,
    estatusmejorevaluados:  document.getElementById('sinputGroupSelect02').value ,
    estatusnuevos:  document.getElementById('sinputGroupSelect03').value ,
    estatuspopulares:  document.getElementById('sinputGroupSelect04').value    }
).then(function() {
    alert("Servicio Registrado");
    }).catch(function(error) {
        console.error("Error adding document: ", error);
    });
};


function Servicios(){

    
    var RestauranteId = db.collection('limboservicios');
    RestauranteId.onSnapshot(snapshot =>{
   sobtienePlatillos(snapshot.docs);}, err => { alert('Error de sistema'); });

 //Obtengo PLatillos
  const sobtienePlatillos = (data) =>{
    if (data.length){
        let html = '';
        data.forEach(doc =>{
            const menuplatillo = doc.data();
            const columna = `       
            <div style="padding-top: 20px;">
                <div class="card promoting-card" onClick="EditarServicio('${doc.id}')" >   
                <div class="card-body">
                <img class="card-img-top rounded-0" src="${menuplatillo.imagen}" alt="Card image cap">
               
                <p class="card-text"><strong>Paquete servicio: </strong>${menuplatillo.servicio}</p>
                <p class="card-text"><strong>Descripcion: </strong>${menuplatillo.descripcion}</p>
                <p class="card-text"><strong>Estatus: </strong>${menuplatillo.estatus}</p>
                <p class="card-text"><strong>EstatusMejorEvaluados: </strong>${menuplatillo.estatusmejorevaluados}</p>
                <p class="card-text"><strong>EstatusNuevos: </strong>${menuplatillo.estatusnuevos}</p>
                <p class="card-text"><strong>EstatusPopulares: </strong>${menuplatillo.estatuspopulares}</p>
            </div>
              <div class="btn" style="text-align:center;color: #A3A3A3; letter-spacing: 0.1em; background-color:#EEEEEE"><b> ${menuplatillo.estatus}</b></div>
            </div>
          </div>
            `;
            html += columna;   
        });
        slistadeplatillos.innerHTML = html;
    }
    else{slistadeplatillos.innerHTML='<p class="text-center"> No hay platillos aún</p>'}
  
  };
};
function EliminarServicio(ideliminar){
    var ideliminar
  var PlatilloEliminar = db.collection('limboservicios')
  PlatilloEliminar.doc(ideliminar).delete().then(function() {
    let html = '';
    platilloeditar.innerHTML = html;
    alert("Platillo Eliminado");
    }).catch(function(error) {
        alert("Error Al Eliminar PLatillo",error);
    });
  };
  function EditarServicio(id){ 
    let idPlatillo = id
  var DatosPlatillo = db.collection('limboservicios')
  
      DatosPlatillo.doc(idPlatillo).get().then(function(doc) {
      if (doc.exists) {
        let html = '';
        const datoplatillo = doc.data();
        const columnaplatillo = `  
        <br> 
        <div class="input-group mb-2">
            <div class="input-group-prepend">
              <span class="input-group-text" id="inputGroup-sizing-default">Paquete servicio:</span>
            </div>
            <input type="text" class="form-control" id="seidplatilloNombre"  value="${datoplatillo.servicio}" aria-label="Default" aria-describedby="inputGroup-sizing-default" >
          </div>
          <div class="input-group mb-2">
            <div class="input-group-prepend">
              <span class="input-group-text" id="inputGroup-sizing-default">Descripcion:</span>
            </div>
            <input type="text" class="form-control" id="seidplatilloPrecio" value="${datoplatillo.descripcion}"  aria-label="Default" aria-describedby="inputGroup-sizing-default">
          </div>    
          <div class="input-group mb-2">
            <div class="input-group-prepend" >
              <label class="input-group-text form-control" for="seinputGroupSelect01">Estatus:</label>
            </div>
            <select class="custom-select" id="seinputGroupSelect01" >
              <option selected>${datoplatillo.estatus} </option>
              <option value="Activado">Activado</option>
              <option value="Desactivado">Desactivado</option>
            </select>
          </div>
          <div class="input-group mb-2">
            <div class="input-group-prepend" >
              <label class="input-group-text form-control" for="seinputGroupSelect02">Estatus mejor evaluados:</label>
            </div>
            <select class="custom-select" id="seinputGroupSelect02" >
              <option selected>${datoplatillo.estatusmejorevaluados} </option>
              <option value="Activado">Activado</option>
              <option value="Desactivado">Desactivado</option>
            </select>
          </div>
          <div class="input-group mb-2">
            <div class="input-group-prepend" >
              <label class="input-group-text form-control" for="seinputGroupSelect04">Estatus populares:</label>
            </div>
            <select class="custom-select" id="seinputGroupSelect04" >
              <option selected>${datoplatillo.estatuspopulares} </option>
              <option value="Activado">Activado</option>
              <option value="Desactivado">Desactivado</option>
            </select>
          </div>
          <div class="input-group mb-2">
            <div class="input-group-prepend" >
              <label class="input-group-text form-control" for="seinputGroupSelect03">Estatus nuevos:</label>
            </div>
            <select class="custom-select" id="seinputGroupSelect03" >
              <option selected>${datoplatillo.estatusnuevos} </option>
              <option value="Activado">Activado</option>
              <option value="Desactivado">Desactivado</option>>
            </select>
          </div>
          <button class="btn btn-primary " type="button" onclick="EliminarServicio('${doc.id}')" style="width: 32%;">Eliminar servicio</button>
           
          <button class="btn btn-primary" type="button" onclick="ModificarServicio('${doc.id}')" style="width: 32%;">Guardar cambios</button>
          <button class="btn btn-primary" type="button" onclick="ServicioPaquetes('${doc.id}')"; style="width: 32%;">Ver Paquetes</button>
             `;
              html += columnaplatillo; 
  
              servicioeditar.innerHTML = html;
          console.log("Document data:", doc.data());
      } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
      }
  }).catch(function(error) {
      console.log("Error getting document:", error);
  });
      
  }
  function ModificarServicio(id){
  
    let idPlatillo = id
    var DatosPlatillo = db.collection('limboservicios')
    DatosPlatillo.doc(idPlatillo).set({
      servicio: document.getElementById('seidplatilloNombre').value,
      descripcion: document.getElementById('seidplatilloPrecio').value,
      estatus: document.getElementById('seinputGroupSelect01').value,
      estatusmejorevaluados: document.getElementById('seinputGroupSelect02').value,
      estatusnuevos: document.getElementById('seinputGroupSelect03').value,
      estatuspopulares: document.getElementById('seinputGroupSelect04').value
  }
  ).then(function() {
      alert("Platillo Modificado");
      }).catch(function(error) {
          console.error("Error adding document: ", error);
      });
   
  }
 function ServicioPaquetes(idservicio){
 Datos(idservicio);
 menuservicios.forEach( item => item.style.display = 'none');
 menuarticulos.forEach( item => item.style.display = 'none');
 menupaquetesservicios.forEach( item => item.style.display = 'block');
  }