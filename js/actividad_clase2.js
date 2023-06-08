

// let num = prompt ("Ingrese un numero")


// if (num >= 10 && num <=50) {
//     alert ('El numero esta comprendido entre 10 y 50')
// } else {
//     alert ('El numero no esta entre 10 y 50')
// }

let edad = prompt('Ingrese su edad');
const MAYOR_EDAD = 18; 

if (edad >= MAYOR_EDAD) {
    console.log('Le añadimos el sector de bebidas alcoholicas....');
    if (edad >= 21) {
        console.log('Juego de ollas essen y participacion en un grupo de essen');
    }

}else { ///si la persona no es mayor de edad, nos iremos al camino alternativo
    console.log('Le añadimos el sector de videojuegos...');
} 
