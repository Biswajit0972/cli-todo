#!/usr/bin/env node
import { Command } from "commander";
import { askQuestion } from "./utils";
const program = new Command();
// Function to ask questions
program
    .description("Welcome to Roni's Space 🚀")
    .option("-i, --init", "start greeting setup")
    .action(async () => {
    console.log("👋 Let's set up your greeting!");
    const name = await askQuestion("Enter your name: ");
    const greet = await askQuestion("Enter your greeting (e.g., Hi, Hello): ");
    console.log(`${greet} ${name}! Welcome to Roni's Space 🌌`);
});
program.parse(process.argv);
