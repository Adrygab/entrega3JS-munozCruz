const form = document.getElementById('calcular');
const listaDatos = document.getElementById('datosUsuarios');
const borrarDatosButton = document.getElementById('limpiarDatos');
const resultado = JSON.parse(localStorage.getItem('usuarios')) || [];

form.addEventListener("submit", (e) =>{
    e.preventDefault()

    const nombre = document.getElementById("nombre").value;
    const edad = document.getElementById("edad").value;
    const objetivo = document.getElementById("objetivo").value;
    const ingresoMensual = document.getElementById("ingresoMensual").value;
    const porcentajeMensual = document.getElementById("porcentajeMensual").value;
    const ahorroTiempo = document.getElementById("ahorroTiempo").value;
    const  ahorroPorcentual = (ingresoMensual * porcentajeMensual) / 100;
    const  ahorroTotal = (ahorroPorcentual * ahorroTiempo);
    const  edadFutura = (ahorroTiempo / 12) + parseInt(edad);

 //Datos del usuario
 const datosUsuario = {
    usuario: nombre,
    meta: objetivo,
    porcentaje: ahorroPorcentual,
    Total: ahorroTotal,
    edadCumplida:edadFutura,
    plazos: plazos(ahorroTiempo),
}
const {usuario, meta, porcentaje, Total, edadCumplida} = datosUsuario 


    // Agregar los nuevos datos al array
    resultado.push(datosUsuario);

    // Guardar en el localStorage
    localStorage.setItem('usuarios', JSON.stringify(resultado));

    // Actualizar la lista en el DOM
    imprimirDatos();

    // Limpiar el formulario
    form.reset();

    plazos();

});

function imprimirDatos() {
    datosUsuario.innerHTML = '';
    const resultado = JSON.parse(localStorage.getItem('usuarios')) || [];

    resultado.forEach((usuario, index) => {
        const listItem = document.createElement('li');
        
        listItem.innerHTML = 
        `<li>Hola: ${usuario.usuario}</li>
        <li>Tu objetivo de ahorro es: ${usuario.meta}</li>
        <li>Tu porcentaje mensual será de: ${usuario.porcentaje}</li>
        <li>Tu ahorro total será de: $${usuario.Total} pesos</li>
        <li>Tu edad será: ${usuario.edadCumplida} años</li>
        <li>Te recomendamos: ${usuario.plazos}</li>
        <br>
        `;
    
        
        
        datosUsuario.appendChild(listItem);
    });
}

borrarDatosButton.addEventListener('click', function () {
    // Borrar datos del localStorage
    localStorage.removeItem('usuarios');

    // Limpiar la lista en el DOM
    datosUsuario.innerHTML = '';
});

// Mostrar los datos guardados al cargar la página
imprimirDatos();

//PLAZOS

function plazos(ahorroTiempo) {
    const cortoPlazo = "Una alcancia";
    const medianoPlazo = "Una cuenta bancaria de ahorro";
    const largoPlazo = "Un fondo de inversión";

    if (ahorroTiempo <= 12) {
        return cortoPlazo;
    } else if (ahorroTiempo <= 36) {
        return medianoPlazo;
    } else {
        return largoPlazo;
    }
}

