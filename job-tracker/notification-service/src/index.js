const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const activityRoutes = require('./routes/activity');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.get('/health', (req, res) => {
  res.json({ status: 'notification service running' });
});

app.use('/api/activities', activityRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Notification service running on port ${process.env.PORT}`);
});