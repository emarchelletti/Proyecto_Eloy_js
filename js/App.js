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

// Función para calcular la cantidad de días de una reserva
function calcularDiasReserva(checkin, checkout) {
  const fechaCheckin = new Date(checkin);
  const fechaCheckout = new Date(checkout);
  const unDia = 24 * 60 * 60 * 1000; // Cantidad de milisegundos en un día

  const diffDias = Math.round(Math.abs((fechaCheckout - fechaCheckin) / unDia));
  return diffDias;
}

// Función para limpiar los campos del formulario
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
  // Obtener el elemento donde se mostrará la tabla de reservas
  const contenedorTabla = document.querySelector('#contenedorTabla');

  // Crear el elemento <div> para la tabla de reservas
  const divTabla = document.createElement('div');
  divTabla.id = 'tablaReservas';

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
  `;

  // Agregar el contenido de la tabla al elemento <div>
  divTabla.innerHTML = tablaHTML;

  // Limpiar el contenido previo del contenedor
  contenedorTabla.innerHTML = '';

  // Agregar el elemento <div> al contenedor
  contenedorTabla.appendChild(divTabla);

  // Mostrar tabla
  contenedorTabla.classList.remove('ocultarTabla');

  // Obtener el boton "Eliminar Reservas"
  const eliminarReservasButton = document.querySelector('#eliminarReservas');

  // Agregar evento click al boton "Eliminar Reservas"
  eliminarReservasButton.addEventListener('click', () => {
    // Limpiar el array de reservas
    reservas.length = 0;

    // Limpiar el Storage
    localStorage.removeItem('reservas');

    // Mostrar la tabla de reservas vacía
    mostrarTablaReservas();

    //Ocultar tabla
    contenedorTabla.classList.add('ocultarTabla');
  });
}

//////////////////////////////////////////////////////////////////BOTONES//////////////////////////////////////////////////////////////////////

// Obtener el boton "Ver Reservas"
const botonConfirmarReserva = document.getElementById('confirmarReserva');

// Agregar evento click al boton "Ver Reservas" y ejecutar las funciones
botonConfirmarReserva.addEventListener('click', (e) => {
  //Prevengo que no haga su accion x default
  e.preventDefault();
  // Levantar los valores del formulario
  const checkin = document.querySelector('#checkin').value;
  const checkout = document.querySelector('#checkout').value;
  const cantidadPersonas = document.querySelector('#cantidadPersonas').value;
  const tipoCabana = document.querySelector('#tipoCabana').value;

  // Verificar que todos los campos estén completos
  if (checkin === '' || checkout === '' || cantidadPersonas === '' || tipoCabana === '') {
    alert('Por favor, complete todos los campos del formulario');
    return;
  }

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
});

// Obtener las reservas almacenadas en el Storage al cargar la página
window.addEventListener('DOMContentLoaded', () => {
  const reservasStorage = JSON.parse(localStorage.getItem('reservas')) || [];
  reservas.push(...reservasStorage);
});

