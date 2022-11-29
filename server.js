import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import Connections from './db/db.js';
import userSignup from './model/mongoSchema.js';
const app = express();
app.use(cors());

app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

const db = Connections();

app.post('/signup', async (req, res) => {
  console.log(req.body);
  try {
    await userSignup.create({
      fname: req.body.fname,
      lname: req.body.lname,
      email: req.body.email,
      password: req.body.password,
      phone: req.body.phone,
    });
    res.json({ status: 'ok' });
    console.log('succes');
  } catch (error) {
    console.log(error);
    res.json({ status: error });
  }
});

app.post('/login', async (req, res) => {
  console.log(req.body);
  const user = await userSignup.findOne({
    email: req.body.email,
    password: req.body.password,
  });

  if (user) {
    return res.status(201).json({
      status: 'ok',
      user: true,
      message: 'successfully logined',
      token: 'donealalal',
    });
    // res.send({
    //   token: 'token123',
    // });
  } else {
    return res.status(401).json({
      status: 'error',
      user: false,
      message: 'Incorrect user or password ',
    });
  }
});

const PORT = 8000;

app.get('');

app.listen(PORT, () => console.log(`running successfully $(PORT)`));
