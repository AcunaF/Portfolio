
const validator = require ("validator");
const validarArticulos =(parametros) =>{

    let validarTitle =  !validator.isEmpty(parametros.title  ) && 
                         validator.isLength(parametros.title,{ min:5, max :25});

    let validarContent =!validator.isEmpty(parametros.content);
    
    if (!validarTitle || !validarContent) {

        throw new Error("info invalid")

    }
}

module.exports ={
    validarArticulos
}