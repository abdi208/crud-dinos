const express = require('express');
const router = express.Router();
const fs = require('fs');

router.get('/', function(req, res) {
    var dinos = fs.readFileSync('./dinos.json')
    var dinoData = JSON.parse(dinos)
    res.render('dinosaurs/index',{dinos: dinoData});
});
router.get('/new', function(req, res) {
    res.render('dinosaurs/new');
})
router.get('/:id', function(req, res) {
    var index = parseInt(req.params.id);
    var dinos = fs.readFileSync('./dinos.json');
    var dinoData = JSON.parse(dinos);
    res.render('dinosaurs/show',{ dino: dinoData[index]})
});

module.exports = router;
