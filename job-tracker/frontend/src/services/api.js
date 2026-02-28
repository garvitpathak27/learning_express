import axios from 'axios'

const jobAPI = axios.create({
  baseURL: 'http://localhost:8082'
});

const notificationAPI = axios.create({
  baseURL: 'http://localhost:3001'
});

export const getAllJobs = () => jobAPI.get('/api/jobs');
export const createJob = (job) => jobAPI.post('/api/jobs', job);
export const updateJob = (id, job) => jobAPI.put(`/api/jobs/${id}`, job);
export const deleteJobs = (id) => jobAPI.delete(`/api/jobs/${id}`);

// Dashboard and other components expect `deleteJob` and `getActivities`
export const deleteJob = (id) => deleteJobs(id);

export const getActivities = () => notificationAPI.get('/api/activities');