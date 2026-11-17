export default class TarefaRepository {
  #tarefas = [];
  #proximoId = 1;

  gravar(tarefa) {
    tarefa.id = this.#proximoId;
    this.#proximoId += 1;
    this.#tarefas.push(tarefa);
    return tarefa;
  }

  listar(status = null) {
    if (status) {
      return this.#tarefas.filter((tarefa) => tarefa.status === status);
    }
    return [...this.#tarefas];
  }

  consultarPorId(id) {
    return this.#tarefas.find((tarefa) => tarefa.id === id) ?? null;
  }

  editar(tarefaEditada) {
    const indice = this.#tarefas.findIndex((tarefa) => tarefa.id === tarefaEditada.id);
    if (indice === -1) {
      return false;
    }
    this.#tarefas[indice] = tarefaEditada;
    return true;
  }

  excluir(id) {
    const indice = this.#tarefas.findIndex((tarefa) => tarefa.id === id);
    if (indice === -1) {
      return false;
    }
    this.#tarefas.splice(indice, 1);
    return true;
  }
}
