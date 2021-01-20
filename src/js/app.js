
let pagina = 1;

document.addEventListener('DOMContentLoaded', function(){
    iniciarApp();
})

function iniciarApp(){
    // Mostrar la seccion Actual
    mostrarServicios();
    // Mostrar el DIV Actual
    mostrarSeccion();
    // Oculta o Muestra una Sección
    cambiarSeccion();
    // Paginación siguiente y anterior
    paginaSiguiente();
    paginaAnterior();

    // Comprueba la página actual
    btnPaginador();
}

function mostrarSeccion() {

    const seccionAnterior = document.querySelector('.mostrar-seccion')

    if (seccionAnterior) {
        seccionAnterior.classList.remove('mostrar-seccion')
    }

    const seccionActual = document.querySelector(`#paso-${pagina}`);
    seccionActual.classList.add('mostrar-seccion');

    const tabAnterior = document.querySelector('.actual')

    if (tabAnterior) {
        tabAnterior.classList.remove('actual')
    }

    const tabAct = document.querySelector(`[data-paso="${pagina}"]`)
    tabAct.classList.add('actual')
}

function cambiarSeccion() {

    const enlaces = document.querySelectorAll('.tabs button')

    enlaces.forEach(enlace => {
        enlace.addEventListener('click', function(e) {
            e.preventDefault();

            pagina = parseInt(e.target.dataset.paso);


            mostrarSeccion();
            btnPaginador();

        })
    });

}

async function mostrarServicios(){
    try {
        const resultado = await fetch('./servicios.json')
        const db = await resultado.json();

        const {servicios} = db;

        // GENERAR EL HTML

        servicios.forEach(servicio => {
            
            const {id,nombre,precio} = servicio;

            // DOM Scripting
            // Generar Nombre Servicio
            const nombreS = document.createElement('P');
            nombreS.textContent = nombre;
            nombreS.classList.add('nombre-servicio')

            // Generar Precio Servicio

            const precioS = document.createElement('P');
            precioS.textContent = `$${precio}`;
            precioS.classList.add('precio-servicio')

            //Generar Div Contenedor
            const servicioDiv = document.createElement('DIV');
            servicioDiv.classList.add('servicio')
            servicioDiv.dataset.servicioId = id;
            // Seleccionar event

            servicioDiv.onclick = seleccionarServicio;

            //INYECTAR PRECIO - NOMBRE
            servicioDiv.appendChild(nombreS);
            servicioDiv.appendChild(precioS);


            document.querySelector('#servicios').appendChild(servicioDiv);
        });


    } catch (error) {
        console.log(error);
    }
}

function seleccionarServicio(e) {
    
    let elemento;

    if (e.target.tagName === 'P') {
        elemento = e.target.parentElement;
    } else {
        elemento = e.target;
    }


    if (elemento.classList.contains('seleccionado')) {
        elemento.classList.remove('seleccionado');
    } else {
        elemento.classList.add('seleccionado')
    }
    
}

function paginaSiguiente() {
    const pagSiguiente = document.querySelector('#siguiente');
    pagSiguiente.addEventListener('click', function() {
        pagina++;

        console.log(pagina)

        btnPaginador();
    })
}

function paginaAnterior() {
    const pagAnterior = document.querySelector('#anterior');
    pagAnterior.addEventListener('click', function() {
        pagina--;

        console.log(pagina)

        btnPaginador(); 
    })
}

function btnPaginador() {
    const pagSiguiente = document.querySelector('#siguiente');
    const pagAnterior = document.querySelector('#anterior');

    if(pagina == 1){
        pagAnterior.classList.add('ocultar');
        
    }
    else if(pagina == 3){
        pagSiguiente.classList.add('ocultar');
        pagAnterior.classList.remove('ocultar');
    }
    else{
        pagSiguiente.classList.remove ('ocultar');
        pagAnterior.classList.remove('ocultar');
    }

    mostrarSeccion();
}
