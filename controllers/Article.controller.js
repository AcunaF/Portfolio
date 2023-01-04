const validator = require ("validator");
const Article = require ("../models/Article")

const test =(req,res) => {

    return res.status(200).json({
        mensaje:"soy una prueba",
    })
};

const datos = (req, res) => {
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
};

const saveArticles = (req, res) => {

    //recojer parametros por post a guardar
    let parametros = req.body;
    //validar datos
    try {
        let validarTitle =  !validator.isEmpty(parametros.title  ) && 
                             validator.isLength(parametros.title,{ min:5, max :25});

        let validarContent =!validator.isEmpty(parametros.content) 

        if (!validarTitle || !validarContent) {

            throw new Error("invalid title!!")

        }

    }catch(err) {
        return res.status(400).json({
            status: 'error danger',
            message:"Error faltan datos"
        })
    }

    //crear el objeto a guardar
    //objeto que esta conectado a la base de datos
    const articulo1 = new Article(parametros); //manera automatica(le agrego parametros)//asignar valores de manera manual articulo1.title = parametros.title; articulo1.content = parametros.content;

    
     //guardar el articulo en BDD y devolver resultados
     articulo1.save((error, saveArticles)=>{
        if (error || !saveArticles){
            return res.status(400).json({
                status: 'error danger',
                message:"No se guardo el articulo"
            });
        }
        return res.status(200).json({
            status:'success',
            articulo1: saveArticles,
            mensaje:" articulo guardado en BDD"
          })
     })
    
};

const getArticles = (req, res) =>{

    let consulta = Article.find({});

    consulta.limit(3);//limite de los 3 ultimos articulos
    consulta.sort({fecha: -1 })//order by date 
            .exec((error, articles)=>{ //metodo que ejecuta la consulta y tiene su propia callback

        if (error || !articles){
            return res.status(400).json({
                status: 'error danger',
                message:"No se encontrado los articulos"
            })
        }
        return res.status(200).send({
            status: 'success',
            count:articles.length,
            articles
        })
    });
}

const getArticlesById = (req, res) =>{

    //recojo el id
    let id = req.params.id;

    //buscar el articulo por id
    Article.findById(id,(error, article) =>{
    //si no existe devolver error
    if (error || !article){
        return res.status(404)({
            status:'error',
            message:'no se guardo el articulo'
        })
    }    
    //si existe devolverlo
    return res.status(200).json({
        status: 'success',
        articles: article

    })
    });

}
const deleteArticle = (req, res) => {

let idDelete = req.params.id;

    Article.findOneAndDelete({_id: idDelete}, (err, articleDelete) => {

        if(err || !articleDelete){
            return res.status(500).json({
                status:"error",
                article: articleDelete,
                message: "Delete no found",
            })
            
        }
        return res.status(200).json({
            status:"success",
            article: articleDelete,
            message: "Delete article ok",
        })
    });

}

const updateArticle = (req, res) => {

    //recojer articulos a editar
    let idupdate = req.params.id;
    //recoje datos por body
    let parametros = req.body;
    //validar datos
    try {
        let validarTitle =  !validator.isEmpty(parametros.title  ) && 
                             validator.isLength(parametros.title,{ min:5, max :25});

        let validarContent =!validator.isEmpty(parametros.content) 

        if (!validarTitle || !validarContent) {

            throw new Error("invalid title!!")

        }

    }catch(err) {
        return res.status(400).json({
            status: 'error danger',
            message:"Error faltan datos"
        })
    }

    //buscar y actualizar articulo
    Article.findByIdAndUpdate({_id:articleId }, req.body,(err, articuloActualizado)=>{

        if(err || !articuloActualizado) {

            return res.status(500).json({
                status:"error",
                message: "updated no found",
            })
        }


        return res.status(200).json({
            status: 'success',
            article :articuloActualizado,
            message:"Actualizado con exitos"
        })
    })

 





}


module.exports ={
    test,
    datos,
    saveArticles,
    getArticles,
    getArticlesById,
    deleteArticle,
    updateArticle

}