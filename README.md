# Automatización de casos de prueba con Cypress


# Configurar Cypress Grep
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
<details>
<summary><h1>Correr casos de prueba usando Cypress Grep:</h1></summary>

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
