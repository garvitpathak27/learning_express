const mongoose = require('mongoose')

const activitySchema = new mongoose.Schema({
    jobId: Number,
    company: String,
    action: String,
    timestamp: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Activity' , activitySchema);