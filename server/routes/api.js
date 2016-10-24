const express = require('express');

const router = new express.Router();

router.use('/blogs', require('./blogs'));

module.exports = router;
