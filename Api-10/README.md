# Emilly Tainá da Silva Alves 

# Loja Virtual Simples


# Descrição

Front-End de uma loja virtual criado como atividade acadêmica. O site exibe produtos consumindo uma API REST criada a partir de um arquivo JSON.

A API foi hospedada online utilizando o serviço **[My JSON Server](https://my-json-server.typicode.com/)**, que usa este próprio repositório do GitHub como um backend simples.

# Tecnologias

- **HTML5**
- **CSS3**
- **JavaScript** (com requisições `fetch`)
- **Git & GitHub** para versionamento
- **My JSON Server** para a API online
- **Vercel** para publicação e deploy contínuo

# Funcionalidades & Endpoints

A API criada oferece os seguintes endpoints:

| Página | Método | Endpoint | Função |
| :--- | :--- | :--- | :--- |
| `index.html` | `GET` | `/products` | Lista todos os produtos. |
| `produto.html` | `GET` | `/products/{id}` | Mostra os detalhes de um produto. |
| `adicionar.html`| `POST` | `/products` | Adiciona um novo produto (simulado). |

# Fontes e Ferramentas

- **API Utilizada:** API própria hospedada no My JSON Server.
  - **Link da API:** `https://my-json-server.typicode.com/Emillyxz/API-10`
- **Ferramentas:** [My JSON Server](https://my-json-server.typicode.com/), [json-server](https://github.com/typicode/json-server)
- **Documentação:** [MDN Web Docs (Fetch)](https://developer.mozilla.org/pt-BR/docs/Web/API/Fetch_API)