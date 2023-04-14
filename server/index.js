const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
//const { Doctor } = require('./models/User');
const { Sequelize } = require('sequelize');



//middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

const sequelize = new Sequelize('pacientmedicalrecord', 'ancuta', '1234', {
  host: 'localhost',
  dialect: 'postgres'
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

//ROUTES//

//try to login as doctor

  app.post('/SigInAsDoctorScreen', async (req, res) => {
    try{
    //const { doctor_name, doctor_passhash } = req.body;
    //const doctor_user = await Doctor.findOne({ where: { doctor_name } });
    const doctor_user = await pool.query('SELECT doctor_name FROM doctor WHERE doctor_name = $1', [req.body.doctor_name]);
    if (!doctor_user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const isPasswordValid = await compare(doctor_passhash, doctor_user.doctor_passhash);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }
    const token = jwt.sign({ id: doctor_user.doctor_name }, 'secret');
    res.json({ token });
    }catch (err) {
      console.error(err.message);
    }
    
  });

//create a pacient
app.post('/pacients', async (req, res) => {
  try {
    const {cnp, pacient_name, age, sex, admission_date} = req.body;
    const newPacient = await pool.query(
      'INSERT INTO pacient (cnp, pacient_name, age, sex, admission_date) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [cnp, pacient_name, age, sex, admission_date],
    );
    res.json(newPacient.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//get all pacients
app.get('/pacients', async (req, res) => {
  try {
    const allPacients = await pool.query('SELECT * FROM pacient');
    res.json(allPacients.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//get a pacient
app.get('/pacients/:id', async (req, res) => {
  try {
    const {id} = req.params;
    const pacient = await pool.query(
      'SELECT * FROM pacient WHERE pacient_id = $1',
      [id],
    );
    res.json(pacient.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//update a pacient
app.put('/pacients/:id', async (req, res) => {
  try {
    const {id} = req.params;
    const {cnp, pacient_name, age, sex, admission_date} = req.body;
    const updatedPacient = await pool.query(
      'UPDATE pacient SET cnp = $1, pacient_name = $2, age = $3, sex = $4, admission_date = $5 WHERE pacient_id = $6',
      [cnp, pacient_name, age, sex, admission_date, id],
    );
    res.json(updatedPacient.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});
//delete a pacient
app.delete('/pacients/:id', async (req, res) => {
  try {
    const {id} = req.params;
    await pool.query('DELETE FROM pacient WHERE pacient_id = $1', [id]);
    res.json(`pacient with id ${id} was deleted`);
  } catch (err) {
    console.error(err.message);
  }
});

app.post('/treatments', async (req, res) => {
  try {
    const {patient_id, days, times_per_day, medicine, administration_type} =
      req.body;
    const newTreatment = await pool.query(
      'INSERT INTO treatment (patient_id, days, times_per_day, medicine, administration_type ) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [patient_id, days, times_per_day, medicine, administration_type],
    );
    res.json(newTreatment.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//get all pacients
app.get('/treatments', async (req, res) => {
  try {
    const allTreatments = await pool.query('SELECT * FROM treatment');
    res.json(allTreatments.rows);
  } catch (err) {
    console.error(err.message);
  }
});
app.get('/treatments/:id', async (req, res) => {
  try {
    const {id} = req.params;
    const treatment = await pool.query(
      'SELECT * FROM treatment WHERE patient_id = $1',
      [id],
    );
    res.json(treatment.rows);
  } catch (err) {
    console.error(err.message);
  }
});
const port = 5000;
app.listen(port, () => {
  //console.log('server has started on port ${port}');
  console.log(`Server listening on port ${port}`)
});
