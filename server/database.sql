CREATE DATABASE pacientmedicalrecord;

CREATE TABLE pacient(
    patient_id SERIAL PRIMARY KEY,
    cnp VARCHAR(50),
    patient_name VARCHAR(255),
    age INT,
    sex VARCHAR(50),
    admission_date DATE
);

CREATE TABLE treatment(
    treatment_id SERIAL PRIMARY KEY,
    patient_id INT,
    days INT,
    times_per_day INT,
    medicine VARCHAR(255),
    administration_type VARCHAR(500)
);

CREATE TABLE doctor(
    doctor_id SERIAL PRIMARY KEY,
    doctor_name VARCHAR(255) NOT NULL,
    doctor_passhash VARCHAR(255) NOT NULL,
    doctor_specialization VARCHAR(255),
    doctor_email VARCHAR(255),
);

INSERT INTO doctor (doctor_name, doctor_passhash, doctor_specialization, doctor_email) VALUES ('doctor2', 'doctor2', 'Cardiologist', 'doctor2@email.com');