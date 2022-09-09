const fs = require('fs')
const generateJWT = require("../helpers/generateJWT")
const login = async (req, res) => {
   try{
     const {email, password} = req.body;
     const usersJSON = JSON.parse(fs.readFileSync('./db/users.json', 'utf8'))
     const userFound = usersJSON.find(user => user.email == email)
     console.log(userFound)
     if(userFound && userFound.password === password)
     {
         const token = await generateJWT(userFound);
         return res.json({
            token,
            ok: true,
            msg: 'Usuario logueado'
         })
     }else if(userFound.password !== password){
         res.status(401).send({
            msg:"Contrasena incorrecta"})
     }else{
      res.status(401).send({
         msg:"Usuario incorrecto"})
     }
   }catch(error){
      console.log(error);
      res.status(500).send({
         msg:'Error del servidor'})
      
}
}

module.exports = {
   login
}