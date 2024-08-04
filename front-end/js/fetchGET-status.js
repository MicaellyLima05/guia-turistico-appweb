
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
                console.log = "Você está logado.";
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


document.addEventListener('DOMContentLoaded', verificarLogin);

