const fetch = require('node-fetch');
const fs = require('fs');
const { JSDOM } = require('jsdom');

const express = require('express');
const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public')); //for css


app.get('/', async (request, response) => {

    //get austrian vaccine data as csv file from https://info.gesundheitsministerium.gv.at/data/timeline-eimpfpass.csv
    let vaccineCSV = await fetch('https://info.gesundheitsministerium.gv.at/data/timeline-eimpfpass.csv');
    let csv = await vaccineCSV.text(); //get only the content of the website, without metadata
    
    //to get only the last line
    let lines = csv.split('\n'); //stores each line in an array
    let lastLine = lines[lines.length - 1];
    let vaccineRate = lastLine.split(';')[9]; //7 = one vaccine, 9 = two vaccines

    //console.log('Vaccine rate: ', vaccineRate);

    //get movie data
    let movieData = fs.readFileSync('movie-data.json');
    let movies = await JSON.parse(movieData);
    console.log(movies);
    /*
    let movieData = await fetch('https://cdn.glitch.com/09ca286b-ae66-4ba3-ac0e-da42bc699861%2Fmovie-data.json?v=1620662595488');
    let movies = await movieData.json();
    */

    //get movie with "vaccine rating"
    movies = movies.filter(m => m.averageRating == Math.round(vaccineRate/10));
    let randomMovie = movies[Math.floor(Math.random() * movies.length)];
    console.log(randomMovie);

    //get movie info from IMDB
    let imdbPage = await fetch('https://www.imdb.com/title/' + randomMovie.tconst);
    let html = await imdbPage.text(); //liefert uns die Seite als html ansicht

    //um nun auf bestimmte elemente zugreifen zu können (zb bild und titel)...
    let dom = new JSDOM(html); //erstellen einen dom baum mit diesen Elementen
    let movie = {
        image: dom.window.document.querySelector('.poster img').src,
        title: dom.window.document.querySelector('.TitleBlock__TitleContainer-sc-1nlhx7j-1 h1').textContent
    }
    //console.log(movie);

    //render HTML, display page /view/index.ejs in browser
    response.render('index', {
        //if vaccination data can no longer be retrieved from url, a static number can be entered here
        vaccinationRate: Math.round(vaccineRate), //wird auf 0 Nachkommastellen gerundet
        movie: movie
    });

    
});

//with "set PORT=3000" a specific port can be entered into the environment variable PORT.
const listener = app.listen(process.env.PORT, () => {
    console.log("Your app is listening on port " + listener.address().port);
});