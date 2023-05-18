const userRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const middleware = require('../utils/middleware');
const User = require('../models/user');
const Company = require('../models/company');
const getNewUsers = require('../utils/helper');

userRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('companySimpleText', {name: 1});
  response.json(users);
});


userRouter.get('/newusers', async (request, response) => {
  try {
    const userData = {
        url: request.query.url,
        email: request.query.email,
        password: request.query.password
    }
    console.log(userData);

    const data = await getNewUsers(userData)

    response.status(200).json({data})
    
  } catch (error) {
      response.status(500).json('error')
      console.log(error);
  }
})

userRouter.post('/', middleware.userExtractor, async (request, response) => {
  const person = request.body;

  const company = await Company.findOne({name: person.companySimpleText});

  const newUserToAdd = new User({
    name: person.name,
    status: person.status,
    description: person.description,
    email: person.email,
    phone: person.phone || 0,
    linkedin: person.linkedin,
    twitter: person.twitter || "x",
    website: person.website || "x",
    role: person.role || "x",
    university: person.university,
    company: person.company,
    companySimpleText: company._id,
    roleCategory: "x",
    imgUrl: person.imgUrl || "x"
  })
  
  

  const savedUser = await newUserToAdd.save();
  company.usersContact = company.usersContact.concat(savedUser._id);
  await company.save();
  
  response.json(savedUser);
})

userRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
  console.log("éntro delete");
  const id = request.params.id;
  console.log(id);
  await User.findByIdAndDelete(id);
  response.status(204).json({message: "User deleted"}).end();
})

module.exports = userRouter;