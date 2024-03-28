var express = require("express");
var router = express.Router();
var SIGNUP = require("../model/signup");
var bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
var jwt = require('jsonwebtoken');

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    // TODO: replace user and pass values from <https://forwardemail.net>
    user: "venussalon2103@gmail.com",
    pass: "mnceuyjxbiggzzpu",
  },
});

// async..await is not allowed in global scope, must use a wrapper
async function main(email) {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: "amisavani43@gmail.com", // sender address
    to: email, // list of receivers
    subject: "Hii ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
}

main().catch(console.error);

router.post("/signup", async function (req, res, next) {
  try {
    if (
      !req.body.username ||
      !req.body.email ||
      !req.body.password ||
      !req.body.mno
    ) {
      throw new Error("data did not match");
    }

    req.body.password = await bcrypt.hash(req.body.password, 10);
    const data = await SIGNUP.create(req.body);
    // console.log(data);
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
  const data = await SIGNUP.find();
  // console.log(data);
  try {
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

router.post("/login", async function (req, res, next) {
  try {
    const data = await SIGNUP.findOne({ email: req.body.email });
    // console.log(data);

    const check = await bcrypt.compare(req.body.password, data.password);
    if (!check) {
      throw new Error("Password is incorrect");
    }
    const token = jwt.sign({ id: data._id }, 'SURAT');

    res.status(200).json({
      status: "login sucessfully!",
      message: "success",
      data,
      token
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
    // if (!req.body.username || !req.body.email || !req.body.password || !req.body.mno) {
    //   throw new Error("data did not match");
    // }
    id = req.params.id;
    u_data = req.body;


    req.body.password = await bcrypt.hash(req.body.password, 10);

    const datas = await SIGNUP.findByIdAndUpdate(id, u_data);
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

router.post("/forgetpass", async function (req, res, next) {
  try {
    // if (!req.body.email || !req.body.mno) {
    //   throw new Error("Data didn't match!!");
    // }
    const datas = await SIGNUP.find({ email: req.body.email });
    const contactno = datas.mno;
    if (!datas) {
      throw new Error("Email is not valid!!");
    }
    if (contactno === !req.body.mno) {
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

router.delete("/delete/:id", async function (req, res, next) {
  id = req.params.id;
  result = req.body;
  const data = await SIGNUP.findByIdAndDelete(id, result);
  // console.log(data);
  try {
    res.status(200).json({
      status: "data delete sucessfully!",
      message: "date success",
      data: data,
    });
  } catch (error) {
    res.status(404).json({
      status: "data not found!",
      message: error.message,
    });
  }
});

router.get("/findbyid", async function (req, res, next) {
  try {
    const data = await SIGNUP.findOne({ _id: req.query.id });
    res.status(200).json({
      status: "success",
      message: "date find success",
      data
    });
  } catch (error) {
    res.status(404).json({
      status: "data not found!",
      message: error.message,
    });
  }
});

module.exports = router;
