const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/guardar', (req, res) => {

  console.log(req.body); // 👈 ACÁ ves lo que llega desde el formulario

  const { usuario, nombre, clave } = req.body;

  const registro = {
    usuario,
    nombre,
    clave,
    fecha: new Date().toISOString()
  };

  const file = path.join(__dirname, 'datos.json');

  let datos = [];

  if (fs.existsSync(file)) {
    datos = JSON.parse(fs.readFileSync(file, 'utf8') || '[]');
  }

  datos.push(registro);

  fs.writeFileSync(file, JSON.stringify(datos, null, 2));

  res.send('Guardado correctamente ✔');
});

app.listen(3000, () => {
  console.log('Servidor en http://localhost:3000');
});