export class ErroValidacao extends Error {
  constructor(erros) {
    const lista = Array.isArray(erros) ? erros : [erros];
    super(lista.join(' '));
    this.name = 'ErroValidacao';
    this.erros = lista;
  }
}

export class NaoEncontradoError extends Error {
  constructor(mensagem = 'Registro não encontrado.') {
    super(mensagem);
    this.name = 'NaoEncontradoError';
  }
}
