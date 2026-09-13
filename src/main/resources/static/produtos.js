
const modalPrincipalProdutos = document.getElementById("modalPrincipalProdutos");

const btnNovoProduto = document.getElementById("btnNovoProduto");
const modalInfoProuto = document.getElementById("modalInfoProduto");
const modalInfoProdutoTitulo = document.getElementById("modalInfoProdutoTitulo");

const btnModalInfoProdutosCancelar = document.getElementById("#btnModalInfoProdutosCancelar");
const btnModalInfoProdutosCriar = document.querySelector("#btnModalInfoProdutosCriar");

const btnTabelaProdutosAlterar = document.getElementById("btnTabelaProdutosAlterar")
const btnTabelaProdutosExcluir = document.getElementById("btnTabelaProdutosExcluir")


function abreModalInfoProduto(titulo) {

    modalInfoProdutoTitulo.textContent = titulo;
    modalPrincipalProdutos.style.display = "flex";
    modalInfoProuto.style.display = "flex";
}

function fechaModalInfoProduto() {
    modalPrincipalProdutos.style.display = "none";
    modalInfoProuto.style.display = "none";
}

function alterarProduto() {
    abreModalInfoProduto
}


/* EVENTOS */

btnNovoProduto.addEventListener("click", function() {
    abreModalInfoProduto("Novo Produto");
});

btnModalInfoProdutosCancelar.addEventListener("click", function() {
    fechaModalInfoProduto();
})

btnModalInfoProdutosCriar.addEventListener("click", function() {
    fechaModalInfoProduto();
})


// btnTabelaProdutosAlterar.addEventListener("click", function() {
//     let nomeProduto = 
// })
