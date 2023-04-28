const client = require("../models/database")

async function addItem(data) {

 if(data.user_id)
 {
  const item_insert_query = {
   text: 'insert into items VALUES($1, $2, $3) RETURNING *',
   values: [data.name, data.description, data.expense],
  };
  console.log(item_insert_query)
  const res = await client.query(item_insert_query)
  console.log('Event added successfully:', res.rows[0]);

  const event_item_query = {
    text: 'insert into event_items VALUES($1, $2) RETURNING *',
    values: [data.event_id, res.rows[0].item_id],
  };
  const res2 = await client.query(event_item_query);
  console.log('Event item created succesfully', res2.rows[0]);
  const item_payment_query = {
      text: 'insert into item_payings VALUES($1, $2, $3) RETURNING *',
      values: [data.res.rows[0].item_id, data.user_id, data.expense],
    };
  console.log(item_payment_query)
  const res3 = await client.query(item_insert_query)
  console.log('Initial item payment succesfully registered', res3.rows[0]);
  const item_owings_query = {
    text: 'insert into item_owings VALUES($1, $2, $3) RETURNING *',
    values: [data.res.rows[0].item_id, data.user_id, data.expense],
  };
  console.log(item_owings_query)
  const res4 = await client.query(item_insert_query)
  console.log('Initial item owings succesfully registered', res4.rows[0]);
  return {success: true}
 }
return {success:false}
}

async function getItems(data){
    const get_items_query = {
        text: "select * from"+
        " items, event_items "+
        "where items.item_id= event_items.item_id"+
        "and event_items.event_id=$1",
        values: [data.event_id],
       };
       const res = await client.query(get_items_query)
       return res.rows
}

async function deleteItem(data){
    const delete_owings_query = {
        text: "delete from item_owings where item_id = $1",
        values: [data.item_id],
    };
    console.log(delete_owings_query)
    await client.query(delete_owings_query)
    console.log('Required Item owings succesfully deleted');
    const delete_payings_query = {
        text: "delete from item_payings where item_id = $1",
        values: [data.item_id],
    };
    console.log(delete_payings_query)
    await client.query(delete_payings_query)
    console.log('Required Item payings succesfully deleted');
    const delete_event_items_query = {
        text: "delete from event_items where item_id = $1",
        values: [data.item_id],
    };
    console.log(delete_event_items_query)
    await client.query(delete_event_items_query)
    console.log('Required Item events succesfully deleted');
    const delete_items_query = {
        text: "delete from items where item_id = $1",
        values: [data.item_id],
    };
    console.log(delete_items_query)
    await client.query(delete_items_query)
    console.log('Required Items succesfully deleted');
    return {success: true}
}

async function updateItem(data){
    const item_name_update_query = {
        text: 'update items set name = $1 where item_id = $2 RETURNING *',
        values: [data.name,data.item_id],
    };
    console.log(item_name_update_query)
    const res = await client.query(item_insert_query)
    console.log('Event name updated successfully:', res.rows[0]);

    const item_desc_update_query = {
        text: 'update items set description = $1 where item_id = $2 RETURNING *',
        values: [data.description,data.item_id],
    };
    console.log(item_name_update_query)
    const res2 = await client.query(item_desc_update_query)
    console.log('Event description updated successfully:', res2.rows[0]); 

    const item_expense_update_query = {
        text: 'update items set expense = $1 where item_id = $2 RETURNING *',
        values: [data.expense,data.item_id],
    };
    console.log(item_expense_update_query)
    const res3 = await client.query(item_expense_update_query)
    console.log('Event description updated successfully:', res3.rows[0]);

    const delete_payings_query = {
        text: "delete from item_payings where item_id = $1",
        values: [data.item_id],
    };
    console.log(delete_payings_query)
    await client.query(delete_payings_query)
    console.log('Required Item payings succesfully deleted');

    for(;;){
        const item_payment_query = {
            text: 'insert into item_payings VALUES($1, $2, $3)',
            values: [data.item_id, data.payments.user_id, data.payments.amount],
          };
        console.log(item_payment_query)
        await client.query(item_insert_query)
    }
    const delete_owings_query = {
        text: "delete from item_owings where item_id = $1",
        values: [data.item_id],
    };
    console.log(delete_owings_query)
    await client.query(delete_owings_query)
    console.log('Required Item payings succesfully deleted');

    for(;;){
        const item_owings_query = {
            text: 'insert into item_payings VALUES($1, $2, $3)',
            values: [data.item_id, data.payments.user_id, data.payments.amount],
          };
        console.log(item_owings_query)
        await client.query(item_owings_query)
    }
}

module.exports = {addItem, getItems, deleteItem, updateItem}