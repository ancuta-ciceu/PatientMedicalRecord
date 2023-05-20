import request from 'supertest';
import app from './index.mjs';
import pool from './db.js';
import {jest} from '@jest/globals';

describe('POST/pacients', () => {
  describe('given all the necessary information', () => {
    test('should respond with a 200 status code', async () => {
      const response = await request(app).post('/pacients').send({
        cnp: 'cnp',
        patientName: 'patient name',
        age: 21,
        sex: 'fem',
        admissionDate: '2022-10-09T21:00:00.000Z',
      });
      expect(response.statusCode).toBe(200);
      expect(response.body).toMatchObject({
        cnp: 'cnp',
        patientName: 'patient name',
        age: 21,
        sex: 'fem',
        // admissionDate: '2022-10-09T21:00:00.000Z',
      });
    });
    test('should specify json in the content type header', async () => {
      const response = await request(app).post('/pacients').send({
        patientId: 1,
        cnp: 'cnp',
        patientName: 'patient name',
        age: 21,
        sex: 'fem',
        admissionDate: '2022-10-09T21:00:00.000Z',
      });
      expect(response.headers['content-type']).toEqual(
        expect.stringContaining('json'),
      );
    });
  });
  describe('when the information is missing', () => {
    test('should respond with a status code of 200', async () => {
      const response = await request(app).post('/pacients').send({
        cnp: 'cnp',
        patientName: 'patient name',
      });
      expect(response.body.patientId).toBeDefined();
    });
  });
});

describe('GET /treatments/:id', () => {
  test('should respond with a 200 status code and return the treatments for the specified patient', async () => {
    const mockId = 2;

    const mockTreatmentData = [
      {
        treatmentId: 11,
        patientId: 2,
        days: 5,
        timesPerDay: 3,
        medicine: 'Test Medicine',
        administrationType: 'Oral',
      },
    ];

    pool.query = jest.fn().mockResolvedValue({rows: mockTreatmentData});

    const response = await request(app).get(`/treatments/${mockId}`);

    // Assertions
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(mockTreatmentData);
    expect(pool.query).toHaveBeenCalledWith(
      'SELECT * FROM treatment WHERE "patientId" = $1',
      [mockId.toString()],
    );
  });

  // test('should respond with a 404 status code when the patient is not found', async () => {
  //   const mockId = 200; // Specify the ID of the patient for testing purposes
  //
  //   // Mock the database query function to return no rows
  //   pool.query = jest.fn().mockResolvedValue({rows: [{exists: false}]});
  //
  //   // Make the API request
  //   const response = await request(app).get(`/treatments/${mockId}`);
  //
  //   // Assertions
  //   expect(response.statusCode).toBe(404);
  //   expect(response.body).toEqual({error: 'Patient not found'});
  // });
});
