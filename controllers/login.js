const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const Admin = require('../models/admin')

loginRouter.post('/', async (request, response) => {
  const body = request.body

  const user = await Admin.findOne({ email: body.email })
  console.log("user: ", user)
  const passwordCorrect = user === null ? false : await bcrypt.compare(body.password, user.password)
  
  console.log("passwordCorrect: ", passwordCorrect)

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'Invalid username o password'
    })
  }

  const userForToken = {
    email: user.email,
    id: user._id
  }

  console.log("userForToken: ", userForToken)
// Aca se esta creando el token que tiene la informacion del username y el id firmado digitalmente y guardada en la variable SECRET
  const token = jwt.sign(userForToken, process.env.SECRET, {expiresIn: '12h'})

  response
  .status(200)
  .send({token, email: user.email, name: user.name})
})

module.exports = loginRouter