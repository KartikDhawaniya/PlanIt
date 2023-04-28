const express = require("express");
const router = express.Router();

const {validateToken} = require("./middlewares/loginMiddleware")
const {addEvent,getEvents,getEventDetails} = require("../services/events")
const {addParicipant, getParticipants, removeParticipant} = require("../services/participants")
const {addItem, getItems, deleteItem, updateItem, getItem} = require("../services/items")
const {getId} = require("../services/users")





router.get("/:itemID", validateToken, async (req,res) => {
 console.log(req.body)

 response = await get({user_id:req.session.user_id})

 res.json({ eventsList : response})
})



router.post("/create", validateToken, async (req,res) => {
 console.log(req.body)

 const param = {
  name: req.body.name,
  description: req.body.descr,
  expense: req.body.expense,
  event_id: req.body.event_id,
  user_id: req.session.user_id,
 } 

 response = await addItem(param)

 res.json({ new_item : response})
})

// router.post("/:itemID/update", validateToken, async (req,res) => {
//  console.log(req.body)

 

//  const param = {
//   item_id: req.body.item_id,
//   name: req.body.name,
//   description: req.body.descr,
//   expense: req.body.expense,

//   payers: req.body.payers,
//   owers: req.body.owers,

//   payments: ,
//  } 

//  response = await updateItem(param)

//  res.json({ new_item : response})
// })

// router.post("/:itemID/delete", validateToken, async (req,res) => {
//  console.log(req.body)

//  const param = {
//   name: req.body.name,
//   description: req.body.descr,
//   expense: req.body.expense,
//   event_id: req.body.event_id,
//   user_id: req.session.user_id,
//  }

//  response = await addItem(param)

//  res.json({ new_item : response})
// })

module.exports = router
