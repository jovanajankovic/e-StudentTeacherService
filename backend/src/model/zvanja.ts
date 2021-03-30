import mongoose from 'mongoose';

//Zvanje sema - sadrzi naziv zvanja (Redovni profesor, Vandredni profesor, Docent...) i tip zvanja (nastavno i nenastavno)

const Schema = mongoose.Schema;

let Zvanje = new Schema({
  naziv: {
    type:String
  },
  tip: {
    type:String
  }
})

//Zvanje.path('_id');

export default mongoose.model("Zvanje", Zvanje, "zvanja")