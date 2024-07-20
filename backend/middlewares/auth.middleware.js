import jwt from "jsonwebtoken";

export const verifyJWT = (req, res, next) => {
  // const authHeader = req.headers.authorization;
  const cookieToken = req.cookies.token;

  // console.log('auth token:', authHeader);
  console.log('cookie token:', cookieToken);
  
  if (!cookieToken) {
    console.log("No token provided");
    return res.status(403).json({ message: "No token provided" });
  }

  const token = cookieToken;

  console.log('Extracted token:', token);
  
  try {
    const decoded = jwt.verify(token, "Expense123");
    // console.log('Decoded ',decoded);
    req.user = decoded;
    console.log('User verified', decoded);
    next();
  } catch (error) {
    console.log("Unauthorized token", error);
    res.status(401).json({ message: "Unauthorized token" });
  }
};
