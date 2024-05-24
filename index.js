const express= require("express");
const PORT=8001;
const  {connectToMongoDb}=require("./connection");
const URL=require("./model/url");
const app=express();
const path=require("path");
const urlRoute=require("./routes/url");
const staticRoute=require("./routes/staticRouter");
const userRoute=require("./routes/user");
const cookieParser=require("cookie-parser");
const {chechkForAuthentication,restrictTo}=require("./middleware/auth");

//middleware
connectToMongoDb("mongodb://127.0.0.1:27017/short-url").then(()=>console.log("MongoDb Connected")).catch((err)=>console.log("Connection failed",err));
app.set("view engine","ejs");
app.set('views',path.resolve("./views"));

app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cookieParser());
app.use(chechkForAuthentication);

app.use("/url",restrictTo(["NORMAL","ADMIN"]),urlRoute);
app.use("/",staticRoute);
app.use("/user",userRoute);


app.get('/url/:shortId',async (req,res)=>{
    const shortId=req.params.shortId;
    const entry=await URL.findOneAndUpdate(
        {shortId},
        {$push:
            {visitHistory:
                {timestamp:Date.now()}
            }}
        );
        res.redirect(entry.redirectURL);
    });
    
// app.get("/test", async (req,res)=>{
//     const allUrls= await URL.find({});
//     return res.render("home",{ urls:allUrls });
//     // return res.end("<h1>Hey From Server</h1>")
// });
app.listen(PORT,()=>console.log(`Server started at PORT ${PORT}`));