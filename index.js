import express from 'express'
// Importando o multer
import multer from 'multer'
const app = express()

// Importando Connection
import connection from "./config/sequelize-config.js"

import Filme from "./models/Galeria-Filmes.js"

// Realizando a conexão com o banco de dados
connection.authenticate().then(() => {
    console.log("Conexão com o banco de dados feita com sucesso!")
}).catch((error) => {
    console.log(error)
});

//  Criando o banco de dados se ele não existir
connection.query(`CREATE DATABASE IF NOT EXISTS g_filmes;`).then(()=> {
    console.log("O banco de dados está criado.");
}).catch((error) => {
    console.log(error)
});

//Configurações
app.use(express.static('public'));
app.set('view engine', 'ejs');

const upload = multer({dest: "public/uploads/"})

// ROTA PRINCIPAL
app.get("/", (req,res) =>{
    Filme.findAll().then(filmes => {
        res.render("index", {
            filmes : filmes
        })
    }).catch((error) => {
        console.log(error)
    });
});



// ROTA DE UPLOAD
app.post("/upload", upload.single("file"),(req,res) => {
    const file = req.file.filename
    const titulo = req.body.titulo
    const genero = req.body.genero
    const ano = req.body.ano
    Filme.create({
        file : file,
        titulo : titulo,
        genero : genero,
        ano : ano,
    }).then(() => {
        res.redirect("/");
    }).catch((error) => {
        console.log(error);
    })
});


const port = 8080
app.listen(port, (error) => {
    if(error){
        console.log(`Ocorreu um erro! ${error}`);
    } else {
        console.log(`Servidor iniciado com sucesso em: http://localhost:${port}.`);
    }
});