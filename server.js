const express  = require('express')
const bodyparser = require('body-parser')
const cors = require("cors")
const bcrypt = require('bcrypt-nodejs');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require("./controllers/profile");
const image = require("./controllers/image");

const app = express();

app.use(cors());
app.use(bodyparser.json());

const knex = require('knex')({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'Earthsea@1',
      database : 'test'
    }
  });




app.get('/',(req,res) => {
    res.json("success");
})

app.post('/signin', (req,res) => {
    signin.handleSignin(req,res,knex.bcrypt);
})

app.get("/profile/:id", (req, res) => {
	profile.handleProfileGet(req, res, knex);
});

app.post('/register',(req,res) => {
    register.handleRegister(req,res,knex,bcrypt);
});

app.put("/image", (req, res) => {
	image.handleImage(req, res, knex);
});

app.post("/imageurl", (req, res) => {
	image.handleApiCall(req, res);
});

app.listen(3000, () => {
    console.log("app is running on port 3000");
})

