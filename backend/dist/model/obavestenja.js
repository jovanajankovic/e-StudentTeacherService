"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
/*
  Obavestenja za predmete, sadrzi naslov, sadrzaj, na koje predmete se odnosi obavestenje(id predmeta),
  datum postavljanja obavestenja, korisnicko ime profesora koji je okacio to obavestenje, linkovi i naziv
  fajlova koje je okacio profesor uz obavestenje
*/
const Schema = mongoose_1.default.Schema;
let Obavestenje = new Schema({
    naslov: {
        type: String
    },
    sadrzaj: {
        type: String
    },
    predmeti: {
        type: Array
    },
    datum: {
        type: Date
    },
    korime: {
        type: String
    },
    linkovi: {
        type: String
    },
    fajlovi: {
        type: Array
    }
});
//Zvanje.path('_id');
exports.default = mongoose_1.default.model("Obavestenje", Obavestenje, "obavestenja");
//# sourceMappingURL=obavestenja.js.map