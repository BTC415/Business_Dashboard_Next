const catalogsModel = require("../models/catalogsModel");
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5, // 5MB
    files: 5 // maximum of 5 files
  }
});
const singleUpload = upload.single('Img');
const multiUpload = upload.array('Img');



exports.find = async (req, res) => {
  try {
    const list = await catalogsModel.find();
    res.status(200).json({
      success: true,
      data: list,
    });
  } catch (error) {
    console.log("API error", error);
    if (!res.headersSent) {
      res.send(500).json({
        success: false,
        error: "Server error",
      });
    }
  }
};
exports.findImageById = async (req, res) => {
  try {
    const id = req.params.id;
    const image = await catalogsModel.find({ _id: id });

    if (!image) {
      throw new Error('Image not found');
    }
    res.set('Content-Type', 'image/jpeg');
    res.send(image[0].Img);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving image from database');
  }
};
exports.findById = async (req, res) => {
  try {
    const id = req.params.id;
    const list = await catalogsModel.find({ _id: id });
    res.status(200).json({
      success: true,
      data: list,
    });
  } catch (error) {
    console.log("API error", error);
    if (!res.headersSent) {
      res.send(500).json({
        success: false,
        error: "Server error",
      });
    }
  }
};
exports.add = async (req, res) => {
  try {
    if(req.file)console.log("file");
    if(req.files)console.log("files");
    if(req.Img)console.log("Img");
    if(req.data)console.log("data");
    if (req.files?.length > 1 && Array.isArray(req.files['Img'])) {
      multiUpload(req, res, async function (err) {
        if (err) {
          return res.status(400).json({ message: 'Error uploading files' });
        }
        const files = req.files;
        const imageBuffers = files.map((file, id) => ({ [`Img${id > 0 ? id : ''}`]: Buffer.from(file.buffer) }))
        const catalog = await catalogsModel.create({ ...req.body, ...imageBuffers });
        res.status(201).json({
          success: true,
          data: catalog,
        });
      });
    } else {
      singleUpload(req, res, async function (err) {
        if (err) {
          // handle the error here
          return res.status(400).json({ message: 'Error uploading file' });
        }
        if (req.file) {
          const imageBuffer = Buffer.from(req.file.buffer);
          const catalog = await catalogsModel.create({ ...req.body, Img: imageBuffer });
          res.status(201).json({
            success: true,
            data: catalog,
          });
        } else {
          const catalog = await catalogsModel.create(req.body);
          res.status(201).json({
            success: true,
            data: catalog,
          });
        }
        // fs.writeFile(`./uploads/${file.originalname}`, file.buffer, function (err) {
        //   if (err) {
        //     // handle the error here
        //     return res.status(500).json({ message: 'Error saving file' });
        //   }

        //   // return a success response
        //   return res.status(200).json({ message: 'File uploaded successfully' });
        // });
      });
    }


  } catch (error) {
    console.log("API error", error);
    if (!res.headersSent) {
      res.send(500).json({
        success: false,
        error: "Server error",
      });
    }
    return;
  }
};
exports.update = async (req, res) => {
  try {

    const customer = await catalogsModel.updateOne(
      { _id: req.body._id },
      {
        $set: {
          ...req.body
        }
      }
    );
    res.status(201).json({
      success: true,
      data: customer,
    });
  } catch (error) {
    console.log("API error", error);
    if (!res.headersSent) {
      res.send(500).json({
        success: false,
        error: "Server error",
      });
    }
    return;
  }
};
