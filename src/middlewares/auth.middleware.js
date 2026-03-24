const jwt = require("jsonwebtoken");

async function authMiddleware(req, res, next) {
const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.role == "user") {
            return res
                .status(200)
                .json({ 
                message:"user fetched successfully",
                user: {
                    id: decoded.userId,
                    role: decoded.role,
                    username: decoded.username,
                    email: decoded.email,
                },

                });
        }
        next(); 
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
}


const authUpdateMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;  

    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = {
  authMiddleware,
  authUpdateMiddleware,
};
 