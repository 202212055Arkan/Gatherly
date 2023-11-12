const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const eventSchema = new Schema({
    eventName: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    interest:{
        type:String,
        required:true,
    },
    
    location: {
        lg: {type: String},
        lt: {type: String}
    },
    city: {
        type: String
    },
    eventType: {
        type: String, enum: ['online', 'offline', 'hybrid']
    },
    date: {
        type: Date,
        required: true,
        validate: {
            validator: function(value) {
              return value >= new Date();
            },
            message: 'Invalid Date'
          }      
    },
    // comments: 
    // faqs: List<Faq>
    attendees: []
})
module.exports = eventSchema;