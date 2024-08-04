//fetch para logout
document.getElementById('form-logout').addEventListener('submit', function (evento) {
    evento.preventDefault();

    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;

    const dadosUsuario = {
        nome: nome,
        email: email
    }

    //url de onde tá a api
    try {
        const response = fetch('http://localhost:3001/usuarios/logout', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            
            },
            body: JSON.stringify(dadosUsuario),
        });

        if (!response.ok) {
            throw new Error(`Erro: ${response.status}`);
        } else {

            alert("Você não está mais logado.")
        }

        const dados = response.json();


    } catch (error) {
        console.error('Erro na requisição:', error);
    }
});