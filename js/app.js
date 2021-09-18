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
    eliminarCita(id){
        this.citas = this.citas.filter( cita => cita.id !== id);
    }
}
//CLASE DE UI
class UI{
    mostrarAlerta(mensaje, tipo){
        const validar = document.querySelector(".validacion");
        if(validar){
            divMensaje.remove();
        }
        //Crear la alerta para mostrar
        const divMensaje = document.createElement("div");
        divMensaje.textContent = mensaje; 
        divMensaje.classList.add("text-center", "alert", "d-block", "col-12", "validacion");
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

    imprimirCitas({citas}){
        this.limpiarHTML();
        citas.forEach( (cita)=>{
            const {mascota, propietario, telefono, fecha, hora, sintomas, id} = cita;
            const divCita = document.createElement("div");
            divCita.classList.add("cita", "p-3");
            divCita.dataset.id = id;
            
            //Scripting de los elementos de la cita
            const mascotaParrafo = document.createElement("h2");
            mascotaParrafo.classList.add("card-title", "font-weight-bolder");
            mascotaParrafo.textContent = mascota;

            const propietarioParrafo = document.createElement("P");
            propietarioParrafo.innerHTML = `
                <span class="font-weight-bolder">Propietario: </span> ${propietario}
            `;
            const telefonoParrafo = document.createElement("P");
            telefonoParrafo.innerHTML = `
                <span class="font-weight-bolder">telefono: </span> ${telefono}
            `;
            const fechaParrafo = document.createElement("P");
            fechaParrafo.innerHTML = `
                <span class="font-weight-bolder">fecha: </span> ${fecha}
            `;
            const horaParrafo = document.createElement("P");
            horaParrafo.innerHTML = `
                <span class="font-weight-bolder">hora: </span> ${hora}
            `;
            const sintomasParrafo = document.createElement("P");
            sintomasParrafo.innerHTML = `
                <span class="font-weight-bolder">sintomas: </span> ${sintomas}
            `;
            //Boton de eliminar para cada cita
            const boton = document.createElement("button");
            boton.classList.add("btn", "btn-danger", "mr-2");
            boton.innerHTML = `Eliminar <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>`;
            //Agregar los parrafos al divCita
            divCita.append(mascotaParrafo);
            divCita.append(propietarioParrafo);
            divCita.append(telefonoParrafo);
            divCita.append(fechaParrafo);
            divCita.append(horaParrafo);
            divCita.append(sintomasParrafo);
            divCita.append(boton);

            boton.onclick = () => eliminarCita(id);
            
            //Agregar las citas al HTML
            contenedorCitas.append(divCita);
        })
    }
    limpiarHTML(){
        while(contenedorCitas.firstChild){
            contenedorCitas.removeChild(contenedorCitas.firstChild);
        }
    }
}
//Instancias de las clases
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
    ui.imprimirCitas(citasAdmn);
}

function reiniciarObjeto (){
    citaObj.mascota = "";
    citaObj.propietario = "";
    citaObj.telefono = "";
    citaObj.fecha = "";
    citaObj.hora = "";
    citaObj.sintomas = "";
}

function eliminarCita(id){
    //Eliminar la cita 
    citasAdmn.eliminarCita(id);
    //mostrar mensaje
    ui.mostrarAlerta("Cita eliminada correctamente");
    //Refresque las citas
    ui.imprimirCitas(citasAdmn);
}