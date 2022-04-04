const catchAsync = require('../utils/catchAsync');
const Source = require('../models/source.model')
const fetch = require('node-fetch');

const domain = 
	`https://newsdata.io/api/1/sources?apikey=${process.env.NEWSDATA_KEY}`
	+ `&language=en`
	+ `&country=us`

const getSources = 
	catchAsync(async (req, res, next) => {
		try {
			const response = await Source.find({})
			res.send(response)
		} catch (err) {
			console.log(err)
			next(err)
		}
	})

const refreshSources = 
	catchAsync(async (req, res, next) => {
		try {
			const response = await fetch(domain)
			const data = await response.json()
			res.send(data)
		} catch (err) {
			console.log(err)
			next(err)
		}
	})

const clearSources = 
	catchAsync(async (req, res, next) => {
		try {
			const response = await Source.deleteMany({})
			res.send(response)
		} catch (err) {
			console.log(err)
			next(err)
		}
	})

module.exports = {
	getSources,
	refreshSources,
	clearSources
}
