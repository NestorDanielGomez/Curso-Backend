const express = require(`express`);
const router = express.Router();

router.get(`/saludar`, (req, res) => {
  const { message } = req.query;
  if (!message) return res.status(400).json({ msg: "missing message" });
  res.json({ msg: `OK` });
});

module.exports = router;
