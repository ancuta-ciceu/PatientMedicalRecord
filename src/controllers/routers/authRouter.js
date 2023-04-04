const express = require('express');
const validateForm = require('../controllers/validateForm');
const router = express.Router();
const pool = require('../db');
const bcrypt = require('bcrypt');

router.post('/login', async(req, res) => {
    validateForm(req, res);
});

router.post('/register', (req, res) => {
    validateForm(req, res);
    const existingUser = await pool.query('SELECT doctor_name FROM doctors WHERE doctor_name = $1', [req.body.doctor_name]);

    if (existingUser.rowCount === 0) {
        //register
        const hashedPass = await bcrypt.hash(req.body.password, 10);
        const newDoctorUser = await pool.query('INSERT INTO doctors (doctor_name, passhash) VALUES ($1, $2) RETURNING doctor_name', [req.body.doctor_name, hashedPAss]);
        res.json({loggedIn: true, doctor_name});

    }
    else {
        res.json({loggedIn: false, status:"User already exists"});
    }

});
module.exports = router;