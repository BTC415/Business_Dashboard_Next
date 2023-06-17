const express = require("express");
const router = express.Router();
const {
  find,
  add,
  update,
  findImageById,
  findById,
} = require("../controllers/catalogs");
/* Customer */
router
  .route("/")
  .get(find)
  .put(update)
  .post(add);
  // router.route('/upload').post(upload.single('img'),testUpload);
  router.route("/image/:id").get(findImageById);
  router.route("/id/:id").get(findById);
  
// router.route('/').get((req, res) => {
//     res.send({ message: 'Hello from the server!' });
//   });

module.exports = router;
