// Mapeamento dos dados de rotação e relatórios para cada período do ano
const dadosPeriodos = {
    "jan-mar": {
        titulo: "Período de Águas (Janeiro a Março)",
        descricao: "Pico de chuvas. O capim cresce rápido. Momento ideal para rotacionar o gado rapidamente para evitar desperdício de pasto e garantir o descanso das áreas nativas.",
        solo: "Alta Regeneração",
        conforto: "Excelente (Sombras)",
        p1: "🌱 Descanso", c1: "status-descanso",
        p2: "🐂 Pastoreio", c2: "status-pastoreio",
        p3: "🌳 ILPF (Sombra)", c3: "status-ilpf",
        p4: "🌾 Lavoura (Milho)", c4: "status-lavoura"
    },
    "apr-jun": {
        titulo: "Transição Águas-Seca (Abril a Junho)",
        descricao: "As chuvas diminuem. O gado entra no piquete com árvores (ILPF) para aproveitar o conforto térmico, enquanto os outros pastos começam a vedar para acumular biomassa.",
        solo: "Compactação Média",
        conforto: "Crítico (Sol Forte)",
        p1: "🌾 Lavoura (Silagem)", c1: "status-lavoura",
        p2: "🌱 Descanso", c2: "status-descanso",
        p3: "🐂 Pastoreio c/ Árvores", c3: "status-pastoreio",
        p4: "🌱 Descanso", c4: "status-descanso"
    },
    "jul-sep": {
        titulo: "Período de Seca Escassa (Julho a Setembro)",
        descricao: "Pasto escasso. O solo sofre se houver superpopulação animal. A lavoura colhida vira palhada protegendo a terra, e o gado consome suplementação nas áreas de ILPF.",
        solo: "Risco de Degradação",
        conforto: "Estável sob as Árvores",
        p1: "🍂 Palhada (Protegido)", c1: "status-lavoura",
        p2: "🌾 Lavoura de Inverno", c2: "status-lavoura",
        p3: "🌱 Descanso Total", c3: "status-descanso",
        p4: "🐂 Pastoreio Suplementado", c4: "status-pastoreio"
    },
    "oct-dec": {
        titulo: "Renovação e Primavera (Outubro a Dezembro)",
        descricao: "Retorno das chuvas. O solo ganha adubação orgânica do próprio esterco. Fase de plantar a nova lavoura integrada e soltar o gado nos piquetes totalmente revigorados.",
        solo: "Nutrição Ativa",
        conforto: "Excelente",
        p1: "🐂 Pastoreio Inicial", c1: "status-pastoreio",
        p2: "🌱 Descanso Rápido", c2: "status-descanso",
        p3: "🌿 Crescimento Florestal", c3: "status-ilpf",
        p4: "🚜 Novo Plantio", c4: "status-lavoura"
    }
};

// Selecionando os botões e elementos que serão modificados na tela
const botoes = document.querySelectorAll('.btn-mes');
const statusTitulo = document.getElementById('statusTitulo');
const statusDescricao = document.getElementById('statusDescricao');
const metricaSolo = document.getElementById('metricaSolo');
const metricaConforto = document.getElementById('metricaConforto');

// Função para atualizar o cenário da fazenda inteira
function alternarCenario(periodoSelecionado) {
    const info = dadosPeriodos[periodoSelecionado];

    // 1. Atualiza os textos técnicos do relatório lateral
    statusTitulo.innerText = info.titulo;
    statusDescricao.innerText = info.descricao;
    metricaSolo.innerText = info.solo;
    metricaConforto.innerText = info.conforto;

    // 2. Atualiza dinamicamente cada Piquete da Fazenda (Texto e Classe CSS)
    for (let i = 1; i <= 4; i++) {
        const elementoPiquete = document.getElementById(`piquete${i}`);
        const elementoStatus = document.getElementById(`statusP${i}`);
        
        // Limpa todas as classes de cores antigas para não acumular estilos
        elementoPiquete.className = "piquete"; 

        // Aplica o novo texto e a nova cor de fundo com base no período do ano
        elementoStatus.innerText = info[`p${i}`];
        elementoPiquete.classList.add(info[`c${i}`]);
    }
}

// Configura o evento de clique em cada botão de mês
botoes.forEach(botao => {
    botao.addEventListener('click', (e) => {
        // Remove a marcação de 'ativo' do botão anterior e coloca no atual
        document.querySelector('.btn-mes.active').classList.remove('active');
        e.target.classList.add('active');

        // Pega o período guardado na propriedade 'data-mes' do HTML e roda a função
        const periodo = e.target.getAttribute('data-mes');
        alternarCenario(periodo);
    });
});

// Inicializa a simulação com o primeiro período padrão (Janeiro a Março)
alternarCenario("jan-mar");
