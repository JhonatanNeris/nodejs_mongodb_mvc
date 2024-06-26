const express = require('express')
const exphbs = require('express-handlebars')
const cookieParser = require('cookie-parser');
const addUserToLocals = require("./helpers/addUserToLocals")
const checkToken = require("./helpers/checkToken")
const getUserByToken = require('./helpers/getUserByToken');

const app = express()

const conn = require('./db/conn')

//Chamar função para usar o db online 
conn()

// Usar o cookie-parser
app.use(cookieParser());

// Middleware para adicionar o usuário aos templates
app.use(getUserByToken)

//Routes
const productsRoutes = require('./routes/productsRoutes')
const usersRoutes = require('./routes/usersRoutes');

//teste
app.set("views", __dirname + "/views");

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

//read body
app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())

//Pasta publica para imagens e CSS
// app.use(express.static('public'))
app.use(express.static(__dirname + '/public'))

app.use("/products", productsRoutes)
app.use("/users", usersRoutes)

// Redirecionamento da rota raiz para /products
app.get('/', (req, res) => {
    res.redirect('/products');
});

app.listen(3000)