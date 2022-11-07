const express = require("express");
const router = express.Router();
const addProperty = require("../model/addproperty");
const User = require("../model/userDetails.js")
const multer = require("multer");
const fs = require('fs');
const path = require('path');
const bcrypt = require("bcrypt");
const {sign} = require("jsonwebtoken");
const {isAuth} = require("../isAuth.js");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' +file.originalname )
    }
})

const upload = multer({ storage: storage }).single('add_image');


router.post("/signup",async(req,res)=>{
    const {email,password} = req.body;
    const encryptedPassword = await bcrypt.hash(password, 10);
    const id = Math.floor(Math.random()*100)+"PPD"+Math.floor(Math.random()*1000);

    try {
        const existing = await User.findOne({email});
        if(existing){
            return  res.send({status:"User already exists"})
        }
        await User.create({
            email:email,
            password:encryptedPassword,
            userId : id
        });
        res.send({status:"User Created"})
    }catch(error){
        res.send({status:"error"})
    }
})

router.post("/", async (req, res) => {
    const { email, password } = req.body;
  
    const user = await User.findOne({ email });
    const userId = user.userId;
    if (!user) {
      return res.json({ error: "User Not found" });
    }
    if(await bcrypt.compare(password,user.password)){
        const token= sign({userId}, process.env.JWT_SECRET);
        if(res.status(201)){
            return res.json({ status:"ok", token,user})
        }else{
            return res.json({ error:"error" })
        }
    }
    res.json({status:"error", error:"Invalid password" })
});

router.get("/display" , async (req, res)=>{
    let value = isAuth(req);
    if(value==='navigate to login page'){
        res.status(401).json({
            status : "unauthorized"
        })
    }else{
        await addProperty.find().then((data)=>{
            res.status(200).json({
                status : "success",
                docs : data
            })
        }).catch((err)=>{
            console.log(err);
            res.status(400).json({
                status : 'failed'
            })
        })
    }
})

router.post("/display", async (req,res)=>{
    let value = isAuth(req);
    if(value==="navigate to login page"){
        res.status(401).json({
            status : "unauthorized"
        });
    }else{
        upload(req,res,(err)=>{
            if(err){
                console.log(err);
            }else{
                let newProperty = {...req.body};
                let ppdid = "PPD"+ Math.floor(Math.random()*10000);
                newProperty.PPDID = ppdid;
                newProperty.userId = value;
                newProperty.image = {
                    data : fs.readFileSync(process.cwd()+"/uploads/"+req.file.filename),
                    contentType : "image/png"
                }
                addProperty.create(newProperty,(err,docs)=>{
                    if(err){
                        res.status(400).json({
                            status : "failed",
                            message : err
                        })
                    }else{
                        res.status(200).json({
                            status : "success",
                            message : docs
                        })
                    }
                })
            }
        })
    }
});



module.exports = router;