//ocultarjs
const menuarticulos = document.querySelectorAll('.menu-articulos');
const menuinicio= document.querySelectorAll('.menu-inicio');
const menuservicio= document.querySelectorAll('.menu-servicio');
const menueditarservicio= document.querySelectorAll('.menu-editar-servicio');

const imagenDefault = "https://firebasestorage.googleapis.com/v0/b/limbopublicidad-fe169.appspot.com/o/servicio_paginaweb.jpg?alt=media&token=3f99cf9b-1393-4264-b4f8-90bae4535c09";
//insertar html
const listadeservicios = document.getElementById('listadeservicios');
const servicioeditar = document.getElementById('servicioeditar');
const paqueteserviciocrud = document.getElementById('paqueteserviciocrud');

var ServicioId = db.collection('limboservicios');
ServicioId.onSnapshot(snapshot =>{
ObtenerServicios(snapshot.docs);}, err => { alert('Error de sistema'); });
  const ObtenerServicios = (data) =>{
    if (data.length){
        let html = '';
        data.forEach(doc =>{
            const objetoservicio = doc.data();
            const columna = `     
            <div class="col-md-3 " >
            <div style="padding-top: 12px;">
                <div class="card btn promoting-card" onClick="ejecutarserviciospaquetes('${doc.id}')" >   
                <div class="card-body">
                <a class="card-text"><strong>Nombre: </strong>${objetoservicio.servicio}</a>
                <p class="card-text"><strong>Descripcion: </strong>${objetoservicio.descripcion}</p>
            </div>
              <div class="btn" style="text-align:center;color: #737373; letter-spacing: 0.1em; background-color:#EEEEEE"><b>Estatus:  ${objetoservicio.estatus}</b></div>
            </div>
          </div>
          </div>
            `;
            html += columna;   
        });
        listadeservicios.innerHTML = html;
    }
    else{listadeservicios.innerHTML='<p class="text-center"> No hay servicios aún</p>'}
  };
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
    alert("Registrado");
    }).catch(function(error) {
        console.error("Error adding document: ", error);
        alert("Error al registrar");
    });
};
 //Servicio crud
 function ejecutarserviciospaquetes(id){
    EditarServicio(id);
    Datos(id);
}
function EditarServicio(id){ 
  var DatosPlatillo = db.collection('limboservicios')
  
      DatosPlatillo.doc(id).get().then(function(doc) {
      if (doc.exists) {
        let html = '';
        const datoservicio = doc.data();
        const columnaservicio = `  
        <div class="col-md-12">
  <div class="input-group mb-2">
      <div class="input-group-prepend">
        <span class="input-group-text" id="inputGroup-sizing-default">Paquete servicio:</span>
      </div>
      <input type="text" class="form-control" id="seidplatilloNombre"  value="${datoservicio.servicio}" aria-label="Default" aria-describedby="inputGroup-sizing-default" >
    </div>
    <div class="input-group mb-2">
      <div class="input-group-prepend">
        <span class="input-group-text" id="inputGroup-sizing-default">Descripcion:</span>
      </div>
      <input type="text" class="form-control" id="seidplatilloPrecio" value="${datoservicio.descripcion}"  aria-label="Default" aria-describedby="inputGroup-sizing-default">
    </div>    
    <div class="input-group mb-2">
      <div class="input-group-prepend" >
        <label class="input-group-text form-control" for="seinputGroupSelect01">Estatus:</label>
      </div>
      <select class="custom-select" id="seinputGroupSelect01" >
        <option selected>${datoservicio.estatus} </option>
        <option value="Activado">Activado</option>
        <option value="Desactivado">Desactivado</option>
      </select>
    </div>
    <div class="input-group mb-2">
      <div class="input-group-prepend" >
        <label class="input-group-text form-control" for="seinputGroupSelect02">Estatus mejor evaluados:</label>
      </div>
      <select class="custom-select" id="seinputGroupSelect02" >
        <option selected>${datoservicio.estatusmejorevaluados} </option>
        <option value="Activado">Activado</option>
        <option value="Desactivado">Desactivado</option>
      </select>
    </div>
    <div class="input-group mb-2">
      <div class="input-group-prepend" >
        <label class="input-group-text form-control" for="seinputGroupSelect04">Estatus populares:</label>
      </div>
      <select class="custom-select" id="seinputGroupSelect04" >
        <option selected>${datoservicio.estatuspopulares} </option>
        <option value="Activado">Activado</option>
        <option value="Desactivado">Desactivado</option>
      </select>
    </div>
    <div class="input-group mb-2">
      <div class="input-group-prepend" >
        <label class="input-group-text form-control" for="seinputGroupSelect03">Estatus nuevos:</label>
      </div>
      <select class="custom-select" id="seinputGroupSelect03" >
        <option selected>${datoservicio.estatusnuevos} </option>
        <option value="Activado">Activado</option>
        <option value="Desactivado">Desactivado</option>>
      </select>
    </div>
    <div style="text-align:center;">
    <button class="btn btn-primary " type="button" onclick="EliminarServicio('${doc.id}')" style="width: 43%;">Eliminar</button>
     
    <button class="btn btn-primary" type="button" onclick="ModificarServicio('${doc.id}')" style="width: 43%;">Editar</button>
    </div>
  </div>
             `;
              servicioeditar.innerHTML = columnaservicio;
              
              menuservicio.forEach( item => item.style.display = 'none');
              menueditarservicio.forEach( item => item.style.display = 'block');

              document.getElementById("idservicioid").innerHTML = id;
              document.getElementById("idservicioid").value =id;

          console.log("Document data:", doc.data());
      } else {
          console.log("No such document!");
      }
  }).catch(function(error) {
      console.log("Error getting document:", error);
  });
      
  } 
  //Paquetes servicios
  function RegistrarPaqueteServicio(){
    var id = document.getElementById('idservicioid').value;
    var Restaurantes = db.collection('limboservicios');
    Restaurantes.doc(id).collection('paquetes').doc().set({
    servicio:  document.getElementById('paquetenombreid').value,
    costounico:  document.getElementById('paquetecostounico').value,
    costoxhora:  document.getElementById('paquetecostoxhora').value,
    estatus:  document.getElementById('inputGroupSelect01').value }
).then(function() {
    alert("Paquete servicio agregado");
    }).catch(function(error) {
        console.error("Error adding document: ", error);
    });
};
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
      alert("Servicio editado");
      }).catch(function(error) {
          console.error("Error adding document: ", error);
      });
   
  }
  function EliminarServicio(ideliminar){
    var ideliminar
  var PlatilloEliminar = db.collection('limboservicios')
  PlatilloEliminar.doc(ideliminar).delete().then(function() {
    
    menuservicio.forEach( item => item.style.display = 'block');
    menueditarservicio.forEach( item => item.style.display = 'none');
    }).catch(function(error) {
        alert("Error Al Eliminar Servicio",error);
    });
  };
function Datos(id){ 
    var RestauranteId = db.collection('limboservicios');
    RestauranteId.doc(id).collection('paquetes').onSnapshot(snapshot =>{
   obtienePlatillos(snapshot.docs);}, err => { alert('Error de sistema'); });

 //Obtengo PLatillos
  const obtienePlatillos = (data) =>{
    if (data.length){
    
        let html = '';
        data.forEach(doc =>{
            const menuplatillo = doc.data();
            const columna = `  
            <div class="col-lg-3 btn collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">     
            <div style="padding-top: 12px;" >
                <div class="card promoting-card" onClick="EditarServicioCrud('${doc.id}')" >   
                <div class="card-body">
                <p class="card-text"><strong>Paquete: </strong>${menuplatillo.servicio}</p>
            </div>
              <div class="btn" style="text-align:center;color: #737373; letter-spacing: 0.1em; background-color:#EEEEEE"><b>Estatus: ${menuplatillo.estatus}</b></div>
            </div>
          </div>
          </div>
            `;
            html += columna;   
        });
        listadeplatillos.innerHTML = html;
    }
    else{listadeplatillos.innerHTML='<p class="text-center"> No hay Servicios aún</p>'}
  
  };
};
//arreglar
function EditarPaqueteServicio(ideditar){
  
    var idservicio = document.getElementById('idservicioid').value;
    var DatosPlatillo = db.collection('limboservicios')
    DatosPlatillo.doc(idservicio).collection('paquetes').doc(ideditar).set({
      servicio: document.getElementById('paquetenombreid').value,
      costounico: document.getElementById('paquetecostounico').value,
      costoxhora: document.getElementById('paquetecostoxhora').value,
      estatus: document.getElementById('inputGroupSelect01').value
  }
  ).then(function() {
      alert("Paquete modificado");
      }).catch(function(error) {
          console.error("Error adding document: ", error);
      });
   
  }
  function EliminarPaqueteServicio(ideliminar){
    var idservicio = document.getElementById('idservicioid').value;
  var PlatilloEliminar = db.collection('limboservicios')
  PlatilloEliminar.doc(idservicio).collection('paquetes').doc(ideliminar).delete().then(function() {
    let html = '';
    platilloeditar.innerHTML = html;
    alert("Paquete eliminado");
    }).catch(function(error) {
        alert("Error al eliminar",error);
    });
  };
  function EditarServicioCrud(idserviciopaquete){ 
  var DatosPlatillo = db.collection('limboservicios')
  var idservicio = document.getElementById('idservicioid').value;
      DatosPlatillo.doc(idservicio).collection('paquetes').doc(idserviciopaquete).get().then(function(doc) {
      if (doc.exists) {
        let html = '';
        
        const datoplatillo = doc.data();
        const columnaplatillo = `  
        <button class="btn btn-primary btn collapsed" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree" type="button" onclick="EliminarPaqueteServicio('${doc.id}')" style="width: 32%;">Eliminar</button>
        <button class="btn btn-primary btn collapsed" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree" type="button" onclick="EditarPaqueteServicio('${doc.id}')" style="width: 32%;">Editar</button>   
        <button class="btn btn-primary btn collapsed" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree" type="button" onclick="RegistrarPaqueteServicio()" style="width: 32%;">Agregar</button>
        `;
              html += columnaplatillo; 
              paqueteserviciocrud.innerHTML = html;
              document.getElementById("paquetenombreid").value = datoplatillo.servicio;
              document.getElementById("paquetecostounico").value = datoplatillo.costounico;
              document.getElementById("paquetecostoxhora").value = datoplatillo.costoxhora;
              document.getElementById("inputGroupSelect01").value = datoplatillo.estatus;
          console.log("Document data:", doc.data());
      } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
      }
  }).catch(function(error) {
      console.log("Error getting document:", error);
  });
      
  }
  function Notificacion()
  {
    alert("Selecciona un paquete servicio");
  }

  //Menus Selección
  function MenuServicios(){
    menuservicio.forEach( item => item.style.display = 'block');
    menueditarservicio.forEach( item => item.style.display = 'none');
    menuinicio.forEach( item => item.style.display = 'none');
    menuarticulos.forEach( item => item.style.display = 'none');
  }

  function MenuInicio(){
    menuinicio.forEach( item => item.style.display = 'block');
    menuservicio.forEach( item => item.style.display = 'none');
    menueditarservicio.forEach( item => item.style.display = 'none');
    menuarticulos.forEach( item => item.style.display = 'none');
  }

  function MenuArticulos(){
    menuservicio.forEach( item => item.style.display = 'none');
    menueditarservicio.forEach( item => item.style.display = 'none');
    menuinicio.forEach( item => item.style.display = 'none');
    menuarticulos.forEach( item => item.style.display = 'block');
  }

  
auth.onAuthStateChanged( user =>{
  if(user){
      console.log( "Estas Dentro")
  }
  else {
    console.log( "Estas Fuera")
    location.href ="../login.html";
  }
});

const salir = document.getElementById('salir');

salir.addEventListener('click', (e)=>{
    e.preventDefault();

    auth.signOut().then( ()=>{
        location.href ="../login.html";
    });
});

