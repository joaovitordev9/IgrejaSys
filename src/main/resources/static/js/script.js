const btnInicio = document.querySelector(".botao-inicio");
const btnVoltar = document.querySelector(".botao-voltar");

if (btnInicio) {
    btnInicio.addEventListener("click", function () {
        window.location.href = "/festas.html";
    });
}

if (btnVoltar) {
    btnVoltar.addEventListener("click", function () {

        if (window.location.pathname === "/festas.html") {
            return;
        }

        history.back();
    });
}