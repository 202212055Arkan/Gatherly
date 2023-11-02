const response = require("../utils/response");
const Communities = require("../models/community.model");
const Interests = require("../models/interest.model");


exports.getAllCommunity = async (req,res) => {
    try {
        const communities = await Communities.find({});
        response.successResponse(res,communities)
    } catch (error) {
        console.log(error); 
        response.serverErrorResponse(res,error,"Not created");
    }
}
exports.createCommunity = async (req,res) => {
    try {
        console.log("here");
        const {communityName, description, comType} = req.body;
        const comByName = await Communities.findOne({communityName : communityName});
        if(comByName)
        {
            return response.recordAlreadyExistResponse(res,"Community Already Exist");
        }
        const  Community = new Communities({
            communityName: communityName,
            description: description,
            comType: comType
        }) 
        await Community.save();
        await Interests.findByIdAndUpdate(Community.comType,{$push: {communities: Community._id}});
        response.successfullyCreatedResponse(res,Community,"Community Created Successfully");
    } catch (error) {
        console.log(error); 
        response.serverErrorResponse(res,error,"Not created");
    }
}

exports.deleteCommunity = async (req,res) => {
    try {
        
    } catch (error) {
        console.log(error); 
        response.serverErrorResponse(res,error,"Not created");
    }
}