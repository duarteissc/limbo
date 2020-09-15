auth.onAuthStateChanged( user =>{
    if(user){
        alert("estas adentro")
    }
    else {
    }
    alert("estas fuera")
});


const formaingresar = document.getElementById('formaingresar');

formaingresar.addEventListener('submit', (e)=>{
    e.preventDefault();

    let correo = formaingresar['correo'].value;
    let contrasena = formaingresar['contrasena'].value;

    auth.signInWithEmailAndPassword(correo,contrasena).then( cred =>{
        console.log(cred);
        $('#ingresarmodal').modal('hide'); //cerrar la ventana del modal Ingresar
        formaingresar.reset();
        formaingresar.querySelector('.error').innerHTML='';     //mensaje de error
        alert("estas adentro")

    }).catch( err => {
        alert("ocurrio error")
        formaingresar.querySelector('.error').innerHTML=mensajeError(err.code);
        console.log( err)
    });


});

//función para los mensajes de error
function mensajeError(codigo){

    let mensaje ='';

    switch(codigo){
        case 'auth/wrong-password':
            mensaje = 'Su contraseña no es correcta';
            break;
        case 'auth/user-not-found':
            mensaje = 'Usuario no encontrado';
            break;
        case 'auth/weak-password':
            mensaje = 'Contraseña débil';
            break;
        default:
            mensaje ='Ocurrió un error al ingresar con este usuario';

    }

    return mensaje;
} 

const salir = document.getElementById('salir');

salir.addEventListener('click', (e)=>{
    e.preventDefault();

    auth.signOut().then( ()=>{
        alert('El usuario ha salido del sistema');
    });
});

