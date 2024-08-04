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
        document.getElementById("resultado").textContent = 'Essa pesquisa é inválida.\nTente usar letras maiúsculas, \nespaços e assentos de forma correta.';
    }
}


organizaURL(palavraChave);

});

//

async function verificarLogin() {
    const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));

    const url = new URL('http://localhost:3001/usuarios/login/status');
    url.searchParams.append('nome', usuarioLogado.nome);

    try {
        const response = await fetch(url, {
            method: 'GET', 
            headers: {
                'Content-Type': 'application/json', 

            }});

        if (!response.ok) {
            throw new Error(`Erro: ${response.status}`);
        }

        const dados = await response.json();

        if (dados.logado) {
            console.log(usuarioLogado);
            return usuarioLogado
        } else {
            console.log = "Usuário não está logado.";
            localStorage.removeItem('usuarioLogado');
            return null
        }

    } catch (error) {
        console.error('Erro na requisição:', error);
        console.log = "Erro ao verificar o status de login.";
        return null
    }
}


//funcionalidade de favoritar

    async function favoritarAtrativo(idAtrativo) {

        const usuario = await verificarLogin();

        if (!usuario) {
            return; 
        } 

        const url = 'http://localhost:3001/usuarios/favoritar';
        const dados = {
            nomeUsuario: usuario.nome,
            idAtrativo: idAtrativo,
            link: window.location.href 
        };

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dados)
            });

            if (!response.ok) {
                throw new Error(`Erro: ${response.status}`);
            }

            const resultado = await response.json();
            if (resultado.sucesso) {
                // Atualizar o texto do botão para indicar que a atração foi favoritada
                alert("Esse atrativo foi adicionado no Meus Favoritos.");
            } else {
                console.log("Erro ao favoritar a atração.");
            }

        } catch (error) {
            console.error('Erro na requisição:', error);
        }
    }


    // Verifica o status de login quando a página carregar
    document.addEventListener('DOMContentLoaded', verificarLogin);

    // Adicionar evento ao botão de favoritar
    const botoes = document.querySelectorAll('.favoritar-btn');
    botoes.forEach(botao => {
        botao.addEventListener('click', (event) => {
            const botaoClicado = event.target;
            const atracaoId = Number(botaoClicado.getAttribute('data-id'));

        favoritarAtrativo(atracaoId);
    });
        
    })

    

//funcionalidade de exibir os favoritos
    document.addEventListener('DOMContentLoaded', async () => {
        const usuario = await verificarLogin();

        if (!usuario) {
            document.getElementById('mensagem').textContent = "Você não está logado.";
            return;
        }

        const url = new URL('http://localhost:3001/usuarios/favoritos');
        url.searchParams.append('nomeUsuario', usuario.nome);

        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            if (!response.ok) {
                throw new Error(`Erro: ${response.status} `);
            }

            const resultado = await response.json();
            const listaFavoritos = document.getElementById("lista-favoritos");

            if (resultado.favoritos.length > 0) {
                resultado.favoritos.forEach(favorito => {
                    const listItem = document.createElement('li');
                    const link = document.createElement('a');
                    link.href = favorito.link;
                    link.textContent = "ATRATIVO";
                    link.target = "_blank";
                    listItem.appendChild(link);
                    listaFavoritos.appendChild(listItem);
                });
            } else {
                document.getElementById('mensagem').textContent = "Você não tem favoritos.";
            }
        } catch {
            console.error('Erro na requisição:', error);
            document.getElementById('mensagem').textContent = "Erro ao carregar os favoritos.";
        }
    });