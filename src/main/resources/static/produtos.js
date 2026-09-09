let produtos = [
    {
        id: 1,
        nome: "Coxinha",
        preco: 6.00
    },
    {
        id: 2,
        nome: "Refrigerante",
        preco: 5.00
    },
    {
        id: 3,
        nome: "Pastel",
        preco: 7.00
    }
];

let produtoSelecionado = null;

let modoEdicao = false;

const tabelaProdutos = document.getElementById("tabelaProdutos");
const filtroNome = document.getElementById("filtroNome");

const modalProduto = document.getElementById("modalProduto");
const formProduto = document.getElementById("formProduto");

const nomeProduto = document.getElementById("nomeProduto");
const precoProduto = document.getElementById("precoProduto");

const tituloModal = document.getElementById("tituloModal");

const btnCadastrar = document.getElementById("btnCadastrar");
const btnFecharModal = document.getElementById("btnFecharModal");
const btnCancelar = document.getElementById("btnCancelar");

const mensagemVazia = document.getElementById("mensagemVazia");


function formatarPreco(preco) {
    return preco.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}


function carregarProdutos() {

    tabelaProdutos.innerHTML = "";

    const textoBusca = filtroNome.value.toLowerCase();

    const produtosFiltrados = produtos.filter(function(produto) {
        return produto.nome.toLowerCase().includes(textoBusca);
    });

    if (produtosFiltrados.length === 0) {

        mensagemVazia.style.display = "block";

        return;
    }

    mensagemVazia.style.display = "none";


    produtosFiltrados.forEach(function(produto) {

        const linha = document.createElement("tr");

        if (produtoSelecionado === produto.id) {
            linha.classList.add("selecionado");
        }

        linha.innerHTML = `
            <td>${produto.nome}</td>

            <td>${formatarPreco(produto.preco)}</td>

            <td>
                <div class="acoes">

                    <button
                        type="button"
                        class="btn-editar"
                        data-id="${produto.id}"
                    >
                        Editar
                    </button>

                    <button
                        type="button"
                        class="btn-excluir"
                        data-id="${produto.id}"
                    >
                        Excluir
                    </button>

                </div>
            </td>
        `;

        linha.addEventListener("click", function() {
            produtoSelecionado = produto.id;

            carregarProdutos();
        });


        const btnEditar = linha.querySelector(".btn-editar");

        btnEditar.addEventListener("click", function(event) {

            event.stopPropagation();

            abrirEdicao(produto.id);
        });


        const btnExcluir = linha.querySelector(".btn-excluir");

        btnExcluir.addEventListener("click", function(event) {

            event.stopPropagation();

            excluirProduto(produto.id);
        });


        tabelaProdutos.appendChild(linha);
    });
}


function abrirCadastro() {

    modoEdicao = false;

    produtoSelecionado = null;

    tituloModal.textContent = "Cadastrar produto";

    nomeProduto.value = "";
    precoProduto.value = "";

    modalProduto.classList.add("aberto");

    nomeProduto.focus();
}


function abrirEdicao(id) {

    const produto = produtos.find(function(produto) {
        return produto.id === id;
    });

    if (!produto) {
        return;
    }

    modoEdicao = true;

    produtoSelecionado = id;

    tituloModal.textContent = "Editar produto";

    nomeProduto.value = produto.nome;
    precoProduto.value = produto.preco;

    modalProduto.classList.add("aberto");

    nomeProduto.focus();
}


function fecharModal() {

    modalProduto.classList.remove("aberto");

    formProduto.reset();

    modoEdicao = false;
}


function salvarProduto(event) {

    event.preventDefault();

    const nome = nomeProduto.value.trim();

    const preco = Number(precoProduto.value);


    if (nome === "" || preco < 0) {
        return;
    }


    if (modoEdicao) {

        const produto = produtos.find(function(produto) {
            return produto.id === produtoSelecionado;
        });

        if (produto) {
            produto.nome = nome;
            produto.preco = preco;
        }

    } else {

        const novoProduto = {
            id: Date.now(),
            nome: nome,
            preco: preco
        };

        produtos.push(novoProduto);
    }


    fecharModal();

    carregarProdutos();
}


function excluirProduto(id) {

    const produto = produtos.find(function(produto) {
        return produto.id === id;
    });

    if (!produto) {
        return;
    }


    const confirmar = confirm(
        "Deseja realmente excluir o produto \"" +
        produto.nome +
        "\"?"
    );

    if (!confirmar) {
        return;
    }


    produtos = produtos.filter(function(produto) {
        return produto.id !== id;
    });


    produtoSelecionado = null;

    carregarProdutos();
}


/* EVENTOS */

btnCadastrar.addEventListener("click", function() {
    abrirCadastro();
});


btnFecharModal.addEventListener("click", function() {
    fecharModal();
});


btnCancelar.addEventListener("click", function() {
    fecharModal();
});


formProduto.addEventListener("submit", function(event) {
    salvarProduto(event);
});


filtroNome.addEventListener("input", function() {
    carregarProdutos();
});


modalProduto.addEventListener("click", function(event) {

    if (event.target === modalProduto) {
        fecharModal();
    }
});


carregarProdutos();