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
    
    
}, { timestamps: true });





module.exports = mongoose.model('', internSchema)



// { name: {mandatory}, email: {mandatory, valid email, unique}, mobile: {mandatory, valid mobile number, unique},
// collegeId: {ObjectId, ref to college model, isDeleted: {boolean, default: false}}