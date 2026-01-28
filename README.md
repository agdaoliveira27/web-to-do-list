# Front-End To-Do List

Aplicação front-end em HTML, CSS e JavaScript para gerenciamento de tarefas, integrada a uma API REST de To-Do List.

## Requisitos

- Navegador moderno (Chrome, Firefox, Edge, etc.)
- Servidor HTTP simples (opcional, recomendado para evitar problemas de CORS)

## Configuração
- Clone ou baixe o projeto.

    Caso utilize uma API local, certifique-se de que ela esteja rodando antes de abrir o front-end.

## Execução
Abra o arquivo index.html diretamente no navegador
Ou utilize um servidor local, por exemplo:
```bash
npx serve .
ou
npx live-server
```

## Funcionalidades
Adicionar tarefas com título obrigatório e descrição opcional.
Listar todas as tarefas cadastradas.

Filtrar tarefas por status:
- Todas
- A Fazer
- Em andamento
- Concluídas

Atualizar status da tarefa.

Remover tarefas existentes.


## Integração com API
O front-end se comunica com a API REST através de requisições HTTP:
- GET para listar tarefas
- POST para criar tarefas
- PUT/PATCH para atualizar tarefas
- DELETE para remover tarefas

O arquivo assets/js/api.js centraliza as chamadas à API.

Estrutura
HTML: estrutura da página e componentes visuais.
CSS: estilos organizados por responsabilidade (reset, layout, formulário, tabela, filtros).
JavaScript:
- api.js: comunicação com a API
- tarefa-html.js: manipulação e renderização do HTML das tarefas
- filtro.js: lógica de filtros por status
- index.js: inicialização e controle geral da aplicação

## Observações
Título da tarefa é obrigatório.
Filtros funcionam de forma dinâmica sem recarregar a página.
Necessita que a API esteja acessível para funcionamento completo.
