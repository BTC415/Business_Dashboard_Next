const mongoose = require("mongoose");
const customersModel = require("../models/customersModel");

const connectDB = async () => {
  try {
    const database = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useCreateIndex: true,
      // useFindAndModify: false, 
    });

    console.log("MongoDB connected");
    console.log("DB Counters initialization, if not already");
    // customersModel
    //   .insertMany([{
    //     FirstName: "ABC",
    //     LastName: "DEF",
    //     Phone: "+850",
    //     Email: "a.com"
    //   }])
    //   .catch((e) => console.log("ABC DEF already present!!!", e.message));
  } catch (error) {
    console.log(`Error connecting to DB: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
