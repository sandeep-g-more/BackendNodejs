import express from 'express';
import jwt from "jsonwebtoken"


const router = express.Router();

const verifyJwtAsync = (token, secret) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                reject(err);
            } else {
                resolve(user);
            }

        })
    })
}
// this is the middleware of the protected route.

async function authenticateJWT(req, res, next) {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.sendStatus(401);
    }
    try {
      const user = await verifyJwtAsync(
        token,
        process.env.SECRET_KEY
      );
      req.user = user;
      next();
    } catch (err) {
      return res.sendStatus(403);
    }
  } else {
    res.sendStatus(401);
  }
}

router.get('/profile', authenticateJWT, (req, res) => {
  res.json({ message: "This is a protected route.", user: req.user });
});

// export router
export default router;
