
let envios= [];
let datosClientes = [];

let elegirSabor= 0;
let elegirOpcion= 0;


/* Clases */

class Envio {
    constructor (dia, mes) {
        this.dia = dia;
        this.mes = mes;
    }
}

class Cliente {
    constructor (nombre, apellido, ciudad, direccion) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.ciudad = ciudad;
        this.direccion = direccion;
    }
}


const saboresCajas = ["Vainilla rellenas con nutella, Naranja con jengibre, Avena y pasas de uva ,Zanahoria, nueces y chocolate blanco"
];

const saboresBolsas = ["Vainilla rellenas con mousse de chocolate blanco, Naranja con chocolate, Avena y cacao con chips de chocolate blanco , Limon y arandanos, Avena y pasas de uva, Marmoladas bañadas en chocolate blanco, Chocolate y frutos rojos, Vainilla con semillas de maracuya y chips de chocolate negro, Vainilla bañadas en chocolate semi amargo, Limon y semillas de amapolas, Nueces con chocolate blanco"
];

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

const registrarse = () => {
    let nombre = validarNombre();
    let apellido = validarApellido();
    let direccion = parsearDireccion(); 
    let ciudad = parsearCiudad(); 


    let registrarse = new Cliente (nombre, apellido, direccion, ciudad)
    datosClientes.push(registrarse);

    alert(`¡Te damos la bienvenida a Requeterico!`)

}

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





