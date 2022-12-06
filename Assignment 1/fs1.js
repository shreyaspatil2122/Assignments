const fs=require('fs');
fs.writeFile('input.txt',"Hello it is input file",(err)=>{
    if(err){ return console.log(err)}
    console.log("Data Written Successfully");
    console.log("Let read the data from file")
    fs.readFile('input.txt',(err,data)=>{
        if(err){ return console.log(err)}
        console.log("Data is "+data.toString())
    })
})