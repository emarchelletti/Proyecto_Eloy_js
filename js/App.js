// Mensaje de Bienvenida al sistema
alert("Bienvenidos al sistema de reserva de EPECUEN LODGE");

let reservas = []; // Decalro el Array para almacenar las reservas

let cabanasEstandarDisponibles = 4; // Cantidad inicial de cabañas estandar disponibles
let cabanasDeluxeDisponibles = 2; // Cantidad inicial de cabañas deluxe disponibles
let opcion; // Variable para el imput del usuario la funcion principal del sistema

do {
    //Prompt inicial para interactuar con el user
    opcion = parseInt(prompt("Ingrese la opción deseada:\n1. Hacer una reserva\n2. Buscar una reserva ya realizada\n3. Consultar disponibilidad de cabañas\n4. Salir"));

    //OPCION PARA HACER UNA RESERVA
    if (opcion === 1) {

        alert("Ha seleccionado la opción 1: Hacer una reserva"); // Aviso al usuario la opcion elegida

        let tipoCabana;
        let cantidadPersonas;
        let precioPorPersonaPorDia
        let cantidadDias;


        do {
            tipoCabanaInput = parseInt(prompt("Seleccione el tipo de cabaña:\n1. Cabaña Estándar (max 4 personas)\n2. Cabaña Deluxe (max 8 personas)"));

            if (tipoCabanaInput === 1) { //El usuario elije cabana Estandar

                if (cabanasEstandarDisponibles >= 1) {

                    tipoCabana = 'Estandar';
                    precioPorPersonaPorDia = 100;

                    //Ingresar la cantidad de personas
                    do {
                        cantidadPersonas = parseInt(prompt('Usted a seleccionado cabaña "Estandar"\nIngrese la cantidad de huespedes (minimo 1 maximo 4):'));
                        if (cantidadPersonas >= 1 && cantidadPersonas <= 4) {
                            break;
                        } else {
                            alert('Cantidad de huespedes inválida para cabaña Estandar.\nRecuerde ingresar un valor entre 1 y 4');
                        }
                    } while (true)

                    // Ingresar la cantidad de dias 
                    do {
                        cantidadDias = parseInt(prompt('Ingrese la cantidad de días que desea hospedarse\n(minimo 1 dias maximo 14 días):'));
                        if (cantidadDias >= 1 && cantidadDias <= 14) {
                            break;
                        } else {
                            alert('Cantidad de días inválida.\nDebe ingresar un valor entre 1 y 14');
                        }
                    } while (true)

                    break; // Sale del bucle para seguir con el sistema de reserva

                } else {
                    alert('NO HAY MAS DISPONIBILIDAD')
                    break;
                }
            }

            if (tipoCabanaInput === 2) { // El usuario elije cabana Deluxe

                if (cabanasDeluxeDisponibles >= 1) {

                    tipoCabana = 'Deluxe';
                    precioPorPersonaPorDia = 500;

                    //Ingresar la cantidad de personas
                    do {
                        cantidadPersonas = parseInt(prompt('Usted a seleccionado cabaña "Deluxe"\nIngrese la cantidad de huespedes (minimo 2 maximo 8):'));
                        if (cantidadPersonas < 2 || cantidadPersonas > 8) {
                            alert('Cantidad de huespedes inválida para cabaña Deluxe.\nRecuerde ingresar un valor entre 2 y 8');
                        }
                    } while (cantidadPersonas < 2 || cantidadPersonas > 8)


                    // Ingresar la cantidad de dias 
                    do {
                        cantidadDias = parseInt(prompt('Ingrese la cantidad de días que desea hospedarse\n(minimo 2 dias maximo 14 días):'));
                        if (cantidadDias < 2 || cantidadDias > 14) {
                            alert('Cantidad de días inválida.\nRecuerde ingresar un valor entre 2 y 14');
                        }
                    } while (cantidadDias < 2 || cantidadDias > 14)

                    break; // Sale del bucle para seguir con el sistema de reserva

                } else {
                    alert('NO HAY MAS DISPONIBILIDAD')
                    break;
                }

            } else {
                alert("Opción inválida.\nPor favor, ingrese un valor entre 1 y 2");
            }

        } while (true); // Este bucle infinito garantiza que el usuario seleccione una opción válida (1 o 2) antes de poder avanzar. Si se ingresa una opción inválida, se muestra un mensaje y el bucle se repite hasta que se ingrese una opción válida.

        let nombreTitular;
        do {
            nombreTitular = prompt("Ingrese el nombre del titular de la reserva:"); //Se pide un nombre de titular para poder vincularlo al codigo de reserva
            if (nombreTitular != '') {
                break;
            } else {
                alert('Por favor ingrese un nombre para asignar la reserva');
            }
        } while (true);

        let precioFinal = precioPorPersonaPorDia * cantidadPersonas * cantidadDias; // Se calcula el precio final de la reserva

        // Genero codigo de reserva
        function generarCodigoReserva() {
            let codigo = `RES${nombreTitular}`;
            return codigo.toUpperCase();
        }
        let codigoReserva = generarCodigoReserva();

        // Con la reserva completada actualizo la cantidad de cabanas disponibles
        if (tipoCabana === 'Estandar') {
            cabanasEstandarDisponibles--;
        } else if (tipoCabana === 'Deluxe') {
            cabanasDeluxeDisponibles--;
        }

        // Crear objeto reserva
        const nuevaReserva = {
            tipoCabana: tipoCabana,
            cantidadPersonas: cantidadPersonas,
            cantidadDias: cantidadDias,
            precioFinal: precioFinal,
            nombreTitular: nombreTitular,
            codigoReserva: codigoReserva
        };

        // Agregar reserva al array
        reservas.push(nuevaReserva);

        // Muestro los datos de la reserva al user
        alert("Datos de la reserva:\nTipo de cabaña: " + tipoCabana + "\nCantidad de personas: " + cantidadPersonas + "\nCantidad de días: " + cantidadDias + "\nPrecio Final: $" + precioFinal + "\nTitular de la reserva: " + nombreTitular + "\nCódigo de reserva: " + codigoReserva);

        if (prompt("¿Desea volver al menú principal? (Si / No)").toLowerCase() !== "si") {
            break;
        }

    } else if (opcion === 2) { // OPCION PARA BUSCAR UNA RESERVA

        alert("Ha seleccionado la opción 2: Buscar una reserva ya realizada"); // Aviso al usuario la opcion elegida

        let codigoReserva = prompt("Ingrese el codigo de reserva:");

        //let reservaEncontrada = buscarReserva(codigoReserva); REEMPLAZE ESTA FUNCION CON .FIND PARA EL ARRAY  

        let reservaEncontrada = reservas.find((nuevaReserva) => { return nuevaReserva.codigoReserva === codigoReserva });

        if (reservaEncontrada) {
            alert("Reserva encontrada:\nTipo de cabaña: " + reservaEncontrada.tipoCabana + "\nCantidad de personas: " + reservaEncontrada.cantidadPersonas + "\nCantidad de días: " + reservaEncontrada.cantidadDias + "\nPrecio Final: $" + reservaEncontrada.precioFinal + "\nTitular de la reserva: " + reservaEncontrada.nombreTitular);
        } else {
            alert("Código de reserva incorrecto");
            if (prompt("¿Desea volver al menu principal? (Si / No)").toLowerCase() !== "si") {
                break;
            }
        }

    } else if (opcion === 3) {
        alert("Ha seleccionado la opción 3:\nCabañas disponibles:\nCabañas Estándar: " + cabanasEstandarDisponibles + "\nCabañas Deluxe: " + cabanasDeluxeDisponibles);

        if (prompt("¿Desea volver al menú principal? (Si / No)").toLowerCase() !== "si") {
            break;
        }
    }

} while (opcion !== 4);

alert("¡Gracias por utilizar el sistema de reserva!");

reservas.forEach((reserva) => { console.log(reserva) }) // Al finalizar el proceso muestra por consola todas las reservas que se hicieron

// function buscarReserva(codigo) {
//     // Buscar reserva en el array de reservas
//     for (let i = 0; i < reservas.length; i++) {
//         if (reservas[i].codigoReserva === codigo) {
//             return reservas[i];
//         }
//     }
//     return null; // Reserva no encontrada
// }
//REEMPLAZE ESTA FUNCION CON .FIND PARA EL ARRAY        



