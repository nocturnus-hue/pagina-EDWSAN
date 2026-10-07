# EDWSAN — Página web

Página estática lista para subir a GitHub Pages.

## Estructura

- `index.html` → página principal
- `style.css` → diseño negro/morado y responsive
- `script.js` → animaciones, menú, WhatsApp y reseñas
- `images/` → coloca aquí las fotos reales de tus camisetas

## Poner tus imágenes

Reemplaza los archivos:

- `images/camiseta-01.svg`
- `images/camiseta-02.svg`
- `images/camiseta-03.svg`
- `images/camiseta-04.svg`
- `images/camiseta-05.svg`
- `images/camiseta-06.svg`

Puedes usar JPG, PNG o WEBP. Si cambias el nombre del archivo, también cambia el `src` correspondiente en `index.html`.

## Cambiar WhatsApp

Abre `script.js` y busca:

`const WHATSAPP_NUMBER = "573001234567";`

Pon tu número colombiano en formato internacional, sin `+`, espacios ni guiones.

## GitHub Pages

1. Crea un repositorio en GitHub, por ejemplo `edwsan-web`.
2. Sube todos estos archivos y la carpeta `images`.
3. Ve a `Settings` → `Pages`.
4. En "Build and deployment", selecciona `Deploy from a branch`.
5. Selecciona `main` y `/ (root)`.
6. Guarda y espera a que GitHub publique la página.

## Importante sobre las reseñas

Esta primera versión usa `localStorage`: una reseña queda guardada en el navegador donde se escribió, pero no se comparte automáticamente con otros visitantes.

Para una tienda real, podemos conectar el formulario a Supabase/Firebase u otro backend para que las reseñas sean públicas y tengan moderación.

## Personalización pendiente

- Tu número real de WhatsApp.
- Tu correo.
- Fotos reales de tus camisetas.
- Logo oficial como imagen, si quieres sustituir el logo tipográfico del encabezado.


## Efectos hover incluidos

- Brillo morado que sigue el cursor en computador.
- Tarjetas de productos con efecto 3D al mover el mouse.
- Destello al pasar sobre botones.
- Subrayado animado en el menú.
- Efecto "VIEW DROP" sobre las camisetas.
- Precio con brillo al pasar por el producto.
- Tarjetas de reseñas con movimiento sutil.
- Botón de WhatsApp con pulso.
- La animación se reduce automáticamente si el dispositivo tiene activado "reducir movimiento".
