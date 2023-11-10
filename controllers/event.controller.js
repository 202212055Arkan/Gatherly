const response = require("../utils/response");
// const Communities = require("../models/community.model");
const communityModel = require("../models/community.model");

exports.getEvents=async(req,res)=>{
    try{
        const cid=req.params.cid;
        const Community=await communityModel.findById(cid);
        if(Community){
            response.successResponse(res,Community.events,"");
        }
        else
        {
            response.notFoundResponse(res,"Community Not Found")
        }
    }
    catch(error)
    {
        response.serverErrorResponse(error,"Error in Fetching Events");
    }
}
exports.createEvents=async(req,res)=>{
    try {
        const {eventName, description, location,city,eventType,date} = req.body;
        
        const cid=req.params.cid;
        const community=await communityModel.findById(cid);
        // console.log(cid)
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
            response.successfullyCreatedResponse(res,community.events,"Event Created");
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
        const communityId=req.params.cid;
        console.log(communityId);
        const community=await communityModel.findById(communityId);
        
        if(community)
        {
         
                community.events = [];
                await community.save();
                response.successResponse(res, "All events deleted successfully");

        }
        else
        {
            response.notFoundResponse(res,"Community Not Found")
        }
        
    } catch (error) {
        response.serverErrorResponse(res,error,"Error in deletion of Events");
    }

}