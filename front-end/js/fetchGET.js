document.getElementById('form-login').addEventListener('submit', function (evento) {
    evento.preventDefault();

    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;

    const dadosUsuario = {
        nome: nome,
        email: email
    }

    async function organizaURL(nome, email) {

        const url = new URL('http://localhost:3001/login.html/usuarios/login');
        url.searchParams.append('nome', nome);
        url.searchParams.append('email', email);

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

        const dados = await response.json();

        document.getElementById("resultado").textContent = "Você está logado.";

    } catch (error) {
        console.error('Erro na requisição:', error);
    }
}


organizaURL( nome, email);

});