const catchAsync = require('../utils/catchAsync');
const Source = require('../models/source.model')
const fetch = require('node-fetch');

const domain = `https://newsdata.io/api/1/sources?apikey=${process.env.NEWSDATA_KEY}&language=en&country=us`

const getSources = catchAsync(async (req, res) => {
	const response = await Source.find({})
	res.send(response)
})

const refreshSources = catchAsync(async (req, res) => {
	const response = await fetch(domain)
	const data = await response.json()
	await Source.remove({})
	const saveResponse = await Source.insertMany(data.results)
	res.send(saveResponse)
})

const clearSources = catchAsync(async (req, res) => {
	const response = await Source.remove({})
	res.send(response)
})

module.exports = {
	getSources,
	refreshSources,
	clearSources
}
