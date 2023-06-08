const SUMAR = '+';
const RESTAR = '-';
const DIVIDIR = '/';
const MULTIPLICAR = '*';

let num1;
let num2;
let resultado = 0;
let opcion;
let operacion;
let continuar;

do {

        alert('Bienvenido a la calculadora!');


        opcion = prompt('ingrese la operacion que desea realizar' + '\n' +
        '"+" sumar' + '\n' +
        '"-" restar' + '\n' +
        '"*" multiplicar' + '\n' +
        '"/" dividir')

        if ((opcion != '+') && (opcion != '-') && (opcion != '*') && (opcion != '/')) {

                alert('NO INGRESO UNA OPCION CORRECTA')
        }

        else {

                num1 = parseFloat(prompt('Ingrese el primer numero'));
                num2 = parseFloat(prompt('Ingrese el segundo numero'));

                switch (opcion) {

                        case SUMAR:
                                resultado = num1 + num2;
                                operacion = 'suma';
                                console.log('estoy en sumar');
                                break; ///salimos de la estructura switch
                        case RESTAR:
                                resultado = num1 - num2;
                                operacion = 'resta';
                                console.log('estoy en restar');
                                break; ///cortamos el flujo del codigo dentro de estas llaves (nos vamos hacia afuera)
                        case DIVIDIR:
                                resultado = num1 / num2;
                                operacion = 'division';
                                console.log('estoy en dividir');        
                                break;
                        case MULTIPLICAR:
                                resultado = num1 * num2;
                                operacion = 'multiplicacion';
                                break;
                        default:
                                resultado = 0;
                }

                alert('El resultado de la ' + operacion + ' entre ' + num1 + ' y ' + num2 + ' es: ' + resultado)
                
        }

        continuar = prompt('Desea realizar otra operacion? (SI/NO)')

}


while ((continuar == 'si') || (continuar == 'SI'))