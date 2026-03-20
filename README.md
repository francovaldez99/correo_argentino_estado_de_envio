# 📦 Correo Argentino — Estado de Envío

> API REST que recibe un código de seguimiento y devuelve el último estado del envío scrapeando el sitio oficial de Correo Argentino mediante automatización de navegador.

---

## ¿Por qué scraping y no la API oficial?

Correo Argentino no otorgó acceso ni respondió las solicitudes para usar su API pública. Como solución alternativa, se automatiza un navegador real que interactúa con el formulario de seguimiento del sitio web oficial, obteniendo el mismo resultado sin depender de una API.

---

## 🚀 ¿Cómo funciona?

1. Se recibe un código de seguimiento como parámetro en la request
2. Puppeteer lanza un navegador headless y navega al formulario de Correo Argentino
3. Ingresa el código, simula el comportamiento humano (delays, user-agent real)
4. Espera la respuesta del sitio y extrae los datos de la tabla de resultados
5. Devuelve un JSON limpio con el último estado del envío

---

## 🛠️ Tecnologías

| Tecnología | Descripción |
|---|---|
| **Node.js** | Entorno de ejecución |
| **Express** | Framework para la API REST |
| **Puppeteer Core** | Automatización del navegador headless |
| **@sparticuz/chromium** | Binario de Chromium optimizado para entornos serverless |

---

## 📦 Instalación y uso

### Prerrequisitos

- [Node.js](https://nodejs.org/) (v18 o superior)
- [npm](https://www.npmjs.com/)

### 1. Clonar el repositorio

```bash
git clone https://github.com/francovaldez99/correo_argentino_estado_de_envio.git
cd correo_argentino_estado_de_envio
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Iniciar el servidor

```bash
npm start
```

---

## 🔌 Uso de la API

### `GET /check-estado/:codigo`

Devuelve el último estado de un envío dado su código de seguimiento.

**Query params:**

| Parámetro | Tipo | Requerido | Descripción |
|---|---|---|---|
| `codigo` | `string` | ✅ | Código de seguimiento del envío |

**Ejemplo de request:**

```
GET /check-estado/AB123456789AR
```

**Ejemplo de respuesta exitosa:**

```json
{
	"Fecha": "03-02-2026 12:00",
	"Planta": "SOLEIL",
	"Historia": "INTENTO DE ENTREGA",
	"Estado": "ENTREGA EN SUCURSAL",
	"codigo de seguimiento": "AB123456789AR"
}
```

**Respuesta cuando no se encuentra información:**

```json
{
  "error": "No se encontró información o el sitio no respondió"
}
```

---

## ☁️ Deploy

El proyecto está optimizado para deployarse en entornos serverless como **Render** o **Vercel**, usando `@sparticuz/chromium` como binario de Chromium compatible con estas plataformas.

---

## ⚠️ Consideraciones

- El tiempo de respuesta puede variar dependiendo de la velocidad de carga del sitio de Correo Argentino
- El scraping puede verse afectado si Correo Argentino modifica la estructura de su sitio web

---

## 👤 Autor

**Franco Valdez**
- GitHub: [@francovaldez99](https://github.com/francovaldez99)
