const btnInicio = document.querySelector(".botao-inicio");
const btnVoltar = document.querySelector(".botao-voltar");



btnInicio.addEventListener("click", function() {
    window.location.href = "/festas.html";
})

btnVoltar.addEventListener("click", function() {
    history.back();
})

