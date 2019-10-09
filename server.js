const express = require('express');
const ejsLayouts = require('express-ejs-layouts');
const fs = require('fs');
///---node module to delete---///
const methodOverride = require('method-override');

const app = express();

app.set('view engine', 'ejs');
app.use(ejsLayouts);
app.use(express.static('static'));

app.use(express.urlencoded({extended: false}));

app.use(methodOverride('_method'))

app.get('/', function(req, res) {
    res.render('Home');
})

app.use('/dinosaurs', require('./routes/dinosaurs'));
app.use('/cryptids', require('./routes/cryptids'));

app.listen(3000, function(){
    console.log('server is running')
});