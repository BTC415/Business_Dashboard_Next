const express = require("express");
const router = express.Router();

const {
  find,
  add,
  findByPhone,
  update,
  findById,
} = require("../controllers/customers");
/* Customer */
router
  .route("/")
  .get(find)
  .put(update)
  .post(add);
  
  router.route("/phone/:phone").get(findByPhone);
  router.route("/id/:id").get(findById);
  
// router.route('/').get((req, res) => {
//     res.send({ message: 'Hello from the server!' });
//   });

module.exports = router;
