var express = require("express");
var router = express.Router();
var APPOINMENT = require("../model/appoinment");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: "amisavani43@gmail.com",
    pass: "lhsqmqhngkbfdkku",
  },
});

// async..await is not allowed in global scope, must use a wrapper
async function main(email) {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: "amisavani43@gmail.com", // sender address
    to: email, // list of receivers
    subject: "Hii How are you? ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
}

main().catch(console.error);

router.post("/create", async function (req, res, next) {
  try {
    if (
      !req.body.name ||
      !req.body.email ||
      !req.body.services ||
      !req.body.beautician ||
      !req.body.date ||
      !req.body.desc
    ) {
      throw new Error("data did not match");
    }
    const data = await APPOINMENT.create(req.body);
    main(data.email);
    res.status(201).json({
      status: "data added sucessfully!",
      message: "success",
      data: data,
    });
  } catch (error) {
    res.status(404).json({
      status: "data not found!",
      message: error.message,
    });
  }
});

router.get("/view", async function (req, res, next) {
  try {
    const data = await APPOINMENT.find();
    res.status(200).json({
      status: "data added sucessfully!",
      message: "success",
      data: data,
    });
  } catch (error) {
    res.status(404).json({
      status: "data not found!",
      message: error.message,
    });
  }
});

router.put("/update/:id", async function (req, res, next) {
  try {
    if (
      !req.body.name ||
      !req.body.email ||
      !req.body.services ||
      !req.body.beautician ||
      !req.body.date ||
      !req.body.desc
    ) {
      throw new Error("data did not match");
    }
    id = req.params.id;
    u_data = req.body;
    const datas = await APPOINMENT.findByIdAndUpdate(id, u_data);
    res.status(201).json({
      status: "Data Successfully updated!",
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

router.delete("/delete/:id", async function (req, res, next) {
  try {
    id = req.params.id;
    result = req.body;
    await APPOINMENT.findByIdAndDelete(id, result);
    res.status(200).json({
      status: "success",
      message: "data delete sucessfully!",
    });
  } catch (error) {
    res.status(404).json({
      status: "data not found!",
      message: error.message,
    });
  }
});

router.get("/show/:id", async function (req, res, next) {
  try {
    id = req.params.id;
    const datas = await BEAUTICIAN.findById(id);
    // console.log(datas);
    res.status(201).json({
      status: "Data Successfully updated!",
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

module.exports = router;
