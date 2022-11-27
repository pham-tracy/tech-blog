const router = require("express").Router();
const { User } = require("../../models");

// /users to create a new profile
router.post("/", async (req, res) => {
  try {
    const userData = await User.create(req.body);

    // saves the session so users can stay logged in
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// /users/login
router.post("/login", async (req, res) => {
  try {
    // finds user with matching email
    const userData = await User.findOne({ where: { email: req.body.email } });

    // if no matching email is found, error message is presented
    if (!userData) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    // checks matching password for user's email
    const validPassword = await userData.checkPassword(req.body.password);

    // if password is incorrect, error message is presented
    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    // saves the session so users can stay logged in
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      // Successful login
      res.json({ user: userData, message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// users/logout
router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
