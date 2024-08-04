import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

import cors from "cors";

import express from "express";

const app = express();

const corsOptions = {
    origin: 'https://front-end-appweb.vercel.app',
    origin: 'http://127.0.0.1:5500', //url de onde ta o front
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
        res.status(200).json( {message: "Usuário já está cadastrado e logado."} );
    } else {
        res.status(404).json( {message: "Usuário não cadastrado."} );
    }
    
}) 


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

//rota para deletar um usuário

app.delete('/usuarios', async (req,res) => {

    await prisma.tb_USUARIOS.delete({
        where: {
            id: req.body.id
        }
    })

    res.status(200).json({message: "Usuário deletado"})
})

app.listen(3000);


export default app;