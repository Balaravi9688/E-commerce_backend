import jwt from "jsonwebtoken";
import constants from "../constants/constants.js";

const authenticateToken = async (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).send({ msg: 'Unauthorized', error: true });
    }
    const tokenWithoutBearer = token.split(' ')[1];

    jwt.verify(tokenWithoutBearer, constants.jwtSecret, (err, decoded) => {
        if (err) {
            return res.status(401).send({ msg: 'Unauthorized', error: true });
        }

        // If token is valid, save decoded token to request for use in other routes
        req.token = decoded.user;
        next();
    });
}

export { authenticateToken };