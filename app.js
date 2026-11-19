'use strict';
const clave = 'rutaPractica.v1';
const estados = ['Enviada', 'Entrevista', 'Aceptada', 'Cerrada'];
const $ = selector => document.querySelector(selector);
const form = $('#formulario');
let seleccion = null;
let registros = [];

function leer() {
  const texto = localStorage.getItem(clave);
  const filas = texto === null ? [] : JSON.parse(texto);
  if (!Array.isArray(filas) || filas.some(fila => !fila ||
      !['id','cargo','empresa','municipio','fecha'].every(campo => typeof fila[campo] === 'string') ||
      !estados.includes(fila.estado))) throw new Error('Datos incompatibles');
  return filas;
}

// Leer la versión actual antes de modificarla conserva cambios previos de otras pestañas.
function guardar(cambiar, mensaje) {
  try {
    const siguientes = cambiar(leer());
    localStorage.setItem(clave, JSON.stringify(siguientes));
    registros = siguientes;
    mostrar();
    $('#aviso').textContent = mensaje;
    return true;
  } catch (error) {
    const aviso = error.message === 'Registro ausente' ? 'La postulación ya se eliminó.' :
      'No se pudo guardar. Revisa el almacenamiento del navegador.';
    $('#aviso').textContent = aviso;
    $('#error').textContent = aviso;
    if ($('#confirmar').open) $('#detalle').textContent = aviso;
    return false;
  }
}

function abrir(fila) {
  seleccion = fila?.id ?? null;
  form.reset();
  $('#error').textContent = '';
  $('#titulo').textContent = fila ? 'Editar postulación' : 'Nueva postulación';
  const hoy = new Date();
  const local = new Date(hoy.getTime() - hoy.getTimezoneOffset()*60000);
  form.elements.fecha.value = local.toISOString().slice(0,10);
  if (fila) for (const campo of ['cargo','empresa','municipio','fecha','estado']) {
    form.elements[campo].value = fila[campo];
  }
  $('#editor').showModal();
}

function elemento(tipo, texto, clase) {
  const nodo = document.createElement(tipo);
  nodo.textContent = texto;
  if (clase) nodo.className = clase;
  return nodo;
}

function mostrar() {
  $('#total').textContent = registros.length;
  $('#entrevistas').textContent = registros.filter(r => r.estado === 'Entrevista').length;
  $('#aceptadas').textContent = registros.filter(r => r.estado === 'Aceptada').length;
  const visibles = registros.filter(r => !$('#filtro').value || r.estado === $('#filtro').value);
  const cuerpo = $('#registros');
  cuerpo.replaceChildren();
  for (const fila of visibles) {
    const tr = cuerpo.insertRow();
    tr.insertCell().append(elemento('b',fila.cargo),elemento('span',fila.empresa,'sub'));
    tr.insertCell().textContent = fila.municipio;
    tr.insertCell().textContent = fila.fecha.split('-').reverse().join('/');
    tr.insertCell().append(elemento('span',fila.estado,'tag e'+estados.indexOf(fila.estado)));
    const acciones = tr.insertCell();
    const editar = elemento('button','Editar','mini');
    editar.onclick = () => abrir(fila);
    const eliminar = elemento('button','Eliminar','mini danger');
    eliminar.onclick = () => {
      seleccion = fila.id;
      $('#detalle').textContent = '¿Deseas eliminar «'+fila.cargo+'» de '+fila.empresa+'?';
      $('#confirmar').showModal();
    };
    acciones.append(editar, eliminar);
  }
  $('#vacio').textContent = visibles.length ? '' : registros.length ?
    'No hay postulaciones con este estado.' : 'Agrega tu primera postulación para comenzar.';
}

for (const estado of estados) {
  $('#filtro').add(new Option(estado));
  form.elements.estado.add(new Option(estado));
}
$('#nueva').onclick = () => abrir(null);
$('#cancelar').onclick = () => $('#editor').close();
$('#volver').onclick = () => $('#confirmar').close();
$('#filtro').onchange = mostrar;
function leerFormulario() {
  const datos = Object.fromEntries(new FormData(form));
  for (const campo of ['cargo','empresa','municipio']) {
    datos[campo] = datos[campo].trim();
    if (!datos[campo]) {
      $('#error').textContent = 'Completa el campo '+campo+' con texto.';
      form.elements[campo].focus();
      return null;
    }
  }
  return datos;
}

form.onsubmit = evento => {
  evento.preventDefault();
  const datos = leerFormulario();
  if (!datos) return;
  const id = seleccion ?? crypto.randomUUID();
  const guardado = guardar(filas => {
    if (!seleccion) return [{...datos,id}, ...filas];
    if (!filas.some(r => r.id === id)) throw new Error('Registro ausente');
    return filas.map(r => r.id === id ? {...datos,id} : r);
  }, seleccion ? 'Postulación actualizada.' : 'Postulación creada.');
  if (guardado) {
    const filtro = $('#filtro');
    if (!seleccion && filtro.value && filtro.value !== datos.estado) {
      filtro.value = '';
      mostrar();
    }
    $('#editor').close();
  }
};
$('#borrar').onclick = () => {
  if (guardar(filas => filas.filter(r => r.id !== seleccion), 'Postulación eliminada.')) {
    $('#confirmar').close();
  }
};
function cargar() {
  try { registros = leer(); mostrar(); }
  catch { $('#aviso').textContent = 'No se pueden leer los datos guardados en este navegador.'; }
}
window.addEventListener('storage', cargar);
cargar();
