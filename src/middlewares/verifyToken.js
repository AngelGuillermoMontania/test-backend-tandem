const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {

    const bearerToken = req.headers["authorization"]   // Check for authorization in headers

    if (bearerToken !== undefined) {
        const bearer = bearerToken.slice(7, bearerToken.length)
        req.token = bearer
        jwt.verify(bearer, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                res.status(401).send("Invalid token")
            } else {
                next()
            }
        })
    } else {
        res.status(403).send("Unauthorized")
    }
}