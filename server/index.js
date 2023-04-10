const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');
const session  = require('express-session');

//middleware
app.use(cors());
app.use(express.json());
 

//ROUTES//

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

app.listen(5000, () => {
  console.log('server has started on port 5000');
});
