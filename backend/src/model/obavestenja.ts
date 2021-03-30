import mongoose from 'mongoose';

/*
  Obavestenja za predmete, sadrzi naslov, sadrzaj, na koje predmete se odnosi obavestenje(id predmeta), 
  datum postavljanja obavestenja, korisnicko ime profesora koji je okacio to obavestenje, linkovi i naziv 
  fajlova koje je okacio profesor uz obavestenje
*/

const Schema = mongoose.Schema;

let Obavestenje = new Schema({
  naslov: {
    type:String
  },
  sadrzaj: {
    type:String
  },
  predmeti: {
    type:Array
  },
  datum:{
    type:Date
  },
  korime: {
    type:String
  },
  linkovi: {
    type:String
  },
  fajlovi: {
    type:Array
  }
})

//Zvanje.path('_id');

export default mongoose.model("Obavestenje", Obavestenje, "obavestenja")