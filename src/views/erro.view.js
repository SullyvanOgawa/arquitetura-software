import layout from './layout.view.js';
import { escapar } from './helpers.js';

function erroView({ mensagem }) {
  return layout({
    titulo: 'Ops!',
    conteudo: `
      <p class="erro">${escapar(mensagem)}</p>
      <a href="/tarefas" class="botao secundario">Voltar para a lista</a>`
  });
}

export default erroView;
