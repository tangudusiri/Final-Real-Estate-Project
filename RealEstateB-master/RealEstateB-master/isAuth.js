const {verify} = require("jsonwebtoken");

const isAuth = (req)=>{
    const token = req.headers["authorization"];
    if(!token){
        return "navigate to login page";
    }
    const {userId} = verify(token,process.env.JWT_SECRET);
    return userId;
}
module.exports = { isAuth };