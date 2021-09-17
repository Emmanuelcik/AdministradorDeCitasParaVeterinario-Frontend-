//Campos del formulario
const mascotaInput = document.querySelector("#mascota");
const propietarioInput = document.querySelector("#propietario");
const telefonoInput = document.querySelector("#telefono");
const fechaInput = document.querySelector("#fecha");
const horaInput =  document.querySelector("#hora");
const sintomasInput = document.querySelector("#sintomas");
//UX
const form = document.querySelector("#nueva-cita");
const contenedorCitas = document.querySelector("#citas");
//Clases
class Citas {
    constructor(){
        this.citas = [];
    }
    agregarCita(cita){
        this.citas = [...this.citas, cita];
        console.log(this.citas);
    }
}
class UI{
    mostrarAlerta(mensaje, tipo){
        //Crear la alerta para mostrar
        const divMensaje = document.createElement("div");
        divMensaje.textContent = mensaje; 
        divMensaje.classList.add("text-center", "alert", "d-block", "col-12");
        //si es tipo error o no
        if(tipo === "error"){
            divMensaje.classList.add("alert-danger");

        }else{
            divMensaje.classList.add("alert-success");
        }
        //Agregar al dom
        document.querySelector("#contenido").insertBefore(divMensaje, document.querySelector(".agregar-cita"));

        setTimeout( ()=>{
            divMensaje.remove();
        }, 3000)
    }
}
const ui = new UI();
const citasAdmn = new Citas();
//Objeto de cita
const citaObj = {
    mascota: "",
    propietario: "",
    telefono: "",
    fecha: "",
    hora: "",
    sintomas: "",
}
//Eventos
addEvenetListeners();
function addEvenetListeners(){
    mascotaInput.addEventListener("input", datosCita );
    propietarioInput.addEventListener("input", datosCita );
    telefonoInput.addEventListener("input", datosCita );
    fechaInput.addEventListener("input", datosCita );
    horaInput.addEventListener("input", datosCita );
    sintomasInput.addEventListener("input", datosCita );

    form.addEventListener("submit", nuevaCita);
}
//Llena el objeto de citas
function datosCita(e){
    citaObj[e.target.name] = e.target.value; // [e.target.name] = al name del input, en este caso "mascota"
}
//Valida y agrega una nueva cita a la clase de citas
function nuevaCita (e) {
    e.preventDefault();

    //Extraer la info del arreglo de cita

    const {mascota, propietario, telefono, fecha, hora, sintomas} = citaObj;
    if(mascota === "" || propietario === "" || telefono === "" || fecha === "" || hora === "" || sintomas === ""){
        ui.mostrarAlerta("Todos los campos son obligatorios", "error");
        return;   
    }
    citaObj.id = Date.now();
    citasAdmn.agregarCita({...citaObj});

    //Reinicia el form
    form.reset();
    reiniciarObjeto();

    //Mostrar HTML De La Citas
}
function reiniciarObjeto (){
    citaObj.mascota = "";
    citaObj.propietario = "";
    citaObj.telefono = "";
    citaObj.fecha = "";
    citaObj.hora = "";
    citaObj.sintomas = "";
}