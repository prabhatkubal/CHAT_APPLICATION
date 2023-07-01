// const jwt = require(" jsonwebtoken ");
// const { pool } = require("../config/db.Config");
// const { generateAccessToken } = require("../services/generateTokenService");

// const handleRefreshToken = (req, res) => {
//   const cookies = req.cookies;
//   if (!cookies?.jwt) return res.status(401);
//   console.log(cookies.jwt);
//   const refreshToken = cookies.jwt;
//   let foundUser;
//   pool.query(
//     "SELECT * FROM users WHERE refreshToken = $1",
//     [refreshToken],
//     (err, result) => {
//       if (err) {
//         // Handle the database query error
//         console.error(err);
//         return res.status(500);
//       }

//       foundUser = result.rows[0];
//     }
//   );

//   if (!foundUser) return res.status(403); // Forbidden

//   jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
//     if (err || foundUser.name !== decoded.name) return res.status(403);
//     const accessToken = generateAccessToken(decoded);
//     res.json({ accessToken });
//   });
// };

// module.exports = { handleRefreshToken };
