/* Variables */


let envios= [];
let datosClientes = [];

let elegirSabor= 0;
let elegirOpcion= 0;

let usuario = [];
const usuarios = JSON.parse(localStorage.getItem("baseUsuarios")) || [];


/* Clases */

class Envio {
    constructor (dia, mes) {
        this.dia = dia;
        this.mes = mes;
    }
}

class Cliente {
    constructor (nombre, apellido, ciudad, direccion, documento) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.ciudad = ciudad;
        this.direccion = direccion;
        this.documento = documento; 
    }
}

const saboresCajas = ["Vainilla rellenas con nutella, Naranja con jengibre, Avena y pasas de uva , Zanahoria, nueces y chocolate blanco"];

const saboresBolsas = ["Vainilla rellenas con mousse de chocolate blanco, Naranja con chocolate, Avena y cacao con chips de chocolate blanco , Limon y arandanos, Avena y pasas de uva, Marmoladas bañadas en chocolate blanco, Chocolate y frutos rojos, Vainilla con semillas de maracuya y chips de chocolate negro, Vainilla bañadas en chocolate semi amargo, Limon y semillas de amapolas, Nueces con chocolate blanco"];

const diasDeMeses = [31,30,31,30,31,31,30,31,30,31];
const nombreDeMeses = ["Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

const ciudades = ["Azul, Benito Juarez, Tandil, Ayacucho"];


/* Menu */

const menu = (elegirOpcion) => {
    do {
        elegirOpcion = parseInt(prompt(`Selecciona la opción: 
        1. Registrarse.
        2. Envios.
        3. Salir`));
        switch(elegirOpcion) {
            case 1:
                registrarse();
                break;
            case 2:
                nuevoEncargue();
                break;
            case 3:
                break;
            default:
                alert("¡Gracias por visitar nuestra pagina!");
                break;
        }
    } while (elegirOpcion != 3);
}
const sabores = (elegirSabor) => {
    do {
        elegirSabor = parseInt(prompt(`Selecciona la opcion de cookies que le gustaria comprar: 
        1. Cookies por caja.
        2. Cookies por bolsa.
        3. Volver al menu principal.
        4. Salir.`));
        switch(elegirSabor) {
            case 1:
                console.log(saboresCajas);
                alert("¡Ups! Solo quedan pocas variedades disponibles.")
                break;
            case 2:
                alert("¡Tenemos buenas noticias! La opcion por bolsita te ofrece combinarlas como mas te guste.")
                console.log(saboresBolsas);
                break;
            case 3: 
                elegirSabor();
            case 4:
                break;
            default:
                alert("¡Gracias por visitar nuestra pagina!");
                break;
        }
    } while (elegirSabor != 4);
}

/* objetos  */

const formulario = document.querySelector(".registro__main--formulario");

const nombre = document.getElementById("registro__nombre");
const apellido = document.getElementById("registro__apellido");
const documento = document.getElementById("registro__dni");
const direccion = document.getElementById("registro__direccion");
const ciudad = document.getElementById("registro__ciudad");
const resultado = document.querySelector(".registro__main--resultado");

formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    validarIngresos();
    localStorage.setItem("baseUsuarios", JSON.stringify(usuario));
});

const incorrecto = (el, mensaje) => {
    const ingreso = el.parentElement;
    const error = ingreso.querySelector('incorrecto');

    error.innerText = mensaje;
    ingreso.classList.add('incorrecto');
    ingreso.classList.remove('correcto')
};

const estadoCorrecto = el => {
    const ingreso = el.parentElement;
    const error = ingreso.querySelector('incorrecto');

    error.innerText = '';
    ingreso.classList.add('correcto');
    ingreso.classList.remove('incorrecto');
};

const mailValido = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};

const validarIngresos = () => {

    let val1 = false;
    let val2 = false;
    let val3 = false;
    let val4 = false;
    let val5 = false;

    let nombreValor = nombre.value.trim();
    nombreValor = nombreValor.charAt(0).toUpperCase() + nombreValor.slice(1).toLowerCase();

    let apellidoValor = apellido.value.trim();
    apellidoValor = apellidoValor.charAt(0).toUpperCase() + apellidoValor.slice(1).toLowerCase();

    let documentoValor = documento.value.trim();

    let direccionValor = direccion.value.trim();
    direccionValor = direccionValor.split(" ");

    for (let i = 0; i < direccionValor.length; i++) {
        direccionValor[i] = direccionValor[i][0].toUpperCase() + direccionValor[i].substr(1);
    }
    direccionValor = direccionValor.join(" ");
    
    let ciudadValor = ciudad.value.trim();

    ciudadValor = ciudadValor.split(" ");

    for (let i = 0; i < ciudadValor.length; i++) {
        ciudadValor[i] = ciudadValor[i][0].toUpperCase() + ciudadValor[i].substr(1);
    }
    ciudadValor = ciudadValor.join(" ");


const nuevoEncargue = () => {
    let nombre = validarNombre();
    if ((datosClientes.some((elemento) => elemento.nombre == nombre)) == true) {
        let nombreCliente = nombre;
        let mes = validarMes(anio);
        let dia = validarDia(mes, dia);

        let nuevoEncargue = new Envio (nombreCliente, mes, dia)
        envios.push(nuevoEncargue);

        alert(`¡Has realizado una nueva compra!`)

    } else {
        alert (`No encontramos ningun cliente con ese nombre, intenta de nuevo`);
    }

}


/* validacion  */

const validarNombre = () => {
    let validarNombre = prompt("Por favor, indicanos tu nombre:");

    validarNombre = validarNombre.charAt(0).toUpperCase() + validarNombre.slice(1).toLowerCase();

    while (validarNombre.split(" ").length > 1) {
        alert ("Por favor, intenta de nuevo. El dato ingresado es incorrecto.");
        validarNombre = prompt("Indica tu nombre nuevamente:");
        validarNombre = validarNombre.charAt(0).toUpperCase() + validarNombre.slice(1).toLowerCase();
    }

    return validarNombre;

}

const validarApellido = () => {
    let validarApellido = prompt("Por favor, indicanos tu apellido:");

    validarApellido = validarApellido.charAt(0).toUpperCase() + validarApellido.slice(1).toLowerCase();

    while (validarApellido.split(" ").length > 1) {
        alert ("Por favor, intenta de nuevo. El dato ingresado es incorrecto.");
        validarApellido = prompt("Indica tu apellido nuevamente:");
        validarApellido = validarApellido.charAt(0).toUpperCase() + validarApellido.slice(1).toLowerCase();
    }

    return validarApellido;

}

const validarCiudad = () => {
    let ciudad = prompt("Indíca tu ciudad de residencia:");

    ciudadParseada = ciudad.split(" ");

    for (let i = 0; i < ciudadParseada.length; i++) {
        ciudadParseada[i] = ciudadParseada[i][0].toUpperCase() + ciudadParseada[i].substr(1);
    }

    ciudad = ciudadParseada.join(" ");

    while (ciudades.some((elemento) => elemento == ciudad) == false) {
        alert ("El dato ingresado es incorrecto, intente nuevamente");
        ciudad = prompt("Indíquenos nuevamente:");
        ciudadParseada = ciudad.split(" ");
        for (let i = 0; i < ciudadParseada.length; i++) {
            ciudadParseada[i] = ciudadParseada[i][0].toUpperCase() + ciudadParseada[i].substr(1);
        }
        ciudad = ciudadParseada.join(" ");
    }

    return ciudad;

}

const validarAnio = () => {
    let anioEnvio = parseInt(prompt(`Indicá el año:`));

    while (((anioEnvio != 2022) && (anioEnvio != 2023)) || (isNaN(anioEnvio))) {
        alert ("El año ingresado es incorrecto.");
        anioEnvio = parseInt(prompt("Indicá nuevamente, por favor:"));
    }

    return anioEnvio;

}
const validarMes = (anio) => {
    let mesEnvio = parseInt(prompt(`Indicá el mes del ${anio} para realizar el envio:`));

    while (((mesEnvio < 1) || (mesEnvio > 12)) || (isNaN(mesEnvio))) {
        alert ("Dato incorrecto, intenta nuevamente");
        mesTurno = parseInt(prompt(`Indica nuevamente:`));
    }

    return mesEnvio;
}

const validarDia = (mes, anio) => {
    let diaEnvio = parseInt(prompt(`Indicá en qué día de ${nombreMeses[mes-1]} en que quieras recibir tu paquete`));

    while (((diaEnvio < 1) || (diaEnvio > diasMeses[mes-1])) || (isNaN(diaEnvio))) {
        alert (`Incorrecto, intenta nuevamente`);
        diaTurno = parseInt(prompt(`Indicá nuevamente:`));
    }
    
    return diaEnvio;
}

const validarDocumento = () => {
    let documento = parseInt(prompt("Indica el número de documento:"));

    while ((documento < 0) || (isNaN(documento))){
        alert ("El dato ingresado no es correcto, intente nuevamente:");
        documento = parseInt(prompt("Indica nuevamente el número de documento:"));
    }

    return documento;

};
/* Parseo */

const parsearDireccion = () => {
    let direccion = prompt("Por favor, indica la direccion en que deberiamos entregar tu pedido").toLowerCase();
    direccionParseada = direccion.split(" ");

    for (let i = 0; i < direccionParseada.length; i++) {
        direccionParseada[i] = direccionParseada[i][0].toUpperCase() + direccionParseada[i].substr(1);
    }

    direccion = direccionParseada.join(" ");

    return direccion;

}

const parsearCiudad = () => {
    let ciudad = prompt("Por favor, indica la ciudad en la resides").toLowerCase();
    ciudadParseada = ciudad.split(" ");

    for (let i = 0; i < ciudadParseada.length; i++) {
        ciudadParseada[i] = ciudadParseada[i][0].toUpperCase() + ciudadParseada[i].substr(1);
    }
    ciudad = ciudadParseada.join(" ");

    return ciudad;

}

alert (`¡Te damos la bienvenida a Requeterico!`)

menuPrincipal();

/* login */

let botonLogin = document.querySelector(".login__main--loginButton");

const baseUsuarios = JSON.parse(localStorage.getItem("baseClientes"));

const datoLogin = document.querySelector(".login__main--loginInput");

const errorLogin = document.querySelector(".login__main--errorLogin");


botonLogin.addEventListener("click", ()=> {
    if ((baseUsuarios.some((elemento) => elemento.documento == datoLogin.value)) == true) {
        window.location.replace('./cp.html');
    } else {
        errorLogin.innerHTML = `<p> No encontramos coincidencias, intenta de nuevo. </p>`;
    }
})

}