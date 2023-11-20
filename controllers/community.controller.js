const response = require("../utils/response");
const Communities = require("../models/community.model");
const Interests = require("../models/interest.model");
const communityModel = require("../models/community.model");
const { deleteCommunityOfInterest } = require("./interest.controller");
const { deleteJoinedCommunityFromUser, deleteCreatedCommunityFromUser } = require("./user.controller");


exports.getAllCommunity = async (req, res) => {
    try {
        const communities = await Communities.find({});
        response.successResponse(res, communities)
    } catch (error) {
        console.log(error); 
        response.serverErrorResponse(res,error,"Not created");
    }
}
exports.createCommunity = async (req, res) => {
    try {
        const { communityName, description, comType } = req.body;

        // Check if comType exists in Interests
        const interest = await Interests.findOne({interestName:comType});
        if (!interest) {
            return response.notFoundResponse(res, "Interest not found");
        }

        // Check if a community with the same name already exists
        const existingCommunity = await Communities.findOne({ communityName });
        if (existingCommunity) {
            return response.recordAlreadyExistResponse(res, "Community Already Exists");
        }

        // Create a new community
        const community = new Communities({
            communityName,
            description,
            comType,
            communityAdmin: req.user._id
        });

        // Save the community to the database
        await community.save();

        // Update the corresponding Interests document
        await Interests.findOneAndUpdate({interestName:comType}, { $push: { communities: community._id } });

        // Send a success response
        response.successfullyCreatedResponse(res, community, "Community Created Successfully");
    } catch (error) {
        console.error(error);
        response.serverErrorResponse(res, error, "Not created");
    }
}


exports.searchCommunity = async (req, res) => {
    try {

    } catch (error) {
        console.log(error);
        response.serverErrorResponse(res, error, "Not created");
    }
}


exports.getCommunityById = async (req, res) => {
    try {
        const cid = req.params.cid;
        const community = await communityModel.findById(cid);
        if (community) {
            response.successResponse(res, community);
        }
        else {
            response.notFoundResponse(res, "Community doesn't Exist");
        }
    } catch (error) {
        response.serverErrorResponse(error, "Error in get Community by id");
    }
}
exports.deleteCommunityById = async (req, res) => {
    try {
        const cid = req.params.cid;
        const community = await communityModel.findById(cid);
        if (community) {
            //delete community from the admin
            const userId = req.user._id;
            deleteCreatedCommunityFromUser(userId,cid);
            if (community.members) {
                //delete from the user
                community.members.forEach(async (userId) => {
                    try {
                        await deleteJoinedCommunityFromUser(userId, cid);

                    } catch (error) {
                        return response.serverErrorResponse(error, "Error in deleteJoinedCommunityFromUser")
                    }
                })
            }
            //delete from the interest
            deleteCommunityOfInterest(community.comType, cid);
            const com = await communityModel.findByIdAndDelete(cid);
            return response.successResponse(res, com);
        }
        else {
            return response.notFoundResponse(res, "Community doesn't Exist");
        }
    } catch (error) {
        console.log(error);
        return response.serverErrorResponse(res,error);
    }
}

exports.deleteCommunity = async (req, res) => {
    try {

    } catch (error) {
        console.log(error);
        response.serverErrorResponse(res, error, "Not created");
    }
}