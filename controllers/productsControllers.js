const fs = require('fs');

const listProducts = (req, res) => {
   const productsJSON = JSON.parse(fs.readFileSync('./db/products.json', 'utf8'))
   res.json({
      ok: true,
      msg: productsJSON
   })
}

const newProduct = (req, res) => {
   const author = req.name;
   const authorRole = req.role;
   const productsJSON = JSON.parse(fs.readFileSync('./db/products.json', 'utf8'))
   try{
      if(authorRole == 'ADMIN'){
         let newProd = req.body
         if(newProd.name != undefined || newProd.price != undefined){
            newProd.id = productsJSON.length;
            productsJSON.push(newProd) 
            
            fs.writeFileSync('./db/products.json', JSON.stringify(productsJSON))
            res.status(200).json({
               msg: "Producto agregado por: " + author,
               ok: true
            })
         }else{
            res.status(400).json({
               ok: false,
               msg: 'Producto inválido'
            })
         }
      }else{
         res.status(401).json({
            ok: false,
            msg: 'Usuario no autorizado'
         })
      }
         res.json({
            ok: true,
            msg: 'Nuevo producto'
   })}catch{
      res.status(500).json({
         ok: false,
         msg: 'Algo salio mal'
      })
   }
}

const editProduct = (req, res) => {
   
   let rolAuthor = req.role;
   
   if(rolAuthor == "ADMIN"){

      let {id} = req.params;
   let {nombre, precio} = req.body;
   
   

   if(!nombre && !precio){
      return res.status(412).json({
         ok:false,
         message:"los parametros no son los esperados"
      });
   }
   
   try {
      
   let productos = fs.readFileSync('./db/products.json','utf-8')
   productos = JSON.parse(productos);

   let productsModificado = productos.map((p)=>{
      if(p.id == id){
         p.nombre = nombre === undefined ? p.nombre : nombre;
         p.precio = precio === undefined ? p.precio : precio;
         return p;
      }else{
         return p;
      }
   }) 

   fs.writeFileSync('./db/products.json',JSON.stringify(productsModificado));

   res.json({
      ok: true,
      msg: 'Producto editado'
   })


   } catch (error) {
      return res.status(500).json({
         ok:false,
         msg:"internal error"
      })
   }

   }else{

      return res.status(401).json({
         ok:false,
         message:"usuario no authorizado"
      })

   }
   
}

const deleteProduct = (req, res) => {
   let {id} = req.body;
   try{
      let productos = fs.readFileSync('./db/products.json','utf-8')
      productos = JSON.parse(productos); 
      
      if(!productos.some(p => p.id == id)){
         return res.status(204).json({
            ok: false,
            msg: 'Producto no encontrado'
         })
      }
      
      let productsFilter = productos.filter(p => p.id != id);
      
      fs.writeFileSync('./db/products.json',JSON.stringify(productsFilter));

      return res.status(200).json({
         ok: true,
         msg: 'Producto eliminado'
      })
      
   }catch(e){
      console.log(e);
   }
}

module.exports = {
   listProducts,
   newProduct,
   editProduct,
   deleteProduct
}