const response = require("../utils/response");
// const Communities = require("../models/community.model");
const communityModel = require("../models/community.model");
const { addEventInIntrest, deleteAlltheEventOfOneCommunity, deleteEventFromInterest } = require("./interest.controller");

exports.getCurrentEvents = async (req, res) => {
    try {
        const cid = req.params.cid;
        const Community = await communityModel.findById(cid);
        if (Community) {
            response.successResponse(res, Community.currentEvents, "");
        }
        else {
            response.notFoundResponse(res, "Community Not Found")
        }
    }
    catch (error) {
        response.serverErrorResponse(error, "Error in Fetching Events");
    }
}
exports.getPastEvents = async (req, res) => {
    try {
        const cid = req.params.cid;
        const Community = await communityModel.findById(cid);
        if (Community) {
            response.successResponse(res, Community.pastEvents, "");
        }
        else {
            response.notFoundResponse(res, "Community Not Found")
        }
    }
    catch (error) {
        response.serverErrorResponse(error, "Error in Fetching Events");
    }
}
exports.createEvents = async (req, res) => {
    try {
        const { eventName, description, intrest, location, city, eventType, date } = req.body;

        const cid = req.params.cid;
        const community = await communityModel.findById(cid);
        console.log(req.body);
        if (community) {
            community.currentEvents.push({
                eventName: eventName,
                description: description,
                location: location,
                city: city,
                eventType: eventType,
                intrest: intrest,
                date: date
            })
            await community.save();
            //have to confirm this
            console.log("-->", community.events[0]._id);
            addEventInIntrest(intrest, community.events[0]._id, cid);
            response.successfullyCreatedResponse(res, community.events, "Event Created");
        }
        else {
            response.notFoundResponse(res, "Community Not Found")
        }


    } catch (error) {
        console.log(error);
        response.serverErrorResponse(res, error, "Not created");

    }
}
exports.deleteCurrentEvents = async (req, res) => {

    try {
        const communityId = req.params.cid;
        console.log(communityId);
        const community = await communityModel.findById(communityId);

        if (community) {

            community.currentEvents = [];
            await community.save();
            //checking

            deleteAlltheEventOfOneCommunity(communityId, community.comType);
            response.successResponse(res, "All events deleted successfully");

        }
        else {
            response.notFoundResponse(res, "Community Not Found")
        }

    } catch (error) {
        response.serverErrorResponse(res, error, "Error in deletion of Events");
    }

}
exports.deletePastEvents = async (req, res) => {

    try {
        const communityId = req.params.cid;
        console.log(communityId);
        const community = await communityModel.findById(communityId);

        if (community) {

            community.pastEvents = [];
            await community.save();
            //checking

            // deleteAlltheEventOfOneCommunity(communityId, community.comType);
            response.successResponse(res, "All events deleted successfully");

        }
        else {
            response.notFoundResponse(res, "Community Not Found")
        }

    } catch (error) {
        response.serverErrorResponse(res, error, "Error in deletion of Events");
    }

}
exports.getCurrentEventById = async (req, res) => {
    try {
        const communityId = req.params.cid;
        const eventId = req.params.eid;
        const community = await communityModel.findById(communityId);
        if (community) {
            const foundEvent = community.currentEvents.find(event => event._id.equals(eventId));
            response.successResponse(res, foundEvent, "Event fetched successfully");
        }
        else {
            response.notFoundResponse(res, "Event not found");
        }

    } catch (error) {
        response.serverErrorResponse(res, "Error in event get by id");
    }
}
exports.getPastEventById = async (req, res) => {
    try {
        const communityId = req.params.cid;
        const eventId = req.params.eid;
        const community = await communityModel.findById(communityId);
        if (community) {
            const foundEvent = community.pastEvents.find(event => event._id.equals(eventId));
            response.successResponse(res, foundEvent, "Event fetched successfully");
        }
        else {
            response.notFoundResponse(res, "Event not found");
        }

    } catch (error) {
        response.serverErrorResponse(res, "Error in event get by id");
    }
}
exports.deleteCurrentEventById = async (req, res) => {
    try {
        const communityId = req.params.cid;
        const eventId = req.params.eid;

        const community = await communityModel.findByIdAndUpdate(communityId,
            {
                $pull: {
                    currentEvents: { _id: eventId }
                }
            },
            { new: true }
        )
        if (community) {
            community.save();
            deleteEventFromInterest(community.comType,communityId,eventId);
            response.successResponse(res, community, "Event deleted successfully");
        }
        else {
            response.notFoundResponse(res, "Event not found");
        }

    } catch (error) {
        response.serverErrorResponse(res, "Error in event get by id");
    }
}
exports.deletePastEventById = async (req, res) => {
    try {
        const communityId = req.params.cid;
        const eventId = req.params.eid;

        const community = await communityModel.findByIdAndUpdate(communityId,
            {
                $pull: {
                    pastEvents: { _id: eventId }
                }
            },
            { new: true }
        )
        if (community) {
            community.save();
            // deleteEventFromInterest(community.comType,communityId,eventId);
            response.successResponse(res, community, "Event deleted successfully");
        }
        else {
            response.notFoundResponse(res, "Event not found");
        }

    } catch (error) {
        response.serverErrorResponse(res, "Error in event get by id");
    }
}