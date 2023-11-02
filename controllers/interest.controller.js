const response = require("../utils/response");
const Interests = require("../models/interest.model");

exports.addInterest = async (req,res) => {
    try {
        const {name} = req.body;
        let interestbyname = await Interests.findOne({interestName: name});
        if(interestbyname)
        {
            response.recordAlreadyExistResponse(res,"Interest Already Exist");
        }
        const interest = new Interests({
            interestName : name
        })
        interest.save();
        response.successfullyCreatedResponse(res,interest,"Interest Created Successfully");
    } catch (error) {
        console.log(error); 
        response.serverErrorResponse(res,error,"Not created");
    }
}
exports.getAllInterest = async (req,res) => {
    try {
        const interest = await Interests.find({});
        response.successResponse(res,interest);       
    } catch (error) {
        console.log(error); 
        response.serverErrorResponse(res,error,"Not created");
    }
}
exports.deleteInterest = async (req,res) => {
    try {
        
    } catch (error) {
        console.log(error); 
        response.serverErrorResponse(res,error,"Not created");
    }
}