var express = require("express");
var http = require("http")
var path = require("path")
var nodemailer = require("nodemailer")

var app = express();
var server = http.Server(app)
var port = 3000

app.set("port", port)
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname, "static")))


app.get("/", function(req, response){
    response.sendFile(path.join(__dirname, "static/index.html"))
})

app.post("/send_email", function(req, response){
    var from = req.body.from
    var to = req.body.to
    var subject = req.body.subject
    var message = req.body.message

    var transporter = nodemailer.createTransport({

        host: "maildev",
        port: 25,
        secure : false,
    
        tls:{
            rejectUnauthorized:false 
          }
    })

    var mailOptions = {
        from: from,
        to:to,
        subject:subject,
        html: message ,
    }
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error)
        } else {
            console.log("อีเมลที่ส่ง : " + info.response)
        }
        console.log(mailOptions)
        response.redirect("/")
    })
})

server.listen(port, function(){
    console.log("server run port  " + port)
})
console.clear()