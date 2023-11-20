const jwt = require("jsonwebtoken");
const response = require("../utils/response");
const Community = require("../models/community.model");

exports.verifyUser = async (req, res, next) => {
  const token = req.headers.authorization;
  if(!token)
  {
    return response.unauthorizedResponse(res,"Unathorized");
  }
  console.log(token);
  jwt.verify(token, process.env.SECRETKEY, (err, decoded) => {
    if (err) {
      console.error('JWT verification failed:', err.message);
      return response.unauthorizedResponse(res,"Sign in required");
    } else {
      console.log('JWT verified successfully:', decoded);
      const user ={_id : decoded.id};
      req.user = user;
      next();
    }
  });
};
exports.verifyCommunityAdmin = async (req,res,next) => {
   const cid = req.params.cid;
   const community = await Community.findById(cid);
   if(community){
     if(community.communityAdmin == req.user._id)
     {
      return next();
     }
     else
     {
      return response.unauthorizedResponse(res,"Unauthorized Community access");
     }
   }
   else
   {
    return response.notFoundResponse(res,"Community does not exist");  
   }
};