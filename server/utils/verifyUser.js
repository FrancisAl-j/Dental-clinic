import jwt from "jsonwebtoken";

// Using token and cookies for authentication
export const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  //console.log(token);

  if (!token) {
    return res.status(401).json({ message: "You are not authenticated!" });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) return res.status(401).json({ message: "Token is not valid" });
    req.user = user;
    next();
  });
};

// Using only token on authentication
export const authMiddleware = (req, res, next) => {
  const { token } = req.headers;

  if (!token) {
    return res.status(401).json({ message: "User not authenticated" });
  }

  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.body.userId = token_decode;
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
