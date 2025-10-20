#!/usr/bin/env node
import {Command} from "commander";
import readline from "node:readline/promises";

export type Db = {
    id: number;
    description: string;
    status: "todo" | "done" | "in progress";
    created_at: Date;
    updated_at: Date;
}
type Status = "todo" | "in-progress" | "done" | "all";

// @ts-ignore
import {customReadFile, saveTask} from "./db.ts";

const program = new Command();

async function askQuestion(query: string): Promise<string> {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    try {
        return await rl.question(query);
    } finally {
        rl.close();
    }
}

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));


function showProgress(message: string = "Processing") {
    const frames = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];
    let i = 0;
    return setInterval(() => {
        process.stdout.write(`\r${frames[i]} ${message}...`);
        i = (i + 1) % frames.length;
    }, 80);
}


program
    .name("roni's-cli")
    .version("0.0.1")
    .description("Roni's CLI");

program
    .command("greet")
    .description("Initial setup and greeting")
    .action(async () => {
        const spinner = showProgress("Processing your request");
        await sleep(1000);
        clearInterval(spinner);
        process.stdout.write("\r\x1b[K"); // Clear spinner line

        try {
            const name = (await askQuestion("What is your name? ")).trim();
            if (!name) throw new Error("Name cannot be empty!");

            const greet = (await askQuestion("What should I say to greet you? ")).trim();
            if (!greet) throw new Error("Greeting cannot be empty!");

            console.log(`✅ Hello ${name}, ${greet}! Thank you for using our service.`);
        } catch (err) {
            console.error("❌ Error:", (err as Error).message);
            process.exit(1);
        }
    });


program.command("add <items...>").description("Add a new task eg: id, task").action(async (items: string[]) => {
    const spinner = showProgress("Adding task");
    try {
        const id = Number(items[0]);
        const task = items[1];

        if (!id || !task) throw new Error(
            "Please provide both id and task"
        )

        const tasks = await customReadFile() as Db[];
        clearInterval(spinner);

        console.log("🐦‍🔥 We are creating your task....")
        await sleep(1000);

        const newTask: Db = {
            id,
            description: task,
            status: "todo",
            created_at: new Date(),
            updated_at: new Date()
        };

        if (tasks.length === 0) {
            tasks.push(newTask);
            await saveTask(tasks);
            await sleep(1000);
            console.log(`${id} task added successfully`);
            return;
        }

        const isTaskExist = tasks.find(t => t.id === id);

        if (isTaskExist) {
            console.log("⚠️ Task is already exist");
            return;
        }

        tasks.push(newTask);
        await saveTask(tasks);

        await sleep(1000);
        console.log(`✅ ${id} task added successfully`);
        return;
    } catch (err) {
        const e = err as Error;
        console.log(e.message);
        process.exit(1);
    }
});

program.command("update <item...>").description("Update a task eg: id, task").action(async (items: string[]) => {
    const spinner = showProgress("Adding task");
    try {
        const id = Number(items[0]);
        const task = items[1];

        const tasks = await customReadFile() as Db[];

        clearInterval(spinner);

        if (tasks.length === 0) throw new Error("⚠️ No tasks list is Empty");

        const isTaskExist = tasks.find(t => t.id === id);

        if (!isTaskExist) throw new Error("⚠️ No tasks found");

        console.log("We are processing your task!!")

        tasks.map((item) => {
            if (item.id === id) {
                item.description = task;
                item.updated_at = new Date();
                return;
            }
        });

        await saveTask(tasks);
        await sleep(1000);

        console.log("✅ Task updated successfully");
        return;
    } catch (err) {
        const e = err as Error;
        console.log(e.message);
        process.exit(1);
    }
});

program.command("delete <id>").description("Delete a task").action(async (id: string) => {
    const spinner = showProgress("Deleting task");
    try {

        if (!id) throw new Error("⚠️ Please provide id");
        const tasks = await customReadFile() as Db[];
        clearInterval(spinner);

        if (tasks.length === 0) throw new Error("⚠️ No tasks, list is Empty");

        const isTaskExist = tasks.find(t => t.id === Number(id));

        if (!isTaskExist) throw new Error(`⚠️ ${id}  task not found`);

        console.log("We are deleting your task....");

        const newTasks = tasks.filter((item) => item.id !== Number(id));

        await saveTask(newTasks);

        console.log(`${id} task deleted  successfully`);

        return;

    } catch (err) {
        const e = err as Error;
        console.log(e.message);
        process.exit(1);
    }
});

program
    .command("mark-in-progress <id>")
    .description("Mark a task as in progress")
    .action(async (id: string) => {
        const spinner = showProgress("Updating task status");
        try {
            const taskId = Number(id);
            const tasks = await customReadFile() as Db[];

            clearInterval(spinner);
            process.stdout.write("\r\x1b[K");

            if (!tasks || tasks.length === 0) {
                console.log("📝 No tasks found.");
                return;
            }

            const task = tasks.find(t => t.id === taskId);
            if (!task) {
                console.log(`❌ Task with ID ${taskId} not found.`);
                return;
            }

            task.status = "in progress";
            task.updated_at = new Date();

            await saveTask(tasks);
            console.log(`✅ Task ${taskId} marked as in progress.`);
        } catch (err) {
            clearInterval(spinner);
            process.stdout.write("\r\x1b[K");
            console.error("❌ Error updating task:", (err as Error).message);
            process.exit(1);
        }
    });

program
    .command("mark-done <id>")
    .description("Mark a task as done")
    .action(async (id: string) => {
        const spinner = showProgress("Updating task status");
        try {
            const taskId = Number(id);
            const tasks = await customReadFile() as Db[];

            clearInterval(spinner);
            process.stdout.write("\r\x1b[K");

            if (!tasks || tasks.length === 0) {
                console.log("📝 No tasks found.");
                return;
            }

            const task = tasks.find(t => t.id === taskId);
            if (!task) {
                console.log(`❌ Task with ID ${taskId} not found.`);
                return;
            }

            task.status = "done";
            task.updated_at = new Date();

            await saveTask(tasks);
            console.log(`✅ Task ${taskId} marked as done.`);
        } catch (err) {
            clearInterval(spinner);
            process.stdout.write("\r\x1b[K");
            console.error("❌ Error updating task:", (err as Error).message);
            program.showSuggestionAfterError();
            process.exit(1);
        }
    });

program
    .command("list [status]")
    .description("List tasks by status — allowed values: todo, in-progress, done")
    .action(async (status: string = "all") => {
        const spinner = showProgress("Fetching tasks...");
        try {
            // Normalize input to lowercase
            status = String(status).toLowerCase();

            const allowedStatuses: Status[] = ["todo", "in-progress", "done", "all"];

            if (!allowedStatuses.includes(status as Status)) {
                clearInterval(spinner);
                process.stdout.write("\r\x1b[K");

                console.error(`\n❌ Invalid status: "${status}".`);
                console.error(`Please use one of: ${allowedStatuses.join(", ")}`);
                console.log(); // spacing
                program.commands.find(c => c.name() === "list")?.outputHelp();
                process.exit(1);
            }

            const tasks = await customReadFile() as Db[];

            clearInterval(spinner);
            process.stdout.write("\r\x1b[K");

            if (!tasks || tasks.length === 0) {
                console.log("📝 No tasks found.");
                return;
            }

            if (status === "all") {
                console.log(`\n📋 Tasks (${status}):\n`);
                console.table(tasks)
                console.log(`\n✅ Total: ${tasks.length}\n`);
                return;
            }

            const filtered = tasks.filter(t => t.status === status);

            if (filtered.length === 0) {
                console.log(`📭 No tasks with status "${status}".`);
                return;
            }

            console.log(`\n📋 Tasks (${status}):\n`);
            console.table(filtered)

            console.log(`\n✅ Total: ${filtered.length}\n`);
        } catch (err) {
            clearInterval(spinner);
            process.stdout.write("\r\x1b[K");
            console.error("❌ Error listing tasks:", (err as Error).message);
            process.exit(1);
        }
    });

program.parse(process.argv);
