const Headline = require('../models/headline.model')
const catchAsync = require('../utils/catchAsync')
const fetch = require('node-fetch')

const domain = `https://newsdata.io/api/1/news?apikey=${process.env.NEWSDATA_KEY}&language=en&country=us`

const getTopStories = 
	catchAsync(async (req, res, next) => {
		try {
			const response = await Headline.find({category: 'top'}).limit(5).sort([['pubDate', -1]])
			res.send(response)
		} catch (err) {
			next(err)
		}
	})

const getHeadlines = 
	catchAsync(async (req, res, next) => {
		try {
			const limit = req.query.size ? parseInt(req.query.size) : 20
			const query = req.query.category ? 
				{ category: req.query.category } : { category: { $ne: 'top' }}
			const response = await Headline.find(query).limit(limit).sort([['pubDate', -1]])
			res.send(response)
		} catch (err) {
			next(err)
		}
	})

const refreshHeadlines = 
	catchAsync(async (req, res, next) => {
		try {
			const response = await fetch(domain)
			const data = await response.json()
			// TODO: only remove records that are older than 2(?) weeks
			// const docs = await Headline.create(data.results)
			const promises = data.results.map(async (result) => {
				return await Headline.findOneAndUpdate(
					{ link: result.link },
					result, 
					{ new: true, upsert: true }
				)
			})
			const docs = await Promise.all(promises)

			res.send(docs)
		} catch (err) {
			next(err)
		}
	})

const clearHeadlines = 
	catchAsync(async (req, res, next) => {
		try {
			const response = await Headline.deleteMany({})
			res.send(response)
		} catch (err) {
			next(err)
		}
	})

module.exports = {
	getHeadlines,
	getTopStories,
	clearHeadlines,
	refreshHeadlines,
}
