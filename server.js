const express = require('express');
const path = require('path');

const { createClient } = require('@supabase/supabase-js');

const app = express();

const supabaseUrl = 'https://eaujethfmeviccxwwbff.supabase.co';
const supabaseKey = 'sb_publishable_cMVrFk5cZz_Tai7b2G3oXg_SbBbF-co';

const supabase = createClient(supabaseUrl, supabaseKey);

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/guardar', async (req, res) => {

  console.log(req.body);

  const { usuario, nombre, clave } = req.body;

  const registro = {
    usuario,
    nombre,
    clave
  };

  const { error } = await supabase
    .from('formularios')
    .insert([registro]);

  if (error) {
    console.log(error);
    return res.status(500).send('Error al guardar');
  }

  res.send('Guardado correctamente ✔️');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('Servidor en puerto ' + PORT);
});
