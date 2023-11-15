const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const interestSchema = new Schema( {
    interestName: {
        type: String,
        unique: true
    },
    communities:[],
    events: [{
        eventID:String,
        communityId:String
    }]
  })
  module.exports = mongoose.model('Interests', interestSchema)