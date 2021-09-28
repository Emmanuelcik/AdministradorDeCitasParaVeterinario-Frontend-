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
let editando;
let DB;
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
    editarCita(citaActualizada){
        this.citas = this.citas.map (cita => cita.id === citaActualizada.id ?  citaActualizada : cita)
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

    imprimirCitas(){
        this.limpiarHTML();
        
        this.limpiarHTML();
        //Leer el contenido de la bd
        const objectStore = DB.transaction("citas").objectStore("citas");
        const total = objectStore.count();
        // const fnTexto = this.textoHeading();
        total.onsuccess = function (){

        }
        objectStore.openCursor().onsuccess = function (e){
            const cursor = e.target.result;
            if(cursor){
                const {mascota, propietario, telefono, fecha, hora, sintomas, id} = cursor.value;
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


            boton.onclick = () => eliminarCita(id);
            const botonEditar = document.createElement("button");
            botonEditar.classList.add("btn", "btn-info");
            botonEditar.innerHTML = `Editar <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>`;
            botonEditar.onclick = () => cargarEdicion(cita);

            //Agregar los parrafos al divCita
            divCita.append(mascotaParrafo);
            divCita.append(propietarioParrafo);
            divCita.append(telefonoParrafo);
            divCita.append(fechaParrafo);
            divCita.append(horaParrafo);
            divCita.append(sintomasParrafo);
            divCita.append(boton);
            divCita.append(botonEditar);

       
                
            //Agregar las citas al HTML
            contenedorCitas.append(divCita);

            cursor.continue();
            }
        }
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
window.onload = function () {
    addEvenetListeners();

    createDB();
}
//Eventos

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
    if(editando){
        ui.mostrarAlerta("Editado Correctamente");
        //Pasar el objeto de la cita a edición
        citasAdmn.editarCita ({...citaObj});
        //Regresar el texto de boton al estado original
        form.querySelector("button[type='submit']").textContent = "Agregar Cita";
        //quitar modo edicion
        editando = false;
    }else {
        //Nuevo registro en la base de datos

        //Genera id para la cita
        citaObj.id = Date.now();
        //manda el ovjeto de cita
        citasAdmn.agregarCita({...citaObj});

        //Insertar registro en indexedDB
        const transaction = DB.transaction(["citas"], "readwrite");
        //Habilitar el object store
        const objectStore = transaction.objectStore("citas");
        //Insertar en la base de datos
        objectStore.add(citaObj);
        transaction.oncomplete = function (){
            console.log("cita agregada");
            //MEnsaje de agregado 
            ui.mostrarAlerta("Se agrego correctamente");
        }

        
    }
    

    //Reinicia el form
    form.reset();
    reiniciarObjeto();

    //Mostrar HTML De La Citas
    ui.imprimirCitas();
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
    ui.imprimirCitas();
}

//Carga los datos y el modo edicion
function cargarEdicion(cita){
    const {mascota, propietario, telefono, fecha, hora, sintomas, id} = cita;

    //llenar los inputs
    mascotaInput.value = mascota;
    telefonoInput.value =telefono;
    propietarioInput.value = propietario;
    fecha.value = fecha;
    horaInput.value = hora;
    sintomasInput.value =sintomas;
    //llenar el objeto 
    citaObj.mascota = mascota;
    citaObj.telefono = telefono;
    citaObj.propietario = propietario; 
    citaObj.fecha= fecha;
    citaObj.hora = hora;
    citaObj.sintomas = sintomas;
    
    citaObj.id = id;
    //Cambiar el texto de boton
    form.querySelector("button[type='submit']").textContent = "Guardar Cambios";
    editando = true;

}

function createDB(){
    const crearDB = window.indexedDB.open("citas", 1);

    //Si hay un error
    crearDB.onerror = function (){
        console.loh("error");
    }
    //si todo sale bien
    crearDB.onsuccess = function () {
        DB = crearDB.result;

        ui.imprimirCitas();
    }

    crearDB.onupgradeneeded = function (e) {
        const db = e.target.result;

        const objectStore = db.createObjectStore("citas",{
            KeyPath: "id",
            autoIncrement: true,
        });

        //Definir todas las columnas
        objectStore.createIndex("mascota", "mascota", {unique: false});
        objectStore.createIndex("propietario", "propietario", {unique: false});
        objectStore.createIndex("telefono", "telefono", {unique: false});
        objectStore.createIndex("fecha", "fecha", {unique: false});
        objectStore.createIndex("hora", "hora", {unique: false});
        objectStore.createIndex("sintomas", "sintomas", {unique: false});
        objectStore.createIndex("id", "id", {unique: true});
    }
}