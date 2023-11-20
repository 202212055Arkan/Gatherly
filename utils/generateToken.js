const jwt = require('jsonwebtoken');
module.exports = (userId) => {
    const jwtToken = jwt.sign({
        id: userId
    }, process.env.SECRETKEY, {
        expiresIn: "24h"
    });
    return jwtToken;
}