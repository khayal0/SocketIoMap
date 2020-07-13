const express = require("express");
const router = express.Router();

router.get("/online", (req, res) => {
  res.send({ response: "I am alive" }).status(200);
});

module.exports = router;
