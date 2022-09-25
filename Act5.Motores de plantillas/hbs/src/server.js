const express = require('express');
const hbs = require('express-handlebars');

const Contenedor = require('./contenedor')
const contenedor = new Contenedor("productos.json");
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));

app.set('views', './src/views');
app.set('view engine', 'hbs');

app.engine('hbs', hbs.engine({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials'
}))

app.get('/productos', async(req, res) => {
    const productos = await contenedor.getAll();
    res.render('pages/list', {productos})
})

app.post('/productos', async(req,res) => {
    const {body} = req;
    await contenedor.save(body);
    res.redirect('/');
})

app.get('/', (req,res) => {
    res.render('pages/form', {})
})


const PORT = 1000;
const server = app.listen(PORT, () => {
console.log(` >>>>> 🚀 Server started at http://localhost:${PORT}`)
})

server.on('error', (err) => console.log(err))