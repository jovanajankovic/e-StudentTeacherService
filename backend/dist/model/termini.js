"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
/*
Termin sema - sadrzi dan i vreme termina za odrzavanje vezbi i predavanja,
 zamisljeno je da je moguce izabrati sve radne dane od Ponedeljka do Petka
i vremena u periodu od 08h - 22h
*/
const Schema = mongoose_1.default.Schema;
let Termin = new Schema({
    dan: {
        type: String
    },
    vreme: {
        type: String
    }
});
exports.default = mongoose_1.default.model("Termin", Termin, "termini");
//# sourceMappingURL=termini.js.map