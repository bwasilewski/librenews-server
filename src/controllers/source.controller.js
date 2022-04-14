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
			next(err)
		}
	})

const refreshSources = 
	catchAsync(async (req, res, next) => {
		try {
			const response = await fetch(domain)
			const data = await response.json()

			const promises = data.results.map(async result => {
				return await Source.findOneAndUpdate(
					{ api_id: result.id },
					{...result, api_id: result.id},
					{ new: true, upsert:true }
				)
			})

			const docs = await Promise.all(promises)

			res.send(docs)
		} catch (err) {
			console.error(err)
			next(err)
		}
	})

const clearSources = 
	catchAsync(async (req, res, next) => {
		try {
			const response = await Source.deleteMany({})
			res.send(response)
		} catch (err) {
			console.error(err)
			next(err)
		}
	})

module.exports = {
	getSources,
	refreshSources,
	clearSources
}
