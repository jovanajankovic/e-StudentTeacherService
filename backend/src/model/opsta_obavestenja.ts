import mongoose from 'mongoose';

/*
  Opsta obavestenja koja su dostupna na pocetnoj stranici sistema
  Sadrzi naslov obavestenja, sadrzaj obavestenja, datum postavljanja obavestenja i kategoriju obavestenja
*/ 

const Schema = mongoose.Schema;

let OpsteObavestenje = new Schema({
  naslov: {
    type:String
  },
  sadrzaj: {
    type:String
  },
  datum:{
    type:Date
  },
  kategorija: {
    type: String
  }
})

export default mongoose.model("OpsteObavestenje", OpsteObavestenje, "opsta_obavestenja")