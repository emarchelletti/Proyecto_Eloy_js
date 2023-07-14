// Array para almacenar las reservas
const reservas = [];


//////////////////////////////////////////////////////////////////DECLARO FUNCIONES///////////////////////////////////////////////////////

// Funcion para calcular el precio final de una reserva
function calcularPrecioFinal(reserva) {
  let precio = 0;

  if (reserva.tipoCabana === 'Estandar') {
    precio = 100;
  } else if (reserva.tipoCabana === 'Deluxe') {
    precio = 500;
  }
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
}

// Funcion para almacenar los datos de la reserva en el Storage
function almacenarReservaEnStorage(reserva) {
  // Obtener las reservas almacenadas en el Storage (si existen)
  const reservasStorage = JSON.parse(localStorage.getItem('reservas')) || [];

  // Agregar la nueva reserva al array de reservas almacenadas
  reservasStorage.push(reserva);

  // Almacenar el array de reservas actualizado en el Storage
  localStorage.setItem('reservas', JSON.stringify(reservasStorage));
}

// Funcion para mostrar la tabla de reservas
function mostrarTablaReservas() {

  const contenedorTabla = document.querySelector('#contenedorTabla');

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
    const { checkin, checkout, cantidadPersonas, tipoCabana } = reserva;

    const precioFinal = calcularPrecioFinal(reserva);
    //Concateno las filas de la tabla
    tablaHTML += `
      <tr>
        <td>${checkin}</td>
        <td>${checkout}</td>
        <td class="text-center">${cantidadPersonas}</td>
        <td>${tipoCabana}</td>
        <td>$${precioFinal}</td>
      </tr>
    `;
  });

  tablaHTML += `
    </tbody>
      </table>

    <div class="d-flex justify-content-center">
        <button id="confirmarReserva" type="button" class="btn btn-success mt-3">
        Confirmar Reservas
        </button>
    </div>
  `;

  // Agregar el contenido de la tabla al elemento <div>
  contenedorTabla.innerHTML = tablaHTML;

  // Boton para mostrar mensaje de confirmacion
  const botonConfirmarReserva = document.querySelector('#confirmarReserva');

  // Escucho evento de click del boton y ejecuto funcion para mostrar mensaje
  botonConfirmarReserva.addEventListener('click', () => {

    const contenedorTabla = document.querySelector('#contenedorTabla');

    let mensajeConfirmacion = `<br>
      <h3 class="text-center mb-4 display-6"> <strong>Su reserva ha sido confirmada!</strong></h3>
    `;

    contenedorTabla.innerHTML = tablaHTML + mensajeConfirmacion;
  });

  // Borrar la clase que oculta el div de la tabla
  contenedorTabla.classList.remove('ocultarTabla');


}

//////////////////////////////////////////////////////////////////BOTONES //////////////////////////////////////////////////////////////////////






// Obtener el boton "Ver Reservas"
const botonAgregarReserva = document.querySelector('#agregarReserva');

// Escucho evento de click del boton y ejecuto funcion para mostrar tabla
botonAgregarReserva.addEventListener('click', (e) => {

  // Levantar los valores del formulario
  const checkin = document.querySelector('#checkin').value;
  const checkout = document.querySelector('#checkout').value;
  const cantidadPersonas = document.querySelector('#cantidadPersonas').value;
  const tipoCabana = document.querySelector('#tipoCabana').value;

  // Verificar que todos los campos esten completos
  if (checkin === '' || checkout === '' || cantidadPersonas === '' || tipoCabana === '') {

  } else {

    //Prevengo que no haga su accion x default
    e.preventDefault();

    // Crear un objeto Reserva
    const reserva = {
      checkin: checkin,
      checkout: checkout,
      cantidadPersonas: cantidadPersonas,
      tipoCabana: tipoCabana,
    };

    // Agregar la reserva al array de reservas
    reservas.push(reserva);

    mostrarTablaReservas();

    almacenarReservaEnStorage(reserva);

    limpiarFormulario()
  }
});


// Obtener el boton "Eliminar Reservas"
const botonEliminarReservas = document.querySelector('#eliminarReservas');

// Agregar evento click al boton "Eliminar Reservas"
botonEliminarReservas.addEventListener('click', () => {
  // Limpiar el array de reservas
  reservas.length = 0;

  // Limpiar el Storage
  localStorage.removeItem('reservas');

  // Mostrar la tabla de reservas vacia
  mostrarTablaReservas();

  //Ocultar tabla
  contenedorTabla.classList.add('ocultarTabla');
});