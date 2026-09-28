const params = new URLSearchParams(window.location.search);

const festaId = params.get("idFesta");

const URL_PEDIDOS = `/festas/${festaId}/pedidos`;
const URL_PRODUTOS = `/festas/${festaId}/produtos`;

const URL_CATEGORIAS = "/categorias";



let pedido = [];

function calcularTotal() {

    let total = 0;

    pedido.forEach(item => {
        total += item.preco * item.quantidade;
    });

    return total;
}

function calcularTroco() {

    const valorDigitado =
        document.getElementById("valor-recebido").value;

    if (valorDigitado === "") {

        document.getElementById("troco").textContent =
            "Troco: R$ 0,00";

        return;
    }

    const recebido = Number(valorDigitado);

    const total = calcularTotal();

    const troco = recebido - total;

    document.getElementById("troco").textContent =
        `Troco: R$ ${troco.toFixed(2)}`;
}

async function carregarCategorias() {

    const resposta =
        await fetch(URL_CATEGORIAS);

    const categorias =
        await resposta.json();

    const area =
        document.getElementById("area-categorias");

    area.innerHTML = "";

    categorias.forEach(categoria => {
        if(categoria.produtos.length > 0 && existeProdutoFesta(categoria.produtos)) {
            area.innerHTML += `
                <h2 class="titulo-categoria">
                    ${categoria.nome}
                </h2>
    
                <div
                    class="categoria"
                    id="categoria-${categoria.id}">
                </div>
            `;
        }

    });
}

async function carregarProdutos() {

    console.log("Festa ID:", festaId);
    console.log("URL:", URL_PRODUTOS);

    const resposta = await fetch(URL_PRODUTOS);

    console.log("Status:", resposta.status);

    const produtos = await resposta.json();

    console.log("Produtos:", produtos);

    produtos.forEach(produto => {

        const categoriaDiv =
            document.getElementById(
                `categoria-${produto.categoria.id}`
            );

        if (!categoriaDiv) {
            return;
        }

        categoriaDiv.innerHTML += `
            <div
                class="produto"
                onclick="adicionarProduto(${produto.id},
                                           '${produto.nome}',
                                           ${produto.preco})">

                <h3>${produto.nome}</h3>

                <p>
                    R$ ${produto.preco.toFixed(2)}
                </p>

            </div>
        `;
    });
}

function adicionarProduto(produtoId, nome, preco) {

    const itemExistente =
        pedido.find(item =>
            item.produtoId === produtoId
        );

    if (itemExistente) {

        itemExistente.quantidade++;

    } else {

        pedido.push({
            produtoId,
            nome,
            preco,
            quantidade: 1
        });
    }

    renderizarPedido();
}

function aumentarQuantidade(produtoId) {

    const item =
        pedido.find(item =>
            item.produtoId === produtoId
        );

    if (item) {

        item.quantidade++;

        renderizarPedido();
    }
}

function diminuirQuantidade(produtoId) {

    const indice =
        pedido.findIndex(item =>
            item.produtoId === produtoId
        );

    if (indice === -1) {
        return;
    }

    pedido[indice].quantidade--;

    if (pedido[indice].quantidade <= 0) {

        pedido.splice(indice, 1);
    }

    renderizarPedido();
}

function renderizarPedido() {

    const itensPedido =
        document.querySelector(".itens-pedido");

    itensPedido.innerHTML = "";

    let total = 0;

    pedido.forEach(item => {

        const subtotal =
            item.preco * item.quantidade;

        total += subtotal;

        itensPedido.innerHTML += `
            <div class="item-pedido">

                <div class="nome-produto">
                    ${item.nome}
                </div>

                <div class="preco-produto">
                    R$ ${item.preco.toFixed(2)}
                </div>

                <div class="controle-quantidade">

                    <button
                        class="btn-quantidade"
                        onclick="diminuirQuantidade(${item.produtoId})">

                        -
                    </button>

                    <span class="quantidade">
                        ${item.quantidade}
                    </span>

                    <button
                        class="btn-quantidade"
                        onclick="aumentarQuantidade(${item.produtoId})">

                        +
                    </button>

                </div>

                <div class="subtotal">
                    Subtotal: R$ ${subtotal.toFixed(2)}
                </div>

            </div>
        `;
    });

    document.querySelector(".total-pedido h3")
        .textContent =
        `Total: R$ ${total.toFixed(2)}`;
}

function cancelarPedido() {

    pedido = [];

    renderizarPedido();
}

async function finalizarPedido() {

    if (pedido.length === 0) {
        alert("Adicione pelo menos um produto.");
        return;
    }

    const dinheiro =
        document.getElementById("dinheiro").checked;

    if (dinheiro) {

        const campo =
            document.getElementById("valor-recebido");

        if (campo.value === "") {

            alert("Informe o valor recebido.");

            return;
        }

        const recebido = Number(campo.value);

        if (recebido < calcularTotal()) {

            alert("Valor insuficiente.");

            return;
        }
    }

    const pedidoRequest = {
        itens: pedido.map(item => ({
            produtoId: item.produtoId,
            quantidade: item.quantidade
        }))
    };

    try {

        const resposta =
            await fetch(
                URL_PEDIDOS,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(pedidoRequest)
                }
            );

        const dados =
            await resposta.json();

        console.log("Pedido salvo", dados);

        alert("Pedido salvo com sucesso!");

        pedido = [];

        renderizarPedido();

    } catch (erro) {

        console.error(erro);

        alert("Erro ao salvar pedido");
    }
}

async function iniciar() {

    await carregarCategorias();

    await carregarProdutos();
}

function existeProdutoFesta(produtos) {
    for (let i = 0; i < produtos.length; i++) {
        const produto = produtos[i];
        if (produto.festa.id == festaId) {
            return true;
        }   
    }

    return false;
}

iniciar();

const radioDinheiro = document.getElementById("dinheiro");
const radioPix = document.getElementById("pix");
const radioCartao = document.getElementById("cartao");

const areaTroco = document.getElementById("area-troco");

const valorRecebido =
    document.getElementById("valor-recebido");

valorRecebido.addEventListener("input", calcularTroco);

// EVENTOS
radioDinheiro.addEventListener("change", () => {
    areaTroco.style.display = "block";
});

radioPix.addEventListener("change", () => {
    areaTroco.style.display = "none";
});

radioCartao.addEventListener("change", () => {
    areaTroco.style.display = "none";
});