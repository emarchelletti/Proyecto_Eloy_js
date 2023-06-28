//Array de las reservas que se van creando
const reservas [];

//Objeto reserva
function reserva(nombre, cabaña, cantidadPersonas, cantidadDias) {
    this.nombre = nombre;
    this.cabaña = cabaña;
    this.cantidadPersonas = cantidadPersonas;
    this.cantidadDias = cantidadDias;

    this.agregarReserva = function agregarReserva(nombre, cabaña, cantidadPersonas, cantidadDias) {
        const nuevaReserva = new Reserva(nombre, cabaña, cantidadPersonas, cantidadDias);
        reservas.push(nuevaReserva);
    }
};


let imputSalida = true;

do {
  
let imputInicial;

  
  while (true) {
      imputInicial = parseInt(prompt('Bienvenido!\nIngrese el nro correspondiente a la opcion que desea:\n1-Hacer Reserva\n2- Buscar Reserva\n3- Consultar disponibilidad\n4- Salir'));
    
    if (imputInicial === 1 || imputInicial === 2 || imputInicial === 3|| imputInicial === 4) {
            break;
        }
      
     alert('Opción inválida. Por favor, ingrese 1 para cabaña Estandar o 2 para cabaña Deluxe.');
    }

  if (imputInicial === 1) {
        alert ('Selecciono la opcion 1');
      };
    
  if (imputInicial === 2) {
        alert ('Selecciono la opcion 2');
      };
  
  if (imputInicial === 3) {
        alert ('Selecciono la opcion 3');
      }
  
  if (imputInicial === 4) {
        alert ('Selecciono la opcion 4')
        imputSalida = false
      }

} while (imputSalida === true)
    
    alert('Muchas gracias por su visita');