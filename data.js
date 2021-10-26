//download original file, filter, sort and save it as json at the end.

const fetch = require('node-fetch');
const fs = require('fs');


(async () => {

    // 1. download tsv
    //use these lines of code instead of the ones below to avoid using data.tsv (around 20MB)
    let file = await fetch('https://cdn.glitch.com/09ca286b-ae66-4ba3-ac0e-da42bc699861%2Fdata.tsv?v=1620661068028'); //await -> weil alles syncron geschehen soll, ohne Callback
    file = await file.text();
    //console.log(file);
    /*
    let file;
    try {
        file = fs.readFileSync('data.tsv', 'utf8')
    }catch (e){
        console.log("error", e);
    }
    */

    // 2. convert tsv to javascript object
    file = file.split('\n');
    let data = file.map(line => {
        line = line.split('\t');
        return {
            tconst: line[0],
            averageRating: line[1],
            numVotes: line[2]
        }
    });
    //console.log(data[10]);

    
    let results = [];

    // 3. for every rating (1.0, 1.1, 1.2, ... 10.0)
    for(let i = 10; i <= 100; i++) {
        let rating = i / 10;

        //filter only current rating
        let filtered = data.filter(l => l.averageRating == rating); //filter -> if return is true, element remains in the array
        //console.log(filtered[0]);

        // 4. sort by number of votes
        let sorted = filtered.sort((a, b) => b.numVotes - a.numVotes); //sort -> takes over two objects and returns them in order
        //console.log(sorted[0]);

        // 5. save top 10 movies
        sorted = sorted.slice(0, 50);
        results = results.concat(sorted); //merge arrays
    }

    // 6. save results
    //console.log(results.length);
    try{
        fs.writeFileSync('movie-data.json', JSON.stringify(results));
    }catch (e){
        console.log("Error", e);
    }

})();