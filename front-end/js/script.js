let currentIndex = 0;
const intervalTime = 2000; // Tempo entre as transições em milissegundos

function showSlide(index) {
    const slides = document.querySelector('.slides');
    const totalSlides = document.querySelectorAll('.slide').length;
    if (index >= totalSlides) {
        currentIndex = 0;
    } else if (index < 0) {
        currentIndex = totalSlides - 1;
    } else {
        currentIndex = index;
    }
    const offset = -currentIndex * 100;
    slides.style.transform = `translateX(${offset}%)`;
}

function moveSlide(step) {
    showSlide(currentIndex + step);
}

// Função para iniciar o auto-play
function startAutoPlay() {
    setInterval(() => {
        moveSlide(1);
    }, intervalTime);
}

// Inicialize o slider mostrando o primeiro slide e inicie o auto-play
showSlide(currentIndex);
startAutoPlay();



//funcionalidade de busca

document.getElementById("btnBusca").addEventListener("click", function () {
    const palavraChave = document.getElementById("busca").value;

    async function organizaURL(palavraChave) {

        const url = new URL('http://localhost:3001/usuarios/busca');
        url.searchParams.append('palavraChave', palavraChave);

    //url de onde tá a api
    try {
        const response = await fetch(url, {
            method: 'GET', 
            headers: {
                'Content-Type': 'application/json', 
            }
        });

        if (!response.ok) {
            throw new Error(`Erro: ${response.status}`);
        }

        //o link enviado pela api vem pra cá
        const dados = await response.json();
        console.log(dados);

        document.getElementById("link_resultado").href = dados;
        document.getElementById("cabecalho__menu__pesquisa_2").style.display = 'block';
        document.getElementById("resultado").textContent = "Pesquisa realizada com sucesso.";
        document.getElementById("link_resultado").textContent = "Seu próximo destino aqui";

    } catch (error) {
        console.error('Erro na requisição:', error);
        document.getElementById("resultado").textContent = 'Essa pesquisa é inválida. Tente usar letras maiúsculas, espaços e assentos de forma correta.';
    }
}


organizaURL(palavraChave);

});
