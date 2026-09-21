const URL_PRODUTOS = "/festas";
let proximoId = 2;

const modalPrincipalFesta = document.getElementById("modalPrincipalFesta");

const btnNovaFesta = document.getElementById("btnNovaFesta");
const modalInfoFesta = document.getElementById("modalInfoFesta");
const modalInfoFestaTitulo = document.getElementById("modalInfoFestaTitulo");
const btnModalInfoFestaSalvar = document.getElementById("btnModalInfoFestaSalvar");
const btnModalInfoFestaCancelar = document.getElementById("btnModalInfoFestaCancelar");
const inputNomeFesta = document.getElementById("nomeFesta");
const inputInicioFesta = document.getElementById("inicioFesta");
const inputFimFesta = document.getElementById("fimFesta");

const tabelaFestas = document.getElementById("tabelaFestas");

let festas = [];

function renderizarFestas(listaFestas){

    tabelaFestas.innerHTML = "";

    for(let i = 0; i < listaFestas.length; i++) {
        let festa = listaFestas[i];

        let idFormatado = festa.id.toString().padStart(2, "0");

        tabelaFestas.innerHTML += `
            <tr>
                <td class="coluna-acoes">
                    <button class="btn-alterar" id="btnTabelaFestasAcessar" data-id=${idFormatado}>Acessar Festa</button>
                </td>
                <td class="coluna-codigo">${idFormatado}</td>
                <td class="coluna-nome">${festa.nome}</td>
                <td class="coluna-inicio">${festa.dataInicio}</td>
                <td class="coluna-fim">${festa.dataFim}</td>
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

function postFesta() {

    const novaFesta = {
        id: proximoId,
        nome: inputNomeFesta.value,
        dataInicio: inputInicioFesta.value,
        dataFim: inputFimFesta.value
    }

    festas.push(novaFesta);
    proximoId++;
    renderizarFestas(festas);


    // fetch(URL_PRODUTOS,{
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify(novoProduto)
    // }).then(function(response){
    //     return response.json();
    // }).then(function(produtoCriado){
    //     produtos.push(produtoCriado);
    //     renderizarProdutos(produtos);
    // })

    limparCamposModalInfoFesta();
}

function limparCamposModalInfoFesta() {
    inputNomeFesta.value = "";
    inputInicioFesta.value = "";
    inputFimFesta.value = "";
}

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
    console.log(acao);

    if (acao === "criar") {
        postFesta();
    }
    if (acao === "alterar") {
        // putProduto();
    }
    fechaModalInfoFesta();
})

