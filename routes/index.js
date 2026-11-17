import { Router } from 'express';

import routerTarefa from '../src/modules/tarefa/tarefa.routes.js';

const router = Router();

router.get('/', (request, response) => {
  return response.redirect('/tarefas');
});

router.use('/', routerTarefa);

export default router;
