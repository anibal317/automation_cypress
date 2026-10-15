# Configuración de Ambiente con Variables

## Descripción General

Este proyecto usa un archivo `.env` como fuente de verdad para las variables de configuración.
El archivo es cargado por `dotenv` en `process.env`, validado con un helper `requiredEnv()` en el config, y luego pasado automáticamente al `env` de Cypress mediante un puente en `setupNodeEvents`. Los tests consumen las variables con `cy.env(['NOMBRE'])`.

---

## Archivos Involucrados

| Archivo | Responsabilidad |
|---|---|
| `.env` | Contiene los valores reales (ignorado por git) |
| `.env.example` | Plantilla documentada con las variables requeridas |
| `cypress.config.js` | Carga el `.env` con `dotenv`, valida con `requiredEnv()`, y pasa variables al env de Cypress en `setupNodeEvents` |

---

## Cómo Configurar

### Paso 1 — Crear el archivo `.env`

Copiar la plantilla y ajustar los valores según el entorno:

```bash
cp .env.example .env
```

### Paso 2 — Completar los valores

Editar `.env` con los datos correspondientes:

```env
BASE_URL=https://anibal317.github.io/testing-testingProject
HOME_PATH=/index.html
ROOT_PATH=/
ENVIRONMENT=qa
```

### Paso 3 — Verificar la carga

Ejecutar Cypress — si falta una variable, el config lanzará un error claro:

```bash
npx cypress run
```

---

## Variables Disponibles

| Variable | Propósito | Uso |
|---|---|---|
| `BASE_URL` | URL base del sitio bajo prueba | Propiedad nativa `baseUrl` de Cypress |
| `HOME_PATH` | Ruta de la página principal | `cy.env(['HOME_PATH'])` |
| `ROOT_PATH` | Ruta raíz del sitio | `cy.env(['ROOT_PATH'])` |
| `ENVIRONMENT` | Identificador del entorno | `cy.env(['ENVIRONMENT'])` |

---

## Flujo de Carga

```
.env  →  dotenv (process.env)  →  requiredEnv() (valida)  →  setupNodeEvents (puente)  →  cy.env() (tests consumen)
```

### El puente en `setupNodeEvents`

En Cypress 16, `cy.env()` lee del `env` de la configuración de Cypress, no de `process.env` directamente.
El puente en `setupNodeEvents` resuelve esto sin listar variables:

```js
config.env = { ...config.env, ...process.env };
```

Esta línea pasa automáticamente todas las variables cargadas por dotenv al env de Cypress.

---

## Cómo Usar en Tests

Todas las variables se leen con `cy.env()` — asíncrono, disponible en Page Objects y tests.

**Sintaxis:** `cy.env()` requiere un **array** de strings. Devuelve un objeto con los valores.

```js
// Page Object
cy.env(['HOME_PATH']).then(({ HOME_PATH }) => {
  cy.visit(HOME_PATH);
});

// Test directo
cy.env(['ENVIRONMENT']).then(({ ENVIRONMENT }) => {
  expect(ENVIRONMENT).to.equal('qa');
});

// Múltiples variables en una sola llamada
cy.env(['HOME_PATH', 'ROOT_PATH', 'ENVIRONMENT']).then(({ HOME_PATH, ROOT_PATH, ENVIRONMENT }) => {
  cy.visit(HOME_PATH);
  expect(ENVIRONMENT).to.equal('qa');
});

// Valores sensibles (tokens, contraseñas, API keys)
cy.env(['API_TOKEN']).then(({ API_TOKEN }) => {
  cy.request({
    method: 'GET',
    url: '/api/resource',
    headers: { Authorization: `Bearer ${API_TOKEN}` }
  });
});
```

---

## Buenas Prácticas

- **Nunca hardcodear URLs o rutas en los tests** — usar `cy.env(['NOMBRE'])`.
- **No commitear `.env`** — ya está en `.gitignore`.
- **Documentar toda variable nueva** en `.env.example`.
- **Mantener el `.env.example` actualizado** cuando se agreguen variables.
