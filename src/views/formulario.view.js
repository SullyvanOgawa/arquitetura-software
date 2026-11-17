import layout from './layout.view.js';
import { escapar } from './helpers.js';

function renderizarErros(erros) {
  if (erros.length === 0) {
    return '';
  }
  const itens = erros.map((erro) => `<li>${escapar(erro)}</li>`).join('');
  return `<ul class="erros">${itens}</ul>`;
}

function formularioView({ titulo, acao, tarefa = {}, erros = [], textoBotao }) {
  return layout({
    titulo,
    conteudo: `
      ${renderizarErros(erros)}
      <form method="POST" action="${acao}" class="formulario">
        <label for="titulo">Título *</label>
        <input type="text" id="titulo" name="titulo" value="${escapar(tarefa.titulo)}">

        <label for="descricao">Descrição</label>
        <textarea id="descricao" name="descricao" rows="5">${escapar(tarefa.descricao)}</textarea>

        <label for="disciplina">Disciplina *</label>
        <input type="text" id="disciplina" name="disciplina" value="${escapar(tarefa.disciplina)}">

        <div class="acoes">
          <button type="submit" class="botao">${escapar(textoBotao)}</button>
          <a href="/tarefas" class="botao secundario">Cancelar</a>
        </div>
      </form>`
  });
}

export default formularioView;
