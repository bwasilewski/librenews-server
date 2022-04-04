const express = require('express');
const headlineController = require('../../controllers/headline.controller');
const router = express.Router();

router
	.route('/fetch')
	.get((req, res, next) => headlineController.getHeadlines(req, res, next))

router
	.route('/refresh')
	.get((req, res, next) => headlineController.refreshHeadlines(req, res, next))

router
	.route('/clear')
	.get((req, res, next) => headlineController.clearHeadlines(req, res, next))

module.exports = router;