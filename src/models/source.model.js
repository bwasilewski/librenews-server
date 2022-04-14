const mongoose = require('mongoose')
const { toJSON } = require('./plugins');

const sourceSchema = mongoose.Schema(
	{
		api_id: {
			type: String,
			unique: true,
		},
		name: String,
		url: String,
		description: String,
		category: [String],
		language: [String],
		country: [String],
		click_count: {
			type: 0,
			default: 0
		}
	}, {
		timestamps: true
	}
)

sourceSchema.plugin(toJSON)


/**
 * @typedef Source
 */
const Source = mongoose.model('Source', sourceSchema, 'sources');

module.exports = Source;