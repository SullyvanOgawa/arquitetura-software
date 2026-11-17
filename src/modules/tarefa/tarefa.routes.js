import { Router } from 'express';
import { tarefaController } from './tarefa.dependencies.js';

const routerTarefa = Router();

routerTarefa.get('/tarefas', (request, response) => {
  return tarefaController.listar(request, response);
});

routerTarefa.get('/tarefas/nova', (request, response) => {
  return tarefaController.exibirFormularioCadastro(request, response);
});

routerTarefa.post('/tarefas', (request, response) => {
  return tarefaController.gravar(request, response);
});

routerTarefa.get('/tarefas/:id', (request, response) => {
  return tarefaController.consultarPorId(request, response);
});

routerTarefa.get('/tarefas/:id/editar', (request, response) => {
  return tarefaController.exibirFormularioEdicao(request, response);
});

routerTarefa.post('/tarefas/:id/editar', (request, response) => {
  return tarefaController.editar(request, response);
});

routerTarefa.post('/tarefas/:id/concluir', (request, response) => {
  return tarefaController.concluir(request, response);
});

routerTarefa.get('/tarefas/:id/excluir', (request, response) => {
  return tarefaController.exibirConfirmacaoExclusao(request, response);
});

routerTarefa.post('/tarefas/:id/excluir', (request, response) => {
  return tarefaController.excluir(request, response);
});

export default routerTarefa;
