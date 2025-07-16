// Espera todo o conteúdo da página carregar antes de executar o script.
document.addEventListener('DOMContentLoaded', () => {

    // --- SEÇÃO DE DADOS ---
    // Todos os dados são extraídos dos seus arquivos CSV e colocados aqui para facilitar.

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
        { ano: 10, rspl: 0, ml: 0, ga: 0, gaf: 0 }
    ];

    // Fonte: Valuation. LABirintar Cenário Oficial PMF - Financeiro.csv
    // Dados financeiros mensais, organizados por ano.
    const financialDataByYear = {
        '1': {
            labels: ['M1', 'M2', 'M3', 'M4', 'M5', 'M6', 'M7', 'M8', 'M9', 'M10', 'M11', 'M12'],
            receitas: [33525, 42120, 50715, 84240, 117765, 151290, 184815, 218340, 251865, 268200, 268200, 268200],
            custos: [47087.83, 51748.16, 59742.34, 79227.1, 100778.5, 119616.1, 131920.3, 136195.1, 136195.1, 136195.1, 136195.1, 136195.1]
        },
        '2': {
            labels: ['M13', 'M14', 'M15', 'M16', 'M17', 'M18', 'M19', 'M20', 'M21', 'M22', 'M23', 'M24'],
            receitas: [288300, 308400, 328500, 348600, 368700, 388800, 408900, 429000, 449100, 469200, 489300, 509400],
            custos: [167906.9, 178923.4, 189940, 200956.5, 211973.1, 222989.6, 234006.2, 245022.7, 256039.3, 267055.8, 278072.4, 289088.9]
        },
        // Adicione os outros anos aqui se necessário. Por enquanto, a lógica funciona para os anos 1 e 2.
    };
    // Preenchendo os anos de 3 a 10 com dados de exemplo para o filtro funcionar
    for (let i = 3; i <= 10; i++) {
        financialDataByYear[i] = {
            labels: [`M${(i-1)*12+1}`, `M${(i-1)*12+2}`],
            receitas: [200000 * i, 210000 * i],
            custos: [100000 * i, 110000 * i]
        };
    }


    // --- SELETORES DE ELEMENTOS HTML ---
    // Pegando os elementos da página para manipular
    const yearSelector = document.getElementById('year-select');
    const financeChartCanvas = document.getElementById('financeChart');
    const dupontContainer = document.getElementById('dupont-carousel');
    let financeChartInstance; // Variável para armazenar a instância do gráfico

    // --- FUNÇÕES ---

    // Função para renderizar o carrossel DuPont
    function renderDuPont() {
        if (!dupontContainer) return; // Se o elemento não existir, não faz nada
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
    }

    // Função para preencher as opções do filtro de ano
    function populateYearFilter() {
        if (!yearSelector) return;
        for (let i = 1; i <= 10; i++) {
            const option = document.createElement('option');
            option.value = i;
            option.innerText = `Ano ${i}`;
            yearSelector.appendChild(option);
        }
    }

    // Função para desenhar/atualizar o gráfico financeiro
    function updateFinanceChart(year) {
        if (!financeChartCanvas) return; // Se o canvas do gráfico não existir, não faz nada
        const yearData = financialDataByYear[year];
        if (!yearData) return; // Se não houver dados para o ano, não faz nada

        // Se já existe um gráfico, ele é destruído para criarmos um novo
        if (financeChartInstance) {
            financeChartInstance.destroy();
        }

        const ctx = financeChartCanvas.getContext('2d');
        financeChartInstance = new Chart(ctx, {
            type: 'line',
            data: {
                labels: yearData.labels,
                datasets: [{
                    label: `Receita Líquida - Ano ${year}`,
                    data: yearData.receitas,
                    borderColor: 'var(--color-blue)',
                    backgroundColor: 'rgba(174, 197, 231, 0.2)',
                    fill: true,
                    tension: 0.3
                }, {
                    label: `Custo Total - Ano ${year}`,
                    data: yearData.custos,
                    borderColor: 'var(--color-lavender)',
                    fill: false,
                    tension: 0.3
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { position: 'top' } },
                scales: { y: { beginAtZero: true } }
            }
        });
    }


    // --- INICIALIZAÇÃO ---
    // Código que é executado assim que a página carrega

    populateYearFilter();
    renderDuPont();
    updateFinanceChart(yearSelector.value || '1'); // Mostra o gráfico do Ano 1 por padrão

    // Adiciona o "escutador" que muda o gráfico quando o usuário troca o ano no filtro
    if (yearSelector) {
        yearSelector.addEventListener('change', (event) => {
            updateFinanceChart(event.target.value);
        });
    }

});
