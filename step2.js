const fs = require('fs');
const process = require('process')
const axios = require('axios')

function cat(path){
    fs.readFile(path, 'utf8', function(err,data){
        if(err){
            console.error(`Error reading ${path}:${err}`)
            process.exit(1)
        }
        console.log(data)
    })
}

async function webCat(url){
    try {
        const res = await axios.get(url)
        console.log(res.data)
    } catch(err){
            console.error(`Error fetching ${url}: ${err}`)
            process.exit(1)
    }
}

function catOrWebCat(arg){
    if(arg.includes(".txt")){
        cat(arg)
    } else{
        webCat(arg)
    }
}

catOrWebCat(process.argv[2]);