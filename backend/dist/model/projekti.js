"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
/*
Sema projekat - sadrzi temu projekta(slobodan tekst), kontakt(korisnicko ime profesora), oblast(slobodan tekst),
Datum postavljanja projekta, sadrzaj(slobodan tekst), kategoriju projekta
*/
const Schema = mongoose_1.default.Schema;
let Projekat = new Schema({
    tema: {
        type: String
    },
    kontakt: {
        type: String
    },
    oblast: {
        type: String
    },
    datum: {
        type: Date
    },
    sadrzaj: {
        type: String
    },
    kategorija: {
        type: String
    }
});
exports.default = mongoose_1.default.model("Projekat", Projekat, "projekti");
//# sourceMappingURL=projekti.js.map