const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('express-async-errors')
const loginRouter = require('./controllers/login')
const companyRouter = require('./controllers/companies')
const userRouter = require('./controllers/users')
const middleware = require('./utils/middleware')
const adminRouter = require('./controllers/admin')
const app = express()

const mongoUrl = process.env.MONGODB_CNN
mongoose.connect(mongoUrl)

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)
app.use('/api/admin', adminRouter)
app.use('/api/login', loginRouter)
app.use('/api/users', userRouter)
app.use('/api/company', companyRouter)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)



module.exports = app