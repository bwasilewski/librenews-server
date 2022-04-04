const express = require('express');
const sourceController = require('../../controllers/source.controller');
const router = express.Router();

router
	.route('/fetch')
	.get((req, res, next) => sourceController.getSources(req, res, next))

router
	.route('/refresh')
	.get((req, res, next) => sourceController.refreshSources(req, res, next))

router
	.route('/clear')
	.get((req, res, next) => sourceController.clearSources(req, res, next))

module.exports = router;