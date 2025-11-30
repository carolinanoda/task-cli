# Task Tracker CLI
[Beginner project from roadmap.sh](https://roadmap.sh/projects/task-tracker)
## Requirements
This project requires **Node.js** to run. If you don't have Node, you can download it [here](https://nodejs.org/)
## Installing
Run the following command to install the project:
```
git clone https://github.com/carolinanoda/task-cli.git
```
## Usage
```
# Adding a new task
node task-cli add "Buy groceries"

# Updating and deleting tasks
task-cli update 1 "Buy groceries and cook dinner"
task-cli delete 1

# Marking a task as in progress or done
task-cli mark-in-progress 1
task-cli mark-done 1

# Listing all tasks
task-cli list

# Listing tasks by status
task-cli list done
task-cli list todo
task-cli list in-progress
```
