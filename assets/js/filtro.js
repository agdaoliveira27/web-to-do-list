// VARIÁVEL PARA ARMAZENAR O FILTRO ATIVO
let filtroAtual = 'todas';

// FUNÇÃO PARA CONFIGURAR OS BOTÕES DE FILTRO
function configurarBotoesFiltro() {
  const botoesFiltro = document.querySelectorAll('.botao-filtro');

  botoesFiltro.forEach(botao => {
    botao.addEventListener('click', function() {
      // PEGAR O FILTRO CLICADO
      filtroAtual = this.getAttribute('data-filtro');

      // REMOVER "ATIVO" DE TODOS OS BOTÕES
      botoesFiltro.forEach(b => b.classList.remove('ativo'));

      // ADICIONAR "ATIVO" NO BOTÃO CLICADO
      this.classList.add('ativo');

      // MOSTRAR TAREFAS COM O NOVO FILTRO
      mostrarTarefas();
    });
  });
}

// FUNÇÃO PARA FILTRAR AS TAREFAS
function filtrarTarefas() {
  // SE FOR "TODAS", RETORNAR TODAS AS TAREFAS
  if (filtroAtual === 'todas') {
    return tarefas;
  }

  // SENÃO, FILTRAR POR STATUS
  return tarefas.filter(tarefa => tarefa.status === filtroAtual);
}
