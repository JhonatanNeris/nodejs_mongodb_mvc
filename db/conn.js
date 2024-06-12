const mongoose = require('mongoose')

// async function main(){
//      await mongoose.connect('mongodb://localhost:27017/primeirobanco')
//      console.log('Conectou ao Mongoose!')
// }

// main().catch((err) => console.log(err))

async function main(){
     try {
          mongoose.set("strictQuery", true);

          await mongoose.connect("mongodb+srv://jhonatansnx:RiuM15Y4Lc6lzAxG@cluster0.mjxxqf6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")

          console.log("Conectado ao MongoDb online!")
     } catch (error) {
          console.log(`Erro: ${error}`);
          
     }
}

// module.exports = mongoose
module.exports = main