const express = require("express");
const router = express.Router();

const {validateToken} = require("./middlewares/loginMiddleware")
const {addEvent,getEvents} = require("../services/events")


router.get("/", validateToken, async (req,res) => {
 console.log(req.body)

 response = await getEvents({user_id:req.session.user_id})

 res.json(response)
})

router.post("/create", validateToken, async (req,res) => {
 console.log(req.body)


 response = await addEvent({ user_id:req.session.user_id, event: req.body.eventdata })

 res.json(response)
})




module.exports = router