import express from "express";
import { deleteUser } from "../controllers/users.js";
import { getUser } from "../controllers/users.js";
import { updateUser } from "../controllers/users.js";
import { createUser } from "../controllers/users.js";
import { isCompleted } from "../controllers/users.js";
import { totalBattlesCompleted } from "../controllers/users.js";
import { getPosition } from "../controllers/users.js";
import { createUserTrophies } from "../controllers/usertrophies.js";

//authentication imports
import { check, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/user.js";
import gravatar from "gravatar";

const router = express.Router();

//@route  POST /users
//@desc   Register user
//@access Public
router.post(
  "/register",
  [
    check("user_name", "userName is required")
      .not()
      .isEmpty()
      .custom((value, { req }) => {
        return new Promise((resolve, reject) => {
          User.findOne({ user_name: req.body.user_name }, (err, user) => {
            if (err) {
              reject(new Error("Server Error"));
            }
            if (Boolean(user)) {
              reject(new Error("Username is already in use"));
            }
            resolve(true);
          });
        });
      }),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Plaese enter a passowrd with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { user_name, email, password } = req.body;

    try {
      //see if user exists
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Email is already in use" }] });
      }

      //get user's gravatar
      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm",
      });

      user = new User({
        user_name,
        email,
        avatar,
        password,
      });

      //Ecrypt password using bcrypt
      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();
      let userID = await User.findOne({email: email}).select('_id')
      await createUserTrophies(userID._id, "CSS")

      //Return jsonwebtoken
      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(
        payload,
        process.env.JWTSECRET,
        { expiresIn: 36000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

router.get("/", getUser);
// router.post('/create', createUser);
router.post("/update", updateUser);
router.delete("/delete", deleteUser);
router.get("/battle", isCompleted);
router.get("/total", totalBattlesCompleted);
router.get("/position", getPosition);
export default router;
