const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt")
// const LoginQuery = require("../services/LoginQuery")

router.get("/", (req,res) => {
    res.send("Server Is Running")
})

router.post("/", async (req,res) => {
    var password = ''
    var ID = ''
    var response = ''
    res.json({"msg": "phase1"})
    // response = await LoginQuery(req)
    // if(response.err){
    //   console.error(err.stack)
    // }
    // else if(response.length!=0)
    // {
    //   hashed_password = response[0].hashed_password
    //   ID = response[0].id
    // }
    // if (hashed_password === "")
    // {
    //   res.json({error: "Invalid user"})
    // }
    // else{
    //   bcrypt.compare(req.body.password, hashed_password, function(err, result) {
    //     result == true
    //     if(result){
    //       res.json({"message": "authorised"})
    //     }
    //     else{
    //       res.json({error: "Invalid user"}) 
    //     }
    //   });
    // }
})

router.get('/logout', async (req,res) => {
  console.log("destroyed")
  req.session.destroy();
});

module.exports = router