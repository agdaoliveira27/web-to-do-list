// CONFIGURAÇÃO DA API - ENDEREÇO DO SERVIDOR
const URL_BASE = 'https://api-to-do-list-9lea.onrender.com';

// FUNÇÃO 1: BUSCAR TODAS AS TAREFAS
async function buscarTodasAsTarefas() {
  try {
    const resposta = await fetch(`${URL_BASE}/tarefas`);
    const tarefas = await resposta.json();
    return tarefas;
  } catch (erro) {
    console.error('Erro ao buscar tarefas:', erro);
    return [];
  }
}

// FUNÇÃO 2: CRIAR UMA NOVA TAREFA
async function criarTarefa(titulo, descricao) {
  try {
    const resposta = await fetch(`${URL_BASE}/tarefas`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        titulo: titulo,
        descricao: descricao || 'Sem descrição',
        status: 'a fazer'
      })
    });

    const tarefa = await resposta.json();
    return tarefa;
  } catch (erro) {
    console.error('Erro ao criar tarefa:', erro);
    return null;
  }
}

// FUNÇÃO 3: ATUALIZAR O STATUS DE UMA TAREFA
async function atualizarStatusTarefa(id, novoStatus) {
  try {
    const resposta = await fetch(`${URL_BASE}/tarefas/${id}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        status: novoStatus
      })
    });

    const tarefa = await resposta.json();
    return tarefa;
  } catch (erro) {
    console.error('Erro ao atualizar status:', erro);
    return null;
  }
}

// FUNÇÃO 4: DELETAR UMA TAREFA
async function deletarTarefa(id) {
  try {
    await fetch(`${URL_BASE}/tarefas/${id}`, {
      method: 'DELETE'
    });
    return true;
  } catch (erro) {
    console.error('Erro ao deletar tarefa:', erro);
    return false;
  }
}
