"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
/* Predmet sema - sadrzi naziv predemta, sifru predmeta, tip predmeta(Obavezni ili Izborni),
  Fond casova(3+0+2), broj ESPB poena, smer, semstar/semestri u kojima se odrzava predmet, cilj i ishod predmeta,
  termine vezbi, temine predavanja, informacije o tome da li postoje lab vezbe, domaci zadaci, projekti i ukoliko
  postoje, onda postoje i detalji o ovim aktivnostima. Postoji i raspodela broja poena po aktivnostima,
  linkove ka fajlovima koji se ticu predavanja, vezbi, ispitnih rokova, projekata, domacih zadataka...
  Sadrzi informacije o tome da li su dostupne stranice za pregled ispitnih rokova, projekata, lab vezbi...
  Sema predmet sadri i informacije o tome koji nastavnici su angazovani na kojoj grupi predavanja i kojoj grupi vezbi
  (Plan angazovanja).
*/
const Schema = mongoose_1.default.Schema;
let Predmet = new Schema({
    naziv: {
        type: String
    },
    tip: {
        type: String
    },
    sifra: {
        type: String
    },
    fond_casova: {
        type: String
    },
    espb: {
        type: Number
    },
    semestar: {
        type: Array
    },
    cilj: {
        type: String
    },
    ishod: {
        type: String
    },
    termin_vezbi: {
        type: Array
    },
    termin_predavanja: {
        type: Array
    },
    lab_vezbe: {
        type: Number
    },
    lab_vezbe_info: {
        type: Array
    },
    domaci: {
        type: Number
    },
    domaci_info: {
        type: Array
    },
    projekat: {
        type: Number
    },
    projekat_info: {
        type: Array
    },
    tip_studija: {
        type: String
    },
    smer: {
        type: String
    },
    aktivnost_predavanje: {
        type: Number
    },
    projekat_poeni: {
        type: Number
    },
    prakticna_nastava: {
        type: Number
    },
    kolokvijum_poeni: {
        type: Number
    },
    seminar_poeni: {
        type: Number
    },
    pismeni_ispit: {
        type: Number
    },
    usmeni_ispit: {
        type: Number
    },
    vezbe_grupa: {
        type: Array
    },
    predavanja_grupa: {
        type: Array
    },
    predavanja: {
        type: Array
    },
    vezbe: {
        type: Array
    },
    ispiti: {
        type: Array
    },
    labvezbe: {
        type: Array
    },
    projekat_materijali: {
        type: Array
    },
    domaci_materijali: {
        type: Array
    },
    ispit_aktivna_strana: {
        type: Number
    },
    lab_aktivna_strana: {
        type: Number
    },
    projekat_aktivna_strana: {
        type: Number
    },
    domaci_aktivna_strana: {
        type: Number
    }
});
exports.default = mongoose_1.default.model("Predmet", Predmet, "predmeti");
//# sourceMappingURL=predmeti.js.map