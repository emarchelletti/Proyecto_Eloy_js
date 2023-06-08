let tipoCabana;
let cantidadDias;
let cantidadPersonas;
let precioPorPersonaPorDia;
let precioTotal;

//Declaro la funcion que pide al usuario confirmar si quiere hacer otra reserva
function obtenerConfirmacion(mensaje) {
    let respuesta = prompt(mensaje + ' (Ingrese "si" o "no")');
    return respuesta.toLowerCase() === 'si';
}

alert ("Bienvenido al sistema de reservas de " + `"Epecuen Lodge"`)

do {
    let tipoCabanaInput = parseInt(prompt('Ingrese el tipo de cabaña en la que desea hospedarse:\n1. Estandar\n2. Deluxe'));

    // Verificar el tipo de cabaña ingresado
    if (tipoCabanaInput === 1) {
        tipoCabana = 'Estandar';
        cantidadPersonas = parseInt(prompt('Usted a seleccionado la cabaña "Estandar"\n\nIngrese la cantidad de personas que se hospedarán (1 a 4 personas):'));
        if (cantidadPersonas < 1 || cantidadPersonas > 4) {
            alert('Cantidad de personas inválida para cabaña Estandar.\n\nInicie el proceso nuevamente');
            break;
        }
        precioPorPersonaPorDia = 100;
    } else if (tipoCabanaInput === 2) {
        tipoCabana = 'Deluxe';
        cantidadPersonas = parseInt(prompt('Ingrese la cantidad de personas que se hospedarán (2 a 8 personas):'));
        if (cantidadPersonas < 2 || cantidadPersonas > 8) {
            alert('Cantidad de personas inválida para cabaña Deluxe.');
            break;
        }
        precioPorPersonaPorDia = 500;
    } else {
        alert('Opción inválida. Por favor, ingrese 1 para cabaña Estandar o 2 para cabaña Deluxe.');
        break;
    }

    cantidadDias = parseInt(prompt('Ingrese la cantidad de días de estadía (entre 5 y 15 días):'));

    // Verificar la cantidad de días ingresada
    if (cantidadDias < 5 || cantidadDias > 15) {
        alert('Cantidad de días inválida.');
        break;
    }

    // Calcular el precio total
    precioTotal = precioPorPersonaPorDia * cantidadPersonas * cantidadDias;

    // Mostrar el mensaje de confirmación
    let mensaje =
        '¡Su reserva ha sido confirmada!\n' +
        'Cabaña seleccionada: ' + tipoCabana + '\n' +
        'Cantidad de personas: ' + cantidadPersonas + '\n' +
        'Cantidad de días: ' + cantidadDias + '\n' +
        'Precio total: $' + precioTotal;

    alert(mensaje);

} while (obtenerConfirmacion('¿Desea realizar otra reserva?')); 
//El while se ejecuta mientras la funcion "obtenerConfirmacion" devuelva true, lo que significa que el usuario desea realizar otra reserva. El bucle se detendrá cuando la función devuelva false, indicando que el usuario no desea realizar otra reserva.








alert('Muchas gracias por su visita');
