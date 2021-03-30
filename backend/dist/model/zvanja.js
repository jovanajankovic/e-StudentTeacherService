"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
//Zvanje sema - sadrzi naziv zvanja (Redovni profesor, Vandredni profesor, Docent...) i tip zvanja (nastavno i nenastavno)
const Schema = mongoose_1.default.Schema;
let Zvanje = new Schema({
    naziv: {
        type: String
    },
    tip: {
        type: String
    }
});
//Zvanje.path('_id');
exports.default = mongoose_1.default.model("Zvanje", Zvanje, "zvanja");
//# sourceMappingURL=zvanja.js.map