// const response = require(".../utils/response");
// // const Communities = require("../models/community.model");
// const communityModel = require(".../models/community.model");
const  response  = require("../../utils/response");
const communityModel = require("../../models/community.model");
const { deleteEventFromInterest } = require("../interest.controller");
// const {  }



exports.shfitEventFromCurrentToPast=async(cid,eid,res)=>
  {
   
    // const events=[];
            try {
                // console.log("Hii");
                    const community = await communityModel.findById(cid);
                    const event = community.currentEvents.find(event => event._id.equals(eid));
                    // Shifting the expired events from current to past
                    if (event) {
                        if (new Date(event.date) <= new Date()) {
                            community.currentEvents = community.currentEvents.filter(event => !event._id.equals(eid));
                            community.pastEvents.push(event);
                        } else {
                            // Adding legit events to the returning object
                            
                            return event;
                           
                        }
                    } else {
                        //If event doesn't exist in interest then delete it as it is possible that event may expired
                       return null;
                        // console.log("Event not found");

                    }

                // response.successResponse(res, events);

            } catch (error) {
                response.notFoundResponse(res, "Problem in community of interest");
            }
        
  }
  