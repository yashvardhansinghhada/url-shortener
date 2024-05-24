const {getUser}=require("../service/auth");

function chechkForAuthentication(req,res,next){
   //restoring to cookie again
   // const authorizationHeaderValue=req.headers["authorisation"];
   const tokenCookie=req.cookies?.token;
   req.user=null;
   // if(!authorizationHeaderValue|| !authorizationHeaderValue.startsWith('Bearer')) return next();
   if(!tokenCookie) return next();

   // const token=authorizationHeaderValue.split("Bearer ")[1];
   // const user=getUser(token);
   // req.user=user;

   const token=tokenCookie;
   const user=getUser(token);
   req.user=user;
   return next();
}

function restrictTo(roles=[]){
   return function(req,res,next){
      if(!req.user) return res.redirect("/login");
      if(!roles.includes(req.user.role)) return res.end("Unauthorised");
      return next();
   };
};

// async function restrictToLoggedInUserOnly(req,res,next){
//    // const userUid=req.cookies?.uid; //cookies method
//    //response method
//    const userUid=req.headers["authorization"];
//    if(!userUid) return res.redirect("/login");

//    const token=userUid.split("Bearer ")[1];
//    // const user=getUser(userUid);
//    const user=getUser(token);
//    if(!user) return res.redirect("/login");

//    req.user=user;
//    next();
// }
// async function checkAuth(req,res,next){
//   // const userUid=req.cookies?.uid; //cookies method
//    //response method
//    const userUid=req.headers["authorization"];

//    const token= userUid.split("Bearer ")[1];
//    // const user=getUser(userUid);
//    const user=getUser(token);

//    req.user=user;
//    next();
// }

// //pehle token generate karo post request se,fir yeh chlega,fir get request karo

module.exports={ chechkForAuthentication,restrictTo};