"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
/*
  Zaposleni sema - sadrzi sve informacije o zaposlenom - korisnicko ime, lozinku, ime, prezime, ulicu i broj,
  grad, mobilni telefon u formatu(06x-xxx-xxxx), vebsajt, licne podatke, zvanje(id zvanja), broj kabineta
  u kojem sedi zaposleni, status zaposlenog(aktivan i neaktivan), putanju do slike na serveru, flag koji govori
  da li je promenio lozinku ili ne koju je postavio admin
*/
const Schema = mongoose_1.default.Schema;
let Zaposleni = new Schema({
    korime: {
        type: String
    },
    lozinka: {
        type: String
    },
    ime: {
        type: String
    },
    prezime: {
        type: String
    },
    ulica: {
        type: String
    },
    grad: {
        type: String
    },
    mobilni: {
        type: String
    },
    vebsajt: {
        type: String
    },
    licni_podaci: {
        type: String
    },
    zvanje: {
        type: String
    },
    broj_kabineta: {
        type: String
    },
    status: {
        type: String
    },
    slika: {
        type: String
    },
    flag: {
        type: Number
    }
});
exports.default = mongoose_1.default.model("Zaposleni", Zaposleni, "zaposleni");
//# sourceMappingURL=zaposleni.js.map