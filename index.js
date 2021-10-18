import express from 'express' 
const app = express()
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

import Oferta from './Clases/Oferta.js'
import {ofertas} from './Datos/ofertas.js' 

app.set('view engine','ejs')
app.use(express.static('./public')); 

app.get('/',(req,res)=>{
    let busquedas = [];
    let busqueda = req.query.nombre; //query=$_get
    if(busqueda != ""){
        for (let i = 0; i < ofertas.length; i++) {
            if(ofertas[i].nombre==busqueda){
                busquedas = [ofertas[i]];
            }          
        }
    }
    else{
        busquedas=[...ofertas];
    }

    res.render('index',{insercionOfertas : busquedas});
})

app.get('/nueva', (req,res) => {
    res.render('form.ejs')
})

app.post('/',(req,res)=>{
    const {nombre,precio}=req.body //body=$_post
    const nuevaOferta=new Oferta(nombre,precio);
    res.render('index',{insercionOfertas:[...ofertas,nuevaOferta]})
})



app.listen(8080,()=>{
    console.log('server started')
})