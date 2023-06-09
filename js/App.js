let tipoCabana;
let cantidadDias;
let cantidadPersonas;
let precioPorPersonaPorDia;
let precioTotal;

//Declaro la funcion que pide al usuario confirmar si finalizo con su reserva
function obtenerConfirmacion(mensaje) {
    let respuesta = prompt(mensaje + ' (Si / No)');
    return respuesta.toLowerCase() === 'si';
}

alert("Bienvenido al sistema de reservas de " + '"Epecuen Lodge"')

do {

    //let tipoCabanaInput = parseInt(prompt('Ingrese el tipo de cabaña en la que desea hospedarse:\n1. Estandar ($100 x persona)\n2. Deluxe ($500 x persona)')); //3

    /// Verificar el tipo de cabaña ingresado
    let tipoCabanaInput;
    while (true) {
        tipoCabanaInput = parseInt(prompt('Ingrese el tipo de cabaña en la que desea hospedarse:\n1. Estandar ($100 x persona)\n2. Deluxe ($500 x persona)'));
        if (tipoCabanaInput === 1 || tipoCabanaInput === 2) {
            break;
        }
        alert('Opción inválida. Por favor, ingrese 1 para cabaña Estandar o 2 para cabaña Deluxe.');
    }

    if (tipoCabanaInput === 1) {
        tipoCabana = 'Estandar';
        do {
            cantidadPersonas = parseInt(prompt('Usted a seleccionado cabaña "Estandar"\nIngrese la cantidad de huespedes (minimo 1 maximo 4):'));
            if (cantidadPersonas < 1 || cantidadPersonas > 4) {
                alert('Cantidad de huespedes inválida para cabaña Estandar.\nRecuerde ingresar un valor entre 1 y 4');
            }
        } while (cantidadPersonas < 1 || cantidadPersonas > 4)
        precioPorPersonaPorDia = 100;

    } else if (tipoCabanaInput === 2) {
        tipoCabana = 'Deluxe';
        do {
            cantidadPersonas = parseInt(prompt('Usted a seleccionado cabaña "Deluxe"\nIngrese la cantidad de huespedes (minimo 2 maximo 8):'));
            if (cantidadPersonas < 2 || cantidadPersonas > 8) {
                alert('Cantidad de huespedes inválida para cabaña Deluxe.\nRecuerde ingresar un valor entre 2 y 8');
            }
        } while (cantidadPersonas < 2 || cantidadPersonas > 8)
        precioPorPersonaPorDia = 500;
    }
    /*} else {
        alert('Opción inválida. Por favor, recuerde ingresar 1 para cabaña Estandar o 2 para cabaña Deluxe.');
        continue;
    }*/


    // Verificar la cantidad de dias 
    do {
        cantidadDias = parseInt(prompt('Ingrese la cantidad de días que desea hospedarse\n(minimo 5 dias maximo 15 días):'));
        if (cantidadDias < 5 || cantidadDias > 15) {
            alert('Cantidad de días inválida.\nRecuerde ingresar un valor entre 5 y 15');
        }
    } while (cantidadDias < 5 || cantidadDias > 15)

    // Calcular el precio total
    precioTotal = precioPorPersonaPorDia * cantidadPersonas * cantidadDias;

    // Mostrar el mensaje de confirmacion
    let mensaje =
        '¡Su reserva ha sido confirmada!\n' +
        'Cabaña seleccionada: ' + tipoCabana + '\n' +
        'Cantidad de personas: ' + cantidadPersonas + '\n' +
        'Cantidad de días: ' + cantidadDias + '\n' +
        'Precio total: $' + precioTotal;

    alert(mensaje);

} while (obtenerConfirmacion('Desea repetir el proceso de reserva?'));
//El while se ejecuta mientras la funcion "obtenerConfirmacion" devuelva true, lo que significa que el usuario desea repetir el proceso de reserva. El bucle se detendrá cuando la función devuelva false, indicando que el usuario no desea realizar otra reserva.

alert('Muchas gracias por su visita');