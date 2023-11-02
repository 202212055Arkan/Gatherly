const response = require("../utils/response");
const Interests = require("../models/interest.model");

exports.addInterest = async (req,res) => {
    try {
        const {interestName} = req.body;
        let interestbyname = await Interests.findOne({interestName: interestName});
        if(interestbyname)
        {
            return response.recordAlreadyExistResponse(res,"Interest Already Exist");
        }
        const interest = new Interests({
            interestName : interestName
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
        const interests = await Interests.find({});
        response.successResponse(res,interests);       
    } catch (error) {
        console.log(error); 
        response.serverErrorResponse(res,error,"Not created");
    }
}
exports.deleteInterests = async (req,res) => {
    try {
        const obj = await Interests.deleteMany({});
        response.successResponse(res,obj);
    } catch (error) {
        console.log(error); 
        response.serverErrorResponse(res,error,"Not created");
    }
}