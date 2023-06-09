
  
  
  // Función para ordenar la tabla por columna
function ordenarTabla() {
  const table = document.getElementById("data-table");
  const columnIndex = obtenerCampoOrdenacion();
  const isAscending = obtenerOrden();

  const rows = Array.from(table.rows);
  rows.shift(); // Remover la primera fila de encabezado de la tabla

  rows.sort((rowA, rowB) => {
    const cellA = rowA.cells[columnIndex].textContent.toLowerCase();
    const cellB = rowB.cells[columnIndex].textContent.toLowerCase();
    return isAscending ? cellA.localeCompare(cellB) : cellB.localeCompare(cellA);
  });

  rows.forEach((row) => table.appendChild(row));
}


 function obtenerCampoOrdenacion() {
  const table = document.getElementById("data-table");
  const headerCells = Array.from(table.rows[0].cells);
  const selectedCell = headerCells.find((cell) =>
    cell.classList.contains("asc") || cell.classList.contains("desc")
  );

  return selectedCell ? selectedCell.cellIndex : -1;
}

function obtenerOrden() {
  const table = document.getElementById("data-table");
  const headerCells = Array.from(table.rows[0].cells);
  const selectedCell = headerCells.find((cell) =>
    cell.classList.contains("asc") || cell.classList.contains("desc")
  );

  return selectedCell ? selectedCell.classList.contains("asc") : false;
}


 // Obtener el formulario y la tabla
let form = document.getElementById("contact-form");
const tableBody = document.querySelector("#data-table tbody");

// Validación personalizada del sueldo mínimo
function validarSueldoMinimo(sueldo) {
  const sueldoMinimoAceptado = 10000;
  return sueldo >= sueldoMinimoAceptado;
}

// Escuchar el evento de envío del formulario
form.addEventListener("submit", (e) => {
  e.preventDefault();
  // Obtener los valores del formulario
  const nombre = form.elements.nombre.value;
  const apellido = form.elements.apellido.value;
  const correo = form.elements.correo.value;
  const sueldo = form.elements.sueldo.value;

  // Validar el sueldo mínimo
  if (!validarSueldoMinimo(sueldo)) {
    alert("El sueldo mínimo ingresado es demasiado bajo. Por favor, ingresa un sueldo mínimo mayor a 10000 pesos.");
    return;
  }

  // Calcular los valores de sueldo en otras monedas
  const sueldoUSD = (sueldo * 0.05).toFixed(2);
  const sueldoEUR = (sueldo * 0.045).toFixed(2);

  // Crear una nueva fila en la tabla con los datos del formulario
  const newRow = tableBody.insertRow();
  newRow.innerHTML = `
    <td>${nombre}</td>
    <td>${apellido}</td>
    <td>${correo}</td>
    <td>${sueldo}</td>
    <td>${sueldoUSD}</td>
    <td>${sueldoEUR}</td>
  `;

  // Limpiar los campos del formulario
  form.reset();
});
