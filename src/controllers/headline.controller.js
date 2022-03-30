const Headline = require('../models/headline.model')
const catchAsync = require('../utils/catchAsync')
const fetch = require('node-fetch')

const domain = `https://newsdata.io/api/1/news?apikey=${process.env.NEWSDATA_KEY}&language=en&country=us`

const getHeadlines = catchAsync(async (req, res) => {
	const response = await Headline.find({})
	res.send(response)
})

const refreshHeadlines = catchAsync(async (req, res) => {
	const response = await fetch(domain)
	const data = await response.json()
	await Headline.remove({})
	const saveResponse = await Headline.insertMany(data.results)
	res.send(saveResponse)
})

const clearHeadlines = catchAsync(async (req, res) => {
	const response = await Headline.remove({})
	res.send(response)
})

module.exports = {
	getHeadlines,
	clearHeadlines,
	refreshHeadlines,
}
