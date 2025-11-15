const fs = require('fs');

const args = process.argv.slice(2);
const date = new Date();

function writeJson(taskObj) {
    fs.writeFile('tasks.json', JSON.stringify(taskObj), (err) => {
        if (err) throw err;
    });
}

switch (true) {
    case args[0] == 'add':
        fs.readFile('tasks.json', 'utf8', (err, data) => {
            if(err) {
                const firstTask = [{
                    id: 1, 
                    description: args[1], 
                    status: "todo", 
                    createdAt: date.toUTCString(), 
                    updatedAt: date.toUTCString()
                }];

                writeJson(firstTask);
                console.log('Task added successfully (ID: 1)');
            }
            else {
                const taskArray = JSON.parse(data);

                const lastTask = taskArray.at(-1);
                currentId = lastTask.id + 1;

                taskArray.push({
                    id: currentId, 
                    description: args[1], 
                    status: "todo", 
                    createdAt: date.toUTCString(), 
                    updatedAt: date.toUTCString()
                });

                writeJson(taskArray);
                console.log(`Task added successfully (ID: ${currentId})`);
            }
        });
        break;

    case args[0] == 'update' :
        fs.readFile('tasks.json', 'utf8', (err, data) => {
            if (err) {
                console.log('No tasks listed');
                return;
            };
            const taskArray = JSON.parse(data);

            let idFound = false;
            for (let t of taskArray) {
                if(t.id == args[1]) {
                    idFound = true;
                    t.description = args[2];
                    t.updatedAt = date.toUTCString();

                    writeJson(taskArray);
                    console.log(`Task updated successfully (ID: ${args[1]})`);
                    break;
                }
            }
            if (!idFound) {
                console.log('Task not found');
            }
        });
        break;

    case args[0] == 'delete':
        fs.readFile('tasks.json', 'utf8', (err, data) => {
            if (err) {
                console.log('No tasks listed');
                return;
            };
            const taskArray = JSON.parse(data);

            let idFound = false;
            for (let t of taskArray) {
                if(t.id == args[1]) {
                    idFound = true;
                    taskArray.splice(taskArray.indexOf(t), 1);

                    writeJson(taskArray);
                    console.log(`Task deleted successfully (ID: ${args[1]})`);
                    break;
                }
            }

            if(!idFound) {
                console.log("Task not found")
            }
            
        });
        break;
    
    case args[0] == 'mark-in-progress':
        fs.readFile('tasks.json', 'utf8', (err, data) => {
            if (err) {
                console.log('No tasks listed');
                return;
            }
            const taskArray = JSON.parse(data);

            let idFound = false;
            for (let t of taskArray) {
                if(t.id == args[1]) {
                    idFound = true;
                    t.status = 'in-progress';
                    t.updatedAt = date.toUTCString();
                    
                    writeJson(taskArray);
                    console.log(`Task marked as "in progress" successfully (ID: ${args[1]})`);
                    break;
                }
            }

            if(!idFound) {
                console.log('Task not found');
            }

        });
        break;

    case args[0] == 'mark-done':
        fs.readFile('tasks.json', 'utf8', (err, data) => {
            if (err) {
                console.log('No tasks listed');
                return;
            }
            const taskArray = JSON.parse(data);

            let idFound = false;
            for (let t of taskArray) {
                if(t.id == args[1]) {
                    idFound = true;
                    t.status = 'done';
                    t.updatedAt = date.toUTCString();
                    
                    writeJson(taskArray);
                    console.log(`Task marked as "done" successfully (ID: ${args[1]})`);
                    break;
                }
            }
            if(!idFound) {
                console.log('Task not found');
            }            
        });
        break;
    
    case args[0] == 'list' && args.length == 1:
        fs.readFile('tasks.json', 'utf8', (err, data) => {
        if (err) {
            console.log('No tasks listed');
            return;
        }
        const taskArray = JSON.parse(data);

        for (let t of taskArray) {
            console.log(t.description);
            }
        });
        break;

    case args[0] == 'list' && args[1] == 'done':
        fs.readFile('tasks.json', 'utf8', (err, data) => {
            if (err) {
                console.log('No tasks listed');
                return;
            };
            const taskArray = JSON.parse(data);

            for (let t of taskArray) {
                if(t.status == 'done') {
                    console.log(t.description);
                }
            }
        });
        break;
    
    case args[0] == 'list' && args[1] == 'todo':
        fs.readFile('tasks.json', 'utf8', (err, data) => {
            if (err) {
                console.log('No tasks listed');
                return;
            }
            const taskArray = JSON.parse(data);

            for (let t of taskArray) {
                if(t.status == 'todo') {
                    console.log(t.description);
                }
            }
        });
        break;

    case args[0] == 'list' && args[1] == 'in-progress':
        fs.readFile('tasks.json', 'utf8', (err, data) => {
            if (err) {
                console.log('No tasks listed');
                return;
            }
            const taskArray = JSON.parse(data);

            for (let t of taskArray) {
                if(t.status == 'in-progress') {
                    console.log(t.description);
                }
            }
        });
        break;

    default:
        console.log('Unknown command')
}
