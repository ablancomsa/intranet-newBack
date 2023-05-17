const uniqueValidator = require('mongoose-unique-validator');
const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
  name: String,
  total: Number,
  usersContactes: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
})

Company.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Company', userSchema);