const express = require('express');
const bodyParser = require('body-parser');

// Routes
const authRoutes = require('./auth/auth.router');
const teamRoutes = require('./teams/teams.router');

const app = express();
app.use(bodyParser.json());

const port = 3000;

// Llamada al endpoint '/'
app.get('/',(req,res) => {
   res.status(200).send('Hello World!');
});

app.use('/auth',authRoutes);
app.use('/teams',teamRoutes);

app.listen(port,(req,res) => {
   console.log(`server app listening on port ${port}`);
});

module.exports = app;