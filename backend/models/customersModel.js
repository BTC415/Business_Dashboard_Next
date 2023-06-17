const mongoose = require("mongoose");

const CustomersSchema = new mongoose.Schema({
  FirstName: {
    type: String,
    required: true,
  },
  LastName: {
    type: String,
    required: true,
  },
  Phone: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
  },
  Notes: {
    type:String
  }
},
  { timestamps: true }
);

module.exports = mongoose.model("customers", CustomersSchema);
