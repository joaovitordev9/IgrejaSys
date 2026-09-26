
const URL_CATEGORIAS = "/categorias";


const modalPrincipalCategorias = document.getElementById("modalPrincipalCategorias");

const btnNovaCategoria = document.getElementById("btnNovaCategoria");
const modalInfoCategoria = document.getElementById("modalInfoCategoria");
const modalInfoCategoriaTitulo = document.getElementById("modalInfoCategoriaTitulo");
const modalCategoriasExcluir = document.getElementById("modalCategoriasExcluir");

const btnModalExcluirConfirmar = document.getElementById("btnModalExcluirConfirmar");
const btnModalExcluirCancelar = document.getElementById("btnModalExcluirCancelar");

const btnModalInfoCategoriasCancelar = document.getElementById("btnModalInfoCategoriasCancelar");
const btnModalInfoCategoriasSalvar = document.getElementById("btnModalInfoCategoriasSalvar");

const inputNome = document.getElementById("nomeCategoria");

const tabelaCategorias = document.getElementById("tabelaCategorias");

const nomeCategoriaFiltro = document.getElementById("nomeCategoriaFiltro");

const modalCategoriaComProdutos = document.getElementById("modalCategoriaComProdutos");
const listaProdutosCategoria = document.getElementById("listaProdutosCategoria");
const btnFecharCategoriaComProdutos = document.getElementById("btnFecharCategoriaComProdutos");


let categorias = [];


function renderizarCategorias(listaCategorias) {

    tabelaCategorias.innerHTML = "";

    for (let i = 0; i < listaCategorias.length; i++) {

        let categoria = listaCategorias[i];

        let idFormatado = categoria.id.toString().padStart(2, "0");

        tabelaCategorias.innerHTML += `
            <tr>
                <td class="coluna-acoes">
                    <button class="btn-alterar" data-id="${categoria.id}">
                        Alterar
                    </button>

                    <button class="btn-excluir" data-id="${categoria.id}">
                        Excluir
                    </button>
                </td>

                <td class="coluna-codigo">
                    ${idFormatado}
                </td>

                <td class="coluna-nome">
                    ${categoria.nome}
                </td>
            </tr>
        `;
    }
}


function getCategorias() {

    fetch(URL_CATEGORIAS)
        .then(function (response) {
            return response.json();
        })
        .then(function (dados) {

            categorias = dados;

            renderizarCategorias(categorias);
        })
        .catch(function (erro) {
            console.log(erro);
        });
}


function postCategoria() {

    const novaCategoria = {
        nome: inputNome.value
    };

    fetch(URL_CATEGORIAS, {
        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(novaCategoria)
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (categoriaCriada) {

            categorias.push(categoriaCriada);

            renderizarCategorias(categorias);

            limparCamposModalInfoCategorias();
        })
        .catch(function (erro) {
            console.log(erro);
        });
}


function putCategoria() {

    const categoriaId = btnModalInfoCategoriasSalvar.dataset.id;

    const categoriaAlterada = {
        nome: inputNome.value
    };

    fetch(`${URL_CATEGORIAS}/${categoriaId}`, {
        method: "PUT",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(categoriaAlterada)
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (categoriaAtualizada) {

            const categoria = categorias.find(function (categoria) {
                return categoria.id == categoriaId;
            });

            categoria.nome = categoriaAtualizada.nome;

            renderizarCategorias(categorias);
        })
        .catch(function (erro) {
            console.log(erro);
        });
}


function deleteCategoria() {

    const categoriaId = btnModalExcluirConfirmar.dataset.idCategoriaExcluida;

    fetch(`${URL_CATEGORIAS}/${categoriaId}`, {
    method: "DELETE"
})
    .then(function (response) {

        const indice = categorias.findIndex(function (categoria) {
            return categoria.id == categoriaId;
        });

        if (response.status === 409) {
            abreModalCategoriaComProdutos(categorias[indice].produtos);
            return;
        }

        if (!response.ok) {
            throw new Error("Erro ao excluir categoria");
        }

        categorias.splice(indice, 1);

        renderizarCategorias(categorias);
    })
    .catch(function (erro) {
        console.log(erro);
    });
}


function abreModalInfoCategoria(titulo) {

    modalInfoCategoriaTitulo.textContent = titulo;

    modalPrincipalCategorias.style.display = "flex";
    modalInfoCategoria.style.display = "flex";

    inputNome.focus();
}

function abreModalCategoriaComProdutos(produtos) {
    console.log(produtos);
    listaProdutosCategoria.innerHTML = "";

    for (let i = 0; i < produtos.length; i++) {

        listaProdutosCategoria.innerHTML += `
            <li>${produtos[i].nome}</li>
        `;
    }

    modalPrincipalCategorias.style.display = "flex";
    modalCategoriaComProdutos.style.display = "flex";

    btnFecharCategoriaComProdutos.focus();
}

function fechaModalInfoCategoria() {

    modalPrincipalCategorias.style.display = "none";
    modalInfoCategoria.style.display = "none";
}

function fechaModalCategoriaComProdutos() {

    modalPrincipalCategorias.style.display = "none";
    modalCategoriaComProdutos.style.display = "none";
}


function abreModalDeleteCategoria() {

    modalPrincipalCategorias.style.display = "flex";
    modalCategoriasExcluir.style.display = "flex";

    btnModalExcluirCancelar.focus();
}


function fechaModalDeleteCategoria() {

    modalPrincipalCategorias.style.display = "none";
    modalCategoriasExcluir.style.display = "none";
}


function limparCamposModalInfoCategorias() {

    inputNome.value = "";
}


function carregarDadosCategoriaNoModal(categoria) {

    inputNome.value = categoria.nome;
}


function filtrarCategorias() {

    const textoBusca = nomeCategoriaFiltro.value.toLowerCase();

    const categoriasFiltradas = categorias.filter(function (categoria) {

        return categoria.nome.toLowerCase().includes(textoBusca)
            || String(categoria.id).includes(textoBusca);
    });

    renderizarCategorias(categoriasFiltradas);
}


/* EVENTOS */


btnNovaCategoria.addEventListener("click", function() {

    btnModalInfoCategoriasSalvar.dataset.acao = "criar";

    abreModalInfoCategoria("Nova Categoria");
});


btnModalInfoCategoriasCancelar.addEventListener("click", function() {

    fechaModalInfoCategoria();

    limparCamposModalInfoCategorias();
});


btnModalInfoCategoriasSalvar.addEventListener("click", function() {

    const acao = btnModalInfoCategoriasSalvar.dataset.acao;

    if (acao === "criar") {

        postCategoria();

    }

    if (acao === "alterar") {

        putCategoria();

    }

    limparCamposModalInfoCategorias();

    fechaModalInfoCategoria();
});


btnModalExcluirCancelar.addEventListener("click", function() {

    fechaModalDeleteCategoria();
});


btnModalExcluirConfirmar.addEventListener("click", function() {

    deleteCategoria();

    fechaModalDeleteCategoria();
});

btnFecharCategoriaComProdutos.addEventListener("click", function() {

    fechaModalCategoriaComProdutos();

});

tabelaCategorias.addEventListener("click", function(evento) {

    if (evento.target.classList.contains("btn-excluir")) {

        const id = evento.target.dataset.id;

        btnModalExcluirConfirmar.dataset.idCategoriaExcluida = id;

        abreModalDeleteCategoria();
    }


    if (evento.target.classList.contains("btn-alterar")) {

        const id = evento.target.dataset.id;

        const categoria = categorias.find(function (categoria) {

            return categoria.id == id;

        });

        btnModalInfoCategoriasSalvar.dataset.acao = "alterar";
        btnModalInfoCategoriasSalvar.dataset.id = id;

        abreModalInfoCategoria("Alterar Categoria");

        carregarDadosCategoriaNoModal(categoria);
    }
});


document.addEventListener("keydown", function(evento) {

    if (evento.ctrlKey && evento.key === "+") {

        evento.preventDefault();

        btnNovaCategoria.click();
    }


    if (evento.key === "Escape") {

        btnModalInfoCategoriasCancelar.click();

        btnModalExcluirCancelar.click();
    }

});


nomeCategoriaFiltro.addEventListener("input", function() {

    filtrarCategorias();

});


getCategorias();

