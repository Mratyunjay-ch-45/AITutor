const express = require('express');
const router = express.Router();
const {getRecommendedVideos,splitVideoIntoSegments,convertDurationToSeconds } = require('../controller/reel');

// Route to get recommended YouTube videos
router.get('/recommended', getRecommendedVideos);
router.get('/split', splitVideoIntoSegments);
router.get('/convert', convertDurationToSeconds);

module.exports = router;
