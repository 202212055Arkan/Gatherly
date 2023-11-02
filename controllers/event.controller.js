const response = require("../utils/response");
const Communities = require("../models/community.model");
const communityModel = require("../models/community.model");


exports.createEvents=async(req,res)=>{
    try {
        const {cid,eventName, description, location,city,eventType,date} = req.body;
        
    
        const community=await communityModel.findById(cid);
        if(community)
        {
            community.events.push({
                eventName:eventName,
                description:description,
                location:location,
                city:city,
                eventType:eventType,
                date:date
            })
            await community.save();
            response.successfullyCreatedResponse(res,Communities.events,"Event Created");
        }
        else
        {
            response.notFoundResponse(res,"Community Not Found")
        }
        
        
    } catch (error) {
        console.log(error);
        response.serverErrorResponse(res,error,"Not created");

    }
}
exports.deleteEvents=async(req,res)=>{

    try {
        const communityId=req.body.cid;
        const eventId=req.body.eid;
        const community=await communityModel.findById(communityId);
        if(community)
        {
            const event=community.events.id(req.body.eid);
            if(event)
            {
                    const updatedCommunity=await community.findByIdAndUpdate(communityId,
                        {$pull:{events:eventId}},
                        { new: true });
                    if(updatedCommunity)
                    {
                        response.successResponse("Event Deleted");
                    }
            }
            else
            {
                response.notFoundResponse(res,"Event Not Found")
            }

        }
        else
        {
            response.notFoundResponse(res,"Community Not Found")
        }
        
    } catch (error) {
        response.serverErrorResponse(res,error,"Error in deletion of Events");
    }

}