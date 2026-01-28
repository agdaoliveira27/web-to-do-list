// VARIÁVEIS GLOBAIS
let tarefas = [];

const formularioTarefa = document.getElementById('formularioTarefa');
const inputTitulo = document.getElementById('inputTitulo');
const inputDescricao = document.getElementById('inputDescricao');
const corpoDaTabelaTarefas = document.getElementById('corpoDaTabelaTarefas');

// EXECUTAR QUANDO A PÁGINA CARREGA
document.addEventListener('DOMContentLoaded', function() {
  carregarTarefas();
  configurarBotoesFiltro();
  configurarFormulario();
});

// CARREGAR TAREFAS DA API
async function carregarTarefas() {
  tarefas = await buscarTodasAsTarefas();
  mostrarTarefas();
}

// CONFIGURAR O FORMULÁRIO
function configurarFormulario() {
  formularioTarefa.addEventListener('submit', async function(evento) {
    evento.preventDefault();
    
    const titulo = inputTitulo.value.trim();
    const descricao = inputDescricao.value.trim();

    // VALIDAR SE O TÍTULO ESTÁ VAZIO
    if (!titulo) {
      return;
    }

    // CHAMAR API PARA CRIAR TAREFA
    const novaTarefa = await criarTarefa(titulo, descricao);

    if (novaTarefa) {
      tarefas.push(novaTarefa);
      formularioTarefa.reset();
      mostrarTarefas();
    } else {
    }
  });
}

// MOSTRAR TAREFAS NA TABELA
function mostrarTarefas() {
  // FILTRAR TAREFAS BASEADO NO FILTRO ATIVO
  const tarefasFiltradas = filtrarTarefas();

  // LIMPAR A TABELA
  corpoDaTabelaTarefas.innerHTML = '';

  // SE NÃO HOUVER TAREFAS, MOSTRAR MENSAGEM
  if (tarefasFiltradas.length === 0) {
    corpoDaTabelaTarefas.innerHTML = `
      <tr class="linha-vazia">
        <td colspan="3" class="mensagem-vazia">Nenhuma tarefa encontrada</td>
      </tr>
    `;
    return;
  }

  // CRIAR UMA LINHA PARA CADA TAREFA
  tarefasFiltradas.forEach(tarefa => {
    const linhaHTML = criarLinhaTarefa(tarefa);
    corpoDaTabelaTarefas.innerHTML += linhaHTML;
  });

  // ADICIONAR EVENTOS NOS CHECKBOXES E BOTÕES
  configurarEventosDaTarefa();
}

// CONFIGURAR EVENTOS DOS CHECKBOXES E BOTÕES
function configurarEventosDaTarefa() {
  // EVENTOS DOS CHECKBOXES
  const checkboxes = document.querySelectorAll('.checkbox-tarefa');
  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', async function() {
      const id = parseInt(this.getAttribute('data-id'));
      const statusAtual = this.getAttribute('data-status');
      
      await atualizarStatus(id, statusAtual);
    });
  });

  // EVENTOS DOS BOTÕES DELETAR
  const botoesDeletar = document.querySelectorAll('.botao-deletar');
  botoesDeletar.forEach(botao => {
    botao.addEventListener('click', async function() {
      const id = parseInt(this.getAttribute('data-id'));
      await deletarUmaTarefa(id);
    });
  });
}

// ATUALIZAR STATUS DE UMA TAREFA
async function atualizarStatus(id, statusAtual) {
  // DEFINIR QUAL SERÁ O PRÓXIMO STATUS
  const proximoStatus = {
    'a fazer': 'em andamento',
    'em andamento': 'concluída',
    'concluída': 'a fazer'
  };

  const novoStatus = proximoStatus[statusAtual];

  // CHAMAR API PARA ATUALIZAR
  const tarefaAtualizada = await atualizarStatusTarefa(id, novoStatus);

  if (tarefaAtualizada) {
    // ATUALIZAR NA LISTA
    const indice = tarefas.findIndex(t => t.id === id);
    if (indice !== -1) {
      tarefas[indice] = tarefaAtualizada;
    }

    mostrarTarefas();
  } else {
  }
}

// DELETAR UMA TAREFA
async function deletarUmaTarefa(id) {
  // CONFIRMAR EXCLUSÃO
  if (!confirm('Tem certeza que quer deletar essa tarefa?')) {
    return;
  }

  // CHAMAR API PARA DELETAR
  const sucesso = await deletarTarefa(id);

  if (sucesso) {
    // REMOVER DA LISTA
    tarefas = tarefas.filter(t => t.id !== id);

    mostrarTarefas();
  } else {
  }
}
