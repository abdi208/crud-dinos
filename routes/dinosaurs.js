const express = require('express');
const router = express.Router();
const fs = require('fs');

router.get('/', function(req, res) {
    var dinos = fs.readFileSync('./dinos.json')
    var dinoData = JSON.parse(dinos)
    res.render('dinosaurs/index',{dinos: dinoData});
});

router.post('/', function(req, res) {
    var dinos = fs.readFileSync('./dinos.json');
    var dinoData = JSON.parse(dinos);
    dinoData.push(req.body);
    fs.writeFileSync('./dinos.json', JSON.stringify(dinoData));
    res.redirect('/dinosaurs');
})

router.get('/new', function(req, res) {
    
    res.render('dinosaurs/new');
})



//---show edit route--///
router.get('/edit/:id', function(req, res) {
    var index = parseInt(req.params.id);
    var dinos = fs.readFileSync("./dinos.json");
    var dinoData = JSON.parse(dinos);
    res.render('dinosaurs/edit', {
        dino: dinoData[index], 
        dinoIndex: index}) ///obects needs din0:{name:'string', type;'string', index:'int'}
})

///---edit one dino---///
router.put('/:id', function(req, res) {
    var index = parseInt(req.params.id);
    var dinos = fs.readFileSync("./dinos.json");
    var dinoData = JSON.parse(dinos);

    dinoData[index] = req.body

    fs.writeFileSync("./dinos.json", JSON.stringify(dinoData));
    res.redirect(`/dinosaurs/${index}`);
})
///---delete the route---///
router.delete('/:id', function(req, res) {
    console.log('deleting dino at' + req.params.id)
    var index = parseInt(req.params.id);
    var dinos = fs.readFileSync("./dinos.json");
    var dinoData = JSON.parse(dinos);
    var deadDino = dinoData.splice(index, 1)
    console.log(`farwell ${deadDino.name}. you were a great ${deadDino.type}`)

    fs.writeFileSync("./dinos.json", JSON.stringify(dinoData))
    res.redirect('/dinosaurs')
})

router.get('/:id', function(req, res) {
    var index = parseInt(req.params.id);
    var dinos = fs.readFileSync('./dinos.json');
    var dinoData = JSON.parse(dinos);
    res.render('dinosaurs/show',{ dino: dinoData[index]})
});



module.exports = router;
