# Guía de ejecución del parcial

## Paso 1: preparar herramientas
Instalar o abrir Node.js, MySQL Server, MySQL Workbench y Visual Studio Code en el computador autorizado.

## Paso 2: crear las bases de datos
Abrir MySQL Workbench y ejecutar íntegramente `sql/patrimonio.sql`. Después ejecutar `sql/reservas.sql` en otra pestaña. Verificar que aparezcan las bases `patrimonio` y `reservas`. La primera contiene `cultural_spaces`; la segunda contiene `bookings` y `booking_locks`.

## Paso 3: configurar conexión
Copiar `.env.example` como `.env`. Cambiar `DB_USER` y `DB_PASSWORD` a los valores de MySQL instalados. Los archivos `env/patrimonyConfig.js` y `env/bookingConfig.js` configuran separadamente ambas conexiones; `services/patrimony.service.js` y `services/booking.service.js` crean los dos pools.

## Paso 4: instalar y encender
Abrir terminal en la raíz de este proyecto y ejecutar `npm install`, seguido por `npm start`. Ir a `http://localhost:5000`.

## Paso 5: registrar un espacio
En el formulario ingresar un espacio operativo, capacidad 100, una ubicación y una dependencia administrativa. Guardar el `id` que devuelve la API.

## Paso 6: registrar una reserva
Escribir el `id` del espacio anterior, el nombre de una organización, aforo 50 y fechas de inicio/final diferentes en el futuro. Se crea con estado `PENDING`. Guardar el id de reserva.

## Paso 7: consultar y aprobar
Consultar con el ID de reserva; verificar `PENDING`. Presionar Aprobar; consultar nuevamente para verificar `APPROVED`.

## Paso 8: probar las restricciones
Solicitar 101 personas sobre el espacio de capacidad 100: debe rechazarse con HTTP 409. Pedir otra reserva del mismo espacio en un horario que se solape con una reserva aprobada: HTTP 409. Intentar un ID de espacio inexistente: HTTP 404. Crear un espacio en mantenimiento e intentar reservarlo: HTTP 409.

## Paso 9: revisar entregables
Los diagramas están en `academico.png` y `repositorio.png`, que son los nombres literales exigidos en la guía. Verificar código en inglés, sin comentarios generados, sin emojis, sin credenciales dentro del proyecto y sin paquetes no usados.

## Paso 10: publicar en GitHub
Crear un repositorio público personal. Desde la carpeta raíz ejecutar `git init`, `git add .`, `git commit -m "Build cultural spaces and booking service"`, `git branch -M main`, `git remote add origin URL_DEL_REPOSITORIO`, `git push -u origin main`. Comprobar que el proyecto esté directamente en la raíz y que `.env` no aparezca en GitHub.

## Paso 11: entrega
Sustituir `URL_DEL_REPOSITORIO` en `enlace_repositorio.txt` por el enlace real. Comprimir la carpeta de entregables según lo solicitado y cargar el ZIP en la plataforma indicada por el profesor. El documento menciona Teams y también NEXUS; validar en el curso cuál plataforma se usa efectivamente.

## Nota técnica
Las dos bases se encuentran separadas. Por tanto, la validación entre ellas se hace en Node.js y no con una clave foránea SQL entre las dos bases.
