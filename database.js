const mongoose = require('mongoose');
const user = process.env.USER_DB;
const password = process.env.PASSWORD_DB;
let databasename = process.env.NAME_DB;

if (process.env.NODE_ENV === 'test')
   databasename = process.env.NAME_DB_TEST;

const uri = `mongodb+srv://${user}:${password}@cluster0.ayhgeli.mongodb.net/${databasename}?retryWrites=true&w=majority`;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
console.log('Connected to the database');
