let proximoId = 4;


const modalPrincipalProdutos = document.getElementById("modalPrincipalProdutos");

const btnNovoProduto = document.getElementById("btnNovoProduto");
const modalInfoProuto = document.getElementById("modalInfoProduto");
const modalInfoProdutoTitulo = document.getElementById("modalInfoProdutoTitulo");
const modalProdutosExcluir = document.getElementById("modalProdutosExcluir");
const btnModalExcluirConfirmar = document.getElementById("btnModalExcluirConfirmar");
const btnModalExcluirCancelar = document.getElementById("btnModalExcluirCancelar");

const btnModalInfoProdutosCancelar = document.getElementById("btnModalInfoProdutosCancelar");
const btnModalInfoProdutosSalvar = document.getElementById("btnModalInfoProdutosSalvar");
const inputNome = document.getElementById("nomeProduto");
const inputPreco = document.getElementById("precoProduto");

const btnTabelaProdutosAlterar = document.getElementById("btnTabelaProdutosAlterar")
const btnTabelaProdutosExcluir = document.getElementById("btnTabelaProdutosExcluir")

const tabelaProdutos = document.getElementById("tabelaProdutos");



let produtos = [
    {
        id: 1,
        nome: "Coca-Cola",
        preco: 6.50
    },
    {
        id: 2,
        nome: "Arroz",
        preco: 25.00
    },
    {
        id: 3,
        nome: "Feijão tropeiro",
        preco: 8.50
    }
];

function carregarProdutosHTML() {

    tabelaProdutos.innerHTML = "";

    for(let i = 0; i < produtos.length; i++) {

        let idFormatado = produtos[i].id.toString().padStart(2, "0");
        let precoFormatado = produtos[i].preco.toFixed(2);
        tabelaProdutos.innerHTML += `
            <tr>
                <td class="coluna-acoes">
                    <button class="btn-alterar" data-id="${produtos[i].id}">Alterar</button>
                    <button class="btn-excluir" data-id="${produtos[i].id}">Excluir</button>
                </td>
                <td class="coluna-codigo">${idFormatado}</td>
                <td>${produtos[i].nome}</td>
                <td>R$ ${precoFormatado}</td>
            </tr>
        `
    }
}

function abreModalInfoProduto(titulo) {

    modalInfoProdutoTitulo.textContent = titulo;
    modalPrincipalProdutos.style.display = "flex";
    modalInfoProuto.style.display = "flex";

    inputNome.focus();
}

function fechaModalInfoProduto() {
    modalPrincipalProdutos.style.display = "none";
    modalInfoProuto.style.display = "none";
}

function abreModalExcluirProduto(titulo) {
    modalPrincipalProdutos.style.display = "flex";
    modalProdutosExcluir.style.display = "flex";

    btnModalExcluirCancelar.focus();
}

function fechaModalExcluirProduto() {
    modalPrincipalProdutos.style.display = "none";
    modalProdutosExcluir.style.display = "none";
}

function criarProduto() {
    const inputNome = document.getElementById("nomeProduto");
    const inputPreco = document.getElementById("precoProduto");


    const novoProduto = {
        id: proximoId,
        nome: inputNome.value,
        preco: parseFloat(inputPreco.value)
    }

    produtos.push(novoProduto);

    limparCamposModalInfoProdutos();

    proximoId++;
}

function limparCamposModalInfoProdutos() {
    inputNome.value = "";
    inputPreco.value = "";
}

function carregarProdutoModal(produto) {
    inputNome.value = produto.nome;
    inputPreco.value = produto.preco;
}

function alterarProduto() {
    const id = btnModalInfoProdutosSalvar.dataset.id;
    const produto = produtos.find(function (produto) {
            return produto.id == id;
        });

    console.log(id);

    produto.nome = inputNome.value;
    produto.preco = parseFloat(inputPreco.value);
    limparCamposModalInfoProdutos();
    carregarProdutosHTML();
}

function excluirProduto(){
    const id = btnModalExcluirConfirmar.dataset.idProdutoExcluido;

    const indice = produtos.findIndex(function (produto) {
            return produto.id == id;
        });
    console.log(id);
    produtos.splice(indice, 1);
    carregarProdutosHTML();
};


/* EVENTOS */



btnNovoProduto.addEventListener("click", function() {
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
        criarProduto();
    }
    if (acao === "alterar") {
        alterarProduto();
    }
    fechaModalInfoProduto();
    carregarProdutosHTML();
})

btnModalExcluirCancelar.addEventListener("click", function() {
    fechaModalExcluirProduto();
})

btnModalExcluirConfirmar.addEventListener("click", function() {
    excluirProduto();
    fechaModalExcluirProduto();
})

tabelaProdutos.addEventListener("click", function (evento) {

    if (evento.target.classList.contains("btn-excluir")) {

        const id = evento.target.dataset.id;
        btnModalExcluirConfirmar.dataset.idProdutoExcluido = id;
        abreModalExcluirProduto();

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

carregarProdutosHTML();

