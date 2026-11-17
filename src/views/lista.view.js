import layout from './layout.view.js';
import { escapar, rotuloDoStatus } from './helpers.js';

const FILTROS = [
  { valor: 'todas', rotulo: 'Todas' },
  { valor: 'pendente', rotulo: 'Pendentes' },
  { valor: 'concluida', rotulo: 'Concluídas' }
];

function renderizarFiltros(filtroAtual) {
  const links = FILTROS.map((filtro) => {
    const classe = filtro.valor === filtroAtual ? 'filtro ativo' : 'filtro';
    return `<a class="${classe}" href="/tarefas?status=${filtro.valor}">${filtro.rotulo}</a>`;
  });
  return `<nav class="filtros">${links.join('')}</nav>`;
}

function renderizarLinha(tarefa) {
  const botaoConcluir = tarefa.status === 'pendente'
    ? `<form method="POST" action="/tarefas/${tarefa.id}/concluir" class="inline">
         <button type="submit" class="botao pequeno sucesso">Concluir</button>
       </form>`
    : '';

  return `<tr>
    <td>${escapar(tarefa.titulo)}</td>
    <td>${escapar(tarefa.disciplina)}</td>
    <td><span class="status ${tarefa.status}">${rotuloDoStatus(tarefa.status)}</span></td>
    <td>
      <div class="acoes linha">
        <a href="/tarefas/${tarefa.id}" class="botao pequeno">Detalhes</a>
        <a href="/tarefas/${tarefa.id}/editar" class="botao pequeno">Editar</a>
        ${botaoConcluir}
        <a href="/tarefas/${tarefa.id}/excluir" class="botao pequeno perigo">Excluir</a>
      </div>
    </td>
  </tr>`;
}

function renderizarTabela(tarefas) {
  if (tarefas.length === 0) {
    return '<p class="vazio">Nenhuma tarefa encontrada.</p>';
  }

  return `<table>
    <thead>
      <tr><th>Título</th><th>Disciplina</th><th>Status</th><th>Ações</th></tr>
    </thead>
    <tbody>${tarefas.map(renderizarLinha).join('')}</tbody>
  </table>`;
}

function listaView({ tarefas, filtro, mensagem }) {
  const aviso = mensagem ? `<p class="mensagem">${escapar(mensagem)}</p>` : '';

  return layout({
    titulo: 'Minhas tarefas',
    conteudo: `${aviso}${renderizarFiltros(filtro)}${renderizarTabela(tarefas)}`
  });
}

export default listaView;
