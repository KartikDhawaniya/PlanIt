const express = require('express');
const session = require('express-session');

const app = express();

const authRouter = require("./controllers/login")
const eventRouter = require("./controllers/events")
const itemRouter = require("./controllers/items")

app.use(express.json());
const oneDay = 1000 * 60 * 60 * 24;
app.use(session({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:false,
    cookie: { 
      maxAge: oneDay
    },
    resave: false 
}));

const process = require('process');
port = process.env.PORT || 8080;

var bodyParser = require('body-parser')
app.use(bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.use("/auth/", authRouter)
app.use("/events/", eventRouter)
app.use("/items/", itemRouter)

app.get('/', (req, res) => {
    res.send('Just testing');
}
);


// app.get('/events/', (req, res) => {
//     res.json({events : ["e1","e2"]});
// })


app.listen(port, "192.168.0.105",() => {
    console.log(`Server running on port ${port} `);
}
);

