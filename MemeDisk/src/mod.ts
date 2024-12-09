import { DependencyContainer } from "tsyringe";
import { IPostDBLoadMod } from "@spt/models/external/IPostDBLoadMod";
import { DatabaseServer } from "@spt/servers/DatabaseServer";
import { IDatabaseTables } from "@spt/models/spt/server/IDatabaseTables";
import { ILogger } from "@spt/models/spt/utils/ILogger";
import { LogTextColor } from "@spt/models/spt/logging/LogTextColor";
import path from "path";
import fs from "fs";

class Mod implements IPostDBLoadMod {
    public preSptLoad(_container: DependencyContainer): void {
        // Placeholder for preAkiLoad functionality (if any)
    }

    public postDBLoad(container: DependencyContainer): void {
        const databaseServer = container.resolve<DatabaseServer>("DatabaseServer");
        const tables: IDatabaseTables = databaseServer.getTables();
        const logger = container.resolve("WinstonLogger");

        const ammoConfigPath = path.join(__dirname, "../db/items/disk.json");

        try {
            const ammoConfig = JSON.parse(fs.readFileSync(ammoConfigPath, "utf-8"));

            const ammoTemplate = tables.templates.items["6601546f86889319850bd566"];

            if (ammoTemplate) {
                Object.assign(ammoTemplate._props, ammoConfig);
                const logger = container.resolve<ILogger>("WinstonLogger");
                logger.logWithColor("Ammo properties modified successfully", LogTextColor.CYAN);
            } else {
                const logger = container.resolve<ILogger>("WinstonLogger");
                logger.logWithColor("Ammo template not found", LogTextColor.RED);
            }
        } catch (error) {
            const logger = container.resolve<ILogger>("WinstonLogger");
            logger.logWithColor(`Error loading or applying ammo config: ${(error as Error).message}`,LogTextColor.RED);
        }
    }
}

export const mod = new Mod();


