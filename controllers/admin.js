const adminRouter = require('express').Router()
const Admin = require('../models/admin')
const bcrypt = require('bcrypt')

adminRouter.post('/', async (request, response) => {
  const body = request.body
  console.log(body)
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new Admin({
    email: body.email,
    name: body.name,
    password: passwordHash,
    role: 'SUPER_ADMIN'
  })

  const savedUser = await user.save()

  response.json(savedUser)
})

module.exports =  adminRouter