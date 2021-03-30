import mongoose from 'mongoose';

/*
Termin sema - sadrzi dan i vreme termina za odrzavanje vezbi i predavanja,
 zamisljeno je da je moguce izabrati sve radne dane od Ponedeljka do Petka
i vremena u periodu od 08h - 22h
*/

const Schema = mongoose.Schema;

let Termin = new Schema({
  dan: {
    type:String
  },
  vreme: {
    type:String
  }
})

export default mongoose.model("Termin", Termin, "termini")