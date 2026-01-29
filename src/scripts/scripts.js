const status = {
    vizualizacao: {
        quadrado: document.querySelectorAll(".quadrado"),
        inimigo: document.querySelector(".inimigo"),
        pontos: document.querySelector("#pontos"),
        tempo: document.querySelector("#tempo"),
        vidas: document.querySelector("#vidas"),
        painel: document.querySelector(".painel"),
        painelGameOver: document.querySelector(".painel-game-over"),
        resultadoFinal: document.querySelector("#resultado-final"),
        botaReiniciar: document.querySelector("#restart-button"),
    },
    valor: {
        tempo: null,
        contagemRegressivaId: setInterval(contagemRegressiva, 1000),
        gameVelocidade: 850,
        posicaoAtaque: 0,
        resultado: 0,
        tempoRestante: 60,
        vidaJogador: 3,
    },
};

function tocarSom() {
    let audio = new Audio("./src/assets/audios/hit.m4a");
    audio.volume = 0.2;
    audio.play();
}

function gameOver() {
    clearInterval(status.valor.contagemRegressivaId);
    clearInterval(status.valor.tempo);
    let audio = new Audio("./src/assets/audios/game-over.m4a");
    audio.volume = 0.2;
    audio.play();

    status.vizualizacao.painel.style.display = "none";
    status.vizualizacao.painelGameOver.style.display = "flex";
    status.vizualizacao.resultadoFinal.textContent = status.valor.resultado;
}

function restartGame() {
    window.location.reload();
}

function contagemRegressiva() {
    status.valor.tempoRestante--;
    status.vizualizacao.tempo.textContent = status.valor.tempoRestante;
    if (status.valor.tempoRestante <= 0) {
        gameOver();
    }
}

function quadradoAleatorio() {
    status.vizualizacao.quadrado.forEach((quadrado) => {
        quadrado.classList.remove("inimigo");
    });

    let numeroAleatorio = Math.floor(Math.random() * 9);
    let quadradoAleatorio = status.vizualizacao.quadrado[numeroAleatorio];
    quadradoAleatorio.classList.add("inimigo");
    status.valor.posicaoAtaque = quadradoAleatorio.id;
}

function moverInimigo() {
    status.valor.tempo = setInterval(quadradoAleatorio, status.valor.gameVelocidade);
}

function esperandoClick() {
    status.vizualizacao.quadrado.forEach((quadrado) => {
        quadrado.addEventListener("click", () => {
            if (quadrado.id === status.valor.posicaoAtaque) {
                status.valor.resultado++;
                status.vizualizacao.pontos.textContent = status.valor.resultado;
                status.valor.posicaoAtaque = null;
                tocarSom();
            } else {
                status.valor.vidaJogador--;
                status.vizualizacao.vidas.textContent = `x${status.valor.vidaJogador}`;

                if (status.valor.vidaJogador <= 0) {
                    gameOver();
                }
            }
        });
    });
}

function iniciarJogo() {
    status.vizualizacao.botaReiniciar.addEventListener("click", restartGame);
    moverInimigo();
    esperandoClick();
}

iniciarJogo();
