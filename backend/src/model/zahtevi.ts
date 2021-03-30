import mongoose from 'mongoose';

/*
  Zahtev sema - sadrzi informacije o tome koji student je uputio zahtev(korisnicko ime studenta), za koji predmet(id predmeta),
  flag - na pocetku je 0 jer zahtev nije prihvacen, a administrator kada prihvati zahtev, flag postaje 1 i student 
  dobija mogucnost da aktivno prati predmet
*/

const Schema = mongoose.Schema;

let Zahtev = new Schema({
  student: {
    type:String
  },
  predmet: {
    type:String
  },
  flag: {
    type:Number
  }
})

export default mongoose.model("Zahtev", Zahtev, "zahtevi")