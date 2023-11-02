const response = require("../utils/response");
const Communities = require("../models/community.model");

exports.createCommunity = async (req,res) => {
    try {
        const {communityName, description, comType} = req.body;

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