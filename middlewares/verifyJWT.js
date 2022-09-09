
const jwt = require('jsonwebtoken');
const { request } = require('express')

const verifyJWT = (req = request, res, next) => {


  const { authorization: token } = req.headers;

  try {
    const { name, role } = jwt.verify(token, process.env.JWT_PRIVATE);
      req.name = name;
      req.role = role;
      next();
  } catch (error) {
      console.log(error);
      return res.status(401).json({
        ok: false,
        msg: "Token invalido"
      })
  }

}

module.exports = verifyJWT;