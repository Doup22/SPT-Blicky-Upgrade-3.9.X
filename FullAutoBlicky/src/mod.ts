import { DependencyContainer } from "tsyringe";
import { IPostDBLoadMod } from "@spt/models/external/IPostDBLoadMod";
import { DatabaseServer } from "@spt/servers/DatabaseServer";
import { IDatabaseTables } from "@spt/models/spt/server/IDatabaseTables";
import path from "path";
import fs from "fs";

class Mod implements IPostDBLoadMod {
    public preAkiLoad(_container: DependencyContainer): void {
    }

    public postDBLoad(container: DependencyContainer): void {
        const databaseServer = container.resolve<DatabaseServer>("DatabaseServer");
        const tables: IDatabaseTables = databaseServer.getTables();

        const toyGun = tables.templates.items["66015072e9f84d5680039678"];

        const jsonFilePath = path.join(__dirname, "../db/items/blicky.json");

        try {
            const stats = JSON.parse(fs.readFileSync(jsonFilePath, "utf8"));

            Object.assign(toyGun._props, stats);

            toyGun._props.weapFireType = ["fullauto"];
            toyGun._props.bFirerate = 600;
        } catch (error) {
            console.error(`Failed to load blicky stats from JSON file: ${(error as Error).message}`);
        }
    }
}

export const mod = new Mod();



