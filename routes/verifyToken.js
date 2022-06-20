import jwt from "jsonwebtoken";

function verify(req, res, next) {
    const token = req.body.bearer;
    if (!token) return res.status(401).send('Access Denied');

    try {
        req.user = jwt.verify(token, 'sadSADASDSADdadsa');
        next();
    } catch (err) {
        res.status(400).send('Invalid Token');
    }
}

export { verify };