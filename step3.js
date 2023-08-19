const fs = require('fs');
const process = require('process')
const axios = require('axios')






function writeOrPrint(arg1, arg2, arg3){
    if (arg1 === "--out") {
        catWriteOrWebCatWrite(arg2, arg3)
    } else{
        catOrWebCat(arg1)
    }
}

function catWriteOrWebCatWrite(output, input){
    if(input.includes(".txt")){
        catWrite(output, input)
    } else{
        webCatWrite(output, input)
    }
}


function catWrite(output, input){
    fs.readFile(input, 'utf8', function(err,data){
        if(err){
            console.error(`Error reading ${input}:${err}`)
            process.exit(1)
        }
        fs.writeFile(`./${output}`,data,"utf8",function(err){
            if(err){
            console.error(`Couldn't write ${input}:${err}`)
            process.exit(1)
            }
        })
    })
}

async function webCatWrite(output, input){
    try {
        const res = await axios.get(input)
        fs.writeFile(`./${output}`,res.data,"utf8",function(err){
            if(err){
            console.error(`Couldn't write ${input}:${err}`)
            process.exit(1)
            }
        })
    } catch(err){
            console.error(`Error fetching ${input}: ${err}`)
            process.exit(1)
    }
}


function catOrWebCat(input){
    if(input.includes(".txt")){
        cat(input)
    } else{
        webCat(input)
    }
}


function cat(input){
    fs.readFile(input, 'utf8', function(err,data){
        if(err){
            console.error(`Error reading ${input}:${err}`)
            process.exit(1)
        }
        console.log(data)
    })
}

async function webCat(input){
    try {
        const res = await axios.get(input)
        console.log(res.data)
    } catch(err){
            console.error(`Error fetching ${input}: ${err}`)
            process.exit(1)
    }
}




writeOrPrint(process.argv[2],process.argv[3],process.argv[4])