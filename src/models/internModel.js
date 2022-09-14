const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId
const validator = require("validator");

const internSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    email:{
        type: String,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
              throw new Error("email is Invalid");
            }
          },
    },
    mobile:{
      type: String,
      unique: true,
      require: true,
      validate(value) {
        if (!validator.isMobilePhone(value)) {
          throw new Error("invalid mobile number");
        }
      },
     // isMobilePhone(str [, locale [, options]])
    },
    collegeId:{
      type: ObjectId,
      ref: 'collage'
    },
    isDeleted:{
      type: Boolean,
      default: false
    },
  }, { timestamps: true });





module.exports = mongoose.model('intern', internSchema)



// { name: {mandatory}, email: {mandatory, valid email, unique}, mobile: {mandatory, valid mobile number, unique},
// collegeId: {ObjectId, ref to college model, isDeleted: {boolean, default: false}}