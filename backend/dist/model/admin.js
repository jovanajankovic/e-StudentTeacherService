"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
//Admin sema - sadrzi korisnicko ime i lozinku admina
const Schema = mongoose_1.default.Schema;
let Admin = new Schema({
    korime: {
        type: String
    },
    lozinka: {
        type: String
    }
});
exports.default = mongoose_1.default.model("Admin", Admin, "admin");
//# sourceMappingURL=admin.js.map