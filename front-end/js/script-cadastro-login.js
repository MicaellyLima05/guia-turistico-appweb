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
