const client = require("../models/database")

async function addPayment(data) {

 const event = data.event
 const payment_insert_query = {
  text: 'INSERT INTO payments VALUES($1, $2, $3, $4) RETURNING *',
  values: [data.payer_id, data.reciever_id, data.item_id, data.amount],
 };
 
 const res = await client.query(payment_insert_query)
 // console.log('Event added successfully:', res.rows[0]);
}






module.exports = {getId}