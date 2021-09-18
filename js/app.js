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

            //Agregar los parrafos al divCita
            divCita.append(mascotaParrafo);
            divCita.append(propietarioParrafo);
            divCita.append(telefonoParrafo);
            divCita.append(fechaParrafo);
            divCita.append(horaParrafo);
            divCita.append(sintomasParrafo);

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