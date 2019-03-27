var http = require('http');
var express = require('express')
var app = new express()
var path = require('path')
var events = require('events')
var eventEmmiter = new events.EventEmitter()
var fs = require('fs')

var memeArr = [
    "fates.jpg",
    "hands.jpg"
]
class Meme
{
    constructor(path, name)
    {
        this.path = path;
        this.name = name;
        this.pop = 0;
    }

    like(){pop++;}
    dislike(){pop--;}
}
var MemeList = []
var count = 0;

app.get('/', (req,res) =>{
    if(MemeList.length == 0)
    {
        fs.readdir(__dirname+"/images",(err,files)=>{
            if(err){
                console.log(err);
            }
            files.forEach((el)=>{
                MemeList.push(new Meme(__dirname+"/images/"+el,el))
            })
            console.log(MemeList);
        })
    }
    res.sendFile(__dirname+'/ken.html')
})

app.post('/',(req,res)=>{
    console.log("boo yah")
    res.send(count)
})
app.post('/meme',(req,res)=>{
    MemeList.forEach((el)=>{
        if(el.name.includes(res)){res.send(el);}
    })
})

app.listen(3000)
