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

