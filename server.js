var express = require('express')
var app = new express()
var cors = require("cors")
var bodyParser = require("body-parser")
var formidable = require("formidable")
var path = require("path")
var file = require("file")

var memes = [
    {
        meme:"debug",
        image:"/images/debug.png",
        likes:0,
        dislikes:0
    },
    {
        meme:"flawless",
        image:"/images/flawless.jpg",
        likes:0,
        dislikes:0
    },
    {
        meme:"heaviest",
        image:"/images/heaviest.jpg",
        likes:0,
        dislikes:0
    },
    {
        meme:"works",
        image:"/images/heaviewst.jpg",
        likes:0,
        dislikes:0
    }
]

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

app.use((req,res,next) => {
    console.log(req.param)
    next()
})

app.use(express.static("."))
app.use(cors())

app.get('/memes-api',(req,res) =>{
    res.json(memes)
})

app.get('/memes-api/:meme',(req,res) => {
    toRet = memes.filter((def) =>{
        return def.meme.toLowerCase() === req.params.meme.toLowerCase()
    })
    res.json(toRet)
})

app.get('/get-meme-by-name/:meme',(req,res) => {
    toRet = memes.filter((def) =>{
        return def.meme.toLowerCase() === req.params.meme.toLowerCase()
    })
    res.json(toRet)
})

app.get('/memes-image/:meme',(req,res) => {
    toRet = memes.filter((def) =>{
        return def.meme.toLowerCase() === req.params.meme.toLowerCase()
    })
    res.sendFile(__dirname + toRet[0].image)
})

app.post('/like-meme/:meme',(req,res)=>{
    memes = memes.filter((def) => {
        if(def.meme.toLowerCase() === req.params.meme.toLowerCase()) {
            def.likes++;
        }
        return def.meme;
    })
    console.log(memes)
    res.json(memes)
})

app.post('/dislike-meme/:meme',(req, res) => {
    memes = memes.filter((def) => {
        if(def.meme.toLowerCase() === req.params.meme.toLowerCase()) {
            def.dislikes++;
        }
        return def.meme;
    })
    console.log(memes)
    res.json(memes)
})

app.post('/memes-api',(req,res) =>{
    console.log(req)
    
    res.json(memes)
})

app.post('/meme-upload', (req,res) => {
    let form= new formidable.IncomingForm()
    console.log("Firesth")
    form.parse(req, function(err, fields, files) {
        files = files.image
        let oldpath = files.path
        let newpath = path.join(__dirname + '/images/' + files.name)
        const fileName = files.name
        let file = new File(newpath, fileName);
        filesArray.push(file);
        false.name(oldpath, newpath, function (err) {
            if (err) throw err;
            res.json(memes)
        })
    })

})

app.delete('/memes-api/:meme',(req,res)=>{
    console.log(req.params.meme.toLowerCase())
    memes = memes.filter((def) =>{
        return def.meme.toLowerCase() !== req.params.meme.toLowerCase()
    })
    res.json(memes)
})
app.listen(3000)
