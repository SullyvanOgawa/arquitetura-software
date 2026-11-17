import layout from './layout.view.js';
import { escapar } from './helpers.js';

function confirmarExclusaoView({ tarefa }) {
  return layout({
    titulo: 'Excluir tarefa',
    conteudo: `
      <p>Tem certeza que deseja excluir a tarefa <strong>${escapar(tarefa.titulo)}</strong>?</p>
      <p>Esta ação não pode ser desfeita.</p>
      <form method="POST" action="/tarefas/${tarefa.id}/excluir" class="acoes">
        <button type="submit" class="botao perigo">Sim, excluir</button>
        <a href="/tarefas" class="botao secundario">Cancelar</a>
      </form>`
  });
}

export default confirmarExclusaoView;
