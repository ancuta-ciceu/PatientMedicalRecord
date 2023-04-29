const express = require('express');
const app = express();
const cors = require('cors');
require('./db');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('./db');



//middleware
app.use(cors());
app.use(express.json());
//app.use(bodyParser.json());


//ROUTES//

//create a doctor
app.post('/createdoctor', async (req, res) => {
  try {
    const {doctor_name, doctor_email, doctor_passhash, doctor_specialization} = req.body;
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(doctor_passhash, saltRounds);
    const newDoctor = await pool.query(
      'INSERT INTO doctor (doctor_name, doctor_email, doctor_passhash, doctor_specialization) VALUES ($1, $2, $3, $4 ) RETURNING *',
      [doctor_name, doctor_email, hashedPassword, doctor_specialization],
    );
    
    res.json(newDoctor.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//create a medical assistant
app.post('/createmedicalassistant', async (req, res) => {
  try {
    const {medical_assistant_name, medical_assistant_email, medical_assistant_passhash} = req.body;
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(medical_assistant_passhash, saltRounds);
    const newMedicalAssistant = await pool.query(
      'INSERT INTO medical_assistant (medical_assistant_name, medical_assistant_email, medical_assistant_passhash) VALUES ($1, $2, $3 ) RETURNING *',
      [medical_assistant_name, medical_assistant_email, hashedPassword],
    );
    
    res.json(newMedicalAssistant.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});


//try to login as doctor
  app.get('/logindoctor', async (req, res) => {
    try {
      const {doctor_name, doctor_passhash} = req.body;
      doctor_name = 'doctor1';
      const doctor_user = await pool.query(
        "SELECT doctor_name FROM doctor WHERE doctor_name = $1", [doctor_name]);
        //console_log(doctor_user);
      res.json(doctor_user.rows);
    } catch (err) {
      console.error(err.message);
    }
  });


  /*app.get('/logindoctor', async (req, res) => {
    try{
    const { doctor_name, doctor_passhash } = req.body;
    const doctor_user = await Doctor.findOne({ where: { doctor_name } });
    //const doctor_user = await pool.query('SELECT doctor_name FROM doctor WHERE doctor_name = $1', [doctor_name]);
    if (!doctor_user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const isPasswordValid = await bcrypt.compare(doctor_passhash, doctor_user.doctor_passhash);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }
    const token = jwt.sign({ doctor_name }, secretKey, { expiresIn: '1h' });
    res.json({ token });
    }catch (err) {
      console.error(err.message);
    }
    
  });*/

//create a pacient
app.post('/pacients', async (req, res) => {
  try {
    const {cnp, patientName, age, sex, admissionDate} = req.body;
    const newPacient = await pool.query(
      'INSERT INTO pacient (cnp, patientName, age, sex, admissionDate) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [cnp, patientName, age, sex, admissionDate],
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
      'SELECT * FROM pacient WHERE "patientId" = $1',
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
    const {cnp, patientName, age, sex, admissionDate} = req.body;
    const updatedPacient = await pool.query(
      'UPDATE pacient SET cnp = $1, patientName = $2, age = $3, sex = $4, admissionDate = $5 WHERE patientId = $6',
      [cnp, patientName, age, sex, admissionDate, id],
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
    await pool.query('DELETE FROM pacient WHERE patientId = $1', [id]);
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
