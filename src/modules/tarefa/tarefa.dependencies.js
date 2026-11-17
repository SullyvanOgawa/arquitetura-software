import TarefaRepository from './tarefa.repository.js';
import TarefaValidator from './tarefa.validator.js';
import TarefaService from './tarefa.service.js';
import TarefaController from './tarefa.controller.js';

const tarefaRepository = new TarefaRepository();
const tarefaValidator = new TarefaValidator();

const tarefaService = new TarefaService(tarefaRepository, tarefaValidator);

const tarefaController = new TarefaController(tarefaService);

export {
  tarefaRepository,
  tarefaService,
  tarefaController
};
