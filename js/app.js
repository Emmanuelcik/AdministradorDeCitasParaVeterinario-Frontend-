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
}
//Llena el objeto de citas
function datosCita(e){
    citaObj[e.target.name] = e.target.value; // [e.target.name] = al name del input, en este caso "mascota"
    console.log(citaObj);
}
