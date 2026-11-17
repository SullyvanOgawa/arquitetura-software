import { escapar } from './helpers.js';

function layout({ titulo, conteudo }) {
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapar(titulo)} | Tarefas Acadêmicas</title>
  <link rel="stylesheet" href="/style.css">
</head>
<body>
  <header>
    <a href="/tarefas" class="marca">Tarefas Acadêmicas</a>
    <a href="/tarefas/nova" class="botao">+ Nova tarefa</a>
  </header>
  <main>
    <h1>${escapar(titulo)}</h1>
    ${conteudo}
  </main>
</body>
</html>`;
}

export default layout;
