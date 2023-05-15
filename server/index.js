const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
require('./db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('./db');
const crypto = require('crypto');

const secretKey = crypto.randomBytes(32).toString('hex');

app.use(bodyParser.json({type: 'application/json; charset=utf-8'}));

//middleware
app.use(cors());
app.use(express.json());
//app.use(bodyParser.json());

//ROUTES//

//create a doctor
app.post('/createdoctor', async (req, res) => {
  try {
    const {doctor_name, doctor_email, doctor_passhash, doctor_specialization} =
      req.body;
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
    const {
      medical_assistant_name,
      medical_assistant_email,
      medical_assistant_passhash,
    } = req.body;
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(
      medical_assistant_passhash,
      saltRounds,
    );
    const newMedicalAssistant = await pool.query(
      'INSERT INTO medical_assistant (medical_assistant_name, medical_assistant_email, medical_assistant_passhash) VALUES ($1, $2, $3 ) RETURNING *',
      [medical_assistant_name, medical_assistant_email, hashedPassword],
    );

    res.json(newMedicalAssistant.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});


//try to login as a doctor

app.post('/logindoctor', async (req, res) => {
  try {
    const { doctor_name, doctor_passhash } = req.body;
    const doctor_user = await pool.query('SELECT doctor_name, doctor_passhash FROM doctor WHERE doctor_name = $1', [doctor_name]);
    
    if (doctor_user.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    const { doctor_passhash: hashedPassword } = doctor_user.rows[0];
    const isPasswordValid = await bcrypt.compare(doctor_passhash, hashedPassword);
    
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }
    
    const token = jwt.sign({ doctor_name }, secretKey, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});




//try to login as a medical assistant

app.post('/loginmedicalassistant', async (req, res) => {
  try {
    const { medical_assistant_name, medical_assistant_passhash } = req.body;
    const medical_assistant_user = await pool.query('SELECT medical_assistant_name, medical_assistant_passhash FROM medical_assistant WHERE medical_assistant_name = $1', [medical_assistant_name]);
    
    if (medical_assistant_user.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    const { medical_assistant_passhash: hashedPassword } = medical_assistant_user.rows[0];
    const isPasswordValid = await bcrypt.compare(medical_assistant_passhash, hashedPassword);
    
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }
    
    const token = jwt.sign({ medical_assistant_name }, secretKey, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

//signin with google 

const users = [];

function upsert(array, item){
  const i = array.findIndex(_item => _item.email === item.email);
  if(i > -1) array[i] = item;
  else array.push(item);
}
 app.post('/signinwithgoogle', async (req, res) => {
  try {
    const { token } = req.body;
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: '809074699671-b1jc0n7mg24np6johdf9jslauoce2lm0.apps.googleusercontent.com',
    });
    const { name, email } = ticket.getPayload();
    upsert(users, { name, email });
    res.status(201).json({ name, email });
    res.json({ name, email });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
  });


//create a pacient
app.post('/pacients', async (req, res) => {
  try {
    const {cnp, patientName, age, sex, admissionDate} = req.body;
    const newPacient = await pool.query(
      'INSERT INTO pacient (cnp, "patientName", age, sex, "admissionDate") VALUES ($1, $2, $3, $4, $5) RETURNING *',
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
    const {patientId, days, timesPerDay, medicine, administrationType} =
      req.body;
    const newTreatment = await pool.query(
      'INSERT INTO treatment ("patientId", days, "timesPerDay", medicine, "administrationType" ) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [patientId, days, timesPerDay, medicine, administrationType],
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
      'SELECT * FROM treatment WHERE "patientId" = $1',
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
  console.log(`Server listening on port ${port}`);
});
