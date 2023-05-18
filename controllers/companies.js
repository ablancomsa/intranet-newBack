const companyRouter = require('express').Router();
const Company = require('../models/company');
const User = require('../models/user');
const middleware = require('../utils/middleware');

companyRouter.get('/', async (request, response) => {
  const companies = await Company.find({}).populate('usersContact')
  console.log(companies)
  response.json(companies);
})

companyRouter.get('/:id', async (request, response) => {
  const id = request.params.id;
  console.log(id)
  const company = await Company.findById(id).populate('usersContact')
  response.json(company);
})

companyRouter.post('/', middleware.userExtractor, async (request, response) => {
  const body = request.body;
  const existCompany = await Company.findOne({ name: body.name });

  if (existCompany) {
    response.json(existCompany);
  } else {
    const company = new Company({
      name: body.name
    });
  
    const savedCompany = await company.save();
    response.json(savedCompany);
  }
})

companyRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
  const id = request.params.id;

  const company = await Company.findById(id);
  await company.usersContactes.forEach(async (user) => await User.findByIdAndRemove(id))
  await Company.findByIdAndRemove(id);
  response.status(204).end();
})

module.exports = companyRouter;