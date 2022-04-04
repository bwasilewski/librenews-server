const mongoose = require('mongoose')
const { toJSON } = require('./plugins');

const headlineSchema = mongoose.Schema(
	{
		category: [String],
		content: String,
		country: [String],
		creator: [String],
		description: String,
		image_url: String,
		keywords: [String],
		language: String,
		link: {
			type: String,
			unique: true
		},
		pubDate: Date,
		source_id: String,
		title: String,
		video_url: String,
		click_count: {
			type: Number,
			default: 0,
		},
	}, {
		timestamps: true
	}
)

headlineSchema.plugin(toJSON)


/**
 * @typedef Headline
 */
const Headline = mongoose.model('Headline', headlineSchema, 'headline');

module.exports = Headline