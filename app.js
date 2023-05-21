const express = require("express")
const path = require("path")
const mongoose = require('mongoose');
// const bodyparser = require("body-parser");
const app = express()
const port = 8000

// Define MongooseSchema    
const contactSchema = new mongoose.Schema({
    name: String,   
    phone: String,  
    email: String,
    address: String,
    desc: String
});
const Contact = mongoose.model('Contact', contactSchema);

// main().catch(err => console.log(err));

async function main() {
    mongoose.set('strictQuery', false);
    mongoose.connect("mongodb://localhost:27017/contactDance", { useNewUrlParser: true });
}

app.use('/static', express.static('static'))
app.use(express.urlencoded())


app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))

app.get('/', (req, res) => {
    const params = {}
    res.status(200).render('home.pug', params)
})
app.get('/about', (req, res) => {
    const params = {}
    res.status(200).render('about.pug', params)
})
app.get('/services', (req, res) => {
    const params = {}
    res.status(200).render('services.pug', params)
})
app.get('/classInfo', (req, res) => {
    const params = {}
    res.status(200).render('classInfo.pug', params)
})
app.get('/contactUs', (req, res) => {
    const params = {}
    res.status(200).render('contactUs.pug', params)
})
app.post('/contactUs', (req, res) => {
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send("This item has been saved to the database");
    }).catch(()=>{
        res.status(400).send("Item was not saved to the database")
    });
})

app.listen(port, (req, res) => {
    console.log(`Example app listening on http://localhost:${port}`)
})