import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

// Middleware to protect routes
export const protectRoute = async (req, res, next) => {
  try {
    // Safely access JWT token from cookies
    const token = req.cookies?.jwt;

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized - No Token Provided" });
    }

    let decoded;
    // Verify and decode the token
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Token expired" });
      }
      if (error.name === "JsonWebTokenError") {
        return res.status(401).json({ message: "Invalid token" });
      }
      return res
        .status(500)
        .json({ message: "Server error during token verification" });
    }

    // Fetch the user from the database and exclude the password field
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Attach user data to the request object for downstream access
    req.user = user;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error("Error in protectRoute middleware: ", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
