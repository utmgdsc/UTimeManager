const jwt = require("jsonwebtoken")


const authenticateToken = (req, res, next) => {

    // Get the token from the auth header (where it would be stored)
    const authHeader = req.headers["authentication"];
    const token = authHeader.split(' ')[1]

    // Verify that there is a token
    if(token == NULL) {
        // Bad request
        // Code subject to change
        res.sendStatus(401);
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, id) => {
        
        if(err) {
            // Status subject to change
            res.sendStatus(403);
        }

        req.id = id;

        next();
    })

}

export default authenticateToken;