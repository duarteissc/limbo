const serviciostotal = document.querySelectorAll('.menu-servicios-total');
const serviciospopulares = document.querySelectorAll('.menu-servicios-populares');
const serviciosmejorevaluados = document.querySelectorAll('.menu-servicios-mejor-evaluados');
const serviciosnuevos = document.querySelectorAll('.menu-servicios-nuevos');

const serviciostodos = document.getElementById('listaserviciostodos');
const serviciostodosmejorevaluados = document.getElementById('listaserviciosmejorevaluados');
const serviciostodospopulares = document.getElementById('listaserviciospopulares');
const serviciostodosnuevos = document.getElementById('listaserviciosnuevos');


const serviciodetalle = document.querySelectorAll('.menu-servicio-detalle');
const serviciotodosdetalle = document.getElementById('detalleservicio');


window.onload =  obtenertodosservicios;
function inicio(){
  location.href = "https://duarteissc.github.io/limbo/index.html";
}

//ObtenerRestaurantesInicio
function obtenertodosservicios() {
    db.collection("limboservicios").where("estatus", "==", "Disponible")
    .get()
  .then(querySnapshot => {
    let html = ''
    querySnapshot.forEach(doc => {
          const servicio = doc.data();
          const columna = `       

         
          <div class="wrapper btn col-md-6 col-6 col-lg-3 text-center mb-2"  onclick="DetalleSer('${doc.id}'); ">   
          <a  href="#section-home">
          <div class="card radius shadowDepth1">
          <div class="card__image">
          <img src="./imagenes/${servicio.img}"  class="img-fluid" alt="image">
          </div>
          <div class="card__content card__padding">         
          <div class="card__action"><h5><div href="#" style="font-family: sans-serif; Color: #424242;""><b>${servicio.servicio}</b></div></h6></div>
          </div>   
          <div class="container-fluid" style="text-align:center"><div class="card__meta"> 
          <i class="fa fa-clock-o"  style="float: right; color: #F3C715;"><font size="2" style="font-family: sans-serif;color: #424242;">16/09/2020</font></i> 
          </div>
          <div> <a style="float: left; font-size: 14px;font-family: sans-serif; Color: #424242;">Leon, Gto.</a></div>
          </div>
          </div>
      
      
          </a>    </div>
            `;
          html += columna;
        });
        serviciostodos.innerHTML = html;

        serviciosmejorevaluados.forEach( item => item.style.display = 'none');
        serviciostotal.forEach( item => item.style.display = 'block');
        serviciospopulares.forEach(item => item.style.display ='none');
        serviciosnuevos.forEach( item => item.style.display = 'none');
        serviciodetalle.forEach( item => item.style.display = 'none');
       }
    );
  };
  function obtenerserviciosmejorevaluados() {
    db.collection("limboservicios").where("estatusmejorevaluados", "==", "Activado").where("estatus", "==", "Disponible")
    .get()
  .then(querySnapshot => {
    let html = ''
    querySnapshot.forEach(doc => {
          const servicio = doc.data();
          const columna = `       
         
          <div class="wrapper btn col-md-6 col-6 col-lg-3 text-center mb-2" href="#section-home" onclick="DetalleSer('${doc.id}')";>   
          <div class="card radius shadowDepth1">
          <div class="card__image">
          <img src="./imagenes/${servicio.img}"   class="img-fluid" alt="image">
          </div>
          <div class="card__content card__padding">         
          <div class="card__action"><h5><div href="#" style="font-family: sans-serif; Color: #424242;""><b>${servicio.servicio}</b></div></h6></div>
          </div>   
          <div class="container-fluid" style="text-align:center"><div class="card__meta"> 
          <i class="fa fa-clock-o"  style="float: right; color: #F3C715;"><font size="2" style="font-family: sans-serif;color: #424242;">16/09/2020</font></i> 
          </div>
          <div> <a style="float: left; font-size: 14px;font-family: sans-serif; Color: #424242;">Leon, Gto.</a></div>
          </div>
          </div>
      </div>
            `;
          html += columna;
        });
        serviciostodosmejorevaluados.innerHTML = html;

       
        serviciosmejorevaluados.forEach( item => item.style.display = 'block');
        serviciostotal.forEach( item => item.style.display = 'none');
        serviciospopulares.forEach(item => item.style.display ='none');
        serviciosnuevos.forEach( item => item.style.display = 'none');
        serviciodetalle.forEach( item => item.style.display = 'none');
       }
    );
  };
  function obtenerserviciospopulares() {
    db.collection("limboservicios").where("estatuspopulares", "==", "Activado").where("estatus", "==", "Disponible")
    .get()
  .then(querySnapshot => {
    let html = ''
    querySnapshot.forEach(doc => {
          const servicio = doc.data();
          const columna = `       
         
          <div class="wrapper btn col-md-6 col-6 col-lg-3 text-center mb-2" href="#section-home" onclick="DetalleSer('${doc.id}')";>   
          <div class="card radius shadowDepth1">
          <div class="card__image">
          <img src="./imagenes/${servicio.img}"   class="img-fluid" alt="image">
          </div>
          <div class="card__content card__padding">         
          <div class="card__action"><h5><div href="#" style="font-family: sans-serif; Color: #424242;""><b>${servicio.servicio}</b></div></h6></div>
          </div>   
          <div class="container-fluid" style="text-align:center"><div class="card__meta"> 
          <i class="fa fa-clock-o"  style="float: right; color: #F3C715;"><font size="2" style="font-family: sans-serif;color: #424242;">16/09/2020</font></i> 
          </div>
          <div> <a style="float: left; font-size: 14px;font-family: sans-serif; Color: #424242;">Leon, Gto.</a></div>
          </div>
          </div>
      </div>
            `;
          html += columna;
        });
        serviciostodospopulares.innerHTML = html;
        
        serviciosmejorevaluados.forEach( item => item.style.display = 'none');
        serviciostotal.forEach( item => item.style.display = 'none');
        serviciospopulares.forEach(item => item.style.display ='block');
        serviciosnuevos.forEach( item => item.style.display = 'none');
        serviciodetalle.forEach( item => item.style.display = 'none');
       }
    );
  };
  function obtenerserviciosnuevos() {
    db.collection("limboservicios").where("estatusnuevos", "==", "Activado").where("estatus", "==", "Disponible")
    .get()
  .then(querySnapshot => {
    let html = ''
    querySnapshot.forEach(doc => {
          const servicio = doc.data();
          const columna = `       
         
          <div class="wrapper btn col-md-6 col-6 col-lg-3 text-center mb-2" href="#" onclick="DetalleSer('${doc.id}')";>   
          <div class="card radius shadowDepth1">
          <div class="card__image">
          <img src="./imagenes/${servicio.img}"  class="img-fluid" alt="image">
          </div>
          <div class="card__content card__padding">         
          <div class="card__action"><h5><div href="#" style="font-family: sans-serif; Color: #424242;""><b>${servicio.servicio}</b></div></h6></div>
          </div>   
          <div class="container-fluid" style="text-align:center"><div class="card__meta"> 
          <i class="fa fa-clock-o"  style="float: right; color: #F3C715;"><font size="2" style="font-family: sans-serif;color: #424242;">16/09/2020</font></i> 
          </div>
          <div> <a style="float: left; font-size: 14px;font-family: sans-serif; Color: #424242;">Leon, Gto.</a></div>
          </div>
          </div>
      </div>
            `;
          html += columna;
        });
        serviciostodosnuevos.innerHTML = html;
        
        serviciosmejorevaluados.forEach( item => item.style.display = 'none');
        serviciostotal.forEach( item => item.style.display = 'none');
        serviciospopulares.forEach(item => item.style.display ='none');
        serviciosnuevos.forEach( item => item.style.display = 'block');
        serviciodetalle.forEach( item => item.style.display = 'none');
       }
    );
  };

  function DetalleSer(Id){ 
    
    db.collection("limboservicios").doc(Id).collection("paquetes").get().then(querySnapshot => {
    var docRef = db.collection("limboservicios").doc(Id);
    let html = ''
    const html3 = ''
    docRef.get().then(function(doc) {
        if (doc.exists) {
        const servicio = doc.data();
        const columna = `
        


        <div class="col-md-4 col-12 col-lg-4 text-center mb-2"   >
        <div class="wrapper mb-2";>   
        <div class="card radius shadowDepth1">
        <div class="card__image">
        <img src="./imagenes/${servicio.img}"  alt="Image placeholder" class="img-fluid" style=" margin-bottom:0px; margin-right:0px">
        </div>
   </div>
   </div>
   </div>
        <div class="col-md-6 col-12 col-lg-8 mb-2">
        <div class="wrapper mb-2";>   
<div class="card radius shadowDepth1">
        <div style="text-align:center; padding-top:12px;"><h4 style="color:#424242;">${servicio.servicio}</h4></div>
        <div style="padding:12px;"><a >${servicio.descripcion}</a></div>
        </div>
        </div>
        </div>
       
        `;            
        html += columna;

            let html2 = ''
            querySnapshot.forEach(doc => {
                const menuplatillo = doc.data();
                const menucolumna = `
              <tr>
                <td>${menuplatillo.servicio}</td>
                <td>${menuplatillo.costoxhora}</td>
                <td>${menuplatillo.costounico}</td>
              </tr>
                `;
                html2 += menucolumna;
                });
                let serviciotodosdetalle2 = document.getElementById('detalleservicio2');

                let html01= `<div class="container"><table class="table table-hover table-bordered" style="background-color: #fff"> <thead><tr> <th>Descripción</th><th>Costo por hora</th><th>Costo único</th> </tr></thead><tbody>`;
                let html02 = `  </tbody></table></div>`  ;
              
           
        serviciotodosdetalle.innerHTML = html +html01+ html2+ html02;
            


            serviciosmejorevaluados.forEach( item => item.style.display = 'none');
            serviciostotal.forEach( item => item.style.display = 'none');
            serviciospopulares.forEach(item => item.style.display ='none');
            serviciosnuevos.forEach( item => item.style.display = 'none');
            serviciodetalle.forEach( item => item.style.display = 'block');    
    } else {
        // doc.data() will be undefined in this case
        console.log("No hay información del servicio, consulta otro servicio!");
    }
}).catch(function(error) {
    console.log("Error getting document con BD:", error);
});
});  
};