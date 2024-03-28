var express = require('express');
var router = express.Router();
var ADMIN = require('../model/admin');
var bcrypt = require('bcryptjs');
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    // TODO: replace user and pass values from <https://forwardemail.net>
    user: "amisavani43@gmail.com",
    pass: "xabwnrnjamivhjxa",
  },
});

// async..await is not allowed in global scope, must use a wrapper
async function main(email) {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: 'amisavani43@gmail.com', // sender address
    to: email, // list of receivers
    subject: "Hii ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  //
  // NOTE: You can go to https://forwardemail.net/my-account/emails to see your email delivery status and preview
  //       Or you can use the "preview-email" npm package to preview emails locally in browsers and iOS Simulator
  //       <https://github.com/forwardemail/preview-email>
  //
}

main().catch(console.error);



router.post('/admin', async function (req, res, next) {
    try {
        if (!req.body.username || !req.body.email || !req.body.password || !req.body.mno) {
            throw new Error("data did not match");
        }

        req.body.password = await bcrypt.hash(req.body.password, 8);
        const data= await ADMIN.create(req.body);
        console.log(data);
        main(data.email)
        res.status(201).json({
            status: "data added sucessfully!",
            message: "success",
            data: data
        })
    } catch (error) {
        res.status(404).json({
            status: "data not found!",
            message: error.message
        })
    }
});

router.get('/view', async function (req, res, next) {
    const data = await ADMIN.find();
    console.log(data);
    try {
        res.status(201).json({
            status: "data added sucessfully!",
            message: "success",
            data: data
        })
    } catch (error) {
        res.status(404).json({
            status: "data not found!",
            message: error.message
        })
    }
});



router.post('/login', async function (req, res, next) {
    try {
        const data=await ADMIN.findOne({ email: req.body.email })
        console.log(data);

        const check=await bcrypt.compare(req.body.password, data.password)
        if(!check){
            throw new Error ("Password is incorrect");
        }

        res.status(201).json({
            status: "data added sucessfully!",
            message: "success",
            data: data
        })
    } catch (error) {
        res.status(404).json({
            status: "data not found!",
            message: error.message
        })
    }
});


router.put('/update/:id', async function (req, res, next) {
    try {
        // if (!req.body.username || !req.body.email || !req.body.password || !req.body.mno) {
        //     throw new Error("data did not match");
        // }
        id = req.params.id
        u_data = req.body
        const datas = await ADMIN.findByIdAndUpdate(id, u_data);
        console.log(datas);
        res.status(201).json({
            status: "Data Successfully updated!",
            message: "Success",
            data: datas
        })
    } catch (error) {
        res.status(404).json({
            status: "No Data Found",
            message: error.message
        })
    }
});

// router.get('/show/:id',upload.single("image"), async function (req, res, next) {
//     try {      
//         id = req.params.id
//         const datas = await SIGNUP.findById(id);
//         // console.log(datas);
//         res.status(201).json({
//             status: "Data Successfully updated!",
//             message: "Success",
//             data: datas
//         })
//     } catch (error) {
//         res.status(404).json({
//             status: "No Data Found",
//             message: error.message
//         })
//     }
// });

router.post("/forgetpass", async function (req, res, next) {
    try {
      // if (!req.body.email || !req.body.mno) {
      //   throw new Error("Data didn't match!!");
      // }
      const datas = await ADMIN.findOne({ email: req.body.email });
      // const contactno = datas.mno;
      if (!datas) {
        throw new Error("Email is not valid!!");
      }
      if(datas.mno!==req.body.mno){
        throw new Error("Contact no is not valid!!");
      }
  
      res.status(200).json({
        status: "Data Successfully find!",
        message: "Success",
        data: datas,
      });
    } catch (error) {
      res.status(404).json({
        status: "No Data Found",
        message: error.message,
      });
    }
  });

router.delete('/delete/:id', async function (req, res, next) {
    id=req.params.id
    result=req.body
    const data = await ADMIN.findByIdAndDelete(id,result);
    console.log(data);
    try {
        res.status(200).json({
            status: "data delete sucessfully!",
            message: "date success",
            data: data
        })
    } catch (error) {
        res.status(404).json({
            status: "data not found!",
            message: error.message 
        })
    }
});

module.exports = router;