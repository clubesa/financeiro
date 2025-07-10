document.addEventListener('DOMContentLoaded', () => {

    // --- DADOS ---
    // Dados para o Gráfico Financeiro (Ano 1)
    // Fonte: Valuation. LABirintar Cenário Oficial PMF - Financeiro.csv
    const financeLabels = ['M1', 'M2', 'M3', 'M4', 'M5', 'M6', 'M7', 'M8', 'M9', 'M10', 'M11', 'M12'];
    const receitaData = [33525, 42120, 50715, 84240, 117765, 151290, 184815, 218340, 251865, 268200, 268200, 268200];
    const custoData = [47087, 51748, 59742, 79227, 100778, 119616, 131920, 136195, 136195, 136195, 136195, 136195];

    // Dados para a Análise DuPont
    // Fonte: Valuation. LABirintar Cenário Oficial PMF - Indicadores.csv
    const dupontData = [
        { ano: 0, rspl: -0.19, ml: -0.43, ga: 0.44, gaf: 1.01 },
        { ano: 1, rspl: 0.01, ml: 0.01, ga: 1.24, gaf: 1.01 },
        { ano: 2, rspl: 0.27, ml: 0.12, ga: 2.22, gaf: 1.02 },
        { ano: 3, rspl: 0.61, ml: 0.19, ga: 3.11, gaf: 1.03 },
        { ano: 4, rspl: 0.78, ml: 0.23, ga: 3.52, gaf: 1.04 },
        { ano: 5, rspl: 0.91, ml: 0.23, ga: 3.80, gaf: 1.03 },
        { ano: 6, rspl: 0.87, ml: 0.23, ga: 3.78, gaf: 1.03 },
        { ano: 7, rspl: 0.84, ml: 0.22, ga: 3.27, gaf: 1.03 },
        { ano: 8, rspl: 0.69, ml: 0.23, ga: 2.89, gaf: 1.03 },
        { ano: 9, rspl: 0.65, ml: 0.23, ga: 2.72, gaf: 1.02 },
        { ano: 10, rspl: 0, ml: 0, ga: 0, gaf: 0 } // Ano 10 tem valores zerados no arquivo.
    ];

    // --- RENDERIZAÇÃO DOS COMPONENTES ---

    // 1. Renderizar Gráfico Financeiro
    const ctx = document.getElementById('financeChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: financeLabels,
            datasets: [{
                label: 'Receita Líquida',
                data: receitaData,
                borderColor: 'var(--color-blue)',
                backgroundColor: 'rgba(174, 197, 231, 0.2)',
                fill: true,
                tension: 0.3
            }, {
                label: 'Custo Total',
                data: custoData,
                borderColor: 'var(--color-lavender)',
                fill: false,
                tension: 0.3
            }]
        },
        options: {
            responsive: true,
            plugins: { legend: { position: 'top' } },
            scales: { y: { beginAtZero: true } }
        }
    });

    // 2. Renderizar Carrossel DuPont
    const dupontContainer = document.getElementById('dupont-carousel');
    dupontData.forEach(item => {
        const card = document.createElement('article');
        card.className = 'dupont-card';
        card.innerHTML = `
            <h3>Ano ${item.ano}</h3>
            <p class="rspl">${(item.rspl * 100).toFixed(0)}%</p>
            <div class="formula">
                <p><strong>Margem Líquida:</strong> ${(item.ml * 100).toFixed(0)}%</p>
                <p><strong>Giro do Ativo:</strong> ${item.ga.toFixed(2)}</p>
                <p><strong>Alavancagem Fin.:</strong> ${item.gaf.toFixed(2)}</p>
            </div>
        `;
        dupontContainer.appendChild(card);
    });
});
