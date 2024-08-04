//fetch para cadastro
document.getElementById('form-cadastro').addEventListener('submit', function (evento) {
    evento.preventDefault();

    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;

    const dadosUsuario = {
        nome: nome,
        email: email
    };

    //url de onde tá a api
    fetch('http://localhost:3001/cadastro.html/usuarios/cadastro', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dadosUsuario)
    })
    .then(response => {
        if (!response.ok) {
                throw new Error('Erro na rede.');
            }
        return response.json();
    })
    .then(data => {
        document.getElementById("resultado").textContent = "Você foi cadastrado com sucesso! Vá para a aba de Login";
        })
    .catch(error => {
        console.error('Erro:', error);
        document.getElementById("resultado").textContent = 'Erro no cadastro.';
    });
});