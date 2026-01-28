// FUNÇÃO PARA CRIAR O HTML DE UMA LINHA DE TAREFA
function criarLinhaTarefa(tarefa) {
  // TRADUZIR O STATUS PARA PORTUGUÊS
  const statusEmPortugues = {
    'a fazer': 'A Fazer',
    'em andamento': 'Em Andamento',
    'concluída': 'Concluída'
  };

  const textoStatus = statusEmPortugues[tarefa.status] || tarefa.status;

  // CRIAR CLASSE CSS PARA O STATUS
  const classeStatus = 'status-' + tarefa.status.replaceAll(' ', '-').toLowerCase();

  // ADICIONAR CLASSE SE A TAREFA ESTÁ CONCLUÍDA
  const classeConcluida = tarefa.status === 'concluída' ? 'concluida' : '';

  // CRIAR DESCRIÇÃO SOMENTE SE HOUVER
  const descricao = (tarefa.descricao && tarefa.descricao !== 'Sem descrição')
    ? `<div class="celula-descricao">${tarefa.descricao}</div>`
    : '';

  // RETORNAR O HTML DA LINHA
  return `
    <tr>
      <td>
        <div class="celula-titulo ${classeConcluida}">
          ${tarefa.titulo}
        </div>
        ${descricao}
      </td>
      <td>
        <span class="label-status ${classeStatus}">${textoStatus}</span>
      </td>
      <td class="celula-acoes">
        <label class="label-checkbox">
          <input 
            type="checkbox" 
            class="checkbox-tarefa" 
            data-id="${tarefa.id}" 
            data-status="${tarefa.status}"
            ${tarefa.status === 'concluída' ? 'checked' : ''}
          >
          <span class="texto-checkbox">Concluída</span>
        </label>
        <button class="botao-deletar" data-id="${tarefa.id}" title="Deletar tarefa">
          <i class="fas fa-trash"></i>
        </button>
      </td>
    </tr>
  `;
}
