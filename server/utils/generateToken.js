import jwt from 'jsonwebtoken';

const generateToken=(res, userID)=>{ // add userID (that is user._id in database) as payload in JWT, so that we can use this userID to validate the JWT and use this userID to fetch and use user info
    const token = jwt.sign({userID}, process.env.JWT_SECRET, { // creating a JWT token with userID as payload and process.env.JWT_SECRET as the secret key
        expiresIn:'30d'
    });
    res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 30*24*60*60*1000
    })
}

export default generateToken;