import { createIcons, ArrowLeft } from 'lucide';


function criarNavegacao(nomeTela) {

    const navegacao = document.getElementById("navegacao");

    navegacao.innerHTML = `
        <nav class="navegacao">

            <div class="navegacao-esquerda">

                <a href="index.html" class="btn-inicio">
                    <i data-lucide="arrow-left" ></i> 
                    Início
                </a>
                 

                <h1 class="navegacao-titulo">
                    ${nomeTela}
                </h1>

            </div>


            <div class="navegacao-direita">

                <a
                    href="index.html"
                    class="btn-inicio"
                >
                    🏠 Início
                </a>

            </div>

        </nav>
    `;
}


function voltar() {
    history.back();
}


createIcons({
  icons: {
    ArrowLeft
  }
});


criarNavegacao("Caixa");