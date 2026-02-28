const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const Activity = require('../models/Activity');

// Create a test app instance
const app = express();
app.use(express.json());
app.use('/api/activities', require('../routes/activity'));

// Mock mongoose model
jest.mock('../models/Activity');

describe('Activity Routes', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('GET /api/activities - should return all activities', async () => {
    const mockActivities = [
      { jobId: 1, company: 'Google', action: 'CREATED', timestamp: new Date() },
      { jobId: 2, company: 'Amazon', action: 'UPDATED', timestamp: new Date() }
    ];

    Activity.find.mockReturnValue({
      sort: jest.fn().mockResolvedValue(mockActivities)
    });

    const res = await request(app).get('/api/activities');

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(2);
    expect(res.body[0].company).toBe('Google');
  });

  test('POST /api/activities - should create an activity', async () => {
    const mockActivity = { jobId: 1, company: 'Google', action: 'CREATED' };

    Activity.mockImplementation(() => ({
      save: jest.fn().mockResolvedValue(mockActivity),
      ...mockActivity
    }));

    const res = await request(app)
      .post('/api/activities')
      .send(mockActivity);

    expect(res.statusCode).toBe(201);
  });

  test('POST /api/activities - should return 500 on error', async () => {
    Activity.mockImplementation(() => ({
      save: jest.fn().mockRejectedValue(new Error('DB Error'))
    }));

    const res = await request(app)
      .post('/api/activities')
      .send({ jobId: 1, company: 'Google', action: 'CREATED' });

    expect(res.statusCode).toBe(500);
  });
});