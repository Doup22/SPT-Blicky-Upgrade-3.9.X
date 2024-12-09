"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mod = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
class Mod {
    preAkiLoad(_container) {
    }
    postDBLoad(container) {
        const databaseServer = container.resolve("DatabaseServer");
        const tables = databaseServer.getTables();
        const toyGun = tables.templates.items["66015072e9f84d5680039678"];
        const jsonFilePath = path_1.default.join(__dirname, "../db/items/blicky.json");
        try {
            const stats = JSON.parse(fs_1.default.readFileSync(jsonFilePath, "utf8"));
            Object.assign(toyGun._props, stats);
            toyGun._props.weapFireType = ["fullauto"];
            toyGun._props.bFirerate = 600;
        }
        catch (error) {
            console.error(`Failed to load blicky stats from JSON file: ${error.message}`);
        }
    }
}
exports.mod = new Mod();
//# sourceMappingURL=mod.js.map