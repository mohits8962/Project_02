const internModel = require("../models/internModel.js")
const collageModel = require("../models/collageModel.js")
const validUrl = require('valid-url')


const isValid = function (value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true
}


const createCollage = async function (req, res) {

    try {

        const requestBody = req.body

        if (!requestBody) {
            res.status(400).send({ status: false, msg: 'Data cant be empty' })
        }

        // extract
        const { name, fullName, logoLink } = requestBody

        //validations

        if (!isValid(name)) {
            res.status(400).send({ status: false, msg: 'first name is required' })
        }

        if (!isValid(fullName)) {
            res.status(400).send({ status: false, msg: 'fullname is required' })
        }

        if (!isValid(logoLink)) {
            res.status(400).send({ status: false, msg: 'logoLink is required' })
        }

        if (!validUrl.isUri(logoLink)){
            res.status(400).send({ status: false, msg: 'URL is not valid' })
        } 

        //////

        const newCollage = await collageModel.create(requestBody)
        res.status(201).send({ status: true, msg: 'file created succesfully', data: newCollage })

    }
    catch (err) {
        res.status(500).send({ status: false, error: err.message });
    }
};



module.exports.createCollage = createCollage