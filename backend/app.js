const express = require('express');
const knex = require('knex')(require('./knexfile.js')[process.env.NODE_ENV || 'development'])
const cors = require('cors');
const app = express();

const port = 8080; 

app.listen(port, () => console.log(`server listening on port ${port}`))

app.use(cors())
app.use(express.json()) 

app.get('/', (req, res) => { 
    knex('to_dos_table')
    .select('*') 
    .then(data => res.json(data)) 
})

app.post('/', (req, res) => { 
  const { newItem } = req.query;
  knex('to_dos_table')
  .select('id')
  .then(idArray => {
    const newItemData = {
      id: idArray.length+1,
      toDo: newItem,
    };
    knex('to_dos_table')
    .insert(newItemData) 
    .then(data => res.json(data)) 
  })
})

app.delete('/delete/', (req, res) => { 
    const { id }  = req.query 
    knex('to_dos_table')
    .where('id' , id)
    .del()
    .then(() => res.json({message: 'da thing be deletey'}))

})

app.patch('/', (req, res) => { 
    const { id, updatedItem } = req.query
    knex('to_dos_table')
    .where('id', id)
    .update(
        {
          toDo: updatedItem
        }
    )
    .then(() => res.json({message: 'it done be updated'}))
})
