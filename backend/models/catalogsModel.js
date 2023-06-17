const mongoose = require("mongoose");

const CatalogsSchema = new mongoose.Schema({

  ProductName:{
    type: String,
    required: true,
  },
  cShopVisiblity:{
    type: Boolean,
    required: true,
  },
  Delivery:{
    type: Boolean,
    required: true,
  },
  ItemPrice:{
    type: Number,
    required: true,
  },
  Quantity:{
    type: String,
    required: true,
  },
  Notes: {
    type:String
  },
  Img:{
    type:Buffer,
  },
  Img1:{
    type:Buffer,
  },
  Img2:{
    type:Buffer,
  },
  Img3:{
    type:Buffer,
  },
},
  { timestamps: true }
);

module.exports = mongoose.model("catalogs", CatalogsSchema);
