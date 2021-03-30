"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
/*
  Opsta obavestenja koja su dostupna na pocetnoj stranici sistema
  Sadrzi naslov obavestenja, sadrzaj obavestenja, datum postavljanja obavestenja i kategoriju obavestenja
*/
const Schema = mongoose_1.default.Schema;
let OpsteObavestenje = new Schema({
    naslov: {
        type: String
    },
    sadrzaj: {
        type: String
    },
    datum: {
        type: Date
    },
    kategorija: {
        type: String
    }
});
exports.default = mongoose_1.default.model("OpsteObavestenje", OpsteObavestenje, "opsta_obavestenja");
//# sourceMappingURL=opsta_obavestenja.js.map