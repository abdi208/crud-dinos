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

router.get('/edit/:id',function(req, res) {
    var index = parseInt(req.params.id);
    var cryptids = fs.readFileSync('./cryptids.json');
    var cryptidsData = JSON.parse(cryptids);
    res.render('cryptids/edit', {
        cryps: cryptidsData[index],
        crypsIndex: index})

})
router.get('/new', function(req, res) {
    res.render('cryptids/new')
})

router.get("/:id", function(req, res) {
    var index = parseInt(req.params.id)
    var cryptids = fs.readFileSync('./cryptids.json');
    var cryptidsData = JSON.parse(cryptids);
    res.render('cryptids/show', {cryptid: cryptidsData[index]})
})

module.exports = router;