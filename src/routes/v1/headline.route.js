const express = require('express');
const headlineController = require('../../controllers/headline.controller');
const router = express.Router();

router
	.route('/')
	.get((req, res) => headlineController.getHeadlines(req, res))

module.exports = router;