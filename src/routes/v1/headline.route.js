const express = require('express');
const headlineController = require('../../controllers/headline.controller');
const router = express.Router();

router
	.route('/fetch')
	.get((req, res) => headlineController.getHeadlines(req, res))

router
	.route('/refresh')
	.get((req, res) => headlineController.refreshHeadlines(req, res))

router
	.route('/clear')
	.get((req, res) => headlineController.clearHeadlines(req, res))

module.exports = router;