export default class TarefaValidator {
  validar({ titulo, descricao, disciplina }) {
    const erros = [];

    if (titulo.length < 3 || titulo.length > 100) {
      erros.push('O título é obrigatório e deve ter entre 3 e 100 caracteres.');
    }

    if (descricao.length > 500) {
      erros.push('A descrição deve ter no máximo 500 caracteres.');
    }

    if (disciplina.length < 2 || disciplina.length > 80) {
      erros.push('A disciplina é obrigatória e deve ter entre 2 e 80 caracteres.');
    }

    return erros;
  }
}
