const { DataTypes } = require('sequelize');
//const { sequelize } = import('../db');
const Sequelize = require('sequelize');


const sequelize = new Sequelize('pacientmedicalrecord', 'ancuta', '1234', {
  table: 'doctor',
  host: 'localhost',
  dialect: 'postgres'
});


const Doctor = sequelize.define('Doctor', {
  doctor_name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },

  doctor_passhash: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Doctor;
