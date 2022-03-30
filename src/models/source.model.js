const mongoose = require('mongoose')
const { toJSON } = require('./plugins');

const sourceSchema = mongoose.Schema(
	{
		id: {
			type: String,
			unique: true,
		},
		name: String,
		url: String,
		description: String,
		category: [String],
		language: [String],
		country: [String],
	}, {
		timestamps: true
	}
)

sourceSchema.plugin(toJSON)


/**
 * @typedef Source
 */
const Source = mongoose.model('Source', sourceSchema, 'source');

module.exports = Source;