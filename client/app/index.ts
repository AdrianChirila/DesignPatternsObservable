import {read} from "./utils/reader";
import {Engineer} from "./domain/engineer";
import {subscribeFor} from "./utils/socket";
var socket = require('socket.io-client')('http://localhost:8080');
export class App {
    constructor() {
        socket.on('connect', async() => {
            subscribeFor(socket, 'created');
            subscribeFor(socket, 'subscribed');
            subscribeFor(socket, 'updated');

            console.log('Give us your name:');
            let name:Promise<string> = await read();
            let engineer:Engineer = new Engineer(name);
            while (true) {
                console.log('Type 1 to subscribe for a design!');
                console.log('Type 2 to create a new design!');
                console.log('Type 3 to update an existing design!');
                let cmd:Promise<string> = await read();
                switch (cmd) {
                    case "1":
                        console.log('Name of the design:');
                        let design:Promise<string> = await read();
                        socket.compress(false).emit('subscribe', {engineer: engineer.getName(), design: design});
                        break;
                    case "2":
                        console.log('Name of the design:');
                        let designName:Promise<string> = await read();
                        socket.compress(false).emit('create', {engineer: engineer.getName(), design: designName});
                        break;
                    case "3":
                        console.log('Name of the design:');
                        let updatedNameDesign:Promise<string> = await read();
                        console.log('Color of the design:');
                        let color:Promise<string> = await read();
                        console.log('Dimension of the design:');
                        let dimension:Promise<string> = await read();
                        socket.compress(false).emit('update',
                            {
                                engineer: engineer.getName(),
                                design: updatedNameDesign,
                                update: {
                                    color: color,
                                    dimension: dimension
                                }
                            });
                        break;
                }
            }
        });
    }
}
