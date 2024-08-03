import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

import express from "express";

const app = express();

app.use(express.json());


//rota de criação de novo usuário

const usuarios = [];

app.post('/usuarios/cadastro', async (req,res) => {
    
    await prisma.tb_USUARIOS.create({
        data: {
            nome:req.body.nome,
            email:req.body.email
        }
    })

    res.status(201).json(req.body);
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

    const usuarios = await prisma.tb_USUARIOS.findMany()

    res.status(200).json(usuarios);
}) 

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