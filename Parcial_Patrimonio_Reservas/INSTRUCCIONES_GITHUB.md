# Publicación en GitHub

1. Abre https://github.com/new con tu cuenta iniciada.
2. Usa como nombre `practica-del-parcial`, visibilidad **Public** y no selecciones README, licencia ni .gitignore al crear el repositorio.
3. Abre una terminal en la carpeta de este proyecto (donde está `server.js`).
4. Ejecuta los comandos siguientes, reemplazando `TU_USUARIO` por tu usuario real:

```bash
git init
git branch -M main
git add .
git commit -m "Implement cultural spaces and booking management"
git remote add origin https://github.com/TU_USUARIO/practica-del-parcial.git
git push -u origin main
```

5. En `enlace_repositorio.txt`, guarda la dirección real `https://github.com/TU_USUARIO/practica-del-parcial` y haz un commit final:

```bash
git add enlace_repositorio.txt
git commit -m "Add public repository link"
git push
```

6. Abre el enlace en una ventana privada para verificar que es público. Comprueba que `server.js`, `dao`, `env`, `routes`, `services`, `public`, `sql`, `academico.png` y `repositorio.png` están en la raíz.
7. No subas el archivo `.env` con credenciales reales; `.env.example` sí puede subirse.
