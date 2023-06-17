const customersModel = require("../models/customersModel");

exports.find = async (req, res) => {
  try {
    const list = await customersModel.find();
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
exports.findById = async (req, res) => {
  try {
    const id = req.params.id;
    const list = await customersModel.find({ _id: id });
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
exports.findByPhone = async (req, res) => {
  try {
    const phone = req.params.phone;
    const list = await customersModel.find({ Phone: phone });
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
    console.log(JSON.stringify(req.body))
    const customer = await customersModel.create(req.body);
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
exports.update = async (req, res) => {
  try {

    const customer = await customersModel.updateOne(
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
