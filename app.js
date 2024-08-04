import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

import cors from "cors";

import express from "express";

const app = express();

const corsOptions = {
    origin: '*', //url de onde ta o front
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    allowedHeaders: ['Content-Type'], 
};

app.use(cors(corsOptions));

app.use(express.json());


const usuarios = [];
const listaPalavrasChave = [];

//rota de cadastro de novo usuário
app.post('/cadastro.html/usuarios/cadastro', async (req,res) => {
    
    await prisma.tb_USUARIOS.create({
        data: {
            nome:req.body.nome,
            email:req.body.email
        }
    })

    res.status(201).json( {message: "Usuario criado com sucessso"} );
})


//rota de atualização de usuário

app.put('/usuarios', async (req,res) => {
    
    await prisma.tb_USUARIOS.update({
        where: {
            id:req.body.id
        },
        data: {
            nome:req.body.nome,
            email:req.body.email
        }
    })

    res.status(201).json(req.body);
})

//rota de listagem dos usuários

app.get('/usuarios', async (req,res) => {

    const usuarios = await prisma.tb_USUARIOS.findMany();

    res.status(200).json(usuarios);
}) 

//rota de verificação para login dos usuários

app.get('/login.html/usuarios/login', async (req,res) => {

    const usuarios = await prisma.tb_USUARIOS.findMany();
    

    function buscaId (nome) {

        const indice = usuarios.findIndex((usuario) => usuario.nome === nome);
        return indice;
    };

    const idUsuario = buscaId(req.query.nome);

    const usuarioLogin = await prisma.tb_USUARIOS.findUnique({
        where: {
            id: usuarios[idUsuario].id
        }
    });

    if (usuarioLogin && usuarioLogin.email === req.query.email) {
        await prisma.tb_USUARIOS.update({
            where: {
                id: usuarioLogin.id
            },

            data: {
                logado: true,
            }
        })
        res.status(200).json( {message: "Usuário já está cadastrado e logado.", logado: true});
    } else {
        res.status(404).json( {message: "Usuário não cadastrado."} );
    }
    
}) 


//rota para logout dos usuários

app.post('/usuarios/logout', async (req,res) => {

    const usuarios = await prisma.tb_USUARIOS.findMany();
    
    function buscaId (nome) {

        const indice = usuarios.findIndex((usuario) => usuario.nome === nome);
        return indice;
    };

    const idUsuario = buscaId(req.body.nome);

    const usuarioLogin = await prisma.tb_USUARIOS.findUnique({
        where: {
            id: usuarios[idUsuario].id
        }
    });

    if (usuarioLogin && usuarioLogin.email === req.body.email) {
        await prisma.tb_USUARIOS.update({
            where: {
                id: usuarioLogin.id
            },

            data: {
                logado: false,
            }
        })
        res.status(200).json( {message: "Usuário está deslogado."} );
    } else {
        res.status(400).json( {message: "Usuário ainda está logado."} );
    }
    
})

//rota para verificar status de login do usuário
app.get('/usuarios/login/status', async (req, res) => {
    const { nome } = req.query;

    try {
        const usuario = await prisma.tb_USUARIOS.findUnique({
            where: { nome: nome }
        });

        if (!usuario) {
            return res.status(404).json({ message: "Usuário não encontrado." });
        }

        res.status(200).json({
            logado: usuario.logado
        });
    } catch (error) {
        console.error('Erro ao verificar status de login:', error);
        res.status(500).json({ message: "Erro ao verificar status de login." });
    }
});

//rota para função de busca por palavras-chave
app.get('/usuarios/busca', async (req,res) => {
    try {
        const palavraChave = req.query.palavraChave;

        if (!palavraChave) {
            return res.status(400).json({ message: "Parâmetro 'palavraChave' é necessário." });
        }

        const palavraBuscada = await prisma.tb_PALAVRAS_BUSCA.findFirst({
            where: {
                palavras_chave: palavraChave
            }
        });

        if (palavraBuscada) {
            res.status(200).json(palavraBuscada.link_palavra_chave);
        } else {
            res.status(404).json({ message: "Palavra-chave não encontrada." });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro interno do servidor." });
    }
});

//rota para favoritar uma atração
app.post('/usuarios/favoritar', async (req, res) => {
    const { nomeUsuario, idAtrativo, link } = req.body;

    if (!nomeUsuario || !idAtrativo || !link) {
        return res.status(400).json({ mensagem: "Dados insuficientes." });
    }

    try {
        // Adiciona um registro na tabela favoritos
        await prisma.tb_FAVORITOS.create({
            data: {
                usuarioNome: nomeUsuario,
                atracaoId: idAtrativo,
                link: link
            }
        });

        res.status(200).json({ sucesso: true });
    } catch (error) {
        console.error('Erro ao favoritar:', error);
        res.status(500).json({ sucesso: false, mensagem: "Erro ao favoritar a atração." });
    }
});

//rota para favoritar uma atração
app.get('/usuarios/favoritos', async (req, res) => {
    const { nomeUsuario } = req.query;

    if (!nomeUsuario) {
        return res.status(400).json({ mensagem: "Nome de usúario não fornecido.." });
    }

    try {
        
        const favoritos = await prisma.tb_FAVORITOS.findMany({
            where: { usuarioNome: nomeUsuario },
            select: { link: true }
        });

        res.status(200).json({ favoritos });
    } catch (error) {
        console.error('Erro ao obter favoritos:', error);
        res.status(500).json({ mensagem: "Erro ao obter favoritos." });
    }
});


//rota para deletar um usuário

app.delete('/usuarios', async (req,res) => {

    await prisma.tb_USUARIOS.delete({
        where: {
            id: req.body.id
        }
    })

    res.status(200).json({message: "Usuário deletado"})
})

//rota para deletar um favorito

app.delete('/usuarios/favoritos', async (req,res) => {

    await prisma.tb_FAVORITOS.delete({
        where: {
            id: req.body.id
        }
    })

    res.status(200).json({message: "Favorito deletado"})
})

app.listen(3000);


export default app;