
const collageModel = require("../models/collageModel.js")
const validUrl = require('valid-url')



const isValid = function (value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true
}

const isVAlidRequestBody = function(requestBody){
    return Object.keys(requestBody).length > 0
}

const createCollage = async function (req, res) {

    try {

        const requestBody = req.body

        if(!isVAlidRequestBody(requestBody)){
            return res.status(400).send({status: false, msg: "please input collage Details"})
          }

        // extract
        const { name, fullName, logoLink } = requestBody

        //validations

        if (!isValid(name)) {
            return res.status(400).send({ status: false, msg: 'first name is required' })
        }


        if (!isValid(fullName)) {
            return res.status(400).send({ status: false, msg: 'fullname is required' })
        }

        if (!isValid(logoLink)) {
            return res.status(400).send({ status: false, msg: 'logoLink is required' })
        }

        if (!validUrl.isUri(logoLink)){
            return res.status(400).send({ status: false, msg: 'URL is not valid' })
        } 

        const nameAlreadyUse = await collageModel.findOne({name})
      if(nameAlreadyUse){
        return res.status(400).send({status: false, msg: "name already registered"})
      }

        const newCollage = await collageModel.create(requestBody)
        return res.status(201).send({ status: true, msg: 'file created succesfully', data: newCollage })

    }
    catch (err) {
        return  res.status(500).send({ status: false, error: err.message });
    }
};



module.exports.createCollage = createCollage