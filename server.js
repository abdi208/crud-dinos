const express = require('express');
const ejsLayouts = require('express-ejs-layouts');
const fs = require('fs');

const app = express();

app.set('view engine', 'ejs');
app.use(ejsLayouts);
app.use(express.static('static'));

app.get('/', function(req, res) {
    res.send('Youve hit the route route')
})

app.listen(3000, function(){
    console.log('server is running')
})