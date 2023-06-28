// Mensaje de Bienvenida al sistema
alert("Bienvenidos al sistema de reserva de EPECUEN LODGE");

let reservas = []; // Array para almacenar las reservas

let opcion; // Variable para el imput del usuario en el primer prompt
let cabañasEstandarDisponibles = 4; // Cantidad inicial de cabañas estándar disponibles
let cabañasDeluxeDisponibles = 2; // Cantidad inicial de cabañas deluxe disponibles

do {
    opcion = parseInt(prompt("Ingrese la opción deseada:\n1. Hacer una reserva\n2. Buscar una reserva ya realizada\n3. Consultar disponibilidad de cabañas\n4. Salir"));

    if (opcion === 1) {

        alert("Ha seleccionado la opción 1: Hacer una reserva"); // Aviso al usuario la opcion elegida

        let tipoCabana;
        let cantidadPersonas;
        let precioPorPersonaPorDia
        let cantidadDias;

        do {
            tipoCabanaInput = parseInt(prompt("Seleccione el tipo de cabaña:\n1. Cabaña Estándar (max 4 personas)\n2. Cabaña Deluxe (max 8 personas"));

            if (tipoCabanaInput === 1) {

                if (cabañasEstandarDisponibles >= 1) {

                    tipoCabana = 'Estandar';
                    precioPorPersonaPorDia = 100;
                    do {
                        cantidadPersonas = parseInt(prompt('Usted a seleccionado cabaña "Estandar"\nIngrese la cantidad de huespedes (minimo 1 maximo 4):'));
                        if (cantidadPersonas < 1 || cantidadPersonas > 4) {
                            alert('Cantidad de huespedes inválida para cabaña Estandar.\nRecuerde ingresar un valor entre 1 y 4');
                        }
                    } while (cantidadPersonas < 1 || cantidadPersonas > 4)



                    // Verificar la cantidad de dias 
                    do {
                        cantidadDias = parseInt(prompt('Ingrese la cantidad de días que desea hospedarse\n(minimo 5 dias maximo 15 días):'));
                        if (cantidadDias < 5 || cantidadDias > 15) {
                            alert('Cantidad de días inválida.\nRecuerde ingresar un valor entre 5 y 15');
                        }
                    } while (cantidadDias < 5 || cantidadDias > 15)

                    break; // Sale del bucle para seguir con el sistema de reserva

                } else {
                    alert('NO HAY MAS DISPONIBILIDAD')
                    break;
                }
            }

            if (tipoCabanaInput === 2) {

                if (cabañasDeluxeDisponibles >= 1) {

                    tipoCabana = 'Deluxe';
                    precioPorPersonaPorDia = 500;
                    do {
                        cantidadPersonas = parseInt(prompt('Usted a seleccionado cabaña "Deluxe"\nIngrese la cantidad de huespedes (minimo 2 maximo 8):'));
                        if (cantidadPersonas < 2 || cantidadPersonas > 8) {
                            alert('Cantidad de huespedes inválida para cabaña Deluxe.\nRecuerde ingresar un valor entre 2 y 8');
                        }
                    } while (cantidadPersonas < 2 || cantidadPersonas > 8)


                    // Verificar la cantidad de dias 
                    do {
                        cantidadDias = parseInt(prompt('Ingrese la cantidad de días que desea hospedarse\n(minimo 5 dias maximo 15 días):'));
                        if (cantidadDias < 5 || cantidadDias > 15) {
                            alert('Cantidad de días inválida.\nRecuerde ingresar un valor entre 5 y 15');
                        }
                    } while (cantidadDias < 5 || cantidadDias > 15)

                    break; // Sale del bucle para seguir con el sistema de reserva
                    break;
                } else {
                    alert('NO HAY MAS DISPONIBILIDAD')
                    break;
                }

            } else {
                alert("Opción inválida.\nPor favor, ingrese un valor entre 1 y 2");
            }

        } while (true); // Este bucle infinito garantiza que el usuario seleccione una opción válida (1 o 2) antes de poder avanzar. Si se ingresa una opción inválida, se muestra un mensaje y el bucle se repite hasta que se ingrese una opción válida.


        let nombreTitular = prompt("Ingrese el nombre del titular de la reserva:");



        let precioFinal = precioPorPersonaPorDia * cantidadPersonas * cantidadDias;

        //GENERO CODIGO DE RESERVA
        function generateRandomCode() {
            let codigo = 'RES' + nombreTitular;
            return codigo.toUpperCase();
        }
        let codigoReserva = generateRandomCode();

        // Restar la cantidad de cabañas disponibles según el tipo seleccionado
        if (tipoCabana === 'Estandar') {
            cabañasEstandarDisponibles--;
        } else if (tipoCabana === 'Deluxe') {
            cabañasDeluxeDisponibles--;
        }

        // Crear objeto reserva
        let nuevaReserva = {
            tipoCabana: tipoCabana,
            cantidadPersonas: cantidadPersonas,
            cantidadDias: cantidadDias,
            precioFinal: precioFinal,
            nombreTitular: nombreTitular,
            codigoReserva: codigoReserva
        };

        // Agregar reserva al array
        reservas.push(nuevaReserva);

        alert("Datos de la reserva:\nTipo de cabaña: " + tipoCabana + "\nCantidad de personas: " + cantidadPersonas + "\nCantidad de días: " + cantidadDias + "\nPrecio Final: $" + precioFinal + "\nTitular de la reserva: " + nombreTitular + "\nCódigo de reserva: " + codigoReserva);

        if (prompt("¿Desea volver al menú principal? (Si / No)").toLowerCase() !== "si") {
            break;
        }

    } else if (opcion === 2) {
        alert("Ha seleccionado la opción 2: Buscar una reserva ya realizada");

        let codigoReserva = prompt("Ingrese el código de reserva:");
        let reservaEncontrada = buscarReserva(codigoReserva);

        if (reservaEncontrada) {
            alert("Reserva encontrada:\nTipo de cabaña: " + reservaEncontrada.tipoCabana + "\nCantidad de personas: " + reservaEncontrada.cantidadPersonas + "\nCantidad de días: " + reservaEncontrada.cantidadDias + "\nPrecio Final: $" + reservaEncontrada.precioFinal + "\nTitular de la reserva: " + reservaEncontrada.nombreTitular);
        } else {
            alert("Código de reserva incorrecto");
            if (prompt("¿Desea intentar nuevamente? (Si / No)").toLowerCase() !== "si") {
                break;
            }
        }

    } else if (opcion === 3) {
        alert("Ha seleccionado la opción 3: Consultar disponibilidad de cabañas");
        alert("Cabañas disponibles:\nCabañas Estándar: " + cabañasEstandarDisponibles + "\nCabañas Deluxe: " + cabañasDeluxeDisponibles);

        if (prompt("¿Desea volver al menú principal? (Si / No)").toLowerCase() !== "si") {
            break;
        }
    }

} while (opcion !== 4);

alert("¡Gracias por utilizar el sistema de reserva!");

function buscarReserva(codigo) {
    // Buscar reserva en el array de reservas
    for (let i = 0; i < reservas.length; i++) {
        if (reservas[i].codigoReserva === codigo) {
            return reservas[i];
        }
    }
    return null; // Reserva no encontrada
}


}
