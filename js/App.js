// Array para almacenar las reservas
const reservas = [];

class Reserva {
  checkin;
  checkout;
  cantidadPersonas;
  tipoCabana;
  email;
}

const { DateTime } = window.luxon;

//////////////////////////////////////////////////////////////////DECLARO FUNCIONES///////////////////////////////////////////////////////


// Funcion para calcular el precio final de una reserva
function calcularPrecioFinal(reserva) {
  let precio;
  reserva.tipoCabana === 'Estandar' ? precio = 100 : precio = 500; // (si esto no funciona vovler a copiar la funcion del app 3ra Entrega)
  const cantidadDias = calcularDiasReserva(reserva.checkin, reserva.checkout);
  return precio * reserva.cantidadPersonas * cantidadDias;
}

// Funcion para calcular la cantidad de dias de una reserva
function calcularDiasReserva(checkin, checkout) {
  const fechaCheckin = new Date(checkin);
  const fechaCheckout = new Date(checkout);
  const unDia = 24 * 60 * 60 * 1000; // Cantidad de milisegundos en un dia
  const difDias = Math.round(Math.abs((fechaCheckout - fechaCheckin) / unDia));
  return difDias;
}

// Funcion para limpiar los campos del formulario
function limpiarFormulario() {
  document.querySelector('#checkin').value = '';
  document.querySelector('#checkout').value = '';
  document.querySelector('#cantidadPersonas').value = '';
  document.querySelector('#tipoCabana').value = '';
  document.querySelector('#email').value = '';
}

// Funcion para almacenar los datos de la reserva en el Storage
function almacenarReservaEnStorage(reserva) {
  const reservasStorage = JSON.parse(localStorage.getItem('reservas')) || []; // Obtener las reservas almacenadas en el Storage (si existen)
  reservasStorage.push(reserva);  // Agregar la nueva reserva al array de reservas almacenadas
  localStorage.setItem('reservas', JSON.stringify(reservasStorage));   // Almacenar el array de reservas actualizado en el Storage
}

// Funcion para mostrar la tabla de reservas
function mostrarTablaReservas() {

  const contenedorTabla = document.querySelector('#contenedorTabla');
  let reservaSeleccionada;
  

  // Crear la tabla
  let tablaHTML = `
    <table class="table">
      <thead>
        <tr>
          <th>Check-in</th>
          <th>Check-out</th>
          <th>Cantidad de Personas</th>
          <th>Tipo de Cabaña</th>
          <th>Precio Final</th>
        </tr>
      </thead>
      <tbody>
  `;

  // Generar las filas de la tabla
  reservas.forEach((reserva) => {
    const { checkin, checkout, cantidadPersonas, tipoCabana, email } = reserva;

    const precioFinal = calcularPrecioFinal(reserva);

    tablaHTML += `
      <tr>
        <td>${checkin}</td>
        <td>${checkout}</td>
        <td class="text-center">${cantidadPersonas}</td>
        <td>${tipoCabana}</td>
        <td>$${precioFinal}</td>
      </tr>
    `;
    //Guardo la reserva para usar valores mas adelante
    if (!reservaSeleccionada) {
      reservaSeleccionada = reserva;
    }
  });

  tablaHTML += `
    </tbody>
      </table>

    <div class="d-flex justify-content-center">
    <h2 class= "text-center"> Tenemos disponiblidad para su seleccion de cabaña en el rango de fechas seleccionado</h2>
        <button id="confirmarReserva" type="button" class="btn btn-success mt-3">
        Confirmar Reservas
        </button>
    </div>
  `;

  // Agregar el contenido de la tabla al elemento <div>
  contenedorTabla.innerHTML = tablaHTML;

  // Boton para mostrar mensaje de confirmacion
  const botonConfirmarReserva = document.querySelector('#confirmarReserva');
  emailjs.init("uF1LYXZVoqdX5z_GKp");

  botonConfirmarReserva.addEventListener('click', () => {

    Swal.fire({
      title: 'Su reserva fue confirmada',
      text: "¿Desea enviar el comprobante a ${reservaSeleccionada.email} ?",
      icon: 'success',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        // Si el usuario elige "Sí", se ejecuta esta acción
        const datosCorreo = {
          to_email: reservaSeleccionada.email,
          from_name: "Tu Nombre",
          message: "Este es el contenido del correo electrónico.",
        };
        emailjs.send("service_u271lop", "template_173lb8a", datosCorreo, "F1LYXZVoqdX5z_GKp")
        .then((response) => {
          console.log("Correo electrónico enviado con éxito:", response);
        }, (error) => {
          console.error("Error al enviar el correo electrónico:", error);
        });
      } else {
        // Si el usuario elige "No", se ejecuta esta acción
        Swal.fire('Comprobante no enviado', '', 'info');
      }

      // const contenedorTabla = document.querySelector('#contenedorTabla');


      // let mensajeConfirmacion = `<br>
      //   <h3 class="text-center mb-4 display-6"> <strong>Su reserva ha sido confirmada!</strong></h3>
      //   <p>Enviamos un mail a su casilla ${reservaSeleccionada.email}</p>
      // `;

      // contenedorTabla.innerHTML = tablaHTML + mensajeConfirmacion;
    });
  });

  // Borrar la clase que oculta el div de la tabla
  contenedorTabla.classList.remove('ocultarTabla');


}

//////////////////////////////////////////////////////////////////BOTONES //////////////////////////////////////////////////////////////////////

//const botonPrueba = document.querySelector('#verDisponibilidad');

// botonPrueba.onclick = () => {
//   //alert('Hola eLO');
//   Swal.fire({
//   title: 'Error!',
//   text: 'Do you want to continue',
//   icon: 'error',
//   confirmButtonText: 'Cool'
//   })
// }

// Boton "Ver Disponibilidad"
const botonVerDisp = document.querySelector('#verDisponibilidad');
botonVerDisp.addEventListener('click', (e) => {




  // Almacenar los valores del formulario
  const checkin = document.querySelector('#checkin').value;
  const checkout = document.querySelector('#checkout').value;
  const cantidadPersonas = document.querySelector('#cantidadPersonas').value;
  const tipoCabana = document.querySelector('#tipoCabana').value;
  const email = document.querySelector('#email').value;

  // Verificar si todos los campos están vacíos
  if (checkin !== '' && checkout !== '' && cantidadPersonas !== '' && tipoCabana !== '' && email !== '') {

    e.preventDefault();

    // Convertir las fechas a objetos de Luxon
    const fechaCheckin = DateTime.fromISO(checkin);
    const fechaCheckout = DateTime.fromISO(checkout);

    // Verificar que el checkin sea antes del checkout
    if (!fechaCheckin.isValid || !fechaCheckout.isValid || fechaCheckin >= fechaCheckout) {
      alert('La fecha de check-in debe ser anterior a la fecha de check-out.');
      e.preventDefault();
      return;
    }

    // Verificar disponibilidad 
    const reservaExiste = reservas.some((reserva) => {
      const reservaCheckin = DateTime.fromISO(reserva.checkin);
      const reservaCheckout = DateTime.fromISO(reserva.checkout);
      return (
        reserva.tipoCabana === tipoCabana &&
        (
          (fechaCheckin >= reservaCheckin && fechaCheckin < reservaCheckout) ||
          (fechaCheckout > reservaCheckin && fechaCheckout <= reservaCheckout) ||
          (fechaCheckin <= reservaCheckin && fechaCheckout >= reservaCheckout)
        )
      );
    });

    if (reservaExiste) {
      alert('Lo sentimos, no hay disponibilidad en el rango de fechas y tipo de cabaña seleccionado.');
      e.preventDefault();
      return;
    }

    // Crear un objeto Reserva
    const reserva = {
      checkin: checkin,
      checkout: checkout,
      cantidadPersonas: cantidadPersonas,
      tipoCabana: tipoCabana,
      email: email,
    };

    // Agregar la reserva al array de reservas
    reservas.push(reserva);

    e.preventDefault();
    mostrarTablaReservas();

    almacenarReservaEnStorage(reserva);

    limpiarFormulario()
  }
});




// Obtener el boton "Eliminar Reservas"
const botonEliminarReservas = document.querySelector('#eliminarReservas');

botonEliminarReservas.addEventListener('click', () => {
  reservas.length = 0;  // Limpiar el array de reservas
  localStorage.removeItem('reservas');  // Limpiar el Storage
  mostrarTablaReservas();   // Mostrar la tabla de reservas vacia
  contenedorTabla.classList.add('ocultarTabla');   //Ocultar tabla
});

console.log(JSON.parse(localStorage.getItem('reservas')));

