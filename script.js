// Aguarda o conteúdo da página carregar completamente antes de executar o script
document.addEventListener('DOMContentLoaded', () => {
    const inputElement = document.getElementById('input-busca');
    const botaoBusca = document.getElementById('botao-busca');
    const secaoResultados = document.querySelector('main section');
    let dados = []; // Array para armazenar os dados do JSON

    // 1. Carrega os dados do arquivo JSON
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            dados = data;
            console.log("Dados carregados com sucesso!", dados);
        })
        .catch(error => console.error('Erro ao carregar os dados:', error));

    // 2. Função para realizar a busca
    function iniciarBusca() {
        const termoBusca = inputElement.value.trim().toLowerCase();
        secaoResultados.innerHTML = ''; // Limpa os resultados anteriores

        if (!termoBusca) {
            // Opcional: pode mostrar uma mensagem se a busca for vazia
            return;
        }

        const resultados = dados.filter(item => 
            item.titulo.toLowerCase().includes(termoBusca)
        );

        if (resultados.length === 0) {
            secaoResultados.innerHTML = '<p>Nenhum resultado encontrado.</p>';
        } else {
            resultados.forEach(item => {
                const article = document.createElement('article');
                article.innerHTML = `
                    <h2>${item.titulo}</h2>
                    <p>
                        <strong>Definição:</strong> ${item.definicao}
                    </p>
                    <a href="${item.link}" target="_blank" rel="noopener noreferrer">Saiba mais</a>
                `;
                secaoResultados.appendChild(article);
            });
        }
    }

    // 3. Adiciona o evento de clique ao botão
    botaoBusca.addEventListener('click', iniciarBusca);

    // Bônus: Permite buscar ao pressionar "Enter" no campo de busca
    inputElement.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            iniciarBusca();
        }
    });
});