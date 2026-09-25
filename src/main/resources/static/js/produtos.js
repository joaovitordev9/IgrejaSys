const URL_PRODUTOS = "/festas";
const URL_CATEGORIAS = "/categorias";




const modalPrincipalProdutos = document.getElementById("modalPrincipalProdutos");

const btnNovoProduto = document.getElementById("btnNovoProduto");
const modalInfoProduto = document.getElementById("modalInfoProduto");
const modalInfoProdutoTitulo = document.getElementById("modalInfoProdutoTitulo");
const modalProdutosExcluir = document.getElementById("modalProdutosExcluir");
const btnModalExcluirConfirmar = document.getElementById("btnModalExcluirConfirmar");
const btnModalExcluirCancelar = document.getElementById("btnModalExcluirCancelar");


const btnModalInfoProdutosCancelar = document.getElementById("btnModalInfoProdutosCancelar");
const btnModalInfoProdutosSalvar = document.getElementById("btnModalInfoProdutosSalvar");
const inputNome = document.getElementById("nomeProduto");
const inputPreco = document.getElementById("precoProduto");
const inputCategoria = document.getElementById("categoriaProduto");


const btnTabelaProdutosAlterar = document.getElementById("btnTabelaProdutosAlterar")
const btnTabelaProdutosExcluir = document.getElementById("btnTabelaProdutosExcluir")

const tabelaProdutos = document.getElementById("tabelaProdutos");

const nomeProdutoFiltro = document.getElementById("nomeProdutoFiltro");


let categorias = [];
let produtos = [];

function renderizarProdutos(listaProdutos){

    tabelaProdutos.innerHTML = "";

    for(let i = 0; i < listaProdutos.length; i++) {
        let produto = listaProdutos[i];

        let idFormatado = produto.id.toString().padStart(2, "0");
        let precoFormatado = produto.preco.toFixed(2);
        console.log(produto);

        tabelaProdutos.innerHTML += `
                    <tr>
                        <td class="coluna-acoes">
                            <button class="btn-alterar" data-id="${produto.id}">Alterar</button>
                            <button class="btn-excluir" data-id="${produto.id}">Excluir</button>
                        </td>
                        <td class="coluna-codigo">${idFormatado}</td>
                        <td class="coluna-nome">${produto.nome}</td>
                        <td class="coluna-categoria">${produto.categoria.nome}</td>
                        <td class="coluna-preco">R$ ${precoFormatado}</td>
                    </tr>
                `;
    }
}

function getProdutos() {

    const params = new URLSearchParams(window.location.search);
    const festaId = params.get("idFesta");
    fetch(`/festas/${festaId}/produtos`)
        .then(response => response.json())
        .then(dados => {

            produtos = dados;

            renderizarProdutos(produtos);
        })
        .catch(erro => {
            console.log(erro);
        });
}

function abreModalInfoProduto(titulo) {

    modalInfoProdutoTitulo.textContent = titulo;
    modalPrincipalProdutos.style.display = "flex";
    modalInfoProduto.style.display = "flex";

    inputNome.focus();
}

function fechaModalInfoProduto() {
    modalPrincipalProdutos.style.display = "none";
    modalInfoProduto.style.display = "none";
}

function abreModaldeleteProduto(titulo) {
    modalPrincipalProdutos.style.display = "flex";
    modalProdutosExcluir.style.display = "flex";

    btnModalExcluirCancelar.focus();
}

function fechaModaldeleteProduto() {
    modalPrincipalProdutos.style.display = "none";
    modalProdutosExcluir.style.display = "none";
}

function postProduto() {

    const novoProduto = {
        nome: inputNome.value,
        preco: parseFloat(inputPreco.value),
        categoriaId: parseInt(inputCategoria.value)
    };

    fetch(URL_PRODUTOS, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(novoProduto)
    })
        .then(response => response.json())
        .then(produtoCriado => {

            produtos.push(produtoCriado);

            renderizarProdutos(produtos);

            limparCamposModalInfoProdutos();
        })
        .catch(erro => {
            console.log(erro);
        });
}

function limparCamposModalInfoProdutos() {

    inputNome.value = "";
    inputPreco.value = "";

    if (categorias.length > 0) {
        inputCategoria.value = categorias[0].id;
    }
}
function carregarProdutoModal(produto) {
    inputNome.value = produto.nome;
    inputPreco.value = produto.preco;
}

function putProduto() {
    const id = btnModalInfoProdutosSalvar.dataset.id;
    const produto = produtos.find(function (produto) {
            return produto.id == id;
        });

    console.log(id);

    produto.nome = inputNome.value;
    produto.preco = parseFloat(inputPreco.value);
    limparCamposModalInfoProdutos();
    getProdutos();
}

function deleteProduto(){
    const id = btnModalExcluirConfirmar.dataset.idProdutoExcluido;
    console.log(id);
    fetch(URL_PRODUTOS + "/" + id,{
        method: "DELETE"
    }).then(function (response){
        if (!response.ok){
            throw new Error("Erro ao excluir produto");
        }

        const indice = produtos.findIndex(function (produto) {
            return produto.id == id;
        });

        produtos.splice(indice, 1);
        renderizarProdutos(produtos);
    })
};

function filtrarProdutos() {
    const textoBusca = nomeProdutoFiltro.value.toLowerCase();

    const produtosFiltrados = produtos.filter(function (produto) {
        return produto.nome.toLowerCase().includes(textoBusca) || String(produto.id).includes(textoBusca);
    });

    renderizarProdutos(produtosFiltrados);
}

function renderizarCategorias() {

    inputCategoria.innerHTML = "";

    categorias.forEach(categoria => {

        inputCategoria.innerHTML += `
            <option value="${categoria.id}">
                ${categoria.nome}
            </option>
        `;
    });
}

function getCategorias() {

    fetch(URL_CATEGORIAS)
        .then(response => response.json())
        .then(dados => {

            categorias = dados;

            renderizarCategorias();
        })
        .catch(erro => {
            console.log(erro);
        });
}
/* EVENTOS */

btnNovoProduto.addEventListener("click", function() {

    getCategorias();

    btnModalInfoProdutosSalvar.dataset.acao = "criar";

    abreModalInfoProduto("Novo Produto");
});

btnModalInfoProdutosCancelar.addEventListener("click", function() {
    fechaModalInfoProduto();
    limparCamposModalInfoProdutos();
})

btnModalInfoProdutosSalvar.addEventListener("click", function() {
    
    const acao = btnModalInfoProdutosSalvar.dataset.acao;
    console.log(acao);

    if (acao === "criar") {
        postProduto();
    }
    if (acao === "alterar") {
        putProduto();
    }
    fechaModalInfoProduto();
})

btnModalExcluirCancelar.addEventListener("click", function() {
    fechaModaldeleteProduto();
})

btnModalExcluirConfirmar.addEventListener("click", function() {
    deleteProduto();
    fechaModaldeleteProduto();
})

tabelaProdutos.addEventListener("click", function (evento) {

    if (evento.target.classList.contains("btn-excluir")) {

        const id = evento.target.dataset.id;
        btnModalExcluirConfirmar.dataset.idProdutoExcluido = id;
        abreModaldeleteProduto();

    }

    if (evento.target.classList.contains("btn-alterar")) {
        const id = evento.target.dataset.id;
        const produto = produtos.find(function (produto) {
            return produto.id == id;
        });

        btnModalInfoProdutosSalvar.dataset.acao = "alterar";
        btnModalInfoProdutosSalvar.dataset.id = id;

        abreModalInfoProduto("Alterar Produto");
        carregarProdutoModal(produto);
    }
});

document.addEventListener("keydown", function (evento) {
    if (evento.ctrlKey && evento.key === "+") {
        evento.preventDefault();
        btnNovoProduto.click();
    }

    if (evento.key == "Escape") {
        btnModalInfoProdutosCancelar.click();
        btnModalExcluirCancelar.click();
    }
 
});

nomeProdutoFiltro.addEventListener("input", function() {
    filtrarProdutos();
})

getProdutos();

