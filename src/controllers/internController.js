const internModel = require("../models/internModel.js")
const collageModel = require("../models/collageModel.js")
const validator = require("validator");

const isValid = function (value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true
}

const isVAlidRequestBody = function(requestBody){
    return Object.keys(requestBody).length > 0
}


const createIntern = async function(req,res){
    try {
       const requestBody = req.body

        // const emailRegex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/
        // const nameRegex = /^[a-z\s]+$/i
        const mobileRegex = /^[0-9]{10}$/

        if(!isVAlidRequestBody(requestBody)){
            return res.status(400).send({status: false, msg: "please input intern Details"})
          }

          const { name, mobile, email, collegeName} = requestBody

          if (!isValid(name)) {
            return res.status(400).send({ status: false, msg: 'name is required' })
        }

        if (!isValid(mobile)) {
            return res.status(400).send({ status: false, msg: 'mobile number is required' })
        }

        const isMobileAlreadyUsed = await internModel.findOne({mobile})
        if(isMobileAlreadyUsed){
          return res.status(400).send({status: false, msg: "Mobile no already registered"})
        }

        if(!requestBody.mobile.match(mobileRegex)) 
        return res.status(400).send({status : false, msg : "Invalid format of mobile number"})


        if (!isValid(email)) {
            return res.status(400).send({ status: false, msg: 'email is required' })
        }

        if (!validator.isEmail(email)){
          return res.status(400).send({ status: false, msg: 'invaild email address' })
        }

        const isEmailAlreadyUsed = await internModel.findOne({email})
        if(isEmailAlreadyUsed){
          return res.status(400).send({status: false, msg: "email already registered"})
        }

        if (!isValid(collegeName)) {
          return res.status(400).send({ status: false, msg: 'collegeName is required' })
      }

    let college = await collageModel.findOne({ name: requestBody.collegeName });
    if (!college)
      return res.status(400).send({status: false, msg: "No Such College Found,Please Enter A Valid College Name",});

    let id = college._id;

    let collageId = {
     name : requestBody.name,
     email : requestBody.email,
      mobile : requestBody.mobile,
      collegeId : id
    }
  
    let newIntern = await internModel.create(collageId);
    return res.status(201).send({ status: true, data: newIntern });

    } catch (error) {
        return  res.status(500).send({ status: false, error: error.message });
    }
}


// ----------------------------|| EXPROTING MODULE TO ROUTE.JS ||------------------------------------

module.exports. createIntern = createIntern   // EXPORT INTERN COLLEGE