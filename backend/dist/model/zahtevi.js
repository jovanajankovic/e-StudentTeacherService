"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
/*
  Zahtev sema - sadrzi informacije o tome koji student je uputio zahtev(korisnicko ime studenta), za koji predmet(id predmeta),
  flag - na pocetku je 0 jer zahtev nije prihvacen, a administrator kada prihvati zahtev, flag postaje 1 i student
  dobija mogucnost da aktivno prati predmet
*/
const Schema = mongoose_1.default.Schema;
let Zahtev = new Schema({
    student: {
        type: String
    },
    predmet: {
        type: String
    },
    flag: {
        type: Number
    }
});
exports.default = mongoose_1.default.model("Zahtev", Zahtev, "zahtevi");
//# sourceMappingURL=zahtevi.js.map