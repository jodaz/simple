const yaml = require('js-yaml');
const fs = require('fs');
const express = require('express');
const site = express();

// Get document, or throw exception on error
try {
    var yaml_data = yaml.safeLoad(fs.readFileSync('./config.yml', 'utf-8'));
} catch (error) {
    console.log(error);
}

site.use(express.static('public'));
site.set('view engine', 'ejs');

var d = yaml_data;
console.log(yaml_data.description);

site.get(yaml_data.root, function( req, res ) {
    res.render('pages/index', {data: yaml_data});
});

site.get('/about', function( req, res ) {
    res.render('pages/about', {data: yaml_data});
});

site.get('/services', function( req, res ) {
    res.render('pages/services', {data: yaml_data});
});

site.get('/contact', function( req, res ) {
    res.render('pages/contact', {data: yaml_data});
});

site.listen( 3000, () => console.log('Listening on port 3000'));