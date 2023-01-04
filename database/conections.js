const moongoose = require('mongoose');

const conection = async()=> {
    try {
       await moongoose.set('strictQuery',false);
             moongoose.connect("mongodb://localhost:27017/My_blog",{useNewUrlParser: true});

       console.log("connect ok a BDD My_blog")

    }catch(e) {
        console.log("conection failed")
    }
}

module.exports ={
    conection
}

