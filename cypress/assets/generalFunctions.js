const fs = require("fs").promises; // Usar fs.promises para trabajar con promesas
const path = require("path");

const date = new Date();
let options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
  hour12: false,
};
const time = new Date().getTime();

/**
 * Obtiene la fecha actual en formato corto con año y mes.
 * @returns {string} Fecha actual en formato MM/YYYY.
 */
function getCurrentDate() {
  return date.toLocaleString("en-us", { year: "numeric", month: "2-digit" });
}

/**
 * Suma días a la fecha actual.
 * @param {number} extraDays Cantidad de días a sumar.
 * @returns {string} Fecha actual más los días indicados con formato largo.
 */
function addDay(extraDays) {
  const eDays = new Date(date);
  eDays.setDate(eDays.getDate() + extraDays);
  return eDays.toLocaleString("en-us", options);
}

/**
 * Resta días a la fecha actual.
 * @param {number} days Cantidad de días a restar.
 * @returns {string} Fecha actual menos los días indicados con formato largo.
 */
function discountDay(days) {
  const dDays = new Date(date);
  dDays.setDate(dDays.getDate() - days);
  return dDays.toLocaleString("en-us", options);
}

/**
 * Convierte una fecha y hora en formato legible para la UI.
 * @param {string|Date} dateTime Fecha u hora a convertir.
 * @returns {string} Fecha formateada en formato local con hora.
 */
function convertDateTime(dateTime) {
  let res = new Date(dateTime).toLocaleString("en-us", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  return res;
}

/**
 * Genera un índice aleatorio dentro de un rango determinado.
 * @param {number} min Valor mínimo del rango.
 * @param {number} max Valor máximo del rango.
 * @returns {number} Número aleatorio entre min y max.
 */
function getRandomIndex(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

/**
 * Obtiene la fecha actual con formato largo.
 * @returns {string} Fecha completa en formato largo.
 */
function getLongDate() {
  return date.toLocaleDateString("en", options);
}

/**
 * Devuelve el mes actual en texto.
 * @returns {string} Nombre del mes actual.
 */
function getCurrentMonth() {
  return date.toLocaleString("en-us", { month: "long" });
}

/**
 * Devuelve el año actual.
 * @returns {number} Año en curso.
 */
function getCurrentYear() {
  return date.getFullYear();
}

/**
 * Genera una fecha formateada con año, mes, día, hora, minutos y segundos.
 * @returns {string} Fecha en formato YYYY-MM-DD_HH-MM-SS.
 */
function getCurrentFormattedDate() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  return `${year}-${month}-${day}_${hours}-${minutes}-${seconds}`;
}

/**
 * Parsea un nombre de archivo generado por la ejecución para obtener información de fecha, hora y evento.
 * @param {string} fileName Nombre del archivo a analizar.
 * @returns {{ date: string, time: string, isoDateTime: string, eventName: string, path: string }} Objeto con datos parseados del archivo.
 */
function parseFileName(fileName) {
  let parts = fileName.split("_");
  let datePart = parts[0]; // "2024-07-25"
  let timePart = parts[1]; // "15-51-45"
  let camelCasePart = parts[2]; // "EventSmokeTest"

  let dateParts = datePart.split("-");
  let timeParts = timePart.split("-");

  let isoDateTime = `${dateParts[0]}-${dateParts[1]}-${dateParts[2]}T${timeParts[0]}:${timeParts[1]}:${timeParts[2]}`;
  let eventName = camelCasePart.replace(/([a-z])([A-Z])/g, "$1 $2");

  return {
    date: `${dateParts[0]}-${dateParts[1]}-${dateParts[2]}`,
    time: `${timeParts[0]}:${timeParts[1]}:${timeParts[2]}`,
    isoDateTime: isoDateTime,
    eventName: eventName.split(".")[0],
    path: "cypress/reports" + fileName,
  };
}

/**
 * Lee todos los archivos de un directorio y los convierte a objetos con datos parseados.
 * @param {string} directoryPath Ruta del directorio a analizar.
 * @returns {Promise<Array<{ date: string, time: string, isoDateTime: string, eventName: string, path: string }>>} Lista de archivos procesados.
 */
async function processDirectory(directoryPath) {
  try {
    console.log(directoryPath);
    // Leer el contenido del directorio
    const files = await fs.readdir(directoryPath);

    // Crear un array de promesas para procesar los archivos
    const fileObjects = await Promise.all(
      files.map(async (file) => {
        const filePath = path.join(directoryPath, file);
        const stats = await fs.stat(filePath);

        if (stats.isFile()) {
          const fileName = path.basename(file, path.extname(file)); // Sin la extensión
          return parseFileName(fileName);
        }
      }),
    );

    // Filtrar los valores undefined en caso de que algún archivo no sea un archivo regular
    return fileObjects.filter((obj) => obj !== undefined);
  } catch (err) {
    console.error("Error procesando el directorio:", err);
    return [];
  }
}

/**
 * Carga la librería jQuery en el DOM de la página actual.
 * @returns {void}
 */
function jquery() {
  let script = document.createElement("script");
  script.src = "https://code.jquery.com/jquery-3.7.1.min.js";
  document.head.appendChild(script);
}

/**
 * Ejemplo de uso de cy.getCookie:
 * Lee una cookie del navegador por su nombre y devuelve su contenido.
 * En este caso, se obtiene la cookie 'session-username' para verificar
 * que la sesión del usuario está activa y, además, se convierte su fecha
 * de expiración (expiry) a un formato legible para mostrarla o validarla.
 * También sirve para validar autenticación, comprobar que el usuario quedó
 * logueado y leer datos guardados en el navegador durante la sesión.
 *
 *         cy.getCookie('session-username').then((el) => {
 *           console.log(el);
 *           console.log(el.expiry);
 *           const day = el.expiry;
 *           console.log(new Date(day * 1000).toLocaleString('en-us', { dateStyle: 'short', timeStyle: 'medium' }));
 *         });
 */


module.exports = {
  getCurrentDate,
  addDay,
  getRandomIndex,
  getLongDate,
  getCurrentMonth,
  getCurrentYear,
  convertDateTime,
  discountDay,
  getCurrentFormattedDate,
  parseFileName,
  processDirectory,
  jquery
};

