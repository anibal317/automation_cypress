# Automatización de casos de prueba con Cypress


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
La librería cypress-grep permite ejecutar subconjuntos específicos de tus pruebas de Cypress basándose en etiquetas (tags) o patrones de búsqueda. Esto es útil para filtrar y ejecutar únicamente las pruebas que cumplen ciertos criterios, como parte de un enfoque de pruebas más eficiente y controlado.

Características Principales
Etiquetado de Pruebas: Puedes etiquetar tus pruebas con cadenas específicas y luego ejecutar solo aquellas pruebas que contengan esas etiquetas.
Filtrado por Patrones de Búsqueda: Puedes ejecutar pruebas que coincidan con ciertos patrones de texto en el título de la prueba.
Ejecución de Pruebas Seleccionadas: Facilita la ejecución de un subconjunto de pruebas, lo cual es útil para depuración, desarrollo continuo y ejecución de suites de pruebas específicas.

<details>
<summary><h2>Instalar la librería</h2></summary>

```bash
npm i @cypress/grep
```

## Agregar esta configuración en cypress/support/e2e.js
```
const registerCypressGrep = require('@cypress/grep')
registerCypressGrep()
```
## Agregar esta configuracion en cypress.config.js
```
{
  e2e: {
    setupNodeEvents(on, config) {
      require('@cypress/grep/src/plugin')(config);
      return config;
    },
  }
}
```
</details>

<details>
<summary><h2>Correr casos de prueba usando Cypress Grep:</h2></summary>

#### 1- Correr solamente los casos de prueba con"auth user" en el título
```
$ cypress run --env grep="auth user"
```
#### 2- Correr los casos de prueba con "hello" ó "auth user" en el titulo del test separandolos con ";"
```
$ npx cypress run --env grep="hello; auth user"
```
##### 3- Correr casos de prueba taggeados con @fast
```
$ npx cypress run --env grepTags=@fast
```
#### 4- Correr solamente los casos de prueba taggeados con "smoke" que tengan "login" en sus títulos
```
$ npx cypress run --env grep=login,grepTags=smoke
```
#### 5- Correr solamente specs que tengan cualquier caso de prueba con "user" en sus títulos
```
$ npx cypress run --env grep=user,grepFilterSpecs=true
```
#### 6- Correr solamente specs que tangan cualquier caso de prueba taggeado con "@smoke"
```
$ npx cypress run --env grepTags=@smoke,grepFilterSpecs=true
```
#### 7- Correr solamente los casos de prueba que no tengan los tags y casos de prueba que no esten en suites taggeadas
```
$ npx cypress run --env grepUntagged=true
```
</details>
</details>
