const router = require('express').Router()
const db = require("../models")
const bcrypt = require('bcrypt');

const { User } = db

router.post('/', async (req, res) => {
    let user = await User.findOne({
      where: {email: req.body.email}
    })

    if(!user || !await bcrypt.compare(req.body.password, user.passwordDigest)) {
      res.status(404).json({
        message: "Couldn't find user with provided credentials"
      })
    } else {
      res.json({user});
    }
});

module.exports = router;