import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { signupUserService } from "../models/user-model.js";
import { findUserByUsername } from "../models/user-model.js";
import { findUserByEmail } from "../models/user-model.js";
const saltRounds = 10;

// Standardized response function
const handleResponse = (res, status, message, data = null) => {
  res.status(status).json({
    status,
    message,
    data,
  });
};

export const signupUser = async (req, res, next) => {
  const { fullname, username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  try {
    const user = await signupUserService(
      fullname,
      username,
      email,
      hashedPassword
    );

    console.log(user);

    if (user) {
      try {
        const user = await findUserByUsername(username);
        const token = jwt.sign(
          { id: user.user_id, username: user.username },
          process.env.JWT_SECRET,
          { expiresIn: "6h" }
        );
        console.log(user);
        handleResponse(res, 201, "Registration successfully", { token });
      } catch (err) {
        next(err);
      }
    }
  } catch (err) {
    next(err);
  }
};

export const loginUser = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await findUserByUsername(username);
    if (!user) {
      return handleResponse(res, 400, "Invalid credentials");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return handleResponse(res, 400, "Invalid credentials");
    }

    const token = jwt.sign(
      { id: user.user_id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "6h" }
    );
    handleResponse(res, 200, "Login successfully", { token });
  } catch (error) {
    next(error);
  }
};

export const checkUsernameExists = async (req, res, next) => {
  const { username } = req.params;
  console.log(username);

  try {
    const user = await findUserByUsername(username);
    console.log(user);

    if (user) {
      handleResponse(res, 200, "Username already exists", { exists: true });
    } else {
      handleResponse(res, 200, "Username doesn't exists", { exists: false });
    }
  } catch (err) {
    next(err);
  }
};

export const checkEmailExists = async (req, res, next) => {
  const { email } = req.params;
  console.log(email);

  try {
    const user = await findUserByEmail(email);
    console.log(user);

    if (user) {
      handleResponse(res, 200, "Username already exists", { exists: true });
    } else {
      handleResponse(res, 200, "Username doesn't exists", { exists: false });
    }
  } catch (err) {
    next(err);
  }
};
