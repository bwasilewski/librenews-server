const express = require('express');
const sourceController = require('../../controllers/source.controller');
const router = express.Router();

router
	.route('/fetch')
	.get((req, res) => sourceController.getSources(req, res))

router
	.route('/refresh')
	.get((req, res) => sourceController.refreshSources(req, res))

router
	.route('/clear')
	.get((req, res) => sourceController.clearSources(req, res))

module.exports = router;