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
        response.serverErrorResponse(res, error, "Not created");
    }
}
exports.createCommunity = async (req, res) => {
    try {
        console.log("here");
        const { communityName, description, comType } = req.body;
        const comByName = await Communities.findOne({ communityName: communityName });
        if (comByName) {
            return response.recordAlreadyExistResponse(res, "Community Already Exist");
        }
        const Community = new Communities({
            communityName: communityName,
            description: description,
            comType: comType
        })
        await Community.save();
        await Interests.findByIdAndUpdate(Community.comType, { $push: { communities: Community._id } });
        response.successfullyCreatedResponse(res, Community, "Community Created Successfully");
    } catch (error) {
        console.log(error);
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
        const community = await communityModel.findByIdAndDelete(cid);
        if (community) {
            //delete community from the admin
            deleteCreatedCommunityFromUser(userId,cid);
            if (community.members) {
                //delete from the user
                community.members.forEach(async (userId) => {
                    try {
                        await deleteJoinedCommunityFromUser(userId, cid);

                    } catch (error) {
                        response.serverErrorResponse(error, "Error in deleteJoinedCommunityFromUser")
                    }
                })
            }
            //delete from the interest
            deleteCommunityOfInterest(community.comType, cid);
            response.successResponse(res, community);
        }
        else {
            response.notFoundResponse(res, "Community doesn't Exist");
        }
    } catch (error) {
        response.serverErrorResponse(error);
    }
}

exports.deleteCommunity = async (req, res) => {
    try {

    } catch (error) {
        console.log(error);
        response.serverErrorResponse(res, error, "Not created");
    }
}