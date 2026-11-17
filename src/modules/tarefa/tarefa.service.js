import Tarefa from './tarefa.model.js';
import { ErroValidacao, NaoEncontradoError } from '../../shared/errors/erroNegocio.js';

export default class TarefaService {
  constructor(tarefaRepository, tarefaValidator) {
    this.tarefaRepository = tarefaRepository;
    this.tarefaValidator = tarefaValidator;
  }

  gravar(dados) {
    const dadosLimpos = this.#limparDados(dados);
    this.#validarDados(dadosLimpos);

    const tarefa = new Tarefa(dadosLimpos);
    return this.tarefaRepository.gravar(tarefa);
  }

  listar(status) {
    const statusValidos = Object.values(Tarefa.STATUS);

    if (statusValidos.includes(status)) {
      return this.tarefaRepository.listar(status);
    }

    return this.tarefaRepository.listar();
  }

  consultarPorId(id) {
    const tarefa = this.tarefaRepository.consultarPorId(id);

    if (!tarefa) {
      throw new NaoEncontradoError('Tarefa não encontrada.');
    }

    return tarefa;
  }

  editar(id, dados) {
    const tarefa = this.consultarPorId(id);
    const dadosLimpos = this.#limparDados(dados);
    this.#validarDados(dadosLimpos);

    tarefa.titulo = dadosLimpos.titulo;
    tarefa.descricao = dadosLimpos.descricao;
    tarefa.disciplina = dadosLimpos.disciplina;

    this.tarefaRepository.editar(tarefa);
    return tarefa;
  }

  concluir(id) {
    const tarefa = this.consultarPorId(id);

    if (tarefa.status === Tarefa.STATUS.CONCLUIDA) {
      throw new ErroValidacao('Esta tarefa já está concluída.');
    }

    tarefa.status = Tarefa.STATUS.CONCLUIDA;

    this.tarefaRepository.editar(tarefa);
    return tarefa;
  }

  excluir(id) {
    this.consultarPorId(id);
    this.tarefaRepository.excluir(id);
  }

  #limparDados(dados = {}) {
    return {
      titulo: String(dados.titulo ?? '').trim(),
      descricao: String(dados.descricao ?? '').trim(),
      disciplina: String(dados.disciplina ?? '').trim()
    };
  }

  #validarDados(dados) {
    const erros = this.tarefaValidator.validar(dados);

    if (erros.length > 0) {
      throw new ErroValidacao(erros);
    }
  }
}
