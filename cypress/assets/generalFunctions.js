const fs = require('fs').promises; // Usar fs.promises para trabajar con promesas
const path = require('path');

const date = new Date();
let options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour12: false
};
const time = new Date().getTime();

function getCurrentDate() {
    return date.toLocaleString('en-us', { year: 'numeric', month: '2-digit' })
}
function addDay(extraDays) {
    const eDays = new Date(date)
    eDays.setDate(eDays.getDate() + extraDays)
    return eDays.toLocaleString('en-us', options)
}
function discountDay(days) {
    const dDays = new Date(date)
    dDays.setDate(dDays.getDate() - days)
    return dDays.toLocaleString('en-us', options)
}

function convertDateTime(dateTime) {
    let res = new Date(dateTime).toLocaleString('en-us', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: true })
    return res
}
function getRandomIndex(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function getLongDate() {
    return date.toLocaleDateString("en", options)
}
function getCurrentMonth() {
    return date.toLocaleString('en-us', { month: 'long' })
}
function getCurrentYear() {
    return date.getFullYear()
}
function getCurrentFormattedDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day}_${hours}-${minutes}-${seconds}`;
}

function parseFileName(fileName) {
    let parts = fileName.split('_');
    let datePart = parts[0]; // "2024-07-25"
    let timePart = parts[1]; // "15-51-45"
    let camelCasePart = parts[2]; // "EventSmokeTest"

    let dateParts = datePart.split('-');
    let timeParts = timePart.split('-');

    let isoDateTime = `${dateParts[0]}-${dateParts[1]}-${dateParts[2]}T${timeParts[0]}:${timeParts[1]}:${timeParts[2]}`;
    let eventName = camelCasePart.replace(/([a-z])([A-Z])/g, '$1 $2');

    return {
        date: `${dateParts[0]}-${dateParts[1]}-${dateParts[2]}`,
        time: `${timeParts[0]}:${timeParts[1]}:${timeParts[2]}`,
        isoDateTime: isoDateTime,
        eventName: eventName.split('.')[0],
        path: 'cypress/reports' + fileName
    };
}

async function processDirectory(directoryPath) {
    try {
        console.log(directoryPath)
        // Leer el contenido del directorio
        const files = await fs.readdir(directoryPath);

        // Crear un array de promesas para procesar los archivos
        const fileObjects = await Promise.all(files.map(async (file) => {
            const filePath = path.join(directoryPath, file);
            const stats = await fs.stat(filePath);

            if (stats.isFile()) {
                const fileName = path.basename(file, path.extname(file)); // Sin la extensión
                return parseFileName(fileName);
            }
        }));

        // Filtrar los valores undefined en caso de que algún archivo no sea un archivo regular
        return fileObjects.filter(obj => obj !== undefined);

    } catch (err) {
        console.error('Error procesando el directorio:', err);
        return [];
    }
}

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
    processDirectory
}

/**
 *         cy.getCookie('session-username').then(el => {
            console.log(el)
            console.log(el.expiry)
            let day = el.expiry
            console.log(new Date(day * 1000).toLocaleString('en-us', { dateStyle: 'short', timeStyle: 'medium' }))
        })
 */