document.addEventListener('DOMContentLoaded', () => {

    // --- DADOS ---
    // Fonte: Valuation. LABirintar Cenário Oficial PMF - Financeiro.csv
    // Os dados completos (120 meses) são carregados e estruturados por ano.
    const financialDataByYear = {
        // Exemplo da estrutura:
        '1': {
            labels: ['M1', 'M2', 'M3', 'M4', 'M5', 'M6', 'M7', 'M8', 'M9', 'M10', 'M11', 'M12'],
            receitas: [33525, 42120, 50715, 84240, 117765, 151290, 184815, 218340, 251865, 268200, 268200, 268200],
            custos: [47087, 51748, 59742, 79227, 100778, 119616, 131920, 136195, 136195, 136195, 136195, 136195]
        },
        '2': {
            labels: ['M13', 'M14',...],
            receitas: [/* dados do ano 2 */],
            custos: [/* dados do ano 2 */]
        }
        // ... e assim por diante para todos os 10 anos.
    };

    // --- LÓGICA DO FILTRO E GRÁFICO ---
    const yearSelector = document.getElementById('year-select');
    const ctx = document.getElementById('financeChart').getContext('2d');
    let financeChart; // Variável para armazenar a instância do gráfico

    // Função para atualizar o gráfico com base no ano selecionado
    function updateChart(year) {
        if (financeChart) {
            financeChart.destroy(); // Destruir o gráfico antigo antes de desenhar o novo
        }
        
        const yearData = financialDataByYear[year];
        if (!yearData) return;

        financeChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: yearData.labels,
                datasets: [{
                    label: `Receita Líquida - Ano ${year}`,
                    data: yearData.receitas,
                    borderColor: 'var(--color-blue)',
                    fill: true
                }, {
                    label: `Custo Total - Ano ${year}`,
                    data: yearData.custos,
                    borderColor: 'var(--color-lavender)'
                }]
            },
            options: { /* ... opções do gráfico ... */ }
        });
    }

    // Preencher o seletor de anos e adicionar o "escutador" de eventos
    for (let i = 1; i <= 10; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.innerText = `Ano ${i}`;
        yearSelector.appendChild(option);
    }

    yearSelector.addEventListener('change', (e) => {
        updateChart(e.target.value);
    });

    // Carregar o gráfico inicial (Ano 1)
    updateChart('1');
});
