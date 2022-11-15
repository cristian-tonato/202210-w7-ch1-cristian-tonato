import fs from 'fs/promises';
import * as dotenv from 'dotenv'; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();
import { Games } from "..//interfaces/games";
import { Data, id } from './data.js';

export class GamesFileData implements Data<Games> {
    dataFileURL: string;
    constructor() {
        this.dataFileURL = process.env.DATA_FILE || '';
    }

    async getAll(): Promise<Array<Games>> {
        return fs
            .readFile(this.dataFileURL, 'utf-8')
            .then((data) => JSON.parse(data) as Array<Games>);
    }

    async get(id: id): Promise<Games> {
        return fs.readFile(this.dataFileURL, 'utf-8').then((data) => {
            const aData = JSON.parse(data) as Array<Games>;
            const item = aData.find((item) => item.id === id);
            if (!item) throw new Error();
            return item;
        });
    }

    async post(newGames: Partial<Games>): Promise<Games> {
        const aData = await this.getAll();
        const finalGames = { ...(newGames as Games), id: this.#createID() };
        aData.push(finalGames);
        await this.#saveData(aData);
        return finalGames;
    }

    async patch(id: id, updateGames: Partial<Games>): Promise<Games> {
        const aData = await this.getAll();
        const index = aData.findIndex((item) => item.id === id);
        if (!index) throw new Error('Not found id');
        aData[index] = {
            ...aData[index],
            ...updateGames,
        };
        await this.#saveData(aData);
        return aData[index];
    }

    async delete(id: id): Promise<void> {
        const aData = await this.getAll();
        const index = aData.findIndex((item) => item.id === id);
        if (!index) throw new Error('Not found id');
        aData.filter((item) => item.id !== id);
        await this.#saveData(aData);
    }

    #createID() {
        return Math.trunc(Math.random() * 1_000_000_000);
    }

    #saveData(data: Array<Games>) {
        return fs.writeFile(this.dataFileURL, JSON.stringify(data));
    }
}
