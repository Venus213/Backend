var express = require("express");
var router = express.Router();
var SERVICES = require("../model/services");
const multer = require("multer");

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
    if (!req.file || !req.body.name || !req.body.desc) {
      throw new Error("data did not match");
    }

    req.body.image = req.file.filename;

    const data = await SERVICES.create(req.body);
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
  const data = await SERVICES.find();
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
      if (!req.file || !req.body.name || !req.body.desc) {
        throw new Error("data did not match");
      }
      id = req.params.id;
      u_data = req.body;
      req.body.image = req.file.filename;
      const datas = await SERVICES.findByIdAndUpdate(id, u_data);
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
      const datas = await SERVICES.findById(id);
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
      const datas = await SERVICES.findById(id);
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
  const data = await SERVICES.findByIdAndDelete(id, result);
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
    const data = await SERVICES.find({ category: req.query.name });
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
