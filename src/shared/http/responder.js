import { ErroValidacao, NaoEncontradoError } from '../errors/erroNegocio.js';
import erroView from '../../views/erro.view.js';

export function responderErro(response, error) {
  if (error instanceof ErroValidacao) {
    return response.status(400).send(erroView({ mensagem: error.message }));
  }

  if (error instanceof NaoEncontradoError) {
    return response.status(404).send(erroView({ mensagem: error.message }));
  }

  console.error(error);

  return response.status(500).send(erroView({
    mensagem: 'Erro interno. Tente novamente mais tarde.'
  }));
}

export function lerId(valor, nome = 'ID') {
  const id = Number(valor);

  if (!Number.isInteger(id) || id <= 0) {
    throw new ErroValidacao(`${nome} inválido.`);
  }

  return id;
}
