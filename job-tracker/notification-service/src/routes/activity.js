const express = require('express')
const router = express.Router();
const Activity = require('../models/Activity');

router.post('/' , async(req , res) => {
    try{
        const activity = new Activity(req.body);
        await activity.save();
        res.status(201).json(activity);
    }
    catch (err){
        res.status(500).json(
            {
                error: err.message
            }
        );
    }
});


router.get('/', async (req, res) => {
  try {
    const activities = await Activity.find().sort({ timestamp: -1 });
    res.json(activities);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;