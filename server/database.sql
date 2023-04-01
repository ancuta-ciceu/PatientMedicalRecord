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
