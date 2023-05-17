const uniqueValidator = require('mongoose-unique-validator');
const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  name: String,
  password: String,
  email: {
      type: String,
      unique: true
  },
  role: String
});

adminSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

adminSchema.plugin(uniqueValidator)

module.exports = model('Admin', adminSchema);