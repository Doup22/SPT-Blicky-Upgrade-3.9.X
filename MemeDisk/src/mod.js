"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mod = void 0;
const LogTextColor_1 = require("C:/snapshot/project/obj/models/spt/logging/LogTextColor");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
class Mod {
    preSptLoad(_container) {
        // Placeholder for preAkiLoad functionality (if any)
    }
    postDBLoad(container) {
        const databaseServer = container.resolve("DatabaseServer");
        const tables = databaseServer.getTables();
        const logger = container.resolve("WinstonLogger");
        const ammoConfigPath = path_1.default.join(__dirname, "../db/items/disk.json");
        try {
            const ammoConfig = JSON.parse(fs_1.default.readFileSync(ammoConfigPath, "utf-8"));
            const ammoTemplate = tables.templates.items["6601546f86889319850bd566"];
            if (ammoTemplate) {
                Object.assign(ammoTemplate._props, ammoConfig);
                const logger = container.resolve("WinstonLogger");
                logger.logWithColor("Ammo properties modified successfully", LogTextColor_1.LogTextColor.CYAN);
            }
            else {
                const logger = container.resolve("WinstonLogger");
                logger.logWithColor("Ammo template not found", LogTextColor_1.LogTextColor.RED);
            }
        }
        catch (error) {
            const logger = container.resolve("WinstonLogger");
            logger.logWithColor(`Error loading or applying ammo config: ${error.message}`, LogTextColor_1.LogTextColor.RED);
        }
    }
}
exports.mod = new Mod();
//# sourceMappingURL=mod.js.map