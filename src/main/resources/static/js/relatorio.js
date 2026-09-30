const URL_RELATORIO = "/relatorios/vendas-por-dia";

const params = new URLSearchParams(window.location.search);
const festaId = params.get("idFesta");

const tabelaQuantidadeVendidaPorProduto = document.getElementById("tabelaQuantidadeVendidaPorProduto");
const tabelaVendasPorDia = document.getElementById("tabelaVendasPorDia");
const mensagemVazia = document.getElementById("mensagemVazia");
const totalVendido = document.getElementById("totalVendido");


document.addEventListener("DOMContentLoaded", function () {
    carregarRelatorioVendasPorDia();
    carregarRelatorioQuantidadeProdutoVendido();
});


function carregarRelatorioVendasPorDia() {
    fetch(`/festas/${festaId}/relatorios/vendas-por-dia`)
        .then(function (response) {

            if (!response.ok) {
                throw new Error("Erro ao carregar relatório");
            }

            return response.json();
        })
        .then(function (vendas) {

            mostrarRelatorioVendasPorDia(vendas);
        })
        .catch(function (error) {

            console.error(error);

            mensagemVazia.textContent =
                "Erro ao carregar o relatório.";

            mensagemVazia.style.display = "block";
        });
}
function carregarRelatorioQuantidadeProdutoVendido() {
    fetch(`/festas/${festaId}/relatorios/quantidade-produto-vendido`)
        .then(function (response) {

            if (!response.ok) {
                throw new Error("Erro ao carregar relatório");
            }

            return response.json();
        })
        .then(function (vendas) {

            mostrarRelatorioQuantidadeProdutoVendido(vendas);
        })
        .catch(function (error) {

            console.error(error);
        });
}

function mostrarRelatorioQuantidadeProdutoVendido(vendas) {

    tabelaQuantidadeVendidaPorProduto.innerHTML = "";

    if (vendas.length === 0){
        return;
    }

    vendas.forEach(function (venda) {

        const linha = document.createElement("tr");

        const colunaProduto = document.createElement("td");
        colunaProduto.textContent = venda.produto;

        const colunaQuantidade = document.createElement("td");
        colunaQuantidade.textContent = venda.quantidadeVendida;

        const colunaTotal = document.createElement("td");
        colunaTotal.textContent = formatarMoeda(venda.valorTotal);

        linha.appendChild(colunaProduto);
        linha.appendChild(colunaQuantidade);
        linha.appendChild(colunaTotal);

        tabelaQuantidadeVendidaPorProduto.appendChild(linha);
    });
}

function mostrarRelatorioVendasPorDia(vendas) {

    tabelaVendasPorDia.innerHTML = "";

    if (vendas.length === 0) {

        mensagemVazia.textContent =
            "Nenhuma venda encontrada.";

        mensagemVazia.style.display = "block";

        totalVendido.textContent = "R$ 0,00";

        return;
    }

    mensagemVazia.style.display = "none";

    let total = 0;

    vendas.forEach(function (venda) {

        total += Number(venda.total);

        const linha = document.createElement("tr");

        const colunaData = document.createElement("td");
        colunaData.textContent = formatarData(venda.data);

        const colunaTotal = document.createElement("td");
        colunaTotal.textContent = formatarMoeda(venda.total);

        linha.appendChild(colunaData);
        linha.appendChild(colunaTotal);

        tabelaVendasPorDia.appendChild(linha);
    });

    totalVendido.textContent = formatarMoeda(total);
}


function formatarData(data) {

    const partes = data.split("-");

    return `${partes[2]}/${partes[1]}/${partes[0]}`;
}


function formatarMoeda(valor) {

    return Number(valor).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}
