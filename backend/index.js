const express = require("express")
const app = express()
const loginRouter = require("./routes/login")


app.use(express.json());       // to support JSON-encoded bodies

var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 
app.use(express.urlencoded({extended: true})); // to support URL-encoded bodies
app.use("/login/", loginRouter)

app.listen(5000, ()=>{
    console.log("Server Is Listening On Port 5000")
})