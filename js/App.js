const reservas = [];
const { DateTime } = window.luxon;
const reservasStorage = JSON.parse(localStorage.getItem('reservas'));
if (reservasStorage && Array.isArray(reservasStorage)) {
  reservas.push(...reservasStorage);
}

//////////////////////////////////////////////////////////////////DECLARO FUNCIONES///////////////////////////////////////////////////////


// Funcion para calcular el precio final de una reserva
function calcularPrecioFinal(reserva) {
  let precio;
  reserva.tipoCabana === 'Estandar' ? precio = 100 : precio = 500;
  const cantidadDias = calcularDiasReserva(reserva.checkin, reserva.checkout);
  return precio * reserva.cantidadPersonas * cantidadDias;
}

// Funcion para calcular la cantidad de dias de una reserva
function calcularDiasReserva(checkin, checkout) {
  const fechaCheckin = DateTime.fromISO(checkin);
  const fechaCheckout = DateTime.fromISO(checkout);
  const difDias = fechaCheckout.diff(fechaCheckin, 'days').toObject().days;
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
    <h3 class="rounded h3 mt-3 mb-3 bg-success text-center font-family: 'Caveat'">
    La cabaña esta disponible en las fechas seleccionadas!
    </h3>
    <p class="text-decoration-underline h6 fst-italic">Detalles de su reserva</p>
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

  const ultimaReserva = reservas.pop(); // Elimina y obtiene la última reserva del array
  if (ultimaReserva) {
    const { checkin, checkout, cantidadPersonas, tipoCabana } = ultimaReserva;

    const precioFinal = calcularPrecioFinal(ultimaReserva);

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
    reservaSeleccionada = ultimaReserva;
  }

  tablaHTML += `
    </tbody>
      </table>

    <div class="d-flex justify-content-around ">
        <button id="confirmarReserva" type="button" class="btn btn-success mt-3">
        Confirmar Reserva
        </button>
        <button id="descartarReserva" type="button" class="btn btn-danger mt-3">
        Descartar Reserva
        </button>
    </div>
  `;

  // Agregar el contenido de la tabla al elemento <div>
  contenedorTabla.innerHTML = tablaHTML;

  // Boton confirmar Reserva
  const botonConfirmarReserva = document.querySelector('#confirmarReserva');
  emailjs.init("uF1LYXZVoqdX5z_GKp");
  botonConfirmarReserva.addEventListener('click', () => {

    Swal.fire({
      title: 'Su reserva fue confirmada',
      text: `¿Desea enviar el comprobante a ${reservaSeleccionada.email}?`,
      icon: 'success',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No'
    }).then((result) => {
      almacenarReservaEnStorage(ultimaReserva);
      if (result.isConfirmed) {         // Si el usuario elige "Sí", se ejecuta esta acción
        const datosCorreo = {
          to_email: reservaSeleccionada.email,
          from_name: "Epecuen Lodge",
          message: `Gracias por confiar en nosotros, lo esperamos el ${reservaSeleccionada.checkin} para vivir una experiencia inolvidable.`,
        };
        emailjs.send("service_u271lop", "template_173lb8a", datosCorreo, "F1LYXZVoqdX5z_GKp")
          .then((response) => {
            console.log("Correo electrónico enviado con éxito:", response);
            Swal.fire('Comprobante enviado con exito', '', 'success');
            window.location.reload();
          }, (error) => {
            console.error("Error al enviar el correo electrónico:", error);
          });
      } else { // Si el usuario elige "No", se ejecuta esta acción
        Swal.fire({
          title: 'Comprobante no enviado',
          icon: 'info',
          showConfirmButton: false,
        });
        setTimeout(() => {
          window.location.reload();
        }, 2000); // Cambia el valor 2000 a la cantidad de milisegundos que deseas (por ejemplo, 3000 para 3 segundos)
      }

    });
  });

  //Boton descartar Reserva
  const botonDescartarReserva = document.querySelector('#descartarReserva');
  botonDescartarReserva.addEventListener('click', () => {
    window.location.reload();
  });

  // Borrar la clase que oculta el div de la tabla
  contenedorTabla.classList.remove('ocultarTabla');

}

//////////////////////////////////////////////////////////////////BOTONES //////////////////////////////////////////////////////////////////////

// Boton "Ver Disponibilidad"
const botonVerDisp = document.querySelector('#verDisponibilidad');
botonVerDisp.addEventListener('click', (e) => {

  e.preventDefault();

  // Almacenar los valores del formulario
  const checkin = document.querySelector('#checkin').value;
  const checkout = document.querySelector('#checkout').value;
  const cantidadPersonas = document.querySelector('#cantidadPersonas').value;
  const tipoCabana = document.querySelector('#tipoCabana').value;
  const email = document.querySelector('#email').value;

  // Verificar si todos los campos están vacíos
  //if (checkin !== '' && checkout !== '' && cantidadPersonas !== '' && tipoCabana !== '' && email !== '') {
  if (checkin === '' || checkout === '' || cantidadPersonas === '' || tipoCabana === '' || email === '') {
    Swal.fire({
      icon: 'warning',
      title: 'Campos incompletos',
      text: 'Por favor, complete todos los campos antes de continuar.',
    });
    return;
  }

  // Convertir las fechas a objetos de Luxon
  const fechaCheckin = DateTime.fromISO(checkin);
  const fechaCheckout = DateTime.fromISO(checkout);

  // Verificar que el checkin sea antes del checkout
  if (!fechaCheckin.isValid || !fechaCheckout.isValid || fechaCheckin >= fechaCheckout) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'La fecha de check-in debe ser anterior a la fecha de check-out.',
    });
    return;
  }

  // Crear un objeto Reserva
  const nuevaReserva = {
    checkin: checkin,
    checkout: checkout,
    cantidadPersonas: cantidadPersonas,
    tipoCabana: tipoCabana,
    email: email,
  };

  // Verificar disponibilidad 
  const reservaExiste = reservas.some((reserva) => {
    const reservaCheckin = DateTime.fromISO(reserva.checkin);
    const reservaCheckout = DateTime.fromISO(reserva.checkout);
    return (
      reserva.tipoCabana === nuevaReserva.tipoCabana &&
      (
        (fechaCheckin >= reservaCheckin && fechaCheckin < reservaCheckout) ||
        (fechaCheckout > reservaCheckin && fechaCheckout <= reservaCheckout) ||
        (fechaCheckin <= reservaCheckin && fechaCheckout >= reservaCheckout)
      )
    );
  });

  if (reservaExiste) {
    Swal.fire({
      icon: 'error',
      title: 'Sin disponibilidad',
      text: `La cabaña ${tipoCabana} no esta disponible en el rango de fechas ingresado `,
      confirmButtonText: 'Ingresar otra fecha'
    });
    return;
  }

  // Agregar la reserva al array de reservas
  reservas.push(nuevaReserva);

  mostrarTablaReservas();


  limpiarFormulario()

});

// Boton "Eliminar Reservas" para vaciar el local Storage
const botonEliminarReservas = document.querySelector('#eliminarReservas');
botonEliminarReservas.addEventListener('click', () => {
  Swal.fire({
    title: 'Eliminar Reservas',
    text: '¿Estás seguro de que deseas eliminar todas las reservas?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      reservas.length = 0;
      localStorage.removeItem('reservas');
      Swal.fire('Reservas eliminadas', 'Todas las reservas han sido eliminadas', 'success');
      window.location.reload();
    }
  });
});




console.log(JSON.parse(localStorage.getItem('reservas')));


