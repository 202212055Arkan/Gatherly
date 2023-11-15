const response = require("../utils/response");
const Users = require("../models/user.model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const generateToken = require("../utils/generateToken");
const userModel = require("../models/user.model");
const { shfitEventFromCurrentToPast } = require("./Events/events");

exports.signup = async (req,res) =>{
    try {
        const {email,password,name,phone,city} = req.body;
        let userbymail = await Users.findOne({ email: email });
        if(userbymail)
        {
            return response.recordAlreadyExistResponse(res);
        }
        const user = new Users({
            email: email,
            password: password,
            name: name,
            phone: phone,
            city: city
        })  
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password,salt);
        await user.save();
        response.successfullyCreatedResponse(res,user,"user created successfully");
    } catch (error) {
       console.log(error); 
       response.serverErrorResponse(res,error,"Not created");
    }
}  

exports.login = async (req,res) =>{
    try {
        const {email, password} = req.body;
        let user = await Users.findOne({email: email});
        if(!user)
        {
            return response.notFoundResponse(res,"No such User Exist");
        }
        const ok = await bcrypt.compare(password, user.password);
        if(ok)
        {
            const token = generateToken(user.email);
            const resObj = {
                token : token,
                user : user
            }
            response.successResponse(res,resObj,"Login Successful");
        }
        else
        {
            response.unauthorizedResponse(res,"Invalid Credentials!");
        }
    } catch (error) {
        console.log(error)
        response.serverErrorResponse(res,"Could not login");
    }
}  

exports.editProfile = async (req,res) =>{
    try {
        
    } catch (error) {
        
    }
}  

exports.getAllUsers = async (req,res) =>{
    try {
        const users = await Users.find({});
        response.successResponse(res,users);
    } catch (error) {
        
    }
}  
exports.addCurrentEventInUser = async (req, res) => {
    try {
        const uid = "65421dfc3bd4692937316f6d";
        const cid = req.body.communityId;
        const eid = req.body.eventID;

        const user = await userModel.findById(uid);

        if (user) {
            // Check if user.events is undefined, and initialize it if needed
          
            if (!Array.isArray(user.events.upcommingEvents)) {
                user.events.upcommingEvents = [];
            }
            console.log(user.events.upcommingEvents);
            user.events.upcommingEvents.push({eventID:eid, communityId:cid });
            await user.save();
            return response.successResponse(res, "Event added successfully");
        } else {
            return response.notFoundResponse(res, "User doesn't Exist");
        }

    } catch (error) {
        console.error(error); // Log the error
        return response.serverErrorResponse(res, "Error in posting event in user");
    }
};

exports.getCurrentEventsInUser=async(req,res)=>{
    try {
        const uid="65421dfc3bd4692937316f6d";
       const user=await userModel.findById(uid);
       const userCurrentEvents=user.events.upcommingEvents;
        const events=[];
        for(const obj of userCurrentEvents)
        {
            const cid=obj.communityId;
            const eid=obj.eventID;
            const event=await shfitEventFromCurrentToPast(cid,eid,res);
            if(!event)
            {
                //if event doesn't exist which means that event is expired
                //That's Why we are shifting that even to past event
                //We are sure that this event is expired not deleted as
                //if we delete the event then that time we will delete event from the user as well
                userCurrentEvents.events.pastEvents.push({cid,eid});
            }
            else
            {
                events.push(event);
            }
        }
        await user.save();
        response.successResponse(res,events);
    } catch (error) {
        response.serverErrorResponse(error,"error in get user current events")
        
    }
    
    
    }