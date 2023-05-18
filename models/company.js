const uniqueValidator = require('mongoose-unique-validator');
const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  name: String,
  usersContact: [
    {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
    }
  ]
})

companySchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

companySchema.plugin(uniqueValidator);

module.exports = mongoose.model('Company', companySchema);