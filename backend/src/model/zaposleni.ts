import mongoose from 'mongoose';

/*
  Zaposleni sema - sadrzi sve informacije o zaposlenom - korisnicko ime, lozinku, ime, prezime, ulicu i broj,
  grad, mobilni telefon u formatu(06x-xxx-xxxx), vebsajt, licne podatke, zvanje(id zvanja), broj kabineta 
  u kojem sedi zaposleni, status zaposlenog(aktivan i neaktivan), putanju do slike na serveru, flag koji govori
  da li je promenio lozinku ili ne koju je postavio admin
*/

const Schema = mongoose.Schema;

let Zaposleni = new Schema({
  korime: {
    type:String
  },
  lozinka: {
    type:String
  },
  ime: {
    type:String
  },
  prezime: {
    type:String
  },
  ulica: {
    type:String
  },
  grad:{
    type:String
  },
  mobilni: {
    type:String
  },
  vebsajt: {
    type: String
  },
  licni_podaci: {
    type:String
  },
  zvanje: {
    type:String
  },
  broj_kabineta: {
    type:String
  },
  status: {
    type:String
  },
  slika:{
    type:String
  },
  flag: {
    type: Number
  }
})

export default mongoose.model("Zaposleni", Zaposleni, "zaposleni")