import mongoose from 'mongoose';

/*
Sema projekat - sadrzi temu projekta(slobodan tekst), kontakt(korisnicko ime profesora), oblast(slobodan tekst),
Datum postavljanja projekta, sadrzaj(slobodan tekst), kategoriju projekta 
*/

const Schema = mongoose.Schema;

let Projekat = new Schema({
  tema: {
    type:String
  },
  kontakt: {
    type:String
  },
  oblast: {
    type:String
  },
  datum:{
    type:Date
  },
  sadrzaj: {
    type:String
  },
  kategorija:{
    type:String
  }
})

export default mongoose.model("Projekat", Projekat, "projekti")