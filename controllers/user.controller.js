const response = require("../utils/response");
const Users = require("../models/user.model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const generateToken = require("../utils/generateToken");

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