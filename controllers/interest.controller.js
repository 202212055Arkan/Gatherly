const response = require("../utils/response");
const Interests = require("../models/interest.model");
const interestModel = require("../models/interest.model");
const communityModel = require("../models/community.model");

exports.addInterest = async (req, res) => {
    try {
        const { interestName } = req.body;
        let interestbyname = await Interests.findOne({ interestName: interestName });
        if (interestbyname) {
            return response.recordAlreadyExistResponse(res, "Interest Already Exist");
        }
        const interest = new Interests({
            interestName: interestName
        })
        await interest.save();
        response.successfullyCreatedResponse(res, interest, "Interest Created Successfully");
    } catch (error) {
        console.log(error);
        response.serverErrorResponse(res, error, "Not created");
    }
}

exports.getAllInterest = async (req, res) => {
    try {
        const interests = await Interests.find({});
        response.successResponse(res, interests);
    } catch (error) {
        console.log(error);
        response.serverErrorResponse(res, error, "Not created");
    }
}
exports.deleteInterests = async (req, res) => {
    try {
        const obj = await Interests.deleteMany({});
        response.successResponse(res, obj);
    } catch (error) {
        console.log(error);
        response.serverErrorResponse(res, error, "Not created");
    }
}
exports.addEventInIntrest = async (intrestName, eventId, communityId, res) => {
    try {
        console.log("Hello");
        const interest = await interestModel.findOne({ interestName: intrestName });
        if (interest) {
            interest.events.push({
                eventID: eventId,
                communityId: communityId
            });
            interest.save();
            console.log("Event added to the intrest");
        }
        else {
            console.log("Intrest doesn't Exist")
        }
    } catch (error) {
        console.log("Error in adding Event in intrest");
    }
}
exports.addCommunityInIntrest = async (intrestName, communityId, res) => {
    try {

        const interest = await interestModel.findById(intrestName);
        if (interest) {
            interest.communities.push({
                communityId: communityId
            });
            interest.save();
            console.log("Community added to the intrest");
        }
        else {
            console.log(res, "Intrest doesn't Exist")
        }
    } catch (error) {
        console.log(error, "Not created");
    }
}
exports.deleteEventFromInterest = async (intrestName, communityId, eventId, res) => {
    try {

        const updatedInterests = await interestModel.findOneAndUpdate(
            {
                interestName: intrestName
            },
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
        if (updatedInterests) {
            updatedInterests.save();
            console.log("Event deleted Sucessfully");
        }
        else {
            console.log("Response Not Found");
        }
    }
    catch (error) {
        console.log(error, "Not created");
    }

}
exports.deleteCommunityOfInterest = async (intrestName, communityId, res) => {
    try {

        const updatedInterests = await interestModel.findOneAndUpdate(
            {
                interestName: intrestName
            },
            {
                $pull: {
                    communities: {
                        communityId: communityId,
                    },
                },
            },
            { new: true }
        );

        if (updatedInterests) {
            this.deleteAlltheEventOfOneCommunity(communityId,intrestName);
            updatedInterests.save();
            console.log("Community deleted Sucessfully");
        }
        else {
            console.log("Community doesn't Exist");
        }
    }
    catch (error) {
        console.log(error, "Not created");
    }
}
exports.deleteAlltheEventOfOneCommunity = async (communityId, intrestName) => {
    try {
        console.log(intrestName, communityId);

        const updatedInterests = await interestModel.findOneAndUpdate({
            interestName: intrestName
        },
            {
                $pull: {
                    events: {
                        communityId: communityId,
                    },
                },
            },
            { new: true }
        );
        console.log(updatedInterests);
        if (updatedInterests) {
            updatedInterests.save();
            console.log("Event deleted Sucessfully");
        }
        else {
            console.log("Response Not Found");
        }
    }
    catch (error) {
        console.log(error, "Not created");
    }

}
exports.getEventsOfInterest = async (req, res) => {
    try {
        const interestName = req.params.interestName;
        const interestObj = await interestModel.findOne({ interestName: interestName });
        const events = [];
        console.log("Hello");
        // Filtering out the past events
        if (interestObj) {
            const eventsOfInterest = interestObj.events;

            try {
                for (const obj of eventsOfInterest) {
                    const cid = obj.communityId;
                    const eid = obj.eventID;

                    // Finding events from the community
                    const community = await communityModel.findById(cid);
                    const event = community.currentEvents.find(event => event._id.equals(eid));

                    // console.log(event);

                    // Shifting the expired events from current to past
                    if (event) {
                        if (new Date(event.date) <= new Date()) {
                            community.currentEvents = community.currentEvents.filter(event => !event._id.equals(eid));
                            community.pastEvents.push(event);
                        } else {
                            // Adding legit events to the returning object
                            events.push(...events,event);
                           
                        }
                    } else {
                        //If event doesn't exist in interest then delete it as it is possible that event may expired
                        this.deleteEventFromInterest(interestName,cid,eid);
                        console.log("Event not found");
                    }
                }

                // Returning all the legit events
                // console.log("-->", events);
                response.successResponse(res, events);

            } catch (error) {
                response.notFoundResponse(res, "Problem in community of interest");
            }
        } else {
            response.notFoundResponse(res, "Interest doesn't exist");
        }

    } catch (error) {
        response.notFoundResponse(res, "Problem in getting events of the particular interest");
    }
}

