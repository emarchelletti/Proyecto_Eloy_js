// function solicitarNombre() {
//     let nombre = prompt ('Como te llamas?')
//     alert ('Hola! ' + nombre)
// }

// solicitarNombre()

let num1 = parseFloat(prompt('Ingrese numero 1'))
let num2 = parseFloat(prompt('Ingrese numero 2'))
let operacion = prompt('Ingrese:' + '\n' +
    '"s" para SUMA' + '\n' +
    '"r" para RESTA')

    const suma = function (a, b) { return a + b }
    const resta = function (a, b) { return a - b }

if (operacion == 's') {
    alert(suma(num1, num2))
}
else {
    alert(resta(num1, num2))
}

