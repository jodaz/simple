const express = require('express');
const site = express();

site.use(express.static('public'));
site.set('view engine', 'ejs');

site.get('/', function( req, res ) {
    res.render('pages/index');
});

site.get('/about', function( req, res ) {
    res.render('pages/about');
});

site.get('/services', function( req, res ) {
    res.render('pages/services');
});

site.get('/contact', function( req, res ) {
    res.render('pages/contact');
});

site.listen( 3000, () => console.log('Listening on port 3000'));