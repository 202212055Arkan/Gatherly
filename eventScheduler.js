const cron = require('node-cron');
const communityModel = require('./models/community.model');
const { deleteEventFromInterest } = require('./controllers/interest.controller');

// Schedule a task to run every hour
cron.schedule('* * * * *', async () => {
    try {
        // Get all communities
        const communities = await communityModel.find();

        // Iterate through each community
        communities.forEach(async (community) => {
            // Get current events that are expired
            const expiredEvents = community.currentEvents.filter((event) => {
                return new Date(event.date) < new Date();
            });
            console.log(new Date());
            // community.save();

            // Move expired events to pastEvents array
            community.pastEvents = community.pastEvents.concat(expiredEvents);
            

            // Remove expired events from currentEvents array
            community.currentEvents = community.currentEvents.filter((event) => {
                return new Date(event.date) >= new Date();
            });
            expiredEvents.forEach(event=>{
                deleteEventFromInterest(community.comType,community._id,event._id);
            })
            // Save the updated community
            await community.save();
        });

        console.log('Event update task completed.');
    } catch (error) {
        console.error('Error updating events:', error);
    }
});
