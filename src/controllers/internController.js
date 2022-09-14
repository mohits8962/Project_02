const internModel = require("../models/internModel.js")
const collageModel = require("../models/collageModel.js")


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

        if(requestBody.mobile.length !== 10){
            return res.status(400).send({ status: false, msg: 'invalid mobile number ' })
         }

        if (!isValid(email)) {
            return res.status(400).send({ status: false, msg: 'email is required' })
        }

        const isEmailAlreadyUsed = await internModel.findOne({email})
        if(isEmailAlreadyUsed){
          return res.status(400).send({status: false, msg: "email already registered"})
        }

    let college = await collageModel.findOne({ name: requestBody.collegeName });
    if (!college)
      return res.status(400).send({status: false, msg: "No Such College Found,Please Enter A Valid College Name",});

    let id = college._id;

    let collageId = {};
    collageId.name = requestBody.name;
    collageId.email = requestBody.email;
    collageId.mobile = requestBody.mobile;
    collageId.collegeId = id;
  
    let newIntern = await internModel.create(collageId);
    return res.status(201).send({ status: true, data: newIntern });

    } catch (error) {
        return  res.status(500).send({ status: false, error: error.message });
    }
}




module.exports. createIntern = createIntern