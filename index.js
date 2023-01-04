const {conection} = require ('./database/conections')
const express = require('express')
const cors = require('cors')

conection();

//crear servidor

const app = express();
const port =3900;
//configurar cors
app.use(cors());

//converir body a obj js
app.use(express.json());//recibir datos con content-type app/json
app.use(express.urlencoded({extended:true}));//convierte cada prop del body a obj json



//rutas articles
 const rutas_articles = require('./routes/article.routes') 
//cargo las rutas

app.use("/api",rutas_articles)



//crear rutas hardcoded
app.get("/probando",(req, res) => {
    console.log("probando")

    return res.status(200).json([{

        nombre :'facundo',
        apellidos :'acuña',
        rol:'developer',

    },{
        direccion:"moreno",
        numero: 1142,
        ciudad:"tandil",


    }


])
})


// crear servidor y escuchar rutas
app.listen(port,()=>{
    console.log('listening on port',port);
}); 