Here’s a clean, professional **README.md** that documents your CLI tool with examples, descriptions, and output blocks.

***

## 🧩 Roni’s CLI — Task Manager

Roni’s CLI is a simple, interactive command-line tool built with **Node.js** and **TypeScript** to manage daily tasks efficiently. It supports adding, updating, deleting, and listing tasks with multiple status options.

***

### 🚀 Features
- Add, update, delete, and list your tasks
- Interactive greeting setup
- Real-time progress spinner for better CLI feedback
- Persistent task storage using local JSON (via `customReadFile` and `saveTask`)
- Colorful and user-friendly output

***

### 📦 Installation

```bash
git clone https://github.com/Biswajit0972/cli-todo
cd roni-cli
npm install
```

Make the CLI globally executable:

```bash
chmod +x index.ts
```

Then run it:

```bash
./index.ts <command> [options]
```

***

### 🧭 Commands Overview

| Command | Description |
|----------|-------------|
| `greet` | Start interactive greeting setup |
| `add <id> <description>` | Add a new task |
| `update <id> <new description>` | Update task description |
| `delete <id>` | Delete a task by ID |
| `mark-in-progress <id>` | Set a task status to *in progress* |
| `mark-done <id>` | Set a task status to *done* |
| `list [status]` | List all tasks by status (`todo`, `in-progress`, `done`) |

***

### 💬 Examples and Output

#### 1️⃣ Greeting Command
```bash
./index.ts greet
```

**Example Output:**
```
⠹ Processing your request...
✅ Hello Roni, welcome aboard! Thank you for using our service.
```

***

#### 2️⃣ Add Task
```bash
./index.ts add 1 "Complete CLI project"
```

**Example Output:**
```
🐦‍🔥 We are creating your task....
✅ 1 task added successfully
```

***

#### 3️⃣ Update Task
```bash
./index.ts update 1 "Finalize CLI README"
```

**Example Output:**
```
We are processing your task!!
✅ Task updated successfully
```

***

#### 4️⃣ Delete Task
```bash
./index.ts delete 1
```

**Example Output:**
```
We are deleting your task....
1 task deleted successfully
```

***

#### 5️⃣ Mark Task as In Progress
```bash
./index.ts mark-in-progress 2
```

**Example Output:**
```
✅ Task 2 marked as in progress.
```

***

#### 6️⃣ Mark Task as Done
```bash
./index.ts mark-done 2
```

**Example Output:**
```
✅ Task 2 marked as done.
```

***

#### 7️⃣ List Tasks by Status
```bash
./index.ts list 
```

**Example Output:**
```
📋 Tasks (all):

┌─────────┬────┬────────────────────────┬───────────────┬──────────────────────────┬──────────────────────────┐
│ (index) │ id │      description       │    status     │       created_at         │       updated_at         │
├─────────┼────┼────────────────────────┼───────────────┼──────────────────────────┼──────────────────────────┤
│    0    │ 1  │ 'Complete CLI project' │    'done'     │ '2025-10-20T09:00:00Z'   │ '2025-10-20T09:05:00Z'   │
│    1    │ 2  │ 'Fix spinner clearing' │ 'in progress' │ '2025-10-20T09:02:00Z'   │ '2025-10-20T09:06:00Z'   │
└─────────┴────┴────────────────────────┴───────────────┴──────────────────────────┴──────────────────────────┘

✅ Total: 2
```

***

### ⚙️ Project Structure

```
src/
├── db.ts              # Handles file read/write for tasks
├── index.ts           # Main CLI entry file
├── package.json
├── tsconfig.json
└── README.md
```

***

### 🧠 Future Enhancements
- Add support for sorting and searching tasks
- Add colored status output (with chalk)
- Integrate JSON database for persistence
- Enable auto-generated task IDs

***

Would you like me to also include a short **“How It Works”** section that explains the spinner, database handling, and readline prompt flow?