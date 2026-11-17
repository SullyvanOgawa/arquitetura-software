export default class Tarefa {
  static STATUS = Object.freeze({
    PENDENTE: 'pendente',
    CONCLUIDA: 'concluida'
  });

  #id;
  #titulo;
  #descricao;
  #disciplina;
  #status;

  constructor({
    id = null,
    titulo = null,
    descricao = null,
    disciplina = null,
    status = Tarefa.STATUS.PENDENTE
  } = {}) {
    this.#id = id;
    this.#titulo = titulo;
    this.#descricao = descricao;
    this.#disciplina = disciplina;
    this.#status = status;
  }

  get id() {
    return this.#id;
  }

  set id(valor) {
    this.#id = valor;
  }

  get titulo() {
    return this.#titulo;
  }

  set titulo(valor) {
    this.#titulo = valor;
  }

  get descricao() {
    return this.#descricao;
  }

  set descricao(valor) {
    this.#descricao = valor;
  }

  get disciplina() {
    return this.#disciplina;
  }

  set disciplina(valor) {
    this.#disciplina = valor;
  }

  get status() {
    return this.#status;
  }

  set status(valor) {
    this.#status = valor;
  }
}
