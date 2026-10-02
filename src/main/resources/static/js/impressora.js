const URL_IMPRESSORAS = "/impressoras";

const tabelaImpressoras =
    document.getElementById("tabelaImpressoras");

const btnAtualizarImpressoras =
    document.getElementById("btnAtualizarImpressoras");

let impressoras = [];
let impressoraSelecionada = null;

// ===============================
// CARREGAR IMPRESSORAS
// ===============================

async function carregarImpressoras() {


    try {

        const resposta = await fetch(URL_IMPRESSORAS);

        if (!resposta.ok) {
            throw new Error("Não foi possível carregar as impressoras.");
        }
        impressoraSelecionada = null;
        impressoras = await resposta.json();

        mostrarImpressoras(impressoras);

    } catch (erro) {

        console.error("Erro ao carregar impressoras:", erro);

        tabelaImpressoras.innerHTML = "";

        const linha = document.createElement("tr");

        const coluna = document.createElement("td");

        coluna.colSpan = 4;
        coluna.textContent =
            "Não foi possível carregar as impressoras.";

        linha.appendChild(coluna);

        tabelaImpressoras.appendChild(linha);
    }
}

// ===============================
// MOSTRAR IMPRESSORAS
// ===============================
function guardarImpressoraSelecionada(impressoras) {
    impressoras.forEach(impressora => {
        console.log("impressora " + impressora.id);
        if (impressora.selecionada) {
            impressoraSelecionada = impressora;
        }
    });
}

function mostrarImpressoras(impressoras) {

    guardarImpressoraSelecionada(impressoras);

    const nenhumaSelecionada = impressoraSelecionada === null;
    tabelaImpressoras.innerHTML = "";

    let html = "";

    // ===============================
    // OPÇÃO NENHUMA
    // ===============================
    console.log("impressora selecionada: " + impressoraSelecionada);
    html += `
        <tr>
            <td>
                <button class="btn btn-alterar" data-id="-1">
                    Selecionar
                </button>
            </td>

            <td>-</td>

            <td>Nenhuma</td>

            <td>
                <input
                    type="checkbox"
                    ${nenhumaSelecionada ? "checked" : ""}
                    disabled
                >
            </td>
        </tr>
    `;


    // ===============================
    // IMPRESSORAS DO SISTEMA
    // ===============================

    impressoras.forEach(function (impressora) {

        html += `
            <tr>
                <td>
                    <button
                        class="btn btn-alterar"
                        data-id="${impressora.id}"
                    >
                        Selecionar
                    </button>
                </td>

                <td>${impressora.id}</td>

                <td>${impressora.nome}</td>

                <td>
                    <input
                        type="checkbox"
                        ${!nenhumaSelecionada && impressora.id === impressoraSelecionada.id ? "checked" : ""}
                        disabled
                    >
                </td>
            </tr>
        `;
    });

    tabelaImpressoras.innerHTML = html;


    // ===============================
    // EVENTOS DOS BOTÕES
    // ===============================

    const botoes = tabelaImpressoras.querySelectorAll(
        "button[data-id]"
    );

    botoes.forEach(function (botao) {

        botao.addEventListener("click", function () {

            const id = botao.dataset.id;

            if (id === "nenhuma") {
                selecionarImpressora(null);
                return;
            }

            selecionarImpressora(Number(id));
        });
    });
}

function selecionarImpressora(id) {

    fetch("/impressoras/selecionar-impressora/" + id, {
        method: "POST"
    })
    .then(function (resposta) {

        if (!resposta.ok) {
            throw new Error("Erro ao selecionar impressora.");
        }

        console.log("Impressora selecionada com sucesso.");
        carregarImpressoras();

    })
    .catch(function (erro) {
        console.error(erro);
    });
}

// ===============================
// EVENTOS
// ===============================

btnAtualizarImpressoras.addEventListener(
"click",
carregarImpressoras
);



// ===============================
// INICIALIZAÇÃO
// ===============================

carregarImpressoras();
