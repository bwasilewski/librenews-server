// const httpStatus = require('http-status');
// const pick = require('../utils/pick');
// const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const fetch = require('node-fetch');
// const { userService } = require('../services');

const domain = `https://newsdata.io/api/1/news`
 + `?apikey=pub_5892db3c75ed82d86ca2ce59027532b69f99`
 + `&country=us`
 + `&language=en`

const getHeadlines = catchAsync(async (req, res) => {
	const response = await fetch(domain)
	const headlines = await response.json()
	res.send(headlines)
})

// const getUsers = catchAsync(async (req, res) => {
//   const filter = pick(req.query, ['name', 'role']);
//   const options = pick(req.query, ['sortBy', 'limit', 'page']);
//   const result = await userService.queryUsers(filter, options);
//   res.send(result);
// });

// const getUser = catchAsync(async (req, res) => {
//   const user = await userService.getUserById(req.params.userId);
//   if (!user) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
//   }
//   res.send(user);
// });


module.exports = {
	getHeadlines,
};
