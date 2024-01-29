 const express = require("express")
 const cors = require("cors")
 const nodemailer = require("nodemailer");
const mongoose = require("mongoose")
 const app = express()
app.use(cors())
 app.use(express.json())

mongoose.connect("mongodb+srv://sarathi123:Godgreat45@cluster0.ui0a92m.mongodb.net/passkey?retryWrites=true&w=majority").then(function(){
    console.log("connected to DB")
}).catch(function(){console.log("Failed to connect")})

const credential=mongoose.model("credential",{},"bulkmail")






app.post("/sendmail",function(req,res){



    var msg =req.body.msg
    var emaillist=req.body.emaillist


    credential.find().then(function(data){

        const transporter = nodemailer.createTransport({
            service:"gmail",
            auth: {
              // TODO: replace `user` and `pass` values from <https://forwardemail.net>
              user:data[0].toJSON().user,
              pass:data[0].toJSON().pass,
            },
          });
    
          new Promise(async function(reslove,reject){
    
            try{
    
                for(var i=0;i<emaillist.length;i++)
            {
               await transporter.sendMail(
                    {
                        from:"sarathiranjith.900@gmail.com",
                        to:emaillist[i],
                        subject:"A message from bulk mail app",
                        text:msg
                
                    }
                )
    
                console.log("Email sent to:"+emaillist[i])
            }
        reslove("success")
            }
        
            catch(error)
            {
                reject("failed")
            }
        }).then(function(){
            res.send(true)
        }).catch(function(){
            res.send(false)
        })
    
    
    
    }).catch(function(error){
        console.log(error)
    })

    
   
   
   
})



 app.listen(5000,function()
 {
    console.log("server started")
 })