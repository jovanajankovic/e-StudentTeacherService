"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
/*
  Sema spisak - sadrzi id predmeta na koji se odnosi spisak, status(otvoren spisak - postoji mogucnost za prijavu na spisak
  ili zatvoren spisak - ne postoji mogucnost za prijavu na spisak), naziv samog spiska(npr. Lab 1 Grupa 1 - slobodan tekst),
  termin - sadrzi vreme i datum kada se odrzava aktivnost, mesto odrzvanja(slobodan tekst npr. Paviljon P-25),
  limit - sadrzi informaciju da li postoji limit za broj ljudi u sali ili ne(1 - postoji, 0 - ne postoji),
  max_broj - sadrzi max broj ljudi koji moze da stane u salu ukoliko je polje limit postavljeno na 1
  prijavljeni - sadrzi niz korisnickih imena studenata koji su prijavljeni na taj konkretan spisak,
  zaposlen - korisnicko ime nastavnika koji je kreirao spisak
*/
const Schema = mongoose_1.default.Schema;
let Spisak = new Schema({
    predmet: {
        type: String
    },
    status: {
        type: String
    },
    naziv: {
        type: String
    },
    termin: {
        type: Date
    },
    mesto: {
        type: String
    },
    limit: {
        type: Number
    },
    max_broj: {
        type: Number
    },
    prijavljeni: {
        type: Array
    },
    zaposlen: {
        type: String
    }
});
exports.default = mongoose_1.default.model("Spisak", Spisak, "spiskovi");
//# sourceMappingURL=spiskovi.js.map