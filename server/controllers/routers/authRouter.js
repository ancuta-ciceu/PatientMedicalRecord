const express = require('express');
const validateForm = require('../controllers/validateForm');
const router = express.Router();
const pool = require('../db');
const bcrypt = require('bcrypt');
require('dotenv').config();

router.post('/SignInAsDoctorScreen', async(req, res) => {
    validateForm(req, res);

    const potentialLogin = await pool.query('SELECT doctor_name, doctor_passhash FROM doctors WHERE doctor_name = $1 AND doctor_passhash=$2', [req.body.doctor_name]);
    if(potentialLogin.rowCount > 0){
        const isSamePass = await bcrypt.compare(req.body.password, potentialLogin.rows[0].doctor_passhash);

        if(isSamePass){
            //do login
            //daca autentificarea e corecta ar trebui sa mergem la pagina de scan QR
            res.json({loggedIn: true, doctor_name});
        }
        else{
            //do not login
            res.json({loggedIn: false, status: "Wrong username or password"});
            console.log("NOT GOOD")
        }
    }else{
        console.log("NOT GOOD")
        res.json({loggedIn: false, status: "Wrong username or password"});
    }

});

router.post('/register', async(req, res) => {
    validateForm(req, res);
    const existingUser = await pool.query('SELECT doctor_name FROM doctor WHERE doctor_name = $1', [req.body.doctor_name]);

    if (existingUser.rowCount === 0) {
        //register
        const hashedPass = await bcrypt.hash(req.body.password, 10);
        const newDoctorQuery = await pool.query('INSERT INTO doctor (doctor_name, passhash) VALUES ($1, $2) RETURNING doctor_name', [req.body.doctor_name, hashedPass]);
        req.session.doctor_name = {
            doctor_name,
            doctor_id: newDoctorQuery.rows[0].doctor_id,
        }
        res.json({loggedIn: true, doctor_name: req.body.doctor_name});
    }
    else {
        res.json({loggedIn: false, status:"User already exists"});
    }

});
module.default =  router;