const response = require("../utils/response");
const Interests = require("../models/interest.model");
const interestModel = require("../models/interest.model");

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
        await interest.save();
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
exports.addEventInIntrest=async(intrestName,eventId,communityId,res)=>{
    try {
    
        const interest=await interestModel.findOne({interestName:intrestName});
        if(interest){
            interest.events.push({
                eventID:eventId,
                communityId:communityId
            });
            interest.save();
            console.log("Event added to the intrest");
        }
        else
        {
            console.log("Intrest doesn't Exist")
        }
    } catch (error) {
        console.log("Error in adding Event in intrest");
    }
}
exports.addCommunityInIntrest=async(intrestName,communityId,res)=>{
    try {
       
        const interest=await interestModel.findById(intrestName);
        if(interest){
            interest.communities.push({
                communityId:communityId
            });
            interest.save();
            console.log("Community added to the intrest");
        }
        else
        {
            console.log(res,"Intrest doesn't Exist")
        }
    } catch (error) {
        console.log(error,"Not created");
    }
}
exports.deleteEvent=async(intrestName,communityId,eventId,res)=>{
    try {

        const updatedInterests = await Interests.findOneAndUpdate(
            intrestName,
            {
                $pull: {
                    events: {
                        eventID: eventId,
                        communityId: communityId,
                    },
                },
            },
            { new: true }
        );
        if(updatedInterests)
        {
            updatedInterests.save();
            console.log("Event deleted Sucessfully");
        }
        else
        {
            console.log("Response Not Found");
        }
    }
     catch (error) {
        console.log(error,"Not created");
    }

}
exports.deleteCommunity=async(intrestName,communityId,res)=>{
    try {

        const updatedInterests = await Interests.findOneAndUpdate(
            intrestName,
            {
                $pull: {
                    communities: {
                        communityId: communityId,
                    },
                },
            },
            { new: true }
        );
        
        if(updatedInterests)
        {
            updatedInterests.save();
            console.log("Community deleted Sucessfully");
        }
        else
        {
            console.log("Response Not Found");
        }
    }
     catch (error) {
        console.log(error,"Not created");
    }

}

