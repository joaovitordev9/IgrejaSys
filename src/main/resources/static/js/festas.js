// CONFIGURAÇÕES
const URL_FESTAS = "/festas";

// ESTADO
let festas = [];

// MODAIS
const modalPrincipalFesta = document.getElementById("modalPrincipalFesta");
const modalInfoFesta = document.getElementById("modalInfoFesta");
const modalAcessarFesta = document.getElementById("modalAcessarFesta");
const modalConfiguracoes = document.getElementById("modalConfiguracoes");

// TÍTULOS
const modalInfoFestaTitulo = document.getElementById("modalInfoFestaTitulo");

// BOTÕES
const btnNovaFesta = document.getElementById("btnNovaFesta");
const btnModalInfoFestaSalvar = document.getElementById("btnModalInfoFestaSalvar");
const btnModalInfoFestaCancelar = document.getElementById("btnModalInfoFestaCancelar");
const btnFecharModal = document.getElementById("btnFecharModal");
const btnProdutos = document.getElementById("btnProdutos");
const btnCaixa = document.getElementById("btnCaixa");
const btnExcluir = document.getElementById("btnExcluir");
const modalExcluirFesta = document.getElementById("modalExcluirFesta");
const btnModalExcluirFestaCancelar = document.getElementById("btnModalExcluirFestaCancelar");
const btnModalExcluirFestaConfirmar = document.getElementById("btnModalExcluirFestaConfirmar");
const btnAlterarFesta = document.getElementById("btnAlterarFesta");
const btnTabelaFestasAcessar = document.getElementById("btnTabelaFestasAcessar");
const btnConfiguracoes = document.getElementById("btnConfiguracoes");
const btnFecharConfiguracoes = document.getElementById("btnFecharConfiguracoes");
const btnAcessarCategoria = document.getElementById("btnAcessarCategoria");
const btnRelatorios = document.getElementById("btnRelatorios");

// CAMPOS DO FORMULÁRIO
const inputNomeFesta = document.getElementById("nomeFesta");
const inputInicioFesta = document.getElementById("inicioFesta");
const inputFimFesta = document.getElementById("fimFesta");

// FILTROS E TABELA
const nomeFestaFiltro = document.getElementById("nomeFestaFiltro");
const tabelaFestas = document.getElementById("tabelaFestas");


function renderizarFestas(listaFestas){

    festas.sort(function(a, b) {
        return new Date(b.dataInicio) - new Date(a.dataInicio);
    });

    tabelaFestas.innerHTML = "";

    for(let i = 0; i < listaFestas.length; i++) {
        let festa = listaFestas[i];

        let idFormatado = festa.id.toString().padStart(2, "0");
        let dataInicioFormatada = new Date(festa.dataInicio + "T00:00:00").toLocaleDateString("pt-BR");
        let dataFimFormatada = new Date(festa.dataFim + "T00:00:00").toLocaleDateString("pt-BR");
        

        tabelaFestas.innerHTML += `
            <tr data-id=${festa.id}>
                <td class="coluna-acoes">
                    <button class="btn-acessar" id="btnTabelaFestasAcessar" data-id=${festa.id}>Acessar Festa</button>
                </td>
                <td class="coluna-codigo">${idFormatado}</td>
                <td class="coluna-nome">${festa.nome}</td>
                <td class="coluna-inicio">${dataInicioFormatada}</td>
                <td class="coluna-fim">${dataFimFormatada}</td>
            </tr>
        `;
    }
}
function abreModalInfoFesta(titulo) {

    modalInfoFestaTitulo.textContent = titulo;
    modalPrincipalFesta.style.display = "flex";
    modalInfoFesta.style.display = "flex";
    inputNomeFesta.focus();
}
function fechaModalInfoFesta() {
    modalPrincipalFesta.style.display = "none";
    modalInfoFesta.style.display = "none";
}
function limparCamposModalInfoFesta() {
    inputNomeFesta.value = "";
    inputInicioFesta.value = "";
    inputFimFesta.value = "";
}
function abreModalAcessarFesta() {

    modalPrincipalFesta.style.display = "flex";
    modalAcessarFesta.style.display = "flex";
}
function fechaModalAcessarFesta() {

    modalPrincipalFesta.style.display = "none";
    modalAcessarFesta.style.display = "none";
}
function abreModalConfiguracoes() {
    modalConfiguracoes.style.display = "flex";
}
function fechaModalConfiguracoes() {
    modalConfiguracoes.style.display = "none";
}

function filtrarFestas() {
    const textoBusca = nomeFestaFiltro.value.toLowerCase();

    const festasFiltradas = festas.filter(function (festa) {
        return festa.nome.toLowerCase().includes(textoBusca) || String(festa.id).includes(textoBusca);
    });

    renderizarFestas(festasFiltradas);
}
function getFestas() {
    fetch(URL_FESTAS)
        .then(response => response.json())
        .then(dados => {

            festas = dados;

            renderizarFestas(festas);
        })
        .catch(erro => {
            console.log(erro);
        });
}
function postFesta() {

    const novaFesta = {
        nome: inputNomeFesta.value,
        dataInicio: inputInicioFesta.value,
        dataFim: inputFimFesta.value
    }


    fetch(URL_FESTAS, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(novaFesta)
    })
        .then(response => response.json())
        .then(festaCriada => {
            console.log(festaCriada);
            festas.push(festaCriada);

            renderizarFestas(festas);

            limparCamposModalInfoFesta();
        })
        .catch(erro => {
            console.log(erro);
        });
}
function putFesta() {

    const id = btnAlterarFesta.dataset.id;

    const festaAtualizada = {
        nome: inputNomeFesta.value,
        dataInicio: inputInicioFesta.value,
        dataFim: inputFimFesta.value
    };

    fetch(`${URL_FESTAS}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(festaAtualizada)
    })
        .then(response => response.json())
        .then(festaAtualizada => {

            const indice = festas.findIndex(
                festa => festa.id == id
            );

            if (indice !== -1) {
                festas[indice] = festaAtualizada;
            }

            renderizarFestas(festas);

            limparCamposModalInfoFesta();
        })
        .catch(erro => {
            console.log(erro);
        });
}
function deleteFesta(){


    const id = btnExcluir.dataset.id;
    console.log(btnExcluir);
    console.log(btnAlterarFesta);
    console.log(btnAcessarCategoria);
    console.log(btnExcluir.dataset.id);

    fetch(`${URL_FESTAS}/${id}`, {
        method: "DELETE"
    })
        .then(() => {

            festas = festas.filter(f => f.id != id);

            renderizarFestas(festas);

            modalExcluirFesta.style.display = "none";
            modalAcessarFesta.style.display = "none";
            modalPrincipalFesta.style.display = "none";
        })
        .catch(erro => {
            console.log(erro);
        });
}

function abreModalExcluirFesta() {
    modalAcessarFesta.style.display = "none";
    modalExcluirFesta.style.display = "flex";
}

function fechaModalExcluirFesta() {
    modalExcluirFesta.style.display = "none";
    modalAcessarFesta.style.display = "flex";
}

nomeFestaFiltro.addEventListener("input", function() {
    filtrarFestas();
})

btnNovaFesta.addEventListener("click", function() {
    btnModalInfoFestaSalvar.dataset.acao = "criar";
    abreModalInfoFesta("Nova Festa");
})

btnModalInfoFestaCancelar.addEventListener("click", function() {
    fechaModalInfoFesta();
    limparCamposModalInfoFesta();
})

btnModalInfoFestaSalvar.addEventListener("click", function() {
    
    const acao = btnModalInfoFestaSalvar.dataset.acao;


    if (acao === "criar") {
        postFesta();
    }
    if (acao === "alterar") {
        putFesta();
    }
    fechaModalInfoFesta();
})

tabelaFestas.addEventListener("click", function (evento) {

    const linha = evento.target.closest("tr");

    if (!linha) {
        return;
    }

    const id = linha.dataset.id;
    btnProdutos.dataset.id = id;
    btnCaixa.dataset.id = id;
    btnRelatorios.dataset.id = id;
    btnExcluir.dataset.id = id;
    btnAlterarFesta.dataset.id = id;

    abreModalAcessarFesta();
});

btnFecharModal.addEventListener("click", function() {
    fechaModalAcessarFesta();
})

btnConfiguracoes.addEventListener("click", function() {
    abreModalConfiguracoes();
})
btnFecharConfiguracoes.addEventListener("click", function() {
    fechaModalConfiguracoes()
})

btnProdutos.addEventListener("click", function() {
    const idFesta = btnProdutos.dataset.id;
    
    window.location.href = `/produtos.html?idFesta=${idFesta}`;
})

btnCaixa.addEventListener("click", function() {

    const idFesta = btnCaixa.dataset.id;

    window.location.href = `/caixa.html?idFesta=${idFesta}`;
});

btnRelatorios.addEventListener("click", function() {
    const idFesta = btnRelatorios.dataset.id;

    window.location.href = `/relatorios/vendasPorDia.html?idFesta=${idFesta}`;

})

btnExcluir.addEventListener("click", function () {
    abreModalExcluirFesta();
});

btnModalExcluirFestaCancelar.addEventListener("click", function () {
    fechaModalExcluirFesta();
});

btnModalExcluirFestaConfirmar.addEventListener("click", function () {
    deleteFesta();
});

btnAlterarFesta.addEventListener("click", function () {

    const id = btnAlterarFesta.dataset.id;

    const festa = festas.find(f => f.id == id);

    inputNomeFesta.value = festa.nome;
    inputInicioFesta.value = festa.dataInicio;
    inputFimFesta.value = festa.dataFim;

    btnModalInfoFestaSalvar.dataset.acao = "alterar";

    fechaModalAcessarFesta();

    abreModalInfoFesta("Alterar Festa");
});

btnAcessarCategoria.addEventListener("click", function() {
    window.location.href = `/categoria.html`;
})


getFestas();
