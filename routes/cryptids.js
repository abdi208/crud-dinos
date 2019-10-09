const express = require('express');
const router = express.Router();
const fs = require('fs');


router.get('/', function(req, res) {
    var cryptids = fs.readFileSync('./cryptids.json');
    var cryptidsData = JSON.parse(cryptids);
    res.render('cryptids/index',{cryptids: cryptidsData})
})

router.post('/', function(req, res) {
    var cryptids = fs.readFileSync('./cryptids.json');
    var cryptidsData = JSON.parse(cryptids);
    cryptidsData.push(req.body);
    fs.writeFileSync('./cryptids.json', JSON.stringify(cryptidsData))
    res.redirect("/cryptids");
})

//---show the form to edit----///
router.get('/edit/:id',function(req, res) {
    var index = parseInt(req.params.id);
    var cryptids = fs.readFileSync('./cryptids.json');
    var cryptidsData = JSON.parse(cryptids);
    res.render('cryptids/edit', {
        cryps: cryptidsData[index],
        crypsIndex: index})
        console.log('you')
})

router.put('/:id', function(req, res) {
    var index = parseInt(req.params.id);
    var cryptids = fs.readFileSync('./cryptids.json');
    var cryptidsData = JSON.parse(cryptids);
    
    cryptidsData[index] = req.body;
    console.log('hello');
    fs.writeFileSync('./cryptids.json', JSON.stringify(cryptidsData))
    res.redirect(`/cryptids/${index}`)
})

router.delete("/:id", function(req, res) {
    console.log('deleting dino at' + req.params.id);
    var index = parseInt(req.params.id);
    var cryptids = fs.readFileSync('./cryptids.json');
    var cryptidsData = JSON.parse(cryptids);
    var removeCryptid = cryptidsData.splice(index, 1);
    console.log(`farwell ${removeCryptid.name}. you were great`)

    fs.writeFileSync("./cryptids.json", JSON.stringify(cryptidsData))
    res.redirect('/cryptids')
})

router.get('/new', function(req, res) {
    res.render('cryptids/new')
})

// router.get("/:id", function(req, res) {
//     var index = parseInt(req.params.id)
//     var cryptids = fs.readFileSync('./cryptids.json');
//     var cryptidsData = JSON.parse(cryptids);
//     res.render('cryptids/show', {cryptid: cryptidsData[index]})
// })

module.exports = router;