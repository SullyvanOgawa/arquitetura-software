import { ErroValidacao } from '../../shared/errors/erroNegocio.js';
import { responderErro, lerId } from '../../shared/http/responder.js';

import listaView from '../../views/lista.view.js';
import detalhesView from '../../views/detalhes.view.js';
import formularioView from '../../views/formulario.view.js';
import confirmarExclusaoView from '../../views/confirmarExclusao.view.js';

export default class TarefaController {
  constructor(tarefaService) {
    this.tarefaService = tarefaService;
  }

  listar(request, response) {
    const filtro = request.query.status || 'todas';
    const tarefas = this.tarefaService.listar(filtro);

    return response.status(200).send(listaView({
      tarefas,
      filtro,
      mensagem: request.query.mensagem
    }));
  }

  exibirFormularioCadastro(request, response) {
    return response.status(200).send(formularioView({
      titulo: 'Nova tarefa',
      acao: '/tarefas',
      textoBotao: 'Cadastrar'
    }));
  }

  gravar(request, response) {
    try {
      this.tarefaService.gravar(request.body);
      return this.#redirecionarComMensagem(response, 'Tarefa cadastrada com sucesso!');
    } catch (error) {
      if (error instanceof ErroValidacao) {
        return response.status(400).send(formularioView({
          titulo: 'Nova tarefa',
          acao: '/tarefas',
          tarefa: request.body,
          erros: error.erros,
          textoBotao: 'Cadastrar'
        }));
      }
      return responderErro(response, error);
    }
  }

  consultarPorId(request, response) {
    try {
      const id = lerId(request.params.id);
      const tarefa = this.tarefaService.consultarPorId(id);

      return response.status(200).send(detalhesView({ tarefa }));
    } catch (error) {
      return responderErro(response, error);
    }
  }

  exibirFormularioEdicao(request, response) {
    try {
      const id = lerId(request.params.id);
      const tarefa = this.tarefaService.consultarPorId(id);

      return response.status(200).send(formularioView({
        titulo: 'Editar tarefa',
        acao: `/tarefas/${tarefa.id}/editar`,
        tarefa,
        textoBotao: 'Salvar alterações'
      }));
    } catch (error) {
      return responderErro(response, error);
    }
  }

  editar(request, response) {
    let id = null;

    try {
      id = lerId(request.params.id);
      this.tarefaService.editar(id, request.body);
      return this.#redirecionarComMensagem(response, 'Tarefa editada com sucesso!');
    } catch (error) {
      if (error instanceof ErroValidacao && id !== null) {
        return response.status(400).send(formularioView({
          titulo: 'Editar tarefa',
          acao: `/tarefas/${id}/editar`,
          tarefa: request.body,
          erros: error.erros,
          textoBotao: 'Salvar alterações'
        }));
      }
      return responderErro(response, error);
    }
  }

  concluir(request, response) {
    try {
      const id = lerId(request.params.id);
      this.tarefaService.concluir(id);

      return this.#redirecionarComMensagem(response, 'Tarefa concluída com sucesso!');
    } catch (error) {
      return responderErro(response, error);
    }
  }

  exibirConfirmacaoExclusao(request, response) {
    try {
      const id = lerId(request.params.id);
      const tarefa = this.tarefaService.consultarPorId(id);

      return response.status(200).send(confirmarExclusaoView({ tarefa }));
    } catch (error) {
      return responderErro(response, error);
    }
  }

  excluir(request, response) {
    try {
      const id = lerId(request.params.id);
      this.tarefaService.excluir(id);

      return this.#redirecionarComMensagem(response, 'Tarefa excluída com sucesso!');
    } catch (error) {
      return responderErro(response, error);
    }
  }

  #redirecionarComMensagem(response, mensagem) {
    return response.redirect(`/tarefas?mensagem=${encodeURIComponent(mensagem)}`);
  }
}
