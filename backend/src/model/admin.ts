import mongoose from 'mongoose';

//Admin sema - sadrzi korisnicko ime i lozinku admina

const Schema = mongoose.Schema;

let Admin = new Schema({
  korime: {
    type:String
  },
  lozinka: {
    type:String
  }
})

export default mongoose.model("Admin", Admin, "admin")