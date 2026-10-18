# Automatización de casos de prueba con Cypress
![Alt text](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThHv0btDBl6mr8DW97fr5010H-YRX2FCyDnQ&s)

## Configuración de variables en Cypress 16

En esta versión del proyecto se usa un archivo `.env` como fuente de verdad para los valores de configuración.

### ¿Qué cambió en Cypress 16?

- `Cypress.env()` fue removido.
- Todas las variables se acceden con `cy.env()`.

### ¿Cómo se implementa en este repo?

1. Las variables se definen en `.env`.
2. `cypress.config.js` carga `.env` usando `dotenv`.
3. `baseUrl` se configura como propiedad nativa de Cypress.
4. Las variables se consumen en los tests con `cy.env('NOMBRE')`.

### Ejemplo del archivo `.env`

```env
BASE_URL=https://anibal317.github.io/testing-testingProject
HOME_PATH=/index.html
ROOT_PATH=/
ENVIRONMENT=qa
```

### Ejemplo de `cypress.config.js`

```js
const { defineConfig } = require('cypress');
require('dotenv').config();

function requiredEnv(name) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

module.exports = defineConfig({
  e2e: {
    baseUrl: requiredEnv('BASE_URL'),
  },
});
```

### ¿Cómo se usan las variables en los tests?

Todas las variables se leen con `cy.env()` — requiere un array de strings:

```js
// Page Object
cy.env(['HOME_PATH']).then(({ HOME_PATH }) => {
  cy.visit(HOME_PATH);
});

// Test directo
cy.env(['ENVIRONMENT']).then(({ ENVIRONMENT }) => {
  expect(ENVIRONMENT).to.equal('qa');
});
```

### Flujo usado en este repo

- `baseUrl` vive en `.env` y se carga en `cypress.config.js`.
- `HOME_PATH` vive en `.env` y se consume con `cy.env(['HOME_PATH'])`.
- La Page Object no hardcodea URLs.
- El test no concatena URLs manualmente.

Ejemplo en la Page Object:

```js
visit() {
  cy.env(['HOME_PATH']).then(({ HOME_PATH }) => {
    cy.visit(HOME_PATH);
  });
}
```

Como `cy.visit()` usa la `baseUrl` de Cypress, la URL final queda resuelta por la configuración y no por el test.

## Estructura Del Proyecto (Real Vs Referencia)

- Tests reales: `cypress/e2e/**/*.cy.js`.
- Ejemplos de referencia: `cypress/e2e/reference/` (no se ejecutan en la suite real).
- Punto único de import de POMs reales: `cypress/pomObjects.js`.

<details>
  <summary><h1>Chai - Colors:</h1></summary>

# ¿Qué es Chai Colors?
La librería chai-colors permite a Cypress realizar aserciones específicas sobre los colores CSS de los elementos en las pruebas. Esta librería extiende chai, el motor de aserciones utilizado por Cypress, con métodos adicionales para verificar colores.

Con chai-colors, puedes comprobar los valores de colores CSS como background-color, color, y otros. Puedes hacer aserciones sobre colores especificados en diferentes formatos (hexadecimal, RGB, RGBA, HSL, HSLA) y comparar estos colores con otros valores esperados.

<details>
<summary><h2>Instalar la librería</h2></summary>

```bash
npm install --save-dev cypress-grep
```

## Agregar esta configuración en cypress/support/e2e.js
```
// Importa chai-colors
import chaiColors from 'chai-colors';

// Usa chai-colors
chai.use(chaiColors);
```
</details>
<details>
<summary><h2>Aplicación:</h2></summary>
Uso en Pruebas
Una vez que chai-colors está configurado, puedes usar sus métodos en tus pruebas Cypress. Aquí hay algunos ejemplos de cómo hacer aserciones sobre colores:

Ejemplo 1: Verificar el color de fondo
```
describe('Verificar colores CSS', () => {
  it('debería verificar el color de fondo de un elemento', () => {
    cy.visit('https://mi-sitio.com');

    cy.get('#mi-elemento').should('have.css', 'background-color').and('be.colored', '#ffffff');
  });
});

```
Ejemplo 2: Verificar el color de texto
```
describe('Verificar colores CSS', () => {
  it('debería verificar el color del texto de un elemento', () => {
    cy.visit('https://mi-sitio.com');

    cy.get('#mi-elemento').should('have.css', 'color').and('be.colored', 'rgb(0, 0, 0)');
  });
});
```
Ejemplo 3: Verificar colores con opacidad (RGBA)
```
describe('Verificar colores CSS', () => {
  it('debería verificar el color RGBA de un elemento', () => {
    cy.visit('https://mi-sitio.com');

    cy.get('#mi-elemento').should('have.css', 'background-color').and('be.colored', 'rgba(255, 0, 0, 0.5)');
  });
});
```
Métodos Disponibles
chai-colors agrega varios métodos útiles para hacer aserciones sobre colores:

be.colored(color): Verifica si el color del elemento coincide con el color esperado. El color esperado puede estar en formato hexadecimal, RGB, RGBA, HSL, o HSLA.
Ejemplo Completo
Aquí tienes un ejemplo completo de una prueba Cypress utilizando chai-colors:
```
describe('Verificar colores CSS', () => {
  before(() => {
    cy.visit('https://mi-sitio.com');
  });

  it('debería verificar el color de fondo de un elemento', () => {
    cy.get('#mi-elemento')
      .should('have.css', 'background-color')
      .and('be.colored', '#ffffff');
  });

  it('debería verificar el color del texto de un elemento', () => {
    cy.get('#mi-elemento')
      .should('have.css', 'color')
      .and('be.colored', 'rgb(0, 0, 0)');
  });

  it('debería verificar el color RGBA de un elemento', () => {
    cy.get('#mi-elemento')
      .should('have.css', 'background-color')
      .and('be.colored', 'rgba(255, 0, 0, 0.5)');
  });
});
```
</details>
</details>

<details>
<summary><h1>Cypress Grep:</h1></summary>

# ¿Qué es Cypress Grep?
La librería __*`cypress-grep`*__ permite ejecutar subconjuntos específicos de tus pruebas de Cypress basándose en etiquetas (**_`tags`_**) o patrones de búsqueda. Esto es útil para filtrar y ejecutar únicamente las pruebas que cumplen ciertos criterios, como parte de un enfoque de pruebas más eficiente y controlado.

## Características Principales
1. Etiquetado de Pruebas: 
   - Puedes etiquetar tus pruebas con cadenas específicas y luego ejecutar solo aquellas pruebas que contengan esas etiquetas.
2. Filtrado por Patrones de Búsqueda: 
    - Puedes ejecutar pruebas que coincidan con ciertos patrones de texto en el título de la prueba.
3. Ejecución de Pruebas Seleccionadas: 
    - Facilita la ejecución de un subconjunto de pruebas, lo cual es útil para depuración, desarrollo continuo y ejecución de suites de pruebas específicas.

<details>
<summary><h2>Instalar la librería</h2></summary>

```bash
npm i @cypress/grep
```

## Agregar esta configuración en cypress/support/e2e.js

> **Importante:** `registerCypressGrep()` debe ser lo **primero** en el archivo, antes de cualquier otro plugin.

```js
// cypress/support/e2e.js
const registerCypressGrep = require('@cypress/grep')
registerCypressGrep()

// Resto de la configuración...
```
## Agregar esta configuracion en cypress.config.js

> **Importante (Cypress 16):** `@cypress/grep` 7.x ya no exporta `plugin`. El filtro se hace con `registerCypressGrep()` en `e2e.js` leyendo `config.expose`. Es necesario copiar `process.env` a `config.expose` en `setupNodeEvents`.

```js
// cypress.config.js
const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // Puente: pasa process.env a expose para que grep pueda leer las variables
      config.expose = { ...config.expose, ...process.env };
      return config;
    },
  },
});
```
</details>

<details>
<summary><h2>Correr casos de prueba usando Cypress Grep:</h2></summary>

> **Importante (Cypress 16):** Los comandos usan `--expose`, no `--env`. En Cypress 16, `@cypress/grep` lee de `config.expose`, no de `config.env`.

#### 1. Correr casos de prueba con "auth user" en el título
```
$ npx cypress run --expose grep="auth user"
```
#### 2. Correr casos de prueba con "hello" ó "auth user" en el título (separados con ";")
```
$ npx cypress run --expose grep="hello; auth user"
```
#### 3. Correr casos de prueba etiquetados con @fast
```
$ npx cypress run --expose grepTags=@fast
```
#### 4. Correr casos de prueba etiquetados con "smoke" que tengan "login" en sus títulos
```
$ npx cypress run --expose grep=login,grepTags=smoke
```
#### 5. Correr solo specs que tengan casos de prueba con "user" en sus títulos
```
$ npx cypress run --expose grep=user,grepFilterSpecs=true
```
#### 6. Correr solo specs que tengan casos de prueba etiquetados con "@smoke"
```
$ npx cypress run --expose grepTags=@smoke,grepFilterSpecs=true
```
#### 7. Correr casos de prueba que no tengan tags
```
$ npx cypress run --expose grepUntagged=true
```

</details>
</details>

<details>
<summary><h1>Cypress Mochawesome Reporter</h1></summary>

# ¿Qué es Cypress Mochawesome Reporter?
La librería __**`cypress-mochawesome-reporter`**__ es una herramienta de reportería para Cypress que proporciona informes detallados y visualmente atractivos de las pruebas ejecutadas. Este reporter se basa en Mochawesome, una librería popular para generar informes de pruebas en Mocha, y está adaptado para funcionar con Cypress, que utiliza Mocha como su framework de pruebas subyacente.

## Características Principales:
1. Informes Detallados: 
    - Genera informes detallados que incluyen el estado de cada prueba, tiempo de ejecución, mensajes de error, y capturas de pantalla.
2. Visualmente Atractivos:
    - Los informes son visualmente atractivos y fáciles de leer, con una interfaz de usuario limpia y organizada.
3. Informes HTML y JSON: 
    - Genera informes en formato HTML para visualización y JSON para análisis automatizado o procesamiento adicional.
4. Integración con Cypress: 
    - Se integra fácilmente con Cypress, aprovechando las capacidades de reportería de Mocha.
<details>
<summary><h2>Instalar la librería</h2></summary>

```bash
npm install --save-dev cypress-mochawesome-reporter
```

## Agregar esta configuración en cypress/support/e2e.js
```
import 'cypress-mochawesome-reporter/register';
```
## Agregar esta configuracion en cypress.config.js
```
const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      return config;
    },
    reporter: 'cypress-mochawesome-reporter',
    reporterOptions: {
      charts: true,
      reportPageTitle: 'AMP QA Regression Testing',
      embeddedScreenshots: true,
      inlineAssets: true,
      saveAllAttempts: false,
      reportDir:"cypress/reports",
      overwrite:false,
      reportFilename:`[name].html`,
      html:true,
      json:false,
      timestamp: 'mm-dd-yyyy_HH-MM-ss'
    }
  }
});

```
</details>
<details>
<summary><h2>Uso:</h2></summary>

Una vez configurado, puedes ejecutar tus pruebas de Cypress como de costumbre, y cypress-mochawesome-reporter generará los informes automáticamente.

Para ejecutar tus pruebas y generar el informe, simplemente usa el comando de ejecución de Cypress.

Los informes se generarán en el directorio especificado (cypress/reports en el ejemplo de configuración anterior).

> [!NOTA]
>El parametro __**`reportFilename:'[name].html',`**__ nos permite generar el reporte con el nombre del la suite que estamos corriendo


> [!NOTA]  El parametro __**`timestamp: 'mm-dd-yyyy_HH-MM-ss'`**__ nos permite agregarle al reporte la fecha y la hora de ejecución.



</details>
<details>
<summary><h2>Visualizacion del reporte</h2></summary>

Después de ejecutar las pruebas, puedes abrir el archivo HTML generado para visualizar el informe:

Navega al directorio del informe (cypress/reports).
Abre el archivo HTML generado (mochawesome.html) en tu navegador.
![Alt text](https://docs.cypress.io/img/guides/reporters/mochawesome-report.png)

</details>
</details>

<details>
<summary><h1>Chai Json Schema</h1></summary>

# ¿Qué es Chai Json Schema?
La librería __**`chai-json-schema`**__ permite extender las capacidades del motor de aserciones Chai para validar objetos JSON contra esquemas JSON. Es especialmente útil cuando necesitas asegurarte de que las estructuras de datos JSON recibidas o generadas en tus pruebas cumplen con un formato específico.

## Características Principales
1. Validación de Esquemas: 
    - Permite validar que un objeto JSON cumple con un esquema JSON definido.
2. Aserciones Declarativas: 
    - Proporciona aserciones claras y legibles para validar estructuras de datos.
3. Integración con Chai: 
    - Se integra perfectamente con Chai, el motor de aserciones utilizado en Cypress y otros frameworks de pruebas.

<details>
<summary><h2>Instalar la librería</h2></summary>

```bash
npm install chai-json-schema
```

## Agregar esta configuracion en cypress.config.js
```
// Importa chai-json-schema
import chaiJsonSchema from 'chai-json-schema';

// Usa chai-json-schema
chai.use(chaiJsonSchema);
```

</details>
<details>
<summary><h2>Uso:</h2></summary>

Una vez configurado, puedes usar las aserciones de chai-json-schema en tus pruebas de Cypress. Aquí hay algunos ejemplos de cómo hacer aserciones utilizando esquemas JSON.

Definir un Esquema JSON
Primero, define el esquema JSON contra el cual deseas validar tus objetos JSON:
```
const userSchema = {
  title: 'User Schema',
  type: 'object',
  required: ['id', 'name', 'email'],
  properties: {
    id: {
      type: 'integer'
    },
    name: {
      type: 'string'
    },
    email: {
      type: 'string',
      format: 'email'
    }
  }
};

```
Ejemplo de Prueba con Cypress y chai-json-schema
Aquí hay un ejemplo de cómo usar chai-json-schema en una prueba de Cypress para validar una respuesta de una API:
```
describe('API Testing with JSON Schema Validation', () => {
  it('should validate the response against the user schema', () => {
    cy.request('GET', 'https://api.example.com/users/1').then(response => {
      // Validar que el estado de la respuesta sea 200
      expect(response.status).to.equal(200);

      // Validar que el cuerpo de la respuesta cumpla con el esquema definido
      expect(response.body).to.be.jsonSchema(userSchema);
    });
  });
});

```
Ejemplo de Validación de Datos JSON
Si tienes un objeto JSON y deseas validarlo contra un esquema JSON, puedes hacerlo de la siguiente manera:
```
const userData = {
  id: 1,
  name: 'John Doe',
  email: 'john.doe@example.com'
};

// Validar que el objeto JSON cumple con el esquema
expect(userData).to.be.jsonSchema(userSchema);

```
Métodos Disponibles
chai-json-schema proporciona el método principal jsonSchema para realizar las validaciones:

to.be.jsonSchema(schema): Valida que el objeto JSON cumple con el esquema especificado.
</details>
</details>

</details>
</details>
