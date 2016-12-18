/**
 * Created by Adrian on 12/17/2016.
 */
// import io from 'socket.io'
import * as io from "socket.io";
import {Design} from "../domain/design";

export class App {
    private designs:[any] = [];

    constructor(port) {
        var that = this;
        this.socket = io.listen(port);
        console.log('Server started on port::', port);
        this.socket.on('connection', (socket)=> {
            console.log('Client connected!');
            socket.on('subscribe', async(req:any)=> {
                console.log('Client subscribed', req);
                socket.join(req.design);
                that.socket.sockets.in(req.design).emit('subscribed', `${req.engineer} has subscribed successfully to design ${req.design}`);
            });

            socket.on('create', async(req:any) => {
                that.designs.push(new Design(req.engineer, req.design));
                socket.join(req.design);
                console.log(`${req.engineer} has created a new design: ${req.design}`);
                that.socket.sockets.in(req.design).emit('created', `${req.engineer} has created design successfully!`);
            });

            socket.on('update', async(req:any) => {
                console.log(`${req.engineer} try to update design: ${req.design}`);
                let relevantDesign:Design = that.findDesign(req.design);
                if (relevantDesign) {
                    relevantDesign.setColor(req.update.color);
                    relevantDesign.setDimension(req.update.dimension);
                    console.log('Design was updated!');
                    that.socket.sockets.in(req.design).emit('updated', `${req.engineer} has updated design successfully : ${relevantDesign.toString()}`);
                }
            });
        })
    }

    private findDesign(name:string) {
        console.log(this.designs);
        for (let i = 0; i < this.designs.length; i++)
            if (this.designs[i].getName() == name) {
                return this.designs[i];
            }
        return null;
    }
}