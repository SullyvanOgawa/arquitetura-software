import path from 'path';
import express from 'express';

import router from './routes/index.js';
import erroView from './src/views/erro.view.js';

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(import.meta.dirname, 'public')));

app.use('/', router);

app.use((request, response) => {
  return response.status(404).send(erroView({ mensagem: 'Página não encontrada.' }));
});

export default app;
