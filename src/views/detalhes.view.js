import layout from './layout.view.js';
import { escapar, rotuloDoStatus } from './helpers.js';

function detalhesView({ tarefa }) {
  const descricao = tarefa.descricao
    ? escapar(tarefa.descricao)
    : '<em>Sem descrição</em>';

  const botaoConcluir = tarefa.status === 'pendente'
    ? `<form method="POST" action="/tarefas/${tarefa.id}/concluir" class="inline">
         <button type="submit" class="botao sucesso">Concluir</button>
       </form>`
    : '';

  return layout({
    titulo: 'Detalhes da tarefa',
    conteudo: `
      <dl class="detalhes">
        <dt>ID</dt><dd>${tarefa.id}</dd>
        <dt>Título</dt><dd>${escapar(tarefa.titulo)}</dd>
        <dt>Descrição</dt><dd>${descricao}</dd>
        <dt>Disciplina</dt><dd>${escapar(tarefa.disciplina)}</dd>
        <dt>Status</dt><dd><span class="status ${tarefa.status}">${rotuloDoStatus(tarefa.status)}</span></dd>
      </dl>
      <div class="acoes">
        <a href="/tarefas/${tarefa.id}/editar" class="botao">Editar</a>
        ${botaoConcluir}
        <a href="/tarefas/${tarefa.id}/excluir" class="botao perigo">Excluir</a>
        <a href="/tarefas" class="botao secundario">Voltar</a>
      </div>`
  });
}

export default detalhesView;
