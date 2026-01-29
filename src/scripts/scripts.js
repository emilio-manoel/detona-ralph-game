const status = {
    vizualizacao: {
        quadrado: document.querySelectorAll(".quadrado"),
        inimigo: document.querySelector(".inimigo"),
        pontos: document.querySelector("#pontos"),
        tempo: document.querySelector("#tempo"),
        vidas: document.querySelector("#vidas"),
    }, 
    valor: {
        tempo: null,
        gameVelocidade: 1000,
        posicaoAtaque: 0,
        resultado: 0,
    },
};

function quadradoAleatorio(){
    status.vizualizacao.quadrado.forEach((quadrado) => {
        quadrado.classList.remove("inimigo");
    });

    let numeroAleatorio = Math.floor(Math.random() * 9);
    let quadradoAleatorio = status.vizualizacao.quadrado[numeroAleatorio];
    quadradoAleatorio.classList.add("inimigo");
    status.valor.posicaoAtaque = quadradoAleatorio.id;
}

function moverInimigo(){
 status.valor.tempo = setInterval(quadradoAleatorio, status.valor.gameVelocidade);
}

function esperandoClick (){
    status.vizualizacao.quadrado.forEach((quadrado) => {
     quadrado.addEventListener("click", () => {
        if(quadrado.id === status.valor.posicaoAtaque){
            status.valor.resultado++;
            status.vizualizacao.pontos.textContent = status.valor.resultado;
            status.valor.posicaoAtaque = null;
        }else{
            
        }
     });
    });
}

function iniciarJogo(){
    moverInimigo();
    esperandoClick();
}

iniciarJogo();
