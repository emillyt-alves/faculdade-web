// URL base da API
const API_URL = 'https://my-json-server.typicode.com/Emillyxz/API-10';

// Função para formatar o preço
const formatarPreco = (preco) => {
    return preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

// Função para buscar e exibir todos os produtos na index.html
const carregarProdutos = async () => {
    const listaProdutos = document.getElementById('lista-produtos');
    if (!listaProdutos) return; // Se o elemento não existir, encerra a função

    try {
        const response = await fetch(`${API_URL}/products`);
        if (!response.ok) throw new Error('Erro ao buscar produtos');
        
        const produtos = await response.json();

        listaProdutos.innerHTML = ''; // Limpa a mensagem de "carregando"
        listaProdutos.classList.remove('loading');

        produtos.forEach(produto => {
            const card = document.createElement('div');
            card.className = 'produto-card';
            card.innerHTML = `
                <img src="${produto.image}" alt="${produto.title}">
                <h3>${produto.title}</h3>
                <p>${formatarPreco(produto.price)}</p>
                <a href="produto.html?id=${produto.id}">Ver Detalhes</a>
            `;
            listaProdutos.appendChild(card);
        });
    } catch (error) {
        listaProdutos.innerHTML = `<p>Falha ao carregar produtos. Tente novamente mais tarde.</p>`;
        console.error('Erro:', error);
    }
};

// Função para buscar e exibir os detalhes de um produto
const carregarDetalhesProduto = async () => {
    const detalhesProduto = document.getElementById('detalhes-produto');
    if (!detalhesProduto) return;

    // Pega o ID do produto da URL (ex: produto.html?id=1)
    const urlParams = new URLSearchParams(window.location.search);
    const idProduto = urlParams.get('id');

    if (!idProduto) {
        detalhesProduto.innerHTML = '<p>Produto não encontrado.</p>';
        return;
    }

    try {
        const response = await fetch(`${API_URL}/products/${idProduto}`);
        if (!response.ok) throw new Error('Produto não encontrado');

        const produto = await response.json();
        
        detalhesProduto.innerHTML = ''; // Limpa o "carregando"
        detalhesProduto.classList.remove('loading');
        
        detalhesProduto.innerHTML = `
            <img src="${produto.image}" alt="${produto.title}">
            <div class="info">
                <h2>${produto.title}</h2>
                <p class="preco">${formatarPreco(produto.price)}</p>
                <p><strong>Categoria:</strong> ${produto.category}</p>
                <p>${produto.description}</p>
            </div>
        `;
    } catch (error) {
        detalhesProduto.innerHTML = `<p>Falha ao carregar detalhes do produto.</p>`;
        console.error('Erro:', error);
    }
};

// Função para lidar com o envio do formulário de adição de produto
const adicionarProduto = async (event) => {
    event.preventDefault(); // Impede o recarregamento da página

    const produto = {
        title: document.getElementById('titulo').value,
        price: parseFloat(document.getElementById('preco').value),
        description: document.getElementById('descricao').value,
        image: document.getElementById('imagem').value,
        category: document.getElementById('categoria').value
    };

    try {
        const response = await fetch(`${API_URL}/products`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(produto)
        });

        if (!response.ok) throw new Error('Erro ao adicionar o produto.');

        const novoProduto = await response.json();
        alert(`Produto "${novoProduto.title}" adicionado com sucesso com o ID: ${novoProduto.id}!`);
        
        // Limpa o formulário e redireciona para a home
        event.target.reset(); 
        window.location.href = 'index.html';

    } catch (error) {
        alert('Falha ao adicionar o produto. Verifique o console para mais detalhes.');
        console.error('Erro no POST:', error);
    }
};

// "Roteador" simples para chamar a função certa dependendo da página
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('lista-produtos')) {
        carregarProdutos();
    }
    if (document.getElementById('detalhes-produto')) {
        carregarDetalhesProduto();
    }
    const form = document.getElementById('form-adicionar-produto');
    if (form) {
        form.addEventListener('submit', adicionarProduto);
    }
});