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


//ObtenerRestaurantesInicio
function obtenertodosservicios() {
    db.collection("limboservicios").where("estatus", "==", "Disponible")
    .get()
  .then(querySnapshot => {
    let html = ''
    querySnapshot.forEach(doc => {
          const servicio = doc.data();
          const columna = `       
          <div class="col-md-6 col-6 col-lg-2 text-center mb-2" href="#" onclick="DetalleSer('${doc.id}')">
          <div class="site-service-item site-animate" data-animate-effect="fadeIn" >
              <img src="images/p1.jpg" alt="Image placeholder" class="img-fluid" style="border-radius: 50%; margin-bottom:10px" ></a>
              <h3 class="mb-3" >${servicio.servicio}</h3>
              </div>
         </div>
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
    db.collection("limboservicios").where("estatusmejorevaluados", "==", "Activado").where("estatus", "==", "Activado")
    .get()
  .then(querySnapshot => {
    let html = ''
    querySnapshot.forEach(doc => {
          const servicio = doc.data();
          const columna = `       
          <div class="col-md-6 col-6 col-lg-2 text-center mb-2 href="#" onclick="DetalleSer('${doc.id}')">
          <div class="site-service-item site-animate" data-animate-effect="fadeIn">
              <img src="images/p1.jpg" alt="Image placeholder" class="img-fluid" style="border-radius: 50%; margin-bottom:10px"></a>
              <h3 class="mb-3">${servicio.servicio}</h3>
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
    db.collection("limboservicios").where("estatuspopulares", "==", "Activado").where("estatus", "==", "Activado")
    .get()
  .then(querySnapshot => {
    let html = ''
    querySnapshot.forEach(doc => {
          const servicio = doc.data();
          const columna = `       
          <div class="col-md-6 col-6 col-lg-2 text-center mb-2 href="#" onclick="DetalleSer('${doc.id}')">
          <div class="site-service-item site-animate" data-animate-effect="fadeIn">
              <img src="images/p1.jpg" alt="Image placeholder" class="img-fluid" style="border-radius: 50%; margin-bottom:10px"></a>
              <h3 class="mb-3">${servicio.servicio}</h3>
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
    db.collection("limboservicios").where("estatusnuevos", "==", "Activado").where("estatus", "==", "Activado")
    .get()
  .then(querySnapshot => {
    let html = ''
    querySnapshot.forEach(doc => {
          const servicio = doc.data();
          const columna = `       
          <div class="col-md-6 col-6 col-lg-2 text-center mb-2 href="#" onclick="DetalleSer('${doc.id}')">
          <div class="site-service-item site-animate" data-animate-effect="fadeIn">
              <img src="images/p1.jpg" alt="Image placeholder" class="img-fluid" style="border-radius: 50%; margin-bottom:10px"></a>
              <h3 class="mb-3">${servicio.servicio}</h3>
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
        <div class="col-md-6 col-12 col-lg-8 mb-2">
        <h3 >${servicio.servicio}</h3>
        <p>${servicio.descripcion}</p>
        <p>${servicio.costos}</p>
        </div>
        <div class="col-md-4 col-12 col-lg-4 text-center mb-2">
            <img src="images/p1.jpg" alt="Image placeholder" class="img-fluid" style=" margin-bottom:0px; margin-top:6px; margin-right:0px">
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

                let html01= `<table class="table table-hover table-bordered"> <thead><tr> <th>Descripción</th><th>Costo por hora</th><th>Costo único</th> </tr></thead><tbody>`;
                let html02 = `  </tbody></table>`  ;
              
           
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