var express = require("express");
var router = express.Router();
var OFFER = require("../model/offer");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/create", upload.single("image"), async function (req, res, next) {
  try {
    if (!req.file || !req.body.title || !req.body.price || !req.body.desc) {
      throw new Error("plz enter all data");
    }
    
    req.body.image = req.file.filename;
    const data = await OFFER.create(req.body);
    // console.log(data);
    res.status(201).json({
      status: "success",
      message: " data created successfully done",
      data,
    });
  } catch (error) {
    res.status(404).json({
      status: "faild",
      message: error.message,
    });
  }
});

router.get("/view", async function (req, res, next) {
  const data = await OFFER.find();
  // console.log(data);
  try {
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

router.put("/update/:id", upload.single("image"),async function (req, res, next) {
  try {
    if (!req.file || !req.body.title || !req.body.price || !req.body.desc) {
      throw new Error("data did not match");
    }
    id = req.params.id;
    u_data = req.body;
    req.body.image = req.file.filename;
    const datas = await OFFER.findByIdAndUpdate(id, u_data);
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

router.get("/show/:id",upload.single("image"), async function (req, res, next) {
  try {
    id = req.params.id;
    const datas = await OFFER.findById(id);
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
}
);

router.delete("/delete/:id", async function (req, res, next) {
  id = req.params.id;
  result = req.body;
  const data = await OFFER.findByIdAndDelete(id, result);
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

module.exports = router;
