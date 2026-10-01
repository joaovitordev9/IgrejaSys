const URL_PRODUTOS = "/festas";
const URL_CATEGORIAS = "/categorias";

const params = new URLSearchParams(window.location.search);
const festaId = params.get("idFesta");




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
function renderizarCategorias() {

    inputCategoria.innerHTML = "";

    categorias.forEach(categoria => {

        const option = document.createElement("option");

        option.value = categoria.id;
        option.textContent = categoria.nome;

        inputCategoria.appendChild(option);
    });
}

async function getCategorias() {

    return fetch(URL_CATEGORIAS)
        .then(function (response) {
            return response.json();
        })
        .then(function (dados) {

            categorias = dados;

            renderizarCategorias();
        })
        .catch(function (erro) {
            console.log(erro);
        });
}
function getProdutos() {

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

function postProduto() {

    const novoProduto = {
        nome: inputNome.value,
        preco: parseFloat(inputPreco.value),
        categoriaId: inputCategoria.value
    };

    fetch(`/festas/${festaId}/produtos`, {
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

function putProduto() {

    const produtoId = btnModalInfoProdutosSalvar.dataset.id;

    const produtoAlterado = {
        nome: inputNome.value,
        preco: parseFloat(inputPreco.value),
        categoriaId: Number(inputCategoria.value)
    };

    fetch(`/festas/${festaId}/produtos/${produtoId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(produtoAlterado)
    })
        .then(function (response) {

            if (!response.ok) {
                throw new Error("Erro ao alterar produto");
            }

            return response.json();
        })
        .then(function (produtoAtualizado) {

            const produto = produtos.find(function (produto) {
                return produto.id == produtoId;
            });

            produto.nome = produtoAtualizado.nome;
            produto.preco = produtoAtualizado.preco;
            produto.categoria = produtoAtualizado.categoria;
            renderizarProdutos(produtos);
        })
        .catch(function (erro) {
            console.log(erro);
        });
}

async function deleteProduto() {

    const produtoId =
        btnModalExcluirConfirmar.dataset.idProdutoExcluido;

    try {

        const response = await fetch(
            `/festas/${festaId}/produtos/${produtoId}`,
            {
                method: "DELETE"
            }
        );

        if (!response.ok) {

            const mensagem =
                await response.text();

            throw new Error(mensagem);
        }

        const indice =
            produtos.findIndex(produto =>
                produto.id == produtoId
            );

        produtos.splice(indice, 1);

        renderizarProdutos(produtos);

        fechaModaldeleteProduto();

    } catch (erro) {

        document.getElementById("mensagemExclusao")
            .textContent =
            erro.message ||
            "Não foi possível excluir o produto.";

        btnModalExcluirConfirmar.style.display = "none";

        btnModalExcluirCancelar.textContent = "OK";
    }
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

function abreModaldeleteProduto() {

    document.getElementById("mensagemExclusao")
        .textContent =
        "Tem certeza que deseja excluir este produto?";

    btnModalExcluirConfirmar.style.display =
        "inline-block";

    btnModalExcluirCancelar.textContent =
        "Cancelar";

    modalPrincipalProdutos.style.display =
        "flex";

    modalProdutosExcluir.style.display =
        "flex";

    btnModalExcluirCancelar.focus();
}

function fechaModaldeleteProduto() {
    modalPrincipalProdutos.style.display = "none";
    modalProdutosExcluir.style.display = "none";
}

function limparCamposModalInfoProdutos() {

    inputNome.value = "";
    inputPreco.value = "";

    if (categorias.length > 0) {
        inputCategoria.content = categorias[0].id;
    }
}
async function carregarDadosProdutoNoModal(produto) {

    await getCategorias();

    inputNome.value = produto.nome;

    inputPreco.value = produto.preco;

    inputCategoria.value = produto.categoria.id;
}

function filtrarProdutos() {
    const textoBusca = nomeProdutoFiltro.value.toLowerCase();

    const produtosFiltrados = produtos.filter(function (produto) {
        return produto.nome.toLowerCase().includes(textoBusca) || String(produto.id).includes(textoBusca);
    });

    renderizarProdutos(produtosFiltrados);
}

function validarCampos(campos) {

    for (const campo of campos) {

        if (campo.elemento.validity.valueMissing) {
            alert("O campo " + campo.nome + " é obrigatório.");
            campo.elemento.focus();

            return false;
        }

        if (campo.elemento.validity.badInput) {
            alert("O campo " + campo.nome + " deve ser um número.");
            campo.elemento.focus();

            return false;
        }

        if (campo.elemento.validity.rangeUnderflow) {
            alert("O campo " + campo.nome + " deve ser maior ou igual a " + campo.elemento.min + ".");
            campo.elemento.focus();

            return false;
        }

        if (campo.elemento.validity.rangeOverflow) {
            alert("O campo " + campo.nome + " deve ser menor ou igual a " + campo.elemento.max + ".");
            campo.elemento.focus();

            return false;
        }
    }

    return true;
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
        if (!validarCampos([
            { elemento: inputNome, nome: "Nome" },
            { elemento: inputPreco, nome: "Preço"},
            { elemento: inputCategoria, nome: "Categoria" }
        ])) {
            return;
        }
        postProduto();
    }
    if (acao === "alterar") {
        if (!validarCampos([
            { elemento: inputNome, nome: "Nome" },
            { elemento: inputPreco, nome: "Preço"},
            { elemento: inputCategoria, nome: "Categoria" }
        ])) {
            return;
        }
        putProduto();
    }

    limparCamposModalInfoProdutos();
    fechaModalInfoProduto();
})

btnModalExcluirCancelar.addEventListener("click", function() {
    fechaModaldeleteProduto();
})

btnModalExcluirConfirmar.addEventListener("click", function() {
    deleteProduto();
});

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
        carregarDadosProdutoNoModal(produto);
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

