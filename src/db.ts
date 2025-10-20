import fs from "node:fs/promises"
import path from "node:path";
import {fileURLToPath} from "node:url";

export type Db = {
    id: number;
    description: string;
    status: "todo" | "done" | "in progress";
    created_at: Date;
    updated_at: Date;
}

// @ts-ignore
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const file = path.join(__dirname, "database.json");

async function isFilePresent(file: string) {
    try {
        await fs.access(file);
        return true;
    } catch {
        return false;
    }
}

export const customReadFile = async () => {
    const isFile = await isFilePresent(file);
    try {
        if (!isFile) {
            await fs.writeFile(file, JSON.stringify([]));
            return JSON.parse(await fs.readFile(file, "utf-8"));
        } else {
            return JSON.parse(await fs.readFile(file, "utf-8"));
        }
    } catch (err) {
        const e = err as Error;
        console.log(`error: ${e}`);
    }
}

export const saveTask = async (tasks: Db[]) => {
    try {
        await fs.writeFile(file, JSON.stringify(tasks, null, 2));
    } catch (err) {
        const e = err as Error;
        console.log(`error: ${e}`);
    }
}