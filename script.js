// BANCO DE DADOS ESTÁTICO DOS AVISOS
const avisos = [
    {
        titulo: "Reunião de Pais e Mestres - 3º Bimestre",
        categoria: "Pedagógico",
        data: "24/10/2026",
        resumo: "Convidamos todos os responsáveis para a reunião de acompanhamento de rendimento escolar. Sua presença é fundamental.",
        publico: "Todos os períodos (Manhã, Tarde e Noite)"
    },
    {
        titulo: "Prazo Final: Rematrícula Escolar",
        categoria: "Urgente",
        data: "22/10/2026",
        resumo: "Atenção responsáveis! O prazo para atualização cadastral e confirmação de matrícula na plataforma Secretaria Escolar Digital (SED) encerra nesta sexta-feira.",
        publico: "Ensino Fundamental e Médio"
    },
    {
        titulo: "Apresentação de Projetos e Feira Cultural",
        categoria: "Eventos",
        data: "05/11/2026",
        resumo: "Exposição dos trabalhos desenvolvidos pelos estudantes ao longo do semestre, incluindo projetos de tecnologia e ciências.",
        publico: "Comunidade Escolar"
    },
    {
        titulo: "Retirada de Certificados e Histórico Escolar",
        categoria: "Secretaria",
        data: "19/10/2026",
        resumo: "A secretaria informa que os documentos solicitados até o final do mês passado já estão disponíveis para retirada mediante apresentação de RG.",
        publico: "Ex-alunos e Concluintes"
    }
];

const container = document.getElementById('avisosContainer');
const searchInput = document.getElementById('searchInput');
const filterBtns = document.querySelectorAll('.filter-btn');

let categoriaAtiva = 'Todos';

// Função para renderizar os avisos na tela
function renderizarAvisos(textoBusca = '') {
    container.innerHTML = '';

    const avisosFiltrados = avisos.filter(aviso => {
        const bateCategoria = categoriaAtiva === 'Todos' || aviso.categoria === categoriaAtiva;
        const bateTexto = aviso.titulo.toLowerCase().includes(textoBusca.toLowerCase()) ||
                          aviso.resumo.toLowerCase().includes(textoBusca.toLowerCase());
        return bateCategoria && bateTexto;
    });

    if (avisosFiltrados.length === 0) {
        container.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: #718096;">Nenhum aviso encontrado.</p>`;
        return;
    }

    avisosFiltrados.forEach(aviso => {
        const card = document.createElement('article');
        card.className = `card ${aviso.categoria}`;
        card.innerHTML = `
            <div>
                <div class="card-header">
                    <span class="tag ${aviso.categoria}">${aviso.categoria}</span>
                    <span class="date">📅 ${aviso.data}</span>
                </div>
                <h3>${aviso.titulo}</h3>
                <p>${aviso.resumo}</p>
            </div>
            <div class="card-footer">
                🎯 Público: ${aviso.publico}
            </div>
        `;
        container.appendChild(card);
    });
}

// Eventos de Filtro por Botão
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        categoriaAtiva = btn.getAttribute('data-category');
        renderizarAvisos(searchInput.value);
    });
});

// Evento de Busca por Digitação
searchInput.addEventListener('input', (e) => {
    renderizarAvisos(e.target.value);
});

// Inicializa o mural ao abrir a página
renderizarAvisos();