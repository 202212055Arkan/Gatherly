const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = require("./event.model");

const communitySchema = new Schema( {
    communityName: {
        type: String,
        required: true
    },
    description:{
        type:String,
        required:true
    },
    comType: {
        type: String,
        required: true
    },
    members: [],
    communityAdmin: {
        type: String,
        required: true
    },
    currentEvents: [eventSchema],
    pastEvents:[]
  })
  module.exports = mongoose.model('Communities', communitySchema)