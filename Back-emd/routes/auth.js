const router = require("express").Router();
const User = require("../models/User")
const CryptoJS= require("crypto-js")
const jwt = require("jsonwebtoken")
const mailer = require('../utils/mailer');
const bcrypt = require('bcrypt');

//REGISTER

router.post("/register", async (req,res)=>{
    const user = await User.findOne(
        {
            email: req.body.email
        }
      );
      if( user ) {res.status(409).json("Email already exists");return}
    const newUser =new User({
        username: req.body.username,
        email: req.body.email,
        img:req.body.img,
        password: CryptoJS.AES.encrypt
        (req.body.password
        ,process.env.Pass_SEC)
        .toString(),
    });
    try{
    const saveUser = await newUser.save(); 
    bcrypt.hash(req.body.email, parseInt(process.env.Pass_SEC)).then((hashedEmail) => {
        mailer.sendMail("amidateri@gmail.com", "Verify Email", `<a href="https://hommeshop.herokuapp.com/api/auth/verify?email=${req.body.email}&token=${hashedEmail}"> ${req.body.email} </a>`)
    });

    res.status(201).json(saveUser)
    }catch(err){
        res.status(500).json(err);
    }
})
router.get("/verify", async (req,res)=>{
    const user =await User.findOne({email : req.query.email})
    bcrypt.compare(req.query.email, req.query.token,async (err, result) => {
                if (result == true) {
                   
                const updatedUser =  await User.findByIdAndUpdate(
                    user._id,
                    { verif: true }
                    );
                    res.status(201).redirect("https://hommeshop.herokuapp.com/")
            }else{
                res.status(500).redirect("https://hommeshop.herokuapp.com/")
            }    
            })  
        }
    )
//LOGIN
router.post("/login", async (req,res)=>{
    try{
        const user = await User.findOne({email: req.body.email,});
        !user && res.return.status(401).json("Wrong credentials");
        const hashedPassword = CryptoJS.AES.decrypt(
            user.password,
            process.env.Pass_SEC
        );
        const OriginalPassword =hashedPassword.toString(CryptoJS.enc.Utf8);
       if(OriginalPassword !== req.body.password)
       { res.status(401).json("Wrong password"); return}
       
        ;
        const accessToken =jwt.sign(
            {
                id: user._id,
                isAdmin: user.isAdmin,
            },
            process.env.JWT_SEC,{expiresIn:"1d"} );
       
        const {password, ...others}=user._doc;
        res.status(200).json({user,accessToken});
    }catch(err){
        res.status(500).json(err);
    }   
})
//Rest Pass
router.post("/Restpass", async (req,res)=>{
    try{
        const user = await User.findOne({email: req.body.email,});
        !user && res.return.status(401).json("Wrong credentials");
        const hashedPassword = CryptoJS.AES.decrypt(
            user.password,
            process.env.Pass_SEC
        );
        const OriginalPassword =hashedPassword.toString(CryptoJS.enc.Utf8);
       if(OriginalPassword !== req.body.password)
       { res.status(401).json("Wrong password"); return}
       const newpass=CryptoJS.AES.encrypt(req.body.npass,process.env.Pass_SEC).toString()

       update= await User.findByIdAndUpdate(
        user._id,
        { password: newpass }
        );
         res.status(200).json({statust: "ok"});
    }catch(err){
        res.status(500).json({statust: "no"});
    }   
})
//Forgot pass
router.post("/forgotpass", async (req,res)=>{
    const user = await User.findOne(
        {
            email: req.body.email
        }
      );
      if( !user ){res.status(409).json({statust: "no"});return}
    try{
    bcrypt.hash(req.body.email, parseInt(process.env.Pass_SEC)).then((hashedEmail) => {
        mailer.sendMail("amidateri@gmail.com", "resetpass", `<a href="https://hommeshop.herokuapp.com/api/auth/forgotpass?email=${req.body.email}&token=${hashedEmail}&password=${req.body.password}"> ${req.body.email}  ${req.body.password} </a>`)
    });
    res.status(201).json({statust: "ok"})
    }catch(err){
    res.status(500).json({statust: "no"});
    }
})
router.get("/forgotpass", async (req,res)=>{
    const user = await User.findOne(
        {
            email: req.query.email
        })
        
    bcrypt.compare(req.query.email, req.query.token,async (err, result) => {
                if (result == true) {
                const newpass=CryptoJS.AES.encrypt(req.query.password,process.env.Pass_SEC).toString()
                const updatedUser =  await User.findByIdAndUpdate(
                    user._id,
                    { password: newpass }
                    );
                    console.log(updatedUser)
                    res.status(201).json({statust: "ok"}).redirect("https://hommeshop.herokuapp.com/")
            }else{
                res.status(500).redirect("https://hommeshop.herokuapp.com/")
            }    
            })  
        }
    )
module.exports =router