const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// var validateEmail = function(email) {
//     var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
//     return re.test(email)
// };

let userSchema = new Schema({
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        // validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password:{
        type: String,
        required: true
    },
    name: {
        type: String,
        require: true
    },
    phone: {
        type: String,
        required:true,
        validate: {
            validator: function(v) {
                var re = /^\d{10}$/;
                return (!v || !v.trim().length) || re.test(v)
            },
            message: 'Provided phone number is invalid.'
        }
    },
    interests:[],
    events: {
        upcommingEvents:[{
            eventID:String,
            communityId:String
        }],
        pastEvents:[{
            eventID:String,
            communityId:String
        }]
    },
    communities:{
        joined:[{communityId:String}],
        created:[{communityId:String}]
    },
    city:{
        type: String,
        required:true
    }
})

module.exports = mongoose.model('User', userSchema)