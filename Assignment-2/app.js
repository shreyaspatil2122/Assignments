const express = require("express");
const fs = require('fs');
const PORT = 8000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.static('static'));

app.get('/', (req, res) => {
    res.render('index')
})
app.get('/about', (req, res) => {
    res.render('about');
})
app.get('/gallery', (req, res) => {
    res.render('gallery');
})
app.get('/services', (req, res) => {
    res.render('services');
})
app.get('/contact', (req, res) => {
    res.render('contact');
})
app.post('/data', (req, res) => {
    let name = req.body.name;
    let email = req.body.email;
    let pass = req.body.pass;
    let age = req.body.age;
    let city = req.body.city;
    let mobile = req.body.mobile;

    let data = `Name :- ${name}, Email :- ${email}, Password :- ${pass}, Age :- ${age}, City :- ${city}, Mobile :- ${mobile}` + '\n';

    fs.appendFile('file.txt', data, err => {
        if(err) throw err;
    })

    res.send('data is added');
})
app.get('/details', (req, res) => {
    var array = fs.readFileSync('file.txt').toString().split("\n");
    res.render('details', {file : array});
})

app.listen(PORT, err => {
    if(err) throw err;
    else console.log(`Server is run on ${PORT}`);
})