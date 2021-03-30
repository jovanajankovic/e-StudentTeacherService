import mongoose from 'mongoose';

/*
  Student sema - sadrzi sve osnovne infromacije o studentu, korime, lozinka, indeks, tip_studija, ime, prezime,
  status, flag(govori o tome da li je student promenio sifru prilikom prvog logovanja ili ne), i sadrzi niz predmeta
  na koje je student prijavljen
*/

const Schema = mongoose.Schema;

let Student = new Schema({
  korime: {
    type:String
  },
  lozinka: {
    type:String
  },
  indeks: {
    type:String
  },
  tip_studija: {
    type:String
  },
  ime: {
    type:String
  },
  prezime: {
    type:String
  },
  status: {
    type:String
  },
  flag: {
    type:Number
  }, 
  predmeti: {
    type:Array
  }
})

export default mongoose.model("Student", Student, "studenti")