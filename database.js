const mongoose = require('mongoose');
const user = 'vladimircuriel';
const password = 'AmatistaMorado3011';
let databasename = 'db';

if (process.env.NODE_ENV == 'test')
   databasename = 'testdb';

const uri = `mongodb+srv://${user}:${password}@cluster0.ayhgeli.mongodb.net/${databasename}?retryWrites=true&w=majority`;

mongoose.connect(uri,{ useNewUrlParser: true,useUnifiedTopology: true });
console.log('Connected to the database');
