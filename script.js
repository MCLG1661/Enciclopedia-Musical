let dados = [];
const secaoResultados = document.querySelector('#resultados-busca');

// Carrega os dados do JSON assim que a página é carregada
window.onload = async () => {
    try {
        const resposta = await fetch("data.json");
        dados = await resposta.json();
    } catch (error) {
        console.error("Erro ao carregar os dados:", error);
        secaoResultados.innerHTML = "<p>Não foi possível carregar os dados. Tente novamente mais tarde.</p>";
    }
};

function iniciarBusca() {
    const termoBusca = document.getElementById('campo-busca').value.toLowerCase();

    if (!termoBusca) {
        secaoResultados.innerHTML = '';
        return;
    }

    const resultados = dados.filter(item => {
        const nome = (item.nome || '').toLowerCase();
        const tipo = (item.tipo || '').toLowerCase();
        const descricao = (item.descricao || '').toLowerCase();
        const ano = (item.ano || '').toString();
        const genero = (item.genero || '').toLowerCase();
        const relacionados = (item.relacionados || []).join(' ').toLowerCase();
        
        return nome.includes(termoBusca) ||
               tipo.includes(termoBusca) ||
               descricao.includes(termoBusca) ||
               ano.includes(termoBusca) ||
               genero.includes(termoBusca) ||
               relacionados.includes(termoBusca);
    });
    exibirResultados(resultados);
} 

function exibirResultados(resultados) {
    let html = '';

    if (resultados.length === 0) {
        secaoResultados.innerHTML = '<p>Nenhum resultado encontrado.</p>';
        return;
    }
 
    resultados.forEach(item => {
        let infoRelacionados = '';
        if (item.relacionados && item.relacionados.length > 0) {
            infoRelacionados = `<p><strong>Relacionados:</strong> ${item.relacionados.join(', ')}</p>`;
        }

        html += `
            <article class="card">
                <h2>${item.nome}</h2>
                <p><strong>Tipo:</strong> ${item.tipo || 'N/A'}</p>
                <p><strong>Gênero:</strong> ${item.genero || 'N/A'}</p>
                <p><strong>Década:</strong> ${item.decada || 'N/A'}</p>
                ${item.nome_real ? `<p><strong>Nome Real:</strong> ${item.nome_real}</p>` : ''}
                <p>${item.descricao || ''}</p>
                ${infoRelacionados}
                ${item.link ? `<a href="${item.link}" target="_blank" class="saiba-mais">Saiba Mais</a>` : ''}
            </article>
        `;
    });
 
    secaoResultados.innerHTML = html;
}

function limparBusca() {
    const campoBusca = document.getElementById('campo-busca');
    campoBusca.value = ''; // Limpa o campo de input
    secaoResultados.innerHTML = ''; // Limpa a seção de resultados
}
