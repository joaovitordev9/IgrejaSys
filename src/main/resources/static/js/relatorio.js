const URL_RELATORIO = "/relatorios/vendas-por-dia";

const params = new URLSearchParams(window.location.search);
const festaId = params.get("idFesta");

const tabelaVendas = document.getElementById("tabelaVendas");
const mensagemVazia = document.getElementById("mensagemVazia");
const totalVendido = document.getElementById("totalVendido");


document.addEventListener("DOMContentLoaded", function () {
    carregarRelatorio();
});


function carregarRelatorio() {
    fetch(`/festas/${festaId}/relatorios/vendas-por-dia`)
        .then(function (response) {

            if (!response.ok) {
                throw new Error("Erro ao carregar relatório");
            }

            return response.json();
        })
        .then(function (vendas) {

            mostrarRelatorio(vendas);
        })
        .catch(function (error) {

            console.error(error);

            mensagemVazia.textContent =
                "Erro ao carregar o relatório.";

            mensagemVazia.style.display = "block";
        });
}


function mostrarRelatorio(vendas) {

    tabelaVendas.innerHTML = "";

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

        tabelaVendas.appendChild(linha);
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
