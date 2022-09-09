require('dotenv').config();
const express = require('express');
const usersRoutes = require('./routes/usersRoutes');
const productsRoutes = require('./routes/productsRoutes');

const app = express();
const PORT = 3000;

app.listen(PORT, () => {
   console.log(`Servidor corriendo en el puerto ${PORT}`);
});

app.use(express.json());
app.use('/login', usersRoutes);
app.use('/products', productsRoutes);


app.get('*',(req, res)=>{
   res.status(404).json({
      ok:false,
      message:"ERROR 404 no se encontro el recurso"
   })
})

