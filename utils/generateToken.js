const jwt = require('jsonwebtoken');
module.exports = (email) => {
    const jwtToken = jwt.sign({
        email: email
    }, process.env.SECRETKEY, {
        expiresIn: "24h"
    });
    return jwtToken;
}