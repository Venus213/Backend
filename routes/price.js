var express = require("express");
var router = express.Router();
var PRICE = require("../model/price");
const multer = require("multer");
var jwt = require("jsonwebtoken");

/* GET home page. */

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
    if (!req.file || !req.body.title || !req.body.price) {
      throw new Error("data did not match");
    }

    req.body.image = req.file.filename;

    // req.body.token = jwt.sign({ foo: 'bar' }, 'shhhhh');
    const data = await PRICE.create(req.body);
    // console.log(data);

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
  const data = await PRICE.find();
  // var decoded = jwt.verify(req.body.token, 'shhhhh');
  // console.log(decoded.foo);
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

router.put(
  "/update/:id",
  upload.single("image"),
  async function (req, res, next) {
    try {
      if (!req.file || !req.body.title || !req.body.price) {
        throw new Error("data did not match");
      }
      id = req.params.id;
      u_data = req.body;
      req.body.image = req.file.filename;
      const datas = await PRICE.findByIdAndUpdate(id, u_data);
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

router.get(
  "/show/:id",
  upload.single("image"),
  async function (req, res, next) {
    try {
      id = req.params.id;
      const datas = await PRICE.findById(id);
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
  const data = await PRICE.findByIdAndDelete(id, result);
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

/////////****** */
router.get("/nameshow", async function (req, res, next) {
  try {
    console.log("1");
    const data = await PRICE.find({ category: req.query.name });
    console.log(data);
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

module.exports = router;
