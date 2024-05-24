//auth using session id
// const sessionIdToUserMap=new Map();

// function setUser(id,user){
//     sessionIdToUserMap.set(id,user);
// }
// function getUser(id){
//    return sessionIdToUserMap.get(id);
// }


//auth using jwt token
const jwt=require("jsonwebtoken");
const secret="Piyush$123@$";

function setUser(user){
  return jwt.sign({_id:user._id,email:user.email,role:user.role},secret);
}
function getUser(token){
    if(!token) return null;
    try {
        return jwt.verify(token,secret);
    } catch (error) {
        return null;
    }
    

}

module.exports={
    getUser,setUser
}
