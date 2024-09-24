import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { sendEmailForPasswordChange } from "../utils/email.services.js";

export const signupUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ username: username });
    if (existingUser) {
      console.log("User already exist");
      return res.status(400).json({ message: "User already exist" });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    // console.log('hashed password', hashPassword);

    const newUser = new User({
      username,
      email,
      password: hashPassword,
    });

    await newUser.save();
    console.log("User signed up");
    return res.status(201).json({ message: "User signed up" });
  } catch (error) {
    console.log("Unable to signup", error);
    return res.status(400).json({ message: "Unable sign up" });
  }
};

export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await User.findOne({ username: username });
    if (!existingUser) {
      console.log("User does not exist");
      return res.status(404).json({ message: "User does not exist" });
    }

    bcrypt.compare(password, existingUser.password, (err, data) => {
      if (data) {
        // console.log('Existing user', existingUser);
        // console.log('id ', existingUser._id);
        const authClaims = {
          id: existingUser._id,
          name: username,
          email: existingUser.email,
        };
        const token = jwt.sign(authClaims, process.env.SECRET_KEY, {
          expiresIn: "2d",
        });
        console.log("token ", token);

        res.cookie("token", token, {
          maxAge: 2 * 24 * 60 * 60 * 1000,
          // httpOnly: true,
          sameSite: "none",
          secure: true,
        });

        res.header("token", token);

        console.log("User Logged in");
        return res
          .status(200)
          .json({ id: existingUser._id, token: token, username: username });
      } else {
        console.log("Invalid password", err);
        return res.status(400).json({ message: "Invalid password" });
      }
    });
  } catch (error) {
    console.log("Unable Log in");
    return res.status(400).json({ message: "Unable log in" });
  }
};

export const deleteUser = async (req, res) => {
  const userId = req.params.userId;
  try {
    const deleteUser = await User.findByIdAndDelete(userId);
    if (!deleteUser) {
      console.log("Unable to delete user");
      return res.status(400).json({ message: "Unable to delete user" });
    }

    console.log("User deleted ", userId);
    return res.status(200).json({ message: "User deleted" });
  } catch (error) {
    console.log("Error deleting user", error);
    return res.status(500).json({ message: "Error deleting user" });
  }
};

export const logoutUser = async (req, res) => {
  try {
    res.cookie("token", "", {
      maxAge: 0,
      httpOnly: true,
      secure: true,
    });
    console.log("User logged out");
    return res.status(200).json({ message: "User Logged out" });
  } catch (error) {
    console.log("Unable to Log out");
    return res.status(400).json({ message: "Unable to log out" });
  }
};

export const getProfile = async (req, res) => {
  try {
    const { id } = req.user;
    // console.log("req user", req.user);
    // console.log("id: ", id);
    const user = await User.findById(id);
    if (!user) {
      console.log("Unable to fetch profile");
      return res.status(400).json({ message: "Unable to fetch profile" });
    }
    console.log("Fetched profile");
    return res.status(200).json(user);
  } catch (error) {
    console.log("Unable to fetch profile", error);
    return res.status(400).json(error.message);
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (!users) {
      console.log("Unable to fetch users", users);
      return res.status(404).json({ message: "Unable to fetch users" });
    }

    console.log(" fetched users", users);
    return res.status(200).json(users);
  } catch (error) {
    console.log("Unable to fetch profile", error);
    return res.status(400).json(error);
  }
};

export const forgotPassword = async (req, res) => {
  /*Steps
    - take email
    - get user details
    - create jwt token with email and username
    - call the utils for sending email
  */

  const { email } = req.body;

  if (!email) {
    console.log("Email not provided");
    return res.status(400).json({ message: "Email not provided" });
  }

  try {
    const userDetails = await User.findOne({ email });

    if (!userDetails) {
      console.log("Cannot find user");
      return res.status(404).json({ message: "Cannot find user" });
    }

    const newToken = jwt.sign(
      { username: userDetails.username, email },
      process.env.SECRET_KEY,
      { expiresIn: "10m" }
    );

    await sendEmailForPasswordChange(email, newToken);
    return res
      .status(200)
      .json({ message: "Password reset link sent to email" });
  } catch (error) {
    console.log("Error in the forgot password process", error);
    return res
      .status(404)
      .json({ message: "Error in the forgot password process", data: error });
  }
};

export const resetPassword = async (req, res) => {
  /* Steps
    - take token from params
    - verify user
    - hash password and save
  */

  const { token } = req.params;

  const { newPassword } = req.body;

  try {
    const verifiedUser = jwt.verify(token, process.env.SECRET_KEY);

    const userDetails = await User.findOne({ username: verifiedUser.username });

    if (!userDetails) {
      console.log("User not found");
      return res.status(404).json({ message: "User not found" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await User.updateOne(
      { username: verifiedUser.username },
      { password: hashedPassword }
    );

    console.log("Password reset successfully");
    return res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.log("Error resetting password", error);
    return res
      .status(200)
      .json({ message: "Error resetting password", data: error });
  }
};
