const { expressjwt } = require("express-jwt");

function authJwt() {
  const secret = process.env.secret;
  const api = process.env.API_URL;
  return expressjwt({
    secret,
    algorithms: ["HS256"],
  }).unless({
    path: [
      // { url: /\/public\/uploads(.*)/, methods: ["GET", "OPTIONS"] },
      // `${api}/users/login`,
      // `${api}/users/signup`,
      { url: /(.*)/ },
    ],
  });
}

module.exports = authJwt;
