const router = require("express").Router();
const { BelongsTo } = require("sequelize");
const { User, Post, Comment } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    // Get all posts
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });

    // Serializes the data so it can be read by the template
    const posts = postData.map((posts) => posts.get({ plain: true }));

    // Pass serialized data and session flag into homepage helper template
    res.render("homepage", {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET Post
router.get("/post/:id", async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["name"],
        },
        {
          model: Comment,
          // attributes: [
          //   "description",
          //   "post_id",
          //   "id",
          //   "user_id",
          //   "date_created",
          // ],
          include: {
            model: User,
            attributes: ["name", "id"],
          },
        },
      ],
    });

    const post = postData.get({ plain: true });
    console.log(post);

    res.render("post", {
      ...post,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update Post
router.get("/post/:id/update", async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["name"],
        },
        {
          model: Comment,
          attributes: ["description", "post_id", "id", "user_id"],
          include: { model: User, attributes: ["name", "id"] },
        },
        // Comment,
      ],
    });

    const post = postData.get({ plain: true });
    console.log(post);

    res.render("update_post", {
      ...post,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get Comment
router.get("/comment/:id", async (req, res) => {
  try {
    const commentData = await Comment.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: User,
          attributes: ["name"],
        },
        {
          model: Comment,
          attributes: [
            "description",
            "post_id",
            "id",
            "user_id",
            "date_created",
          ],
          include: {
            model: User,
            attributes: ["name", "id"],
          },
        },
        // Comment,
      ],
    });

    const comment = commentData.get({ plain: true });
    console.log(comment);

    res.render("update_comment", {
      ...comment,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
    console;
  }
});

// Update Comment
router.get("/comment/:id/update", async (req, res) => {
  try {
    const commentData = await Comment.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["name"],
        },
        {
          model: Post,
        },
        // {
        //   model: Comment,
        //   attributes: ["comment_contents", "post_id", "id", "user_id"],
        //   include: { model: User, attributes: ["name", "id"] },
        // },
        // Comment,
      ],
    });

    const comment = commentData.get({ plain: true });
    console.log(comment);

    res.render("update_comment", {
      ...comment,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/dashboard", withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Post }],
    });

    const user = userData.get({ plain: true });

    res.render("dashboard", {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  // If the user is already logged in, redirects to the dashboard
  if (req.session.logged_in) {
    res.redirect("/dashboard");
    return;
  }

  res.render("login");
});

module.exports = router;
